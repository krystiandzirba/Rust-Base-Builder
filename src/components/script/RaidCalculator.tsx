import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_reset_raid_models } from "../../Store.tsx";
import { useEffect, useState } from "react";

import rocketThumbnail from "../../icons/rocket_thumbnail.png";
import explosivesThumbnail from "../../icons/explosives_thumbnail.png";
import ammoThumbnail from "../../icons/ammo_thumbnail.png";
import satchelThumbnail from "../../icons/satchel_thumbnail.png";

import sulfurThumbnail from "../../icons/sulfur_thumbnail.png";
import gunpowderThumbnail from "../../icons/gunpowder_thumbnail.png";
import charcoalThumbnail from "../../icons/charcoal_thumbnail.png";
import metalThumbnail from "../../icons/metal_thumbnail.png";
import metalPipeThumbnail from "../../icons/metal_pipe_thumbnail.png";
import lqFuelThumbnail from "../../icons/lq_fuel_thumbnail.png";
import clothThumbnail from "../../icons/cloth_thumbnail.png";
import techTrashThumbnail from "../../icons/tech_trash_thumbnail.png";
import hqMetalThumbnail from "../../icons/hq_metal_thumbnail.png";
import scrapThumbnail from "../../icons/scrap_thumbnail.png";
import animalFatThumbnail from "../../icons/animal_fat_thumbnail.png";
import ropeThumbnail from "../../icons/rope_thumbnail.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "./AudioPlayer.tsx";

//? ----------------------------------------------------------------------------------------------------

//? This component calculates the raid cost, which is divided into five different types: efficiency, rockets, C4, explosive ammo, and satchels.

//? Each raid type is further broken down into its required ingredients for crafting.

//? Additionally, it includes a button to reset the calculator and the list of destroyed objects.

//? ----------------------------------------------------------------------------------------------------

