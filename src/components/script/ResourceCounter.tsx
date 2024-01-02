import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

import woodThumbnail from "../../icons/wood_thumbnail.png";
import stoneThumbnail from "../../icons/stone_thumbnail.png";

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

  function CountBuildCost(models: string[]) {
    let twig_build_cost_50 =
      models.filter(
        (model) =>
          model === "TwigFoundationSquareHigh" ||
          model === "TwigFoundationSquareMid" ||
          model === "TwigFoundationSquareLow" ||
          model === "TwigWallHigh" ||
          model === "TwigWallMid" ||
          model === "TwigStairsLShape" ||
          model === "TwigStairsUShape" ||
          model === "TwigRoof"
      ).length * 50;

    // prettier-ignore
    let twig_build_cost_35 =
      models.filter(
        (model) =>
          model === "TwigDoorway" ||
          model === "TwigWindow"
      ).length * 35;

    let twig_build_cost_25 =
      models.filter(
        (model) =>
          model === "TwigFoundationTriangleHigh" ||
          model === "TwigFoundationTriangleMid" ||
          model === "TwigFoundationTriangleLow" ||
          model === "TwigFoundationStairs" ||
          model === "TwigSquareFloor" ||
          model === "TwigWallLow" ||
          model === "TwigWallFrame" ||
          model === "TwigFloorFrame"
      ).length * 25;

    // prettier-ignore
    let twig_build_cost_13 =
    models.filter(
      (model) =>
        model === "TwigTriangleFloor" 
    ).length * 13;

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

    let total_wood_build_cost =
      twig_build_cost_50 +
      twig_build_cost_35 +
      twig_build_cost_25 +
      twig_build_cost_13 +
      wood_build_cost_200 +
      wood_build_cost_140 +
      wood_build_cost_100 +
      wood_build_cost_50;

    // twig + wood
    // stone

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

    // stone
    // metal

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
      metal_build_cost_200 + metal_build_cost_140 + metal_build_cost_100 + metal_build_cost_50;

    // metal
    // hqm

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

    // hq metal
    // display

    set_build_cost([
      { wood: total_wood_build_cost },
      { stone: total_stone_build_cost },
      { metal: total_metal_build_cost },
      { armored: total_hqm_build_cost },
    ]);

    // console.log("model count", models.length);

    // display
  }

  function CountUpkeepPercentileRampup(models: string[]) {
    let total_object_count = models.length;

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
      set_upkeep_cost_text("upkeep cost (estimated ramp-up scaling)");
    }

    if (total_object_count > 100 && total_object_count <= 175) {
      stage_0_count = 15;
      stage_1_count = 100 - stage_0_count;
      stage_2_count = total_object_count - 100;

      stage_2_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15 + stage_2_count * 0.2) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_2_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated ramp-up scaling)");
    }

    if (total_object_count > 175) {
      stage_0_count = 15;
      stage_1_count = 100 - stage_0_count;
      stage_2_count = 175 - 100;
      stage_3_count = total_object_count - 175;

      stage_3_count_rampup = (stage_0_count * 0.1 + stage_1_count * 0.15 + stage_2_count * 0.2 + stage_3_count * 0.33) / total_object_count //prettier-ignore
      set_total_upkeep_percentile_rampup(parseFloat(stage_3_count_rampup.toFixed(4)));
      set_upkeep_cost_text("upkeep cost (estimated ramp-up scaling)");
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

  function CountMiscCost(models: string[]) {
    let wood_build_cost_1000 = models.filter((model) => model === "ToolCupboard").length * 1000;

    let wood_build_cost_250 = models.filter((model) => model === "LargeWoodBox").length * 250;

    let wood_build_cost_100 = models.filter((model) => model === "WoodStorageBox").length * 100;

    let total_wood_misc_cost = wood_build_cost_1000 + wood_build_cost_250 + wood_build_cost_100;

    // metal

    let metal_build_cost_50 = models.filter((model) => model === "LargeWoodBox").length * 50;

    let total_metal_misc_cost = metal_build_cost_50;

    // hq metal
    // display

    set_misc_cost([
      { wood: total_wood_misc_cost },
      { stone: 0 },
      { metal: total_metal_misc_cost },
      { hq_metal: 0 },
      { scrap: 0 },
      { gear: 0 },
      { sewing_kit: 0 },
      { lq_fuel: 0 },
    ]);
  }

  useEffect(() => {
    CountBuildCost(canvas_models_array);
    CountMiscCost(canvas_models_array);
    CountUpkeepPercentileRampup(canvas_models_array);
  }, [canvas_models_array]);

  useEffect(() => {
    DisplayCountedUpkeep();
  }, [build_cost, total_upkeep_percentile_rampup]);

  return (
    <div className="resources_container">
      <span>build cost</span>
      <div className="build_cost_container">
        <div className="build_cost_wood" style={{ backgroundImage: `url(${woodThumbnail})`, backgroundSize: "cover" }}>
          <span>wood</span>
          <div>{build_cost[0].wood}</div>
        </div>
        <div
          className="build_cost_stone"
          style={{ backgroundImage: `url(${stoneThumbnail})`, backgroundSize: "cover" }}
        >
          <span>stone</span>
          <div>{build_cost[1].stone}</div>
        </div>
        <div className="build_cost_metal">
          <span>metal</span>
          <div>{build_cost[2].metal}</div>
        </div>
        <div className="build_cost_hq_metal">
          <span>hq metal</span>
          <div>{build_cost[3].armored}</div>
        </div>
      </div>
      <span>
        {upkeep_cost_text} {(total_upkeep_percentile_rampup * 100).toFixed(2)}%
      </span>
      <div className="upkeep_cost_container">
        <div className="upkeep_cost_wood">
          <span>wood</span>
          <div>{wood_upkeep_cost.toFixed(0)}</div>
        </div>
        <div className="upkeep_cost_stone">
          <span>stone</span>
          <div>{stone_upkeep_cost.toFixed(0)}</div>
        </div>
        <div className="upkeep_cost_metal">
          <span>metal</span>
          <div>{metal_upkeep_cost.toFixed(0)}</div>
        </div>
        <div className="upkeep_cost_hq_metal">
          <span>hq metal</span>
          <div>{hqm_upkeep_cost.toFixed(0)}</div>
        </div>
      </div>
      <span>misc cost (T.CB, WB, Box, Furnace ... )</span>
      <div className="misc_cost_container">
        <div className="build_cost_wood">
          <span>wood</span>
          <div>{misc_cost[0].wood}</div>
        </div>
        <div className="build_cost_stone">
          <span>stone</span>
          <div>{misc_cost[1].stone}</div>
        </div>
        <div className="build_cost_metal">
          <span>metal</span>
          <div>{misc_cost[2].metal}</div>
        </div>
        <div className="build_cost_hq_metal">
          <span>hq metal</span>
          <div>{misc_cost[3].hq_metal}</div>
        </div>
      </div>
      <div className="misc_cost_container">
        <div className="build_cost_scrap">
          <span>scrap</span>
          <div>{misc_cost[4].scrap}</div>
        </div>
        <div className="build_cost_gear">
          <span>gear</span>
          <div>{misc_cost[5].gear}</div>
        </div>
        <div className="build_cost_sewing_kit">
          <span>sewing kit</span>
          <div>{misc_cost[6].sewing_kit}</div>
        </div>
        <div className="build_cost_lg_fuel">
          <span>lq fuel</span>
          <div>{misc_cost[7].lq_fuel}</div>
        </div>
      </div>
    </div>
  );
}
