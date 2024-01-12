import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_reset_raid_models } from "../../Store.tsx";
import { useEffect, useState } from "react";

export default function RaidCalculator() {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); //prettier-ignore
  const model_to_destroy = useSelector((state: RootState) => state.modelsData.model_to_destroy); //prettier-ignore

  const [raid_type, set_raid_type] = useState<string>("efficiency");
  const [rockets_cost, set_rockets_cost] = useState<number>(0);
  const [explosives_cost, set_explosives_cost] = useState<number>(0);
  const [ammo_cost, set_ammo_cost] = useState<number>(0);

  function ResetRaid() {
    dispatch(set_reset_raid_models(!reset_raid_models));
    set_rockets_cost(0);
    set_explosives_cost(0);
    set_ammo_cost(0);
  }

  function CalculateRocketCost() {
    if (model_to_destroy === "MetalDoor") {
      set_rockets_cost(rockets_cost + 2);
    } else if (model_to_destroy === "GarageDoor") {
      set_rockets_cost(rockets_cost + 3);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle"
    ) {
      set_rockets_cost(rockets_cost + 4);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle"
    ) {
      set_rockets_cost(rockets_cost + 8);
    }
  }

  function CalculateExplosivesCost() {
    if (model_to_destroy === "MetalDoor") {
      set_explosives_cost(explosives_cost + 1);
    } else if (model_to_destroy === "GarageDoor") {
      set_explosives_cost(explosives_cost + 2);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle"
    ) {
      set_explosives_cost(explosives_cost + 2);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle"
    ) {
      set_explosives_cost(explosives_cost + 4);
    }
  }

  function CalculateAmmoCost() {
    if (model_to_destroy === "MetalDoor") {
      set_ammo_cost(ammo_cost + 63);
    } else if (model_to_destroy === "GarageDoor") {
      set_ammo_cost(ammo_cost + 150);
    } else if (model_to_destroy === "StoneStairsLShape" || model_to_destroy === "StoneStairsUShape") {
      set_ammo_cost(ammo_cost + 173);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle"
    ) {
      set_ammo_cost(ammo_cost + 185);
    } else if (model_to_destroy === "MetalStairsLShape" || model_to_destroy === "MetalStairsUShape") {
      set_ammo_cost(ammo_cost + 399);
    } else if (
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle"
    ) {
      set_ammo_cost(ammo_cost + 400);
    } else if (model_to_destroy === "MetalFloorTriangle") {
      set_ammo_cost(ammo_cost + 413);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow"
    ) {
      set_ammo_cost(ammo_cost + 461);
    }
  }

  function ChangeRaidType(type: string) {
    set_raid_type(type);
  }

  useEffect(() => {
    {
      if (raid_type === "rockets") {
        CalculateRocketCost();
      } else if (raid_type === "explosives") {
        CalculateExplosivesCost();
      } else if (raid_type === "ammo") {
        CalculateAmmoCost();
      }
    }
  }, [model_destroy_tigger]);

  useEffect(() => {
    {
      set_rockets_cost(0);
      set_explosives_cost(0);
      set_ammo_cost(0);
    }
  }, [page_mode]);

  return (
    <>
      <div className="raid_reset_button" onClick={ResetRaid}>
        reset raid
      </div>

      <div className="raid_type_main_container">
        <div
          className={"raid_type_button"}
          onClick={() => ChangeRaidType("efficiency")}
          style={{
            backgroundColor: raid_type === "efficiency" ? "rgb(201, 201, 201)" : "rgba(15, 16, 26, 0.4)",
            color: raid_type === "efficiency" ? "black" : "white",
          }}
        >
          most efficient (automatic)
        </div>
        <div
          className={"raid_type_button"}
          onClick={() => ChangeRaidType("rockets")}
          style={{
            backgroundColor: raid_type === "rockets" ? "rgb(201, 201, 201)" : "rgba(15, 16, 26, 0.4)",
            color: raid_type === "rockets" ? "black" : "white",
          }}
        >
          rockets
        </div>
        <div
          className={"raid_type_button"}
          onClick={() => ChangeRaidType("explosives")}
          style={{
            backgroundColor: raid_type === "explosives" ? "rgb(201, 201, 201)" : "rgba(15, 16, 26, 0.4)",
            color: raid_type === "explosives" ? "black" : "white",
          }}
        >
          explosives
        </div>
        <div
          className={"raid_type_button"}
          onClick={() => ChangeRaidType("ammo")}
          style={{
            backgroundColor: raid_type === "ammo" ? "rgb(201, 201, 201)" : "rgba(15, 16, 26, 0.4)",
            color: raid_type === "ammo" ? "black" : "white",
          }}
        >
          exp. 5.56
        </div>
        <div
          className={"raid_type_button"}
          onClick={() => ChangeRaidType("satchel")}
          style={{
            backgroundColor: raid_type === "satchel" ? "rgb(201, 201, 201)" : "rgba(15, 16, 26, 0.4)",
            color: raid_type === "satchel" ? "black" : "white",
          }}
        >
          satchel
        </div>
      </div>

      <div className="main_container raid_tools_cost_main_container">
        <div className="cost_description">raid cost - hard side (type)</div>
        <div className="raid_cost_container">
          <div className="rocket_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${woodThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>rocket</div>
                <div>{rockets_cost}</div>
              </div>
            </div>
          </div>
          <div className="explosives_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>explosives</div>
                <div>{explosives_cost}</div>
              </div>
            </div>
          </div>
          <div className="ammo_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${stoneThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>exp. 5.56</div>
                <div>{ammo_cost}</div>
              </div>
            </div>
          </div>
          <div className="satchel_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${hq_metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>satchel</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_a">
        <div className="cost_description">raid cost (resources)</div>
        <div className="raid_cost_container">
          <div className="sulfur_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${woodThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>sulfur</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="gunpowder_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>gunpowder</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="charcoal_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${stoneThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>charcoal</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${hq_metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>metal</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_b">
        <div className="cost_description"></div>
        <div className="raid_cost_container">
          <div className="metal_pipe_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${woodThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>metal pipe</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="lq_fuel_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>lq. fuel</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="cloth_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${stoneThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>cloth</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="tech_trash_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${hq_metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>tech trash</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