export default function RaidCalculator() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const model_destroy_trigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); //prettier-ignore
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

  const [reset_raid_hover, set_reset_raid_hover] = useState<boolean>(false);

  //* ------------------------- ↓ Reset the Raid ↓ -------------------------
  // reset all the build cost
  // dispatch the reset_raid_models to the Redux store, so each model component can trigger a function to
  // show the previously hidden models due to the "raiding destruction"

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

    set_metal_pipe_cost(0);
    set_lq_fuel_cost(0);
    set_cloth_cost(0);
    set_tech_trash_cost(0);
    set_hq_metal_cost(0);
    set_scrap_cost(0);
    set_animal_fat_cost(0);
    set_rope_cost(0);
  }

  //* ------------------------- ↑ Reset the Raid ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Efficiency ↓ -------------------------
  // calculate the "efficiency" type of the raid mode
  // this function counts the most efficient way to raid a selected object

  function CalculateEfficiencyCost() {
    switch (model_to_destroy) {
      case "StoneFoundationSquareHigh":
      case "StoneFoundationSquareMid":
      case "StoneFoundationSquareLow":
      case "StoneFoundationTriangleHigh":
      case "StoneFoundationTriangleMid":
      case "StoneFoundationTriangleLow":
      case "StoneWallHigh":
      case "StoneWallMid":
      case "StoneWallLow":
      case "StoneRoofWallLeft":
      case "StoneRoofWallRight":
      case "StoneDoorway":
      case "StoneWindow":
      case "StoneWallFrame":
      case "StoneFloorSquare":
      case "StoneFloorTriangle":
      case "StoneFloorFrameSquare":
      case "StoneFloorFrameTriangle":
      case "StoneRoofSquare":
      case "StoneRoofTriangle":
        set_explosives_cost(explosives_cost + 2);
        break;

      case "MetalFoundationSquareHigh":
      case "MetalFoundationSquareMid":
      case "MetalFoundationSquareLow":
      case "MetalFoundationTriangleHigh":
      case "MetalFoundationTriangleMid":
      case "MetalFoundationTriangleLow":
      case "MetalWallHigh":
      case "MetalWallMid":
      case "MetalWallLow":
      case "MetalRoofWallLeft":
      case "MetalRoofWallRight":
      case "MetalDoorway":
      case "MetalWindow":
      case "MetalStairsLShape":
      case "MetalStairsUShape":
      case "MetalWallFrame":
      case "MetalFloorSquare":
      case "MetalFloorTriangle":
      case "MetalFloorFrameSquare":
      case "MetalFloorFrameTriangle":
      case "MetalRoofSquare":
      case "MetalRoofTriangle":
        set_explosives_cost(explosives_cost + 4);
        break;

      case "ArmoredFoundationSquareHigh":
      case "ArmoredFoundationSquareMid":
      case "ArmoredFoundationSquareLow":
      case "ArmoredFoundationTriangleHigh":
      case "ArmoredFoundationTriangleMid":
      case "ArmoredFoundationTriangleLow":
      case "ArmoredWallHigh":
      case "ArmoredWallMid":
      case "ArmoredWallLow":
      case "ArmoredRoofWallLeft":
      case "ArmoredRoofWallRight":
      case "ArmoredDoorway":
      case "ArmoredWindow":
      case "ArmoredWallFrame":
      case "ArmoredFloorFrameSquare":
      case "ArmoredFloorFrameTriangle":
      case "ArmoredFloorSquare":
      case "ArmoredFloorTriangle":
      case "ArmoredStairsLShape":
      case "ArmoredStairsUShape":
      case "ArmoredRoofSquare":
      case "ArmoredRoofTriangle":
        set_explosives_cost(explosives_cost + 8);
        break;

      case "MetalDoor":
        set_ammo_cost(ammo_cost + 63);
        break;
      case "StrenghtenedGlassWindow":
        set_ammo_cost(ammo_cost + 140);
        break;
      case "GarageDoor":
        set_ammo_cost(ammo_cost + 150);
        break;
      case "StoneStairsLShape":
      case "StoneStairsUShape":
      case "MetalVerticalEmbrasure":
        set_ammo_cost(ammo_cost + 173);
        break;

      case "Furnace":
      case "LargeWoodBox":
      case "SleepingBag":
      case "ToolCupboard":
      case "WoodStorageBox":
      case "WorkbenchT3":
        return;

      default:
        break;
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Efficiency ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Rockets ↓ -------------------------
  // calculate the "rockets" type of the raid mode
  // this function counts only the rocket costs on selected objects

  function CalculateRocketCost() {
    switch (model_to_destroy) {
      case "MetalDoor":
        set_rockets_cost(rockets_cost + 2);
        break;

      case "GarageDoor":
      case "StrenghtenedGlassWindow":
        set_rockets_cost(rockets_cost + 3);
        break;

      case "StoneFoundationSquareHigh":
      case "StoneFoundationSquareMid":
      case "StoneFoundationSquareLow":
      case "StoneFoundationTriangleHigh":
      case "StoneFoundationTriangleMid":
      case "StoneFoundationTriangleLow":
      case "StoneWallHigh":
      case "StoneWallMid":
      case "StoneWallLow":
      case "StoneRoofWallLeft":
      case "StoneRoofWallRight":
      case "StoneDoorway":
      case "StoneWindow":
      case "StoneStairsLShape":
      case "StoneStairsUShape":
      case "StoneWallFrame":
      case "StoneFloorSquare":
      case "StoneFloorTriangle":
      case "StoneFloorFrameSquare":
      case "StoneFloorFrameTriangle":
      case "MetalVerticalEmbrasure":
      case "StoneRoofSquare":
      case "StoneRoofTriangle":
        set_rockets_cost(rockets_cost + 4);
        break;

      case "MetalFoundationSquareHigh":
      case "MetalFoundationSquareMid":
      case "MetalFoundationSquareLow":
      case "MetalFoundationTriangleHigh":
      case "MetalFoundationTriangleMid":
      case "MetalFoundationTriangleLow":
      case "MetalWallHigh":
      case "MetalWallMid":
      case "MetalWallLow":
      case "MetalRoofWallLeft":
      case "MetalRoofWallRight":
      case "MetalDoorway":
      case "MetalWindow":
      case "MetalStairsLShape":
      case "MetalStairsUShape":
      case "MetalWallFrame":
      case "MetalFloorSquare":
      case "MetalFloorTriangle":
      case "MetalFloorFrameSquare":
      case "MetalFloorFrameTriangle":
      case "MetalRoofSquare":
      case "MetalRoofTriangle":
        set_rockets_cost(rockets_cost + 8);
        break;

      case "ArmoredFoundationSquareHigh":
      case "ArmoredFoundationSquareMid":
      case "ArmoredFoundationSquareLow":
      case "ArmoredFoundationTriangleHigh":
      case "ArmoredFoundationTriangleMid":
      case "ArmoredFoundationTriangleLow":
      case "ArmoredWallHigh":
      case "ArmoredWallMid":
      case "ArmoredWallLow":
      case "ArmoredRoofWallLeft":
      case "ArmoredRoofWallRight":
      case "ArmoredDoorway":
      case "ArmoredWindow":
      case "ArmoredWallFrame":
      case "ArmoredFloorFrameSquare":
      case "ArmoredFloorFrameTriangle":
      case "ArmoredFloorSquare":
      case "ArmoredFloorTriangle":
      case "ArmoredStairsLShape":
      case "ArmoredStairsUShape":
      case "ArmoredRoofSquare":
      case "ArmoredRoofTriangle":
        set_rockets_cost(rockets_cost + 15);
        break;

      case "Furnace":
      case "LargeWoodBox":
      case "SleepingBag":
      case "ToolCupboard":
      case "WoodStorageBox":
      case "WorkbenchT3":
        return;
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Rockets ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Explosives ↓ -------------------------
  // calculate the "explosives" type of the raid mode
  // this function counts only the esplosives costs on selected objects

  function CalculateExplosivesCost() {
    switch (model_to_destroy) {
      case "MetalDoor":
        set_explosives_cost(explosives_cost + 1);
        break;

      case "GarageDoor":
      case "StrenghtenedGlassWindow":
        set_explosives_cost(explosives_cost + 2);
        break;

      case "StoneFoundationSquareHigh":
      case "StoneFoundationSquareMid":
      case "StoneFoundationSquareLow":
      case "StoneFoundationTriangleHigh":
      case "StoneFoundationTriangleMid":
      case "StoneFoundationTriangleLow":
      case "StoneWallHigh":
      case "StoneWallMid":
      case "StoneWallLow":
      case "StoneRoofWallLeft":
      case "StoneRoofWallRight":
      case "StoneDoorway":
      case "StoneWindow":
      case "StoneStairsLShape":
      case "StoneStairsUShape":
      case "StoneWallFrame":
      case "StoneFloorSquare":
      case "StoneFloorTriangle":
      case "StoneFloorFrameSquare":
      case "StoneFloorFrameTriangle":
      case "MetalVerticalEmbrasure":
      case "StoneRoofSquare":
      case "StoneRoofTriangle":
        set_explosives_cost(explosives_cost + 2);
        break;

      case "MetalFoundationSquareHigh":
      case "MetalFoundationSquareMid":
      case "MetalFoundationSquareLow":
      case "MetalFoundationTriangleHigh":
      case "MetalFoundationTriangleMid":
      case "MetalFoundationTriangleLow":
      case "MetalWallHigh":
      case "MetalWallMid":
      case "MetalWallLow":
      case "MetalRoofWallLeft":
      case "MetalRoofWallRight":
      case "MetalDoorway":
      case "MetalWindow":
      case "MetalStairsLShape":
      case "MetalStairsUShape":
      case "MetalWallFrame":
      case "MetalFloorSquare":
      case "MetalFloorTriangle":
      case "MetalFloorFrameSquare":
      case "MetalFloorFrameTriangle":
      case "MetalRoofSquare":
      case "MetalRoofTriangle":
        set_explosives_cost(explosives_cost + 4);
        break;

      case "ArmoredFoundationSquareHigh":
      case "ArmoredFoundationSquareMid":
      case "ArmoredFoundationSquareLow":
      case "ArmoredFoundationTriangleHigh":
      case "ArmoredFoundationTriangleMid":
      case "ArmoredFoundationTriangleLow":
      case "ArmoredWallHigh":
      case "ArmoredWallMid":
      case "ArmoredWallLow":
      case "ArmoredRoofWallLeft":
      case "ArmoredRoofWallRight":
      case "ArmoredDoorway":
      case "ArmoredWindow":
      case "ArmoredWallFrame":
      case "ArmoredFloorFrameSquare":
      case "ArmoredFloorFrameTriangle":
      case "ArmoredFloorSquare":
      case "ArmoredFloorTriangle":
      case "ArmoredStairsLShape":
      case "ArmoredStairsUShape":
      case "ArmoredRoofSquare":
      case "ArmoredRoofTriangle":
        set_explosives_cost(explosives_cost + 8);
        break;

      case "Furnace":
      case "LargeWoodBox":
      case "SleepingBag":
      case "ToolCupboard":
      case "WoodStorageBox":
      case "WorkbenchT3":
        return;
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Explosives ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Exp. Ammo ↓ -------------------------
  // calculate the "explosive ammo" type of the raid mode
  // this function counts only the explosive ammo costs on selected objects

  function CalculateAmmoCost() {
    switch (model_to_destroy) {
      case "MetalDoor":
        set_ammo_cost(ammo_cost + 63);
        break;

      case "StrenghtenedGlassWindow":
        set_ammo_cost(ammo_cost + 140);
        break;

      case "GarageDoor":
        set_ammo_cost(ammo_cost + 150);
        break;

      case "StoneStairsLShape":
      case "StoneStairsUShape":
      case "MetalVerticalEmbrasure":
        set_ammo_cost(ammo_cost + 173);
        break;

      case "StoneFoundationSquareHigh":
      case "StoneFoundationSquareMid":
      case "StoneFoundationSquareLow":
      case "StoneFoundationTriangleHigh":
      case "StoneFoundationTriangleMid":
      case "StoneFoundationTriangleLow":
      case "StoneWallHigh":
      case "StoneWallMid":
      case "StoneWallLow":
      case "StoneRoofWallLeft":
      case "StoneRoofWallRight":
      case "StoneDoorway":
      case "StoneWindow":
      case "StoneWallFrame":
      case "StoneFloorSquare":
      case "StoneFloorTriangle":
      case "StoneFloorFrameSquare":
      case "StoneFloorFrameTriangle":
      case "StoneRoofSquare":
      case "StoneRoofTriangle":
        set_ammo_cost(ammo_cost + 185);
        break;

      case "MetalStairsLShape":
      case "MetalStairsUShape":
        set_ammo_cost(ammo_cost + 399);
        break;

      case "MetalWallHigh":
      case "MetalWallMid":
      case "MetalWallLow":
      case "MetalRoofWallLeft":
      case "MetalRoofWallRight":
      case "MetalDoorway":
      case "MetalWindow":
      case "MetalWallFrame":
      case "MetalFloorSquare":
      case "MetalFloorFrameSquare":
      case "MetalFloorFrameTriangle":
      case "MetalRoofSquare":
      case "MetalRoofTriangle":
        set_ammo_cost(ammo_cost + 400);
        break;

      case "MetalFloorTriangle":
        set_ammo_cost(ammo_cost + 413);
        break;

      case "MetalFoundationSquareHigh":
      case "MetalFoundationSquareMid":
      case "MetalFoundationSquareLow":
      case "MetalFoundationTriangleHigh":
      case "MetalFoundationTriangleMid":
      case "MetalFoundationTriangleLow":
        set_ammo_cost(ammo_cost + 461);
        break;

      case "ArmoredFoundationSquareHigh":
      case "ArmoredFoundationSquareMid":
      case "ArmoredFoundationSquareLow":
      case "ArmoredFoundationTriangleHigh":
      case "ArmoredFoundationTriangleMid":
      case "ArmoredFoundationTriangleLow":
      case "ArmoredWallHigh":
      case "ArmoredWallMid":
      case "ArmoredWallLow":
      case "ArmoredRoofWallLeft":
      case "ArmoredRoofWallRight":
      case "ArmoredDoorway":
      case "ArmoredWindow":
      case "ArmoredWallFrame":
      case "ArmoredFloorFrameSquare":
      case "ArmoredFloorFrameTriangle":
      case "ArmoredFloorSquare":
      case "ArmoredFloorTriangle":
      case "ArmoredStairsLShape":
      case "ArmoredStairsUShape":
      case "ArmoredRoofSquare":
      case "ArmoredRoofTriangle":
        set_ammo_cost(ammo_cost + 799);
        break;

      case "Furnace":
      case "LargeWoodBox":
      case "SleepingBag":
      case "ToolCupboard":
      case "WoodStorageBox":
      case "WorkbenchT3":
        return;
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Exp. Ammo ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Satchel Charge ↓ -------------------------
  // calculate the "satchel charge" type of the raid mode
  // this function counts only the satchel charge costs on selected objects

  function CalculateSatchelsCost() {
    switch (model_to_destroy) {
      case "MetalDoor":
        set_satchel_cost(satchel_cost + 4);
        break;

      case "GarageDoor":
      case "StrenghtenedGlassWindow":
        set_satchel_cost(satchel_cost + 9);
        break;

      case "StoneFoundationSquareHigh":
      case "StoneFoundationSquareMid":
      case "StoneFoundationSquareLow":
      case "StoneFoundationTriangleHigh":
      case "StoneFoundationTriangleMid":
      case "StoneFoundationTriangleLow":
      case "StoneWallHigh":
      case "StoneWallMid":
      case "StoneWallLow":
      case "StoneRoofWallLeft":
      case "StoneRoofWallRight":
      case "StoneDoorway":
      case "StoneWindow":
      case "StoneStairsLShape":
      case "StoneStairsUShape":
      case "StoneWallFrame":
      case "StoneFloorSquare":
      case "StoneFloorTriangle":
      case "StoneFloorFrameSquare":
      case "StoneFloorFrameTriangle":
      case "StoneRoofSquare":
      case "StoneRoofTriangle":
        set_satchel_cost(satchel_cost + 10);
        break;

      case "MetalVerticalEmbrasure":
        set_satchel_cost(satchel_cost + 13);
        break;

      case "MetalFoundationSquareHigh":
      case "MetalFoundationSquareMid":
      case "MetalFoundationSquareLow":
      case "MetalFoundationTriangleHigh":
      case "MetalFoundationTriangleMid":
      case "MetalFoundationTriangleLow":
      case "MetalWallHigh":
      case "MetalWallMid":
      case "MetalWallLow":
      case "MetalRoofWallLeft":
      case "MetalRoofWallRight":
      case "MetalDoorway":
      case "MetalWindow":
      case "MetalStairsLShape":
      case "MetalStairsUShape":
      case "MetalWallFrame":
      case "MetalFloorSquare":
      case "MetalFloorTriangle":
      case "MetalFloorFrameSquare":
      case "MetalFloorFrameTriangle":
      case "MetalRoofSquare":
      case "MetalRoofTriangle":
        set_satchel_cost(satchel_cost + 23);
        break;

      case "ArmoredFoundationSquareHigh":
      case "ArmoredFoundationSquareMid":
      case "ArmoredFoundationSquareLow":
      case "ArmoredFoundationTriangleHigh":
      case "ArmoredFoundationTriangleMid":
      case "ArmoredFoundationTriangleLow":
      case "ArmoredWallHigh":
      case "ArmoredWallMid":
      case "ArmoredWallLow":
      case "ArmoredRoofWallLeft":
      case "ArmoredRoofWallRight":
      case "ArmoredDoorway":
      case "ArmoredWindow":
      case "ArmoredWallFrame":
      case "ArmoredFloorFrameSquare":
      case "ArmoredFloorFrameTriangle":
      case "ArmoredFloorSquare":
      case "ArmoredFloorTriangle":
      case "ArmoredStairsLShape":
      case "ArmoredStairsUShape":
      case "ArmoredRoofSquare":
      case "ArmoredRoofTriangle":
        set_satchel_cost(satchel_cost + 46);
        break;

      case "Furnace":
      case "LargeWoodBox":
      case "SleepingBag":
      case "ToolCupboard":
      case "WoodStorageBox":
      case "WorkbenchT3":
        return;
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Satchel Charge ↑ -------------------------

  //* ------------------------- ↓ Calculate all the raid materials ↓ -------------------------

  // ------------------------- sulfur cost -------------------------

  function CalculateSulfurCost() {
    const rocket_multiplier = count_sub_ingredients ? 1400 : 100;
    const explosives_multiplier = count_sub_ingredients ? 2200 : 200;
    const ammo_multiplier = count_sub_ingredients ? 25 : 5;
    const satchel_multiplier = count_sub_ingredients ? 480 : 0;

    const sulfur_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier) + (ammo_cost * ammo_multiplier) + (satchel_cost * satchel_multiplier) //prettier-ignore
    set_sulfur_cost(sulfur_cost);
  }

  // ------------------------- gunpowder cost -------------------------

  function CalculateGunpowderCost() {
    const rocket_multiplier = count_sub_ingredients ? 0 : 650;
    const explosives_multiplier = count_sub_ingredients ? 0 : 1000;
    const ammo_multiplier = count_sub_ingredients ? 0 : 10;
    const satchel_multiplier = count_sub_ingredients ? 0 : 240;

    const gunpowder_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier) + (ammo_cost * ammo_multiplier) + (satchel_cost * satchel_multiplier) //prettier-ignore
    set_gunpowder_cost(gunpowder_cost);
  }

  // ------------------------- charcoal cost -------------------------

  function CalculateCharcoalCost() {
    const rocket_multiplier = count_sub_ingredients ? 1950 : 0;
    const explosives_multiplier = count_sub_ingredients ? 3000 : 0;
    const ammo_multiplier = count_sub_ingredients ? 30 : 0;
    const satchel_multiplier = count_sub_ingredients ? 720 : 0;

    const charcoal_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier) + (ammo_cost * ammo_multiplier) + (satchel_cost * satchel_multiplier) //prettier-ignore
    set_charcoal_cost(charcoal_cost);
  }

  // ------------------------- metal frag. cost -------------------------

  function CalculateMetalFragmentsCost() {
    const metal_fragments_cost_rocket = rockets_cost * 100;
    const metal_fragments_cost_explosives = explosives_cost * 200;
    const metal_fragments_cost_ammo = ammo_cost * 5;
    const metal_fragments_cost_satchel = satchel_cost * 80;

    set_metal_fragments_cost(metal_fragments_cost_rocket + metal_fragments_cost_explosives + metal_fragments_cost_ammo + metal_fragments_cost_satchel) //prettier-ignore
  }

  // ------------------------- metal pipes cost -------------------------

  function CalculateMetalPipesCost() {
    const rocket_multiplier = count_sub_ingredients ? 0 : 2;

    const metal_pipes_cost = rockets_cost * rocket_multiplier;
    set_metal_pipe_cost(metal_pipes_cost);
  }

  // ------------------------- lq. fuel cost -------------------------

  function CalculateLqFuelCost() {
    const rocket_multiplier = count_sub_ingredients ? 0 : 30;
    const explosives_multiplier = count_sub_ingredients ? 0 : 60;

    const lq_fuel_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier); // prettier-ignore
    set_lq_fuel_cost(lq_fuel_cost);
  }

  // ------------------------- cloth cost -------------------------

  function CalculateClothCost() {
    const rocket_multiplier = count_sub_ingredients ? 8 : 0;
    const explosives_multiplier = count_sub_ingredients ? 20 : 5;
    const satchel_multiplier = 10;

    const cloth_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier) + (satchel_cost * satchel_multiplier); // prettier-ignore
    set_cloth_cost(cloth_cost);
  }

  // ------------------------- tech trash cost -------------------------

  function CalculateTechTrashCost() {
    const tech_trash_cost_explosives = explosives_cost * 2;
    set_tech_trash_cost(tech_trash_cost_explosives);
  }

  // ------------------------- hq. metal cost -------------------------

  function CalculateHqMetalCost() {
    const explosives_multiplier = count_sub_ingredients ? 2 : 0;

    const hq_metal_cost = rockets_cost * explosives_multiplier;
    set_hq_metal_cost(hq_metal_cost);
  }

  // ------------------------- scrap cost -------------------------

  function CalculateScrapCost() {
    const rocket_multiplier = count_sub_ingredients ? 10 : 0;

    const scrap_cost = rockets_cost * rocket_multiplier; // prettier-ignore
    set_scrap_cost(scrap_cost);
  }

  // ------------------------- animal fat cost -------------------------

  function CalculateAnimalFatCost() {
    const rocket_multiplier = count_sub_ingredients ? 24 : 0;
    const explosives_multiplier = count_sub_ingredients ? 45 : 0;

    const animal_fat_cost = (rockets_cost * rocket_multiplier) + (explosives_cost * explosives_multiplier); // prettier-ignore
    set_animal_fat_cost(animal_fat_cost);
  }

  // ------------------------- rope cost -------------------------

  function CalculateRopeCost() {
    const rope_cost_satchel = satchel_cost * 1;
    set_rope_cost(rope_cost_satchel);
  }

  function ChangeRaidType(type: string) {
    if (type !== raid_type) {
      set_raid_type(type);

      switch (type) {
        case "efficiency":
          playSound("menu_sound");
          break;
        case "rockets":
          playSound("rocket_sound");
          break;
        case "explosives":
          playSound("charge_sound");
          break;
        case "ammo":
          playSound("ammo_sound");
          break;
        case "satchel":
          playSound("satchel_sound");
          break;
        default:
          break;
      }
    }
  }

  //* ------------------------- ↓ Calculator Trigger ↓ -------------------------
  // trigger the raid cost calculator when any model changes the value of the model_destroy_trigger in the Redux Store

  useEffect(() => {
    switch (raid_type) {
      case "rockets":
        CalculateRocketCost();
        break;
      case "explosives":
        CalculateExplosivesCost();
        break;
      case "ammo":
        CalculateAmmoCost();
        break;
      case "satchel":
        CalculateSatchelsCost();
        break;
      case "efficiency":
        CalculateEfficiencyCost();
        break;
      default:
        break;
    }
  }, [model_destroy_trigger]);

  //* ------------------------- ↑ Calculator Trigger ↑ -------------------------

  const ToggleSubIngredientsCalculator = () => {
    set_count_sub_ingredients(!count_sub_ingredients);
    playSound("buttons_sound");
  };

  const NumbersFormatter = (number: any) => {
    if (number > 9999) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else return number;
  };

  function CreateRaidToolSegment(type: string, thumbnail: string, description: string) {
    return (
      <button
        className={
          raid_type === type
            ? "raid_type_buttons_content_container raid_type_buttons_content_container_active"
            : "raid_type_buttons_content_container raid_type_buttons_content_container_inactive"
        }
        onClick={() => ChangeRaidType(type)}
      >
        {/* prettier-ignore */}
        <img className="raid_type_content_thumbnail" src={thumbnail} alt={`${raid_type} thumbnail`} style={{ filter: raid_type === type ? "grayscale(0%)" : "grayscale(100%)"}}/>
        <span className="raid_type_description">{description}</span>
      </button>
    );
  }

  //prettier-ignore
  function CreateRaidToolCostSegment(is_segment_active: boolean, thumbnail: string, description: string, tool_cost: number) {
    return (
      <div className={is_segment_active ? "raid_tool_cost_content" : "raid_tool_cost_content raid_resources_cost_disabled"}>
        <img className="raid_tool_cost_content_thumbnail" src={thumbnail} alt={`${description} thumbnail`} style={{ filter: is_segment_active ? "grayscale(0%)" : "grayscale(100%)"}}/>
        <span className="raid_tool_cost_content_description">{description}</span>
        <span className="raid_tool_cost_content_amount">{NumbersFormatter(tool_cost)}</span>
      </div>
    );
  }

  //* ------------------------- ↓ Ingredients Cost ↓ -------------------------
  // calculate all of the ingredients cost if any of the raid type tool amount changes

  useEffect(() => {
    {
      CalculateSulfurCost();
      CalculateGunpowderCost();
      CalculateCharcoalCost();
      CalculateMetalFragmentsCost();
      CalculateMetalPipesCost();
      CalculateLqFuelCost();
      CalculateClothCost();
      CalculateTechTrashCost();
      CalculateHqMetalCost();
      CalculateScrapCost();
      CalculateAnimalFatCost();
      CalculateRopeCost();
    }
  }, [rockets_cost, explosives_cost, ammo_cost, satchel_cost, count_sub_ingredients]);

  //* ------------------------- ↑ Ingredients Cost ↑ -------------------------

  // -------------------------  reset the raid cost on page mode change -------------------------

  useEffect(() => {
    ResetRaid();
  }, [page_mode]);

  return (
    <>
      <section className="raid_type_main_container">
        <span className="raid_type_title">raid the base with:</span>
        <div className="raid_type_buttons_main_container">
          {CreateRaidToolSegment("efficiency", sulfurThumbnail, "most efficient")}
          {CreateRaidToolSegment("rockets", rocketThumbnail, "rockets")}
          {CreateRaidToolSegment("explosives", explosivesThumbnail, "explosives")}
          {CreateRaidToolSegment("ammo", ammoThumbnail, "exp. 5.56")}
          {CreateRaidToolSegment("satchel", satchelThumbnail, "satchels")}
        </div>
      </section>

      <div className="raid_cost_main_container">
        <section className="raid_tool_cost_main_container">
          <span className="raid_tool_cost_title">raid tool cost (hard side)</span>
          <div className="raid_tool_cost_content_container">
            {CreateRaidToolCostSegment(true, rocketThumbnail, "rocket", rockets_cost)}
            {CreateRaidToolCostSegment(true, explosivesThumbnail, "C4", explosives_cost)}
            {CreateRaidToolCostSegment(true, ammoThumbnail, "exp. 5.56", ammo_cost)}
            {CreateRaidToolCostSegment(true, satchelThumbnail, "satchel", satchel_cost)}
          </div>
        </section>

        <section className="raid_resources_cost_main_container">
          <span className="raid_resources_cost_title">raid cost (resources)</span>
          <div className="raid_resources_cost_sub_ingredients">
            <label>
              <input type="checkbox" checked={count_sub_ingredients} onChange={ToggleSubIngredientsCalculator} />
              charcoal + sulfur ( + sub ingredients)
            </label>
          </div>
          <div className="raid_resources_cost_content_container">
            {CreateRaidToolCostSegment(true, sulfurThumbnail, "sulfur", sulfur_cost)}
            {CreateRaidToolCostSegment(!count_sub_ingredients, gunpowderThumbnail, "gunpowder", gunpowder_cost)}
            {CreateRaidToolCostSegment(count_sub_ingredients, charcoalThumbnail, "charcoal", charcoal_cost)}
            {CreateRaidToolCostSegment(true, metalThumbnail, "metal", metal_fragments_cost)}
          </div>

          <div className="raid_resources_cost_content_container">
            {CreateRaidToolCostSegment(!count_sub_ingredients, metalPipeThumbnail, "metal pipe", metal_pipe_cost)}
            {CreateRaidToolCostSegment(!count_sub_ingredients, lqFuelThumbnail, "lq. fuel", lq_fuel_cost)}
            {CreateRaidToolCostSegment(true, clothThumbnail, "cloth", cloth_cost)}
            {CreateRaidToolCostSegment(true, techTrashThumbnail, "tech trash", tech_trash_cost)}
          </div>

          <div className="raid_resources_cost_content_container">
            {CreateRaidToolCostSegment(count_sub_ingredients, hqMetalThumbnail, "hq. metal", hq_metal_cost)}
            {CreateRaidToolCostSegment(count_sub_ingredients, scrapThumbnail, "scrap", scrap_cost)}
            {CreateRaidToolCostSegment(count_sub_ingredients, animalFatThumbnail, "animal fat", animal_fat_cost)}
            {CreateRaidToolCostSegment(true, ropeThumbnail, "rope", rope_cost)}
          </div>
        </section>
      </div>

      <div className="reset_raid_main_container">
        <div
          className="reset_raid_thumbnail"
          onClick={() => {
            ResetRaid();
            playSound("menu_sound");
          }}
          onMouseEnter={() => {set_reset_raid_hover(true)}} //prettier-ignore
          onMouseLeave={() => {set_reset_raid_hover(false)}} //prettier-ignore
        >
          {/* prettier-ignore */}
          <FontAwesomeIcon icon={faArrowsRotate} style={{ width: "75%", height: "75%", color: reset_raid_hover ? "#fdc89d" : "#a8a8a8" }}/>
        </div>
        <div className="reset_raid_description">reset raid</div>
      </div>
    </>
  );
}
