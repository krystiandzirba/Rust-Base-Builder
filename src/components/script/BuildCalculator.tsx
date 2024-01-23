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

export default function ResourceCounter() {
  const canvas_models_array = useSelector((state: RootState) => state.canvasModelsArray.canvas_models_array);

  const [build_cost, set_build_cost] = useState([{ wood: 0 }, { stone: 0 }, { metal: 0 }, { armored: 0 }]);
  const [components_cost, set_components_cost] = useState([{scrap:0}, {gear:0}, {sewing_kit: 0}, {lq_fuel:0}]); //prettier-ignore

  const [total_upkeep_percentile_rampup, set_total_upkeep_percentile_rampup] = useState(0);
  const [wood_upkeep_cost, set_wood_upkeep_cost] = useState<number>(0);
  const [stone_upkeep_cost, set_stone_upkeep_cost] = useState<number>(0);
  const [metal_upkeep_cost, set_metal_upkeep_cost] = useState<number>(0);
  const [hqm_upkeep_cost, set_hqm_upkeep_cost] = useState<number>(0);
  const [upkeep_cost_text, set_upkeep_cost_text] = useState<string>("");

  const [count_miscs_cost, set_count_miscs_cost] = useState(false);
  const [total_misc_count, set_total_misc_count] = useState<number>(0);

  const [total_wood_misc_cost, set_total_wood_misc_cost] = useState<number>(0);
  const [total_stone_misc_cost, set_total_stone_misc_cost] = useState<number>(0);
  const [total_metal_misc_cost, set_total_metal_misc_cost] = useState<number>(0);
  const [total_hq_metal_misc_cost, set_total_hq_metal_misc_cost] = useState<number>(0);

  const [twig_upgrade_wood_cost, set_twig_upgrade_wood_cost] = useState<number>();

  function CountMiscsCost(models: string[]) {
    // - - - - - - - - - - - misc count - - - - - - - - - -

    let misc_tool_cupboard_count = models.filter((model) => model === "ToolCupboard").length;
    let misc_large_wood_box_count = models.filter((model) => model === "LargeWoodBox").length;
    let misc_wood_storage_box_count = models.filter((model) => model === "WoodStorageBox").length;
    let misc_furnace_count = models.filter((model) => model === "Furnace").length;
    let misc_workbench_t3_count = models.filter((model) => model === "WorkbenchT3").length;

    set_total_misc_count(
      misc_tool_cupboard_count +
        misc_large_wood_box_count +
        misc_wood_storage_box_count +
        misc_furnace_count +
        misc_workbench_t3_count
    );

    // - - - - - - - - - - - wood - - - - - - - - - -

    let wood_misc_cost_1000 = misc_tool_cupboard_count * 1000;

    let wood_misc_cost_250 = misc_large_wood_box_count * 250;

    let wood_misc_cost_100 = (misc_large_wood_box_count + misc_furnace_count) * 100;

    set_total_wood_misc_cost(wood_misc_cost_1000 + wood_misc_cost_250 + wood_misc_cost_100);

    // - - - - - - - - - - - stone - - - - - - - - - -

    let stone_misc_cost_200 = misc_furnace_count * 200;
    set_total_stone_misc_cost(stone_misc_cost_200);

    // - - - - - - - - - - - metal - - - - - - - - - -

    let metal_misc_cost_1000 = misc_workbench_t3_count * 1000;
    let metal_misc_cost_50 = misc_large_wood_box_count * 50;
    set_total_metal_misc_cost(metal_misc_cost_1000 + metal_misc_cost_50);

    // - - - - - - - - - - - hq metal - - - - - - - - - -

    let hq_metal_misc_cost_100 = misc_workbench_t3_count * 100;
    set_total_hq_metal_misc_cost(hq_metal_misc_cost_100);

    // - - - - - - - - - - - scrap - - - - - - - - - -

    let scrap_misc_cost_1250 = misc_workbench_t3_count * 1250;
    let total_scrap_misc_cost = scrap_misc_cost_1250;

    // - - - - - - - - - - - gear - - - - - - - - - -

    let gear_misc_cost_2 = models.filter((model) => model === "GarageDoor").length * 2;
    let total_gear_misc_cost = gear_misc_cost_2;

    // - - - - - - - - - - - lq fuel - - - - - - - - - -

    let lq_fuel_misc_cost_50 = models.filter((model) => model === "Furnace").length * 50;
    let total_lq_fuel_misc_cost = lq_fuel_misc_cost_50;

    // - - - - - - - - - - - display - - - - - - - - - -

    set_components_cost([
      { scrap: total_scrap_misc_cost },
      { gear: total_gear_misc_cost },
      { sewing_kit: 0 },
      { lq_fuel: total_lq_fuel_misc_cost },
    ]);
  }

  function CountBuildCost(models: string[]) {
    // - - - - - - - - - - - wood - - - - - - - - - -
    let wood_build_cost_200 =
      models.filter(
        (model) =>
          model === "WoodenFoundationSquareHigh" ||
          model === "WoodenFoundationSquareMid" ||
          model === "WoodenFoundationSquareLow" ||
          model === "WoodenWallHigh" ||
          model === "WoodenWallMid" ||
          model === "WoodenStairsLShape" ||
          model === "WoodenStairsUShape" ||
          model === "WoodenRoof"
      ).length * 200;

    //prettier-ignore
    let wood_build_cost_140 =
    models.filter(
      (model) =>
        model === "WoodenDoorway" ||
        model === "WoodenWindow"
    ).length * 140;

    let wood_build_cost_100 =
      models.filter(
        (model) =>
          model === "WoodenFoundationTriangleHigh" ||
          model === "WoodenFoundationTriangleMid" ||
          model === "WoodenFoundationTriangleLow" ||
          model === "WoodenFoundationStairs" ||
          model === "WoodenSquareFloor" ||
          model === "WoodenWallLow" ||
          model === "WoodenWallFrame" ||
          model === "WoodenFloorFrame"
      ).length * 100;

    //prettier-ignore
    let wood_build_cost_50 =
models.filter(
  (model) =>
    model === "WoodenTriangleFloor"
).length * 50;

    let total_wood_build_cost = wood_build_cost_200 + wood_build_cost_140 + wood_build_cost_100 + wood_build_cost_50;

    // - - - - - - - - - - - wood - - - - - - - - - -
    // - - - - - - - - - - - stone - - - - - - - - - -

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
          model === "StoneStairsUShape" ||
          model === "StoneRoof"
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
          model === "StoneRoofSquare"
      ).length * 150;

    // prettier-ignore
    let stone_build_cost_75 =
     models.filter(
        (model) =>
        model === "StoneFloorTriangle"
    ).length * 75;

    let total_stone_build_cost =
      stone_build_cost_300 + stone_build_cost_210 + stone_build_cost_150 + stone_build_cost_75;

    // - - - - - - - - - - - stone - - - - - - - - - -
    // - - - - - - - - - - - metal - - - - - - - - - -

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
          model === "MetalRoofSquare"
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

    // - - - - - - - - - - - metal - - - - - - - - - -
    // - - - - - - - - - - - hqm - - - - - - - - - -

    let hqm_build_cost_25 =
      models.filter(
        (model) =>
          model === "ArmoredFoundationSquareHigh" ||
          model === "ArmoredFoundationSquareMid" ||
          model === "ArmoredFoundationSquareLow" ||
          model === "ArmoredFoundationStairs" ||
          model === "ArmoredWallHigh" ||
          model === "ArmoredWallMid" ||
          model === "ArmoredStairs" ||
          model === "ArmoredRoof"
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

    // - - - - - - - - - - - hqm - - - - - - - - - -
    // - - - - - - - - - - - wood needed to upgrade from twig to higher quality  - - - - - - - - - -

    let twig_wood_upgrade_50 =
      models.filter(
        (model) =>
          model === "StoneFoundationSquareHigh" ||
          model === "StoneFoundationSquareMid" ||
          model === "StoneFoundationSquareLow" ||
          model === "MetalFoundationSquareHigh" ||
          model === "MetalFoundationSquareMid" ||
          model === "MetalFoundationSquareLow" ||
          model === "StoneStairsLShape" ||
          model === "StoneStairsUShape" ||
          model === "MetalStairsLShape" ||
          model === "MetalStairsUShape" ||
          model === "StoneWallHigh" ||
          model === "StoneWallMid" ||
          model === "MetalWallHigh" ||
          model === "MetalWallMid" ||
          model === "StoneRoof" ||
          model === "MetalRoof"
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
          model === "MetalFoundationTriangleHigh" ||
          model === "MetalFoundationTriangleMid" ||
          model === "MetalFoundationTriangleLow" ||
          model === "StoneWallLow" ||
          model === "MetalWallLow" ||
          model === "StoneFloorSquare" ||
          model === "MetalFloorSquare" ||
          model === "StoneWallFrame" ||
          model === "MetalWallFrame" ||
          model === "StoneFloorFrameSquare" ||
          model === "MetaFloorFrameSquare" ||
          model === "StoneFloorFrameTriangle" ||
          model === "MetalFloorFrameTriangle" ||
          model === "StoneRoofSquare" ||
          model === "MetalRoofSquare"
      ).length * 25;

    let twig_wood_upgrade_13 =
      models.filter((model) => model === "StoneFloorTriangle" || model === "MetalFloorTriangle").length * 13;

    set_twig_upgrade_wood_cost(
      twig_wood_upgrade_50 + twig_wood_upgrade_35 + twig_wood_upgrade_25 + twig_wood_upgrade_13
    );

    // - - - - - - - - - - - wood needed to upgrade from twig to higher quality  - - - - - - - - - -
    // - - - - - - - - - - - display - - - - - - - - - -

    if (count_miscs_cost) {
      set_build_cost([
        { wood: total_wood_build_cost + total_wood_misc_cost },
        { stone: total_stone_build_cost + total_stone_misc_cost },
        { metal: total_metal_build_cost + total_metal_misc_cost },
        { armored: total_hqm_build_cost + total_hq_metal_misc_cost },
      ]);
    } else if (!count_miscs_cost) {
      set_build_cost([
        { wood: total_wood_build_cost },
        { stone: total_stone_build_cost },
        { metal: total_metal_build_cost },
        { armored: total_hqm_build_cost },
      ]);
    }

    // console.log("model count", models.length);

    // - - - - - - - - - - - display - - - - - - - - - -
  }

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

    if (total_object_count === 0) {
      stage_0_count_rampup = 0.1;

      set_total_upkeep_percentile_rampup(parseFloat(stage_0_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost");
    }

    if (total_object_count > 0 && total_object_count <= 15) {
      stage_0_count_rampup = 0.1;

      set_total_upkeep_percentile_rampup(parseFloat(stage_0_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost");
    }

    if (total_object_count > 15 && total_object_count <= 100) {
      stage_0_count = 15;
      stage_1_count = total_object_count - 15;

      stage_1_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_1_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated scaling)");
    }

    if (total_object_count > 100 && total_object_count <= 175) {
      stage_0_count = 15;
      stage_1_count = 100 - stage_0_count;
      stage_2_count = total_object_count - 100;

      stage_2_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15 + stage_2_count * 0.2) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_2_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated scaling)");
    }

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
                <div>{Number(build_cost[0].wood) + Number(twig_upgrade_wood_cost)}</div>
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
                <div>{build_cost[1].stone}</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{build_cost[2].metal}</div>
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
                <div>{build_cost[3].armored}</div>
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
                <div>{wood_upkeep_cost.toFixed(0)}</div>
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
                <div>{stone_upkeep_cost.toFixed(0)}</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{metal_upkeep_cost.toFixed(0)}</div>
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
                <div>{hqm_upkeep_cost.toFixed(0)}</div>
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
                <div>{components_cost[0].scrap}</div>
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
                <div>{components_cost[1].gear}</div>
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
                <div>{components_cost[2].sewing_kit}</div>
              </div>
            </div>
          </div>
          <div className="lq_fuel_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${lq_fuelThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>lq. fuel</div>
                <div>{components_cost[3].lq_fuel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
