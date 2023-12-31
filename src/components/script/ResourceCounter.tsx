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
import lq_fuel_kitThumbnail from "../../icons/lq_fuel_thumbnail.png";

export default function ResourceCounter() {
  const canvas_models_array = useSelector((state: RootState) => state.canvasModelsArray.canvas_models_array);

  const [build_cost, set_build_cost] = useState([{ wood: 0 }, { stone: 0 }, { metal: 0 }, { armored: 0 }]);
  const [misc_cost, set_misc_cost] = useState([{ wood: 0}, {stone:0}, {metal: 0}, {hq_metal: 0}, {scrap:0}, {gear:0}, {sewing_kit: 0}, {lq_fuel:0}]); //prettier-ignore
  const [total_upkeep_percentile_rampup, set_total_upkeep_percentile_rampup] = useState(0);
  const [wood_upkeep_cost, set_wood_upkeep_cost] = useState<number>(0);
  const [stone_upkeep_cost, set_stone_upkeep_cost] = useState<number>(0);
  const [metal_upkeep_cost, set_metal_upkeep_cost] = useState<number>(0);
  const [hqm_upkeep_cost, set_hqm_upkeep_cost] = useState<number>(0);
  const [upkeep_cost_text, set_upkeep_cost_text] = useState<string>("");

  const [total_misc_count, set_total_misc_count] = useState<number>(0);

  function CountComponentsCost(models: string[]) {
    ////////// wood

    let wood_misc_cost_1000 = models.filter((model) => model === "ToolCupboard").length * 1000;
    let wood_misc_tool_cupboard_count = models.filter((model) => model === "ToolCupboard").length;

    let wood_misc_cost_250 = models.filter((model) => model === "LargeWoodBox").length * 250;
    let wood_misc_large_wood_box_count = models.filter((model) => model === "LargeWoodBox").length;

    let wood_misc_cost_100 = models.filter((model) => model === "WoodStorageBox").length * 100;
    let wood_misc_wood_storage_box_count = models.filter((model) => model === "WoodStorageBox").length;

    let total_wood_misc_cost = wood_misc_cost_1000 + wood_misc_cost_250 + wood_misc_cost_100;

    let total_wood_misc_count =
      wood_misc_tool_cupboard_count + wood_misc_large_wood_box_count + wood_misc_wood_storage_box_count;

    ////////// metal

    let metal_misc_cost_50 = models.filter((model) => model === "LargeWoodBox").length * 50;
    let metal_misc_large_wood_box_count = models.filter((model) => model === "LargeWoodBox").length; //counted in the wood section already

    let total_metal_misc_cost = metal_misc_cost_50;

    let total_metal_misc_count = 0;

    ////////// gear

    let gear_misc_cost_2 = models.filter((model) => model === "GarageDoor").length * 2;
    // let gear_misc_garage_door_count = models.filter((model) => model === "GarageDoor").length;

    let total_gear_misc_cost = gear_misc_cost_2;

    let total_gear_misc_count = 0;

    ////////// display

    set_total_misc_count(total_wood_misc_count);

    set_misc_cost([
      { wood: total_wood_misc_cost },
      { stone: 0 },
      { metal: total_metal_misc_cost },
      { hq_metal: 0 },
      { scrap: 0 },
      { gear: total_gear_misc_cost },
      { sewing_kit: 0 },
      { lq_fuel: 0 },
    ]);
  }

  function CountBuildCost(models: string[]) {
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

    ////////// wood
    ////////// stone

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
          model === "StoneFloorFrameTriangle"
      ).length * 150;

    // prettier-ignore
    let stone_build_cost_75 =
     models.filter(
        (model) =>
        model === "StoneFloorTriangle"
    ).length * 75;

    let total_stone_build_cost =
      stone_build_cost_300 + stone_build_cost_210 + stone_build_cost_150 + stone_build_cost_75;

    ////////// stone
    ////////// metal

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
          model === "MetalStairsLShape" ||
          model === "MetalRoof"
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
          model === "MetalFloorFrameTriangle"
      ).length * 100;

    //prettier-ignore
    let metal_build_cost_50 =
        models.filter(
            (model) =>
            model === "MetalFloorTriangle"
  ).length * 50;

    let total_metal_build_cost =
      metal_build_cost_300 +
      metal_build_cost_200 +
      metal_build_cost_150 +
      metal_build_cost_140 +
      metal_build_cost_100 +
      metal_build_cost_50;

    ////////// metal
    ////////// hqm

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

    ////////// hq metal
    ////////// display

    set_build_cost([
      { wood: total_wood_build_cost },
      { stone: total_stone_build_cost },
      { metal: total_metal_build_cost },
      { armored: total_hqm_build_cost },
    ]);

    // console.log("model count", models.length);

    ////////// display
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
    if (build_cost && build_cost[0] && build_cost[0].wood !== undefined) {
      set_wood_upkeep_cost(build_cost[0].wood * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[1] && build_cost[1].stone !== undefined) {
      set_stone_upkeep_cost(build_cost[1].stone * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[2] && build_cost[2].metal !== undefined) {
      set_metal_upkeep_cost(build_cost[2].metal * total_upkeep_percentile_rampup);
    }

    if (build_cost && build_cost[3] && build_cost[3].armored !== undefined) {
      set_hqm_upkeep_cost(build_cost[3].armored * total_upkeep_percentile_rampup);
    }
  }

  useEffect(() => {
    CountBuildCost(canvas_models_array);
    CountComponentsCost(canvas_models_array);
    CountUpkeepPercentileRampup(canvas_models_array);
  }, [canvas_models_array, total_misc_count]);

  useEffect(() => {
    DisplayCountedUpkeep();
  }, [build_cost, total_upkeep_percentile_rampup]);

  return (
    <>
      <div className="main_container build_cost_main_container">
        <div className="cost_description">build cost</div>
        <div className="build_cost_container">
          <div className="build_cost_wood_container">
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
                <div>{build_cost[0].wood}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_stone_container">
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
          <div className="build_cost_metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{build_cost[2].metal}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_hq_metal_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${hq_metalThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>hq metal</div>
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
          <div className="build_cost_wood_container">
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
          <div className="build_cost_stone_container">
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
          <div className="build_cost_metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{metal_upkeep_cost.toFixed(0)}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_hq_metal_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${hq_metalThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>hq metal</div>
                <div>{hqm_upkeep_cost.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container misc_cost_main_container_a">
        <div className="cost_description">misc cost (T.CB, WB, Box, Furnace ... )</div>
        <div className="upkeep_cost_container">
          <div className="build_cost_wood_container">
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
                <div>{misc_cost[0].wood}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_stone_container">
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
                <div>{misc_cost[1].stone}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_metal_container">
            <div className="cost_cell" style={{ backgroundImage: `url(${metalThumbnail})`, backgroundSize: "cover" }}>
              <div className="build_cost_display">
                <div>metal f.</div>
                <div>{misc_cost[2].metal}</div>
              </div>
            </div>
          </div>
          <div className="build_cost_hq_metal_container">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${hq_metalThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display">
                <div>hq metal</div>
                <div>{misc_cost[3].hq_metal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container_b misc_cost_main_container_b">
        <div className="upkeep_cost_container">
          <div className="misc_const_container_b">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${scrapThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display_b">
                <div>scrap</div>
                <div>{misc_cost[4].scrap}</div>
              </div>
            </div>
          </div>
          <div className="misc_const_container_b">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${gearThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="build_cost_display_b">
                <div>gear</div>
                <div>{misc_cost[5].gear}</div>
              </div>
            </div>
          </div>
          <div className="misc_const_container_b">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${sewing_kitThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display_b">
                <div>sewing kit</div>
                <div>{misc_cost[6].sewing_kit}</div>
              </div>
            </div>
          </div>
          <div className="misc_const_container_b">
            <div
              className="cost_cell"
              style={{ backgroundImage: `url(${lq_fuel_kitThumbnail})`, backgroundSize: "cover" }}
            >
              <div className="build_cost_display_b">
                <div>lq. fuel</div>
                <div>{misc_cost[7].lq_fuel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
