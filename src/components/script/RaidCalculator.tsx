import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_reset_raid_models } from "../../Store.tsx";
import { useEffect, useState } from "react";

import raidRgbThumbnail from "../../icons/raid_rgb_thumbnail.png";
import raidBwThumbnail from "../../icons/raid_bw_thumbnail.png";

import explosivesRgbThumbnail from "../../icons/explosives_rgb_thumbnail.png";
import explosivesBwThumbnail from "../../icons/explosives_bw_thumbnail.png";

import ammoRgbThumbnail from "../../icons/ammo_rgb_thumbnail.png";
import ammoBwThumbnail from "../../icons/ammo_bw_thumbnail.png";

import satchelRgbThumbnail from "../../icons/satchel_rgb_thumbnail.png";
import satchelBwThumbnail from "../../icons/satchel_bw_thumbnail.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

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
  const [satchel_cost, set_satchel_cost] = useState<number>(0);

  const [count_sub_ingredients, set_count_sub_ingredients] = useState(false);

  const [sulfur_cost, set_sulfur_cost] = useState<number>(0);
  const [gunpowder_cost, set_gunpowder_cost] = useState<number>(0);
  const [charcoal_cost, set_charcoal_cost] = useState<number>(0);
  const [metal_fragments_cost, set_metal_fragments_cost] = useState<number>(0);
  const [metal_pipe_cost, set_metal_pipe_cost] = useState<number>(0);
  const [lq_fuel_cost, set_lq_fuel_cost] = useState<number>(0);
  const [cloth_cost, set_cloth_cost] = useState<number>(0);
  const [tech_trash_cost, set_tech_trash_cost] = useState<number>(0);
  const [hq_metal_cost, set_hq_metal_cost] = useState<number>(0);
  const [scrap_cost, set_scrap_cost] = useState<number>(0);
  const [animal_fat_cost, set_animal_fat_cost] = useState<number>(0);
  const [rope_cost, set_rope_cost] = useState<number>(0);

  function ResetRaid() {
    dispatch(set_reset_raid_models(!reset_raid_models));
    set_rockets_cost(0);
    set_explosives_cost(0);
    set_ammo_cost(0);
    set_satchel_cost(0);

    set_sulfur_cost(0);
    set_gunpowder_cost(0);
    set_charcoal_cost(0);
    set_metal_fragments_cost(0);
  }

  function CalculateEfficiencyCost() {
    if (
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
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle"
    ) {
      set_explosives_cost(explosives_cost + 2);
    } else if (model_to_destroy === "StoneStairsLShape" || model_to_destroy === "StoneStairsUShape") {
      set_ammo_cost(ammo_cost + 173);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle"
    ) {
      set_explosives_cost(explosives_cost + 4);
    } else if (model_to_destroy === "MetalDoor") {
      set_ammo_cost(ammo_cost + 63);
    } else if (model_to_destroy === "GarageDoor") {
      set_ammo_cost(ammo_cost + 150);
    }
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

  function CalculateSatchelsCost() {
    if (model_to_destroy === "MetalDoor") {
      set_satchel_cost(satchel_cost + 4);
    } else if (model_to_destroy === "GarageDoor") {
      set_satchel_cost(satchel_cost + 9);
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
      set_satchel_cost(satchel_cost + 10);
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
      set_satchel_cost(satchel_cost + 23);
    }
  }

  function CalculateSulfurCost() {
    const sulfur_cost_rocket = rockets_cost * 1400;
    const sulfur_cost_explosives = explosives_cost * 2200;
    const sulfur_cost_ammo = ammo_cost * 25;
    const sulfur_cost_satchel = satchel_cost * 480;

    set_sulfur_cost(sulfur_cost_rocket + sulfur_cost_explosives + sulfur_cost_ammo + sulfur_cost_satchel);
  }

  function CalculateGunpowderCost() {
    // const gunpowder_cost_rocket = rockets_cost * 1400;
    // const gunpowder_cost_explosives = explosives_cost * 2200;
    // const gunpowder_cost_ammo = ammo_cost * 25;
    // const gunpowder_cost_satchel = satchel_cost * 480;
    // set_gunpowder_cost(
    //   gunpowder_cost_rocket + gunpowder_cost_explosives + gunpowder_cost_ammo + gunpowder_cost_satchel
    // );
  }

  function CalculateCharcoalCost() {}

  function CalculateMetalFragmentsCost() {
    const metal_fragments_cost_rocket = rockets_cost * 100;
    const metal_fragments_cost_explosives = explosives_cost * 200;
    const metal_fragments_cost_ammo = ammo_cost * 5;
    const metal_fragments_cost_satchel = satchel_cost * 80;

    set_metal_fragments_cost(
      metal_fragments_cost_rocket +
        metal_fragments_cost_explosives +
        metal_fragments_cost_ammo +
        metal_fragments_cost_satchel
    );
  }

  function CalculateMetalPipesCost() {
    const metal_pipes_cost_rocket = rockets_cost * 2;

    set_metal_pipe_cost(metal_pipes_cost_rocket);
  }

  function CalculateLqFuelCost() {
    const lq_fuel_cost_rocket = rockets_cost * 30;
    const lq_fuel_cost_explosives = explosives_cost * 60;

    set_lq_fuel_cost(lq_fuel_cost_rocket + lq_fuel_cost_explosives);
  }

  function CalculateTechTrashCost() {
    const tech_trash_cost_explosives = explosives_cost * 2;

    set_tech_trash_cost(tech_trash_cost_explosives);
  }

  function CalculateRRopeCost() {
    const rope_cost_satchel = satchel_cost * 1;

    set_rope_cost(rope_cost_satchel);
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
      } else if (raid_type === "satchel") {
        CalculateSatchelsCost();
      } else if (raid_type === "efficiency") {
        CalculateEfficiencyCost();
      }
    }
  }, [model_destroy_tigger]);

  const HandleAdvancedResourceCountingState = () => {
    set_count_sub_ingredients(!count_sub_ingredients);
  };

  useEffect(() => {
    {
      CalculateSulfurCost();
      CalculateMetalFragmentsCost();
      CalculateMetalPipesCost();
      CalculateLqFuelCost();
      CalculateTechTrashCost();

      CalculateRRopeCost();
    }
  }, [rockets_cost, explosives_cost, ammo_cost, satchel_cost]);

  useEffect(() => {
    {
      set_rockets_cost(0);
      set_explosives_cost(0);
      set_ammo_cost(0);
      set_satchel_cost(0);

      set_sulfur_cost(0);
      set_gunpowder_cost(0);
      set_charcoal_cost(0);
      set_metal_fragments_cost(0);
    }
  }, [page_mode]);

  return (
    <>
      <div className="misc_cost_checkbox checkbox_raid">raid cost (resources)</div>
      <div className="raid_type_name">raid with:</div>

      <div className="raid_type_description">
        <div className="raid_type_description_cell">most efficient</div>
        <div className="raid_type_description_cell">rockets</div>
        <div className="raid_type_description_cell">C4's</div>
        <div className="raid_type_description_cell">EXP. 5.56</div>
        <div className="raid_type_description_cell">satchels</div>
      </div>

      <div className="raid_type_main_container">
        <div
          className={
            raid_type === "efficiency"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("efficiency")}
        ></div>
        <div
          className={
            raid_type === "rockets"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("rockets")}
          style={
            raid_type === "rockets"
              ? { backgroundImage: `url(${raidRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${raidBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "explosives"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("explosives")}
          style={
            raid_type === "explosives"
              ? { backgroundImage: `url(${explosivesRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${explosivesBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "ammo"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("ammo")}
          style={
            raid_type === "ammo"
              ? { backgroundImage: `url(${ammoRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${ammoBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "satchel"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("satchel")}
          style={
            raid_type === "satchel"
              ? { backgroundImage: `url(${satchelRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${satchelBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
      </div>

      <div className="main_container raid_tools_cost_main_container">
        <div className="cost_description">raid cost (tool - hard side)</div>
        <div className="raid_cost_container">
          <div className="rocket_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${raidRgbThumbnail})`,
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
                backgroundImage: `url(${explosivesRgbThumbnail})`,
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
                backgroundImage: `url(${ammoRgbThumbnail})`,
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
                backgroundImage: `url(${satchelRgbThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>satchel</div>
                <div>{satchel_cost}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_a">
        {/* <div className="cost_description">raid cost (resources)</div> */}
        <div className="misc_count_description">
          <label>
            <input type="checkbox" checked={count_sub_ingredients} onChange={HandleAdvancedResourceCountingState} />
            count sub ingredients
          </label>
        </div>
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
                <div>{sulfur_cost}</div>
              </div>
            </div>
          </div>
          <div
            className={!count_sub_ingredients ? "gunpowder_container main_container_inactive" : "gunpowder_container"}
          >
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
          <div className={!count_sub_ingredients ? "charcoal_container main_container_inactive" : "charcoal_container"}>
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
                <div>{metal_fragments_cost}</div>
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
                <div>{metal_pipe_cost}</div>
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
                <div>{lq_fuel_cost}</div>
              </div>
            </div>
          </div>
          <div className={!count_sub_ingredients ? "cloth_container main_container_inactive" : "cloth_container"}>
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
                <div>{tech_trash_cost}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_c">
        <div className="cost_description"></div>
        <div className="raid_cost_container">
          <div className={!count_sub_ingredients ? "metal_container main_container_inactive" : "metal_container"}>
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
                <div>hq metal</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className={!count_sub_ingredients ? "scrap_container main_container_inactive" : "scrap_container"}>
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>scrap</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div
            className={!count_sub_ingredients ? "animal_fat_container main_container_inactive" : "animal_fat_container"}
          >
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
                <div>animal fat</div>
                <div>0</div>
              </div>
            </div>
          </div>
          <div className="rope_container">
            <div
              className="cost_cell"
              style={{
                //  backgroundImage: `url(${hq_metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>rope</div>
                <div>{rope_cost}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="raid_reset_button" onClick={ResetRaid}>
        <FontAwesomeIcon icon={faArrowsRotate} size="3x" style={{ color: "#a8a8a8" }} />
      </div>

      <div className="raid_reset_button_descripton">reset raid</div>
    </>
  );
}
