import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

import woodThumbnail from "../../icons/wood_thumbnail.png";
import stoneThumbnail from "../../icons/stone_thumbnail.png";
import metalThumbnail from "../../icons/metal_thumbnail.png";
import hq_metalThumbnail from "../../icons/hq_metal_thumbnail.png";

import scrapThumbnail from "../../icons/scrap_thumbnail.png";
import gearThumbnail from "../../icons/gear_thumbnail.png";
import sewing_kitThumbnail from "../../icons/sewing_kit_thumbnail.png";
import lq_fuelThumbnail from "../../icons/lq_fuel_thumbnail.png";

import { AudioPlayer } from "./AudioPlayer.tsx";
import buttons_sound from "../../audio/buttons_sound.mp3";

//? ----------------------------------------------------------------------------------------------------

//? This component is used to calculate and display the building costs across various building types, including stone, metal, and armored tiers.

//? Optional calculator aimed for miscellaneous objects — those not integral to the building's structure but serving as filler blocks.

//? Dynamic upkeep calculator, which provides a weighted average upkeep cost based on all placed objects.

//? ----------------------------------------------------------------------------------------------------

export default function ResourceCounter() {
  const canvas_models_array = useSelector((state: RootState) => state.canvasModelsArray.canvas_models_array);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [build_cost, set_build_cost] = useState([{ wood: 0 }, { stone: 0 }, { metal: 0 }, { armored: 0 }]);
  const [components_cost, set_components_cost] = useState([{scrap:0}, {gear:0}, {sewing_kit: 0}, {lq_fuel:0}]); //prettier-ignore

  const [total_upkeep_percentile_rampup, set_total_upkeep_percentile_rampup] = useState(0);
  const [wood_upkeep_cost, set_wood_upkeep_cost] = useState<number>(0);
  const [stone_upkeep_cost, set_stone_upkeep_cost] = useState<number>(0);
  const [metal_upkeep_cost, set_metal_upkeep_cost] = useState<number>(0);
  const [hqm_upkeep_cost, set_hqm_upkeep_cost] = useState<number>(0);
  const [upkeep_cost_text, set_upkeep_cost_text] = useState<string>("");

  const [count_miscs_cost, set_count_miscs_cost] = useState<boolean>(false);
  const [total_misc_count, set_total_misc_count] = useState<number>(0);

  const [total_wood_misc_cost, set_total_wood_misc_cost] = useState<number>(0);
  const [total_stone_misc_cost, set_total_stone_misc_cost] = useState<number>(0);
  const [total_metal_misc_cost, set_total_metal_misc_cost] = useState<number>(0);
  const [total_hq_metal_misc_cost, set_total_hq_metal_misc_cost] = useState<number>(0);

  const [twig_upgrade_wood_cost, set_twig_upgrade_wood_cost] = useState<number>();

  //* ------------------------- ↓ Misc Cost Counter ↓ -------------------------
  // (if enabled) this function is used to calculate the cost of the misc objects:
  // (tool cupboard, large wood box, wood storage box, furnace, workbench tier 3, sleeping bag)
  // the total misc cost is added on top of the "construction" objects cost (foundations, walls ... )
  // it is displayed as a whole under the "build cost" window

  function CountMiscsCost(models: string[]) {
    // -------------------------  count the number of misc items  -------------------------

    let misc_tool_cupboard_count = models.filter((model) => model === "ToolCupboard").length;
    let misc_large_wood_box_count = models.filter((model) => model === "LargeWoodBox").length;
    let misc_wood_storage_box_count = models.filter((model) => model === "WoodStorageBox").length;
    let misc_furnace_count = models.filter((model) => model === "Furnace").length;
    let misc_workbench_t3_count = models.filter((model) => model === "WorkbenchT3").length;
    let misc_sleeping_bag_count = models.filter((model) => model === "SleepingBag").length;

    set_total_misc_count(
      misc_tool_cupboard_count +
        misc_large_wood_box_count +
        misc_wood_storage_box_count +
        misc_furnace_count +
        misc_workbench_t3_count +
        misc_sleeping_bag_count
    );

    // -------------------------  total misc cost (wood) -------------------------

    let wood_misc_cost_1000 = misc_tool_cupboard_count * 1000;

    let wood_misc_cost_250 = misc_large_wood_box_count * 250;

    let wood_misc_cost_100 = (misc_large_wood_box_count + misc_furnace_count) * 100;

    set_total_wood_misc_cost(wood_misc_cost_1000 + wood_misc_cost_250 + wood_misc_cost_100);

    // -------------------------  total misc cost (stone) -------------------------

    let stone_misc_cost_200 = misc_furnace_count * 200;
    set_total_stone_misc_cost(stone_misc_cost_200);

    // -------------------------  total misc cost (metal) -------------------------

    let metal_misc_cost_1000 = misc_workbench_t3_count * 1000;
    let metal_misc_cost_50 = misc_large_wood_box_count * 50;
    set_total_metal_misc_cost(metal_misc_cost_1000 + metal_misc_cost_50);

    // -------------------------  total misc cost (hq metal) -------------------------

    let hq_metal_misc_cost_100 = misc_workbench_t3_count * 100;
    set_total_hq_metal_misc_cost(hq_metal_misc_cost_100);

    // -------------------------  total misc cost (scrap) -------------------------

    let scrap_misc_cost_1250 = misc_workbench_t3_count * 1250;
    let total_scrap_misc_cost = scrap_misc_cost_1250;

    // -------------------------  total misc cost (gear) -------------------------

    let gear_misc_cost_2 = models.filter((model) => model === "GarageDoor").length * 2;
    let total_gear_misc_cost = gear_misc_cost_2;

    // -------------------------  total misc cost (lq fuel) -------------------------

    let lq_fuel_misc_cost_50 = models.filter((model) => model === "Furnace").length * 50;
    let total_lq_fuel_misc_cost = lq_fuel_misc_cost_50;

    // -------------------------  display the values -------------------------

    set_components_cost([
      { scrap: total_scrap_misc_cost },
      { gear: total_gear_misc_cost },
      { sewing_kit: 0 },
      { lq_fuel: total_lq_fuel_misc_cost },
    ]);
  }

  //* ------------------------- ↑ Misc Cost Counter ↑ -------------------------

  //* ------------------------- ↓ Base Building Cost Counter ↓ -------------------------
  // this function is calculating the building cost of the base objects like foundations, walls, floors ...
  // displayed under the "build cost" window

  function CountBuildCost(models: string[]) {
    // -------------------------  total build cost (stone) -------------------------

    let stone_build_cost_300 =
      models.filter(
        (model) =>
          model === "StoneFoundationSquareHigh" ||
          model === "StoneFoundationSquareMid" ||
          model === "StoneFoundationSquareLow" ||
          model === "StoneWallHigh" ||
          model === "StoneWallMid" ||
          model === "StoneWallThird" ||
          model === "StoneStairsLShape" ||
          model === "StoneStairsUShape"
      ).length * 300;

    // prettier-ignore
    let stone_build_cost_210 =
      models.filter(
        (model) => 
        model === "StoneDoorway" ||
        model === "StoneWindow"
    ).length * 210;

    let stone_build_cost_150 =
      models.filter(
        (model) =>
          model === "StoneFoundationTriangleHigh" ||
          model === "StoneFoundationTriangleMid" ||
          model === "StoneFoundationTriangleLow" ||
          model === "StoneFoundationStairs" ||
          model === "StoneFloorSquare" ||
          model === "StoneFoundationTriangleLow" ||
          model === "StoneWallLow" ||
          model === "StoneWallFrame" ||
          model === "StoneFloorFrameSquare" ||
          model === "StoneFloorFrameTriangle" ||
          model === "StoneRoofSquare" ||
          model === "StoneRoofTriangle"
      ).length * 150;

    // prettier-ignore
    let stone_build_cost_75 =
     models.filter(
        (model) =>
        model === "StoneFloorTriangle"
    ).length * 75;

    let total_stone_build_cost =
      stone_build_cost_300 + stone_build_cost_210 + stone_build_cost_150 + stone_build_cost_75;

    // -------------------------  total build cost (metal) -------------------------

    // prettier-ignore
    let metal_build_cost_300 =
        models.filter(
          (model) =>
            model === "GarageDoor"
        ).length * 300;

    let metal_build_cost_200 =
      models.filter(
        (model) =>
          model === "MetalFoundationSquareHigh" ||
          model === "MetalFoundationSquareMid" ||
          model === "MetalFoundationSquareLow" ||
          model === "MetalFoundationStairs" ||
          model === "MetalWallHigh" ||
          model === "MetalWallMid" ||
          model === "MetalStairsUShape" ||
          model === "MetalStairsLShape"
      ).length * 200;

    // prettier-ignore
    let metal_build_cost_150 =
      models.filter(
        (model) =>
          model === "MetalDoor" 
      ).length * 150;

    // prettier-ignore
    let metal_build_cost_140 =
      models.filter(
        (model) =>
          model === "MetalDoorway" ||
          model === "MetalWindow"
      ).length * 140;

    let metal_build_cost_100 =
      models.filter(
        (model) =>
          model === "MetalFoundationTriangleHigh" ||
          model === "MetalFoundationTriangleMid" ||
          model === "MetalFoundationTriangleLow" ||
          model === "MetalFloorSquare" ||
          model === "MetalWallLow" ||
          model === "MetalWallFrame" ||
          model === "MetalFloorFrameSquare" ||
          model === "MetalFloorFrameTriangle" ||
          model === "MetalVerticalEmbrasure" ||
          model === "MetalRoofSquare" ||
          model === "MetalRoofTriangle"
      ).length * 100;

    //prettier-ignore
    let metal_build_cost_50 =
        models.filter(
            (model) =>
            model === "MetalFloorTriangle" ||
            model === "StrenghtenedGlassWindow"
  ).length * 50;

    let total_metal_build_cost =
      metal_build_cost_300 +
      metal_build_cost_200 +
      metal_build_cost_150 +
      metal_build_cost_140 +
      metal_build_cost_100 +
      metal_build_cost_50;

    // -------------------------  total build cost (hq metal) -------------------------

    let hqm_build_cost_25 =
      models.filter(
        (model) =>
          model === "ArmoredFoundationSquareHigh" ||
          model === "ArmoredFoundationSquareMid" ||
          model === "ArmoredFoundationSquareLow" ||
          model === "ArmoredFoundationStairs" ||
          model === "ArmoredWallHigh" ||
          model === "ArmoredWallMid" ||
          model === "ArmoredStairs"
      ).length * 25;

    // prettier-ignore
    let hqm_build_cost_18 =
      models.filter(
        (model) =>
          model === "ArmoredDoorway" ||
          model === "ArmoredWindow"
      ).length * 18;

    let hqm_build_cost_13 =
      models.filter(
        (model) =>
          model === "ArmoredFoundationTriangleHigh" ||
          model === "ArmoredFoundationTriangleMid" ||
          model === "ArmoredFoundationTriangleLow" ||
          model === "ArmoredSquareFloor" ||
          model === "ArmoredWallLow" ||
          model === "ArmoredWallFrame" ||
          model === "ArmoredFloorFrame"
      ).length * 13;

    //prettier-ignore
    let hqm_build_cost_7 =
        models.filter(
            (model) =>
            model === "ArmoredTriangleFloor"
        ).length * 7;

    let total_hqm_build_cost = hqm_build_cost_25 + hqm_build_cost_18 + hqm_build_cost_13 + hqm_build_cost_7;

    //* ------------------------- ↓ wood needed to upgrade from twig to higher quality ↓ -------------------------
    // building the base requires the objects to be upgraded from twig -> wood -> stone -> hq metal
    // this app skips the twig and wood part and starts building the base from the stone and hq metal (soon)
    // so the wood cost for previous tiers is calculated here

    let twig_wood_upgrade_50 =
      models.filter(
        (model) =>
          model === "StoneFoundationSquareHigh" ||
          model === "StoneFoundationSquareMid" ||
          model === "StoneFoundationSquareLow" ||
          model === "StoneWallHigh" ||
          model === "StoneWallMid" ||
          model === "StoneStairsLShape" ||
          model === "StoneStairsUShape" ||
          //prettier-ignore
          model === "MetalFoundationSquareHigh" ||
          model === "MetalFoundationSquareMid" ||
          model === "MetalFoundationSquareLow" ||
          model === "MetalStairsLShape" ||
          model === "MetalStairsUShape" ||
          model === "MetalWallHigh" ||
          model === "MetalWallMid" ||
          //prettier-ignore
          model === "ArmoredFoundationSquareHigh" ||
          model === "ArmoredFoundationSquareMid" ||
          model === "ArmoredFoundationSquareLow"
      ).length * 50;

    let twig_wood_upgrade_35 =
      models.filter(
        (model) =>
          model === "StoneDoorway" || model === "MetalDoorway" || model === "StoneWindow" || model === "MetalWindow"
      ).length * 35;

    let twig_wood_upgrade_25 =
      models.filter(
        (model) =>
          model === "StoneFoundationTriangleHigh" ||
          model === "StoneFoundationTriangleMid" ||
          model === "StoneFoundationTriangleLow" ||
          model === "StoneWallLow" ||
          model === "StoneFloorSquare" ||
          model === "StoneWallFrame" ||
          model === "StoneFloorFrameSquare" ||
          model === "StoneFloorFrameTriangle" ||
          model === "StoneRoofSquare" ||
          model === "StoneRoofTriangle" ||
          //prettier-ignore
          model === "MetalFoundationTriangleHigh" ||
          model === "MetalFoundationTriangleMid" ||
          model === "MetalFoundationTriangleLow" ||
          model === "MetalWallLow" ||
          model === "MetalFloorSquare" ||
          model === "MetalWallFrame" ||
          model === "MetaFloorFrameSquare" ||
          model === "MetalFloorFrameTriangle" ||
          model === "MetalRoofSquare" ||
          model === "MetalRoofTriangle" ||
          //prettier-ignore
          model === "ArmoredFoundationTriangleHigh" ||
          model === "ArmoredFoundationTriangleMid" ||
          model === "ArmoredFoundationTriangleLow"
      ).length * 25;

    let twig_wood_upgrade_13 =
      models.filter((model) => model === "StoneFloorTriangle" || model === "MetalFloorTriangle").length * 13;

    set_twig_upgrade_wood_cost(
      twig_wood_upgrade_50 + twig_wood_upgrade_35 + twig_wood_upgrade_25 + twig_wood_upgrade_13
    );

    //* ------------------------- ↑ wood needed to upgrade from twig to higher quality ↑ -------------------------

    // -------------------------  display build cost + misc cost -------------------------

    if (count_miscs_cost) {
      set_build_cost([
        { wood: total_wood_misc_cost },
        { stone: total_stone_build_cost + total_stone_misc_cost },
        { metal: total_metal_build_cost + total_metal_misc_cost },
        { armored: total_hqm_build_cost + total_hq_metal_misc_cost },
      ]);
    } else if (!count_miscs_cost) {
      set_build_cost([
        { wood: 0 },
        { stone: total_stone_build_cost },
        { metal: total_metal_build_cost },
        { armored: total_hqm_build_cost },
      ]);
    }
  }

  //* ------------------------- ↑ Base Building Cost Counter ↑ -------------------------

  //* ------------------------- ↓ Upkeep Dynamic Percentage ↓ -------------------------
  // this function counts the weighted upkeep cost of currently placed objects based on its amount
  // the upkeep counter is divided on 4 stages:
  // - stage 0: first 15 objects adds 10% to the upkeep cost for every object
  // - stage 1: objects 16-100 adds 15% to the upkeep cost
  // - stage 2: objects 101-175 adds 20% to the upkeep cost
  // - stage 3: every objects above 175 adds 30% to the upkeep cost

  function CountUpkeepPercentileRampup(models: string[]) {
    let total_object_count = models.length - total_misc_count;

    let stage_0_count: number = 0;
    let stage_1_count: number = 0;
    let stage_2_count: number = 0;
    let stage_3_count: number = 0;

    let stage_0_count_rampup: number = 0;
    let stage_1_count_rampup: number = 0;
    let stage_2_count_rampup: number = 0;
    let stage_3_count_rampup: number = 0;

    // -------------------------  stage 0 -------------------------

    if (total_object_count === 0 || (total_object_count > 0 && total_object_count <= 15)) {
      stage_0_count_rampup = 0.1;

      set_total_upkeep_percentile_rampup(parseFloat(stage_0_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost");
    }

    // -------------------------  stage 1 -------------------------

    if (total_object_count > 15 && total_object_count <= 100) {
      stage_0_count = 15;
      stage_1_count = total_object_count - 15;

      stage_1_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_1_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated scaling)");
    }

    // -------------------------  stage 2 -------------------------

    if (total_object_count > 100 && total_object_count <= 175) {
      stage_0_count = 15;
      stage_1_count = 100 - stage_0_count;
      stage_2_count = total_object_count - 100;

      stage_2_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15 + stage_2_count * 0.2) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_2_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated scaling)");
    }

    // -------------------------  stage 3 -------------------------

    if (total_object_count > 175) {
      stage_0_count = 15;
      stage_1_count = 100 - stage_0_count;
      stage_2_count = 175 - 100;
      stage_3_count = total_object_count - 175;

      stage_3_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15 + stage_2_count * 0.2 + stage_3_count * 0.33) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_3_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated scaling)");
    }
  }

  //* ------------------------- ↑ Upkeep Dynamic Percentage ↑ -------------------------

  function DisplayCountedUpkeep() {
    if (build_cost && build_cost[0] && build_cost[0].wood !== undefined && count_miscs_cost) {
      set_wood_upkeep_cost((build_cost[0].wood - total_wood_misc_cost) * total_upkeep_percentile_rampup);
    } else if (build_cost && build_cost[0] && build_cost[0].wood !== undefined && !count_miscs_cost) {
      set_wood_upkeep_cost(build_cost[0].wood * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[1] && build_cost[1].stone !== undefined && count_miscs_cost) {
      set_stone_upkeep_cost((build_cost[1].stone - total_stone_misc_cost) * total_upkeep_percentile_rampup);
    } else if (build_cost && build_cost[1] && build_cost[1].stone !== undefined) {
      set_stone_upkeep_cost(build_cost[1].stone * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[2] && build_cost[2].metal !== undefined && count_miscs_cost) {
      set_metal_upkeep_cost((build_cost[2].metal - total_metal_misc_cost) * total_upkeep_percentile_rampup);
    } else if (build_cost && build_cost[2] && build_cost[2].metal !== undefined && !count_miscs_cost) {
      set_metal_upkeep_cost(build_cost[2].metal * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[3] && build_cost[3].armored !== undefined && count_miscs_cost) {
      set_hqm_upkeep_cost((build_cost[3].armored - total_hq_metal_misc_cost) * total_upkeep_percentile_rampup);
    } else if (build_cost && build_cost[3] && build_cost[3].armored !== undefined && !count_miscs_cost) {
      set_hqm_upkeep_cost(build_cost[3].armored * total_upkeep_percentile_rampup);
    }
  }

  const HandleMiscCostState = () => {
    set_count_miscs_cost(!count_miscs_cost);
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  };

  const NumbersFormatter = (number: any) => {
    if (number > 9999) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else return number;
  };

  useEffect(() => {
    CountBuildCost(canvas_models_array);
    CountMiscsCost(canvas_models_array);
    CountUpkeepPercentileRampup(canvas_models_array);
  }, [canvas_models_array, total_misc_count, count_miscs_cost]);

  useEffect(() => {
    DisplayCountedUpkeep();
  }, [build_cost, total_upkeep_percentile_rampup]);

  return (
    <>
      <div className="misc_cost_checkbox checkbox_edit">build cost</div>

      <div className="main_container build_cost_main_container">
        <div className="misc_count_description">
          <label>
            <input type="checkbox" checked={count_miscs_cost} onChange={HandleMiscCostState} />
            count miscs (TC, WB, Box, Furnace ... )
          </label>
        </div>
        <div className="build_cost_container">
          <div className="wood_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${woodThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>wood</div>
                <div>{NumbersFormatter(Number(build_cost[0].wood) + Number(twig_upgrade_wood_cost))}</div>
              </div>
            </div>
          </div>
          <div className="stone_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${stoneThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>stone</div>
                <div>{NumbersFormatter(build_cost[1].stone)}</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{NumbersFormatter(build_cost[2].metal)}</div>
              </div>
            </div>
          </div>
          <div className="hq_metal_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${hq_metalThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>hq. metal</div>
                <div>{NumbersFormatter(build_cost[3].armored)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container upkeep_cost_main_container">
        <div className="cost_description">
          {upkeep_cost_text} {(total_upkeep_percentile_rampup * 100).toFixed(2)}%
        </div>
        <div className="upkeep_cost_container">
          <div className="wood_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${woodThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>wood</div>
                <div>{NumbersFormatter(wood_upkeep_cost.toFixed(0))}</div>
              </div>
            </div>
          </div>
          <div className="stone_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${stoneThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>stone</div>
                <div>{NumbersFormatter(stone_upkeep_cost.toFixed(0))}</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{NumbersFormatter(metal_upkeep_cost.toFixed(0))}</div>
              </div>
            </div>
          </div>
          <div className="hq_metal_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${hq_metalThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>hq. metal</div>
                <div>{NumbersFormatter(hqm_upkeep_cost.toFixed(0))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container components_cost_main_container">
        <div className="cost_description">components cost</div>
        <div className="upkeep_cost_container">
          <div className="scrap_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${scrapThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>scrap</div>
                <div>{NumbersFormatter(components_cost[0].scrap)}</div>
              </div>
            </div>
          </div>
          <div className="gears_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${gearThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display">
                <div>gears</div>
                <div>{NumbersFormatter(components_cost[1].gear)}</div>
              </div>
            </div>
          </div>
          <div className="sewing_kit_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${sewing_kitThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>sewing kit</div>
                <div>{NumbersFormatter(components_cost[2].sewing_kit)}</div>
              </div>
            </div>
          </div>
          <div className="lq_fuel_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${lq_fuelThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>lq. fuel</div>
                <div>{NumbersFormatter(components_cost[3].lq_fuel)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
