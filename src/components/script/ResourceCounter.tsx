import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export default function ResourceCounter() {
  const canvas_models_array = useSelector((state: RootState) => state.canvasModelsArray.canvas_models_array);
  const [build_cost, set_build_cost] = useState([{ wood: 0 }, { stone: 0 }, { metal: 0 }, { armored: 0 }]);

  function countBuildCost(models: string[]) {
    let twig_build_cost_50 =
      models.filter(
        (model) =>
          model === "TwigFoundationSquareHigh" ||
          model === "TwigFoundationSquareMid" ||
          model === "TwigFoundationSquareLow" ||
          model === "TwigWallHigh" ||
          model === "TwigWallMid" ||
          model === "TwigStairs" ||
          model === "TwigRoof"
      ).length * 50;
    // console.log("wood_50", twig_build_cost_50);

    // prettier-ignore
    let twig_build_cost_35 =
      models.filter(
        (model) =>
          model === "TwigDoorway" ||
          model === "TwigWindow"
      ).length * 35;
    // console.log("wood_35", twig_build_cost_35);

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
    // console.log("wood_25", twig_build_cost_25);

    // prettier-ignore
    let twig_build_cost_13 =
    models.filter(
      (model) =>
        model === "TwigTriangleFloor" 
    ).length * 13;
    // console.log("wood_13", twig_build_cost_13);

    let wood_build_cost_200 =
      models.filter(
        (model) =>
          model === "WoodenFoundationSquareHigh" ||
          model === "WoodenFoundationSquareMid" ||
          model === "WoodenFoundationSquareLow" ||
          model === "WoodenWallHigh" ||
          model === "WoodenWallMid" ||
          model === "WoodenStairs" ||
          model === "WoodenRoof"
      ).length * 200;
    // console.log("wood_200", wood_build_cost_200);

    //prettier-ignore
    let wood_build_cost_140 =
    models.filter(
      (model) =>
        model === "WoodenDoorway" ||
        model === "WoodenWindow"
    ).length * 140;
    // console.log("wood_140", wood_build_cost_140);

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
    // console.log("wood_100", wood_build_cost_100);

    //prettier-ignore
    let wood_build_cost_50 =
models.filter(
  (model) =>
    model === "WoodenTriangleFloor"
).length * 50;
    // console.log("wood_50", wood_build_cost_50);

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
          model === "StoneStairs" ||
          model === "StoneRoof"
      ).length * 300;
    // console.log("stone_300", stone_build_cost_300);

    // prettier-ignore
    let stone_build_cost_210 =
      models.filter(
        (model) => 
        model === "StoneDoorway" ||
        model === "StoneWindow"
    ).length * 210;
    // console.log("stone_210", stone_build_cost_210);

    let stone_build_cost_150 =
      models.filter(
        (model) =>
          model === "StoneFoundationTriangleHigh" ||
          model === "StoneFoundationTriangleMid" ||
          model === "StoneFoundationTriangleLow" ||
          model === "StoneFoundationStairs" ||
          model === "StoneSquareFloor" ||
          model === "StoneFoundationTriangleLow" ||
          model === "StoneWallLow" ||
          model === "StoneWallFrame" ||
          model === "StoneFloorFrame"
      ).length * 150;
    // console.log("stone_150", stone_build_cost_150);

    // prettier-ignore
    let stone_build_cost_75 =
     models.filter(
        (model) =>
        model === "StoneTriangleFloor"
    ).length * 75;
    // console.log("stone_75", stone_build_cost_75);

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
          model === "MetalStairs" ||
          model === "MetalRoof"
      ).length * 200;
    // console.log("metal_200", metal_build_cost_200);

    // prettier-ignore
    let metal_build_cost_140 =
      models.filter(
        (model) =>
          model === "MetalDoorway" ||
          model === "MetalWindow"
      ).length * 140;
    // console.log("metal_140", metal_build_cost_140);

    let metal_build_cost_100 =
      models.filter(
        (model) =>
          model === "MetalFoundationTriangleHigh" ||
          model === "MetalFoundationTriangleMid" ||
          model === "MetalFoundationTriangleLow" ||
          model === "MetalSquareFloor" ||
          model === "MetalWallLow" ||
          model === "MetalWallFrame" ||
          model === "MetalFloorFrame"
      ).length * 100;
    // console.log("metal_100", metal_build_cost_100);

    //prettier-ignore
    let metal_build_cost_50 =
        models.filter(
            (model) =>
            model === "MetalTriangleFloor"
  ).length * 50;
    // console.log("metal_50", metal_build_cost_50);

    let total_metal_build_cost =
      metal_build_cost_200 + metal_build_cost_140 + metal_build_cost_100 + metal_build_cost_50;

    // metal
    // hq metal

    // hq metal
    // display

    set_build_cost((prevBuildCost) => {
      return [
        { wood: total_wood_build_cost },
        { stone: total_stone_build_cost },
        { stone: total_metal_build_cost },
        prevBuildCost[3],
      ];
    });

    console.log(models.length);

    // display
  }

  useEffect(() => {
    {
      countBuildCost(canvas_models_array);
    }
  }, [canvas_models_array]);

  return (
    <div className="resources_container">
      <span>build cost</span>
      <div className="build_cost_container">
        <div className="build_cost_wood">
          <span>wood</span>
          <div>{build_cost[0].wood}</div>
        </div>
        <div className="build_cost_stone">
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
      <div className="upkeep_cost_container"></div>
    </div>
  );
}
