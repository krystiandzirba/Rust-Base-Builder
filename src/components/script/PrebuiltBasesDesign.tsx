import {
  RootState,
  set_model_creation_state,
  set_model_type_to_create,
  set_object_rotation_degree,
  set_selected_object_list,
  set_create_prebuilt_base_state,
  set_prebuilt_base_material_type,
} from "../../Store";
import { useSelector, useDispatch } from "react-redux";

import { faPlus, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { AudioPlayer } from "./AudioPlayer.tsx";
import object_selecting_sound from "../../audio/object_selecting_sound.mp3";
import object_hover_sound from "../../audio/object_hover_sound.mp3";

import stoneThumbnail from "../../icons/stone_thumbnail.png";
import metalThumbnail from "../../icons/metal_thumbnail.png";
import hq_metalThumbnail from "../../icons/hq_metal_thumbnail.png";

export default function PrebuiltBasesDesign() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const prebuilt_base_material_type = useSelector((state: RootState) => state.modelsData.prebuilt_base_material_type);
  const create_prebuilt_base_state = useSelector((state: RootState) => state.modelsData.create_prebuilt_base_state);

  const [add_prebuild_base_button_hover, set_add_prebuild_base_button_hover] = useState<boolean>(false);
  const [add_prebuild_base_button_click, set_add_prebuild_base_button_click] = useState<boolean>(false);

  const [base_prebuilt_selection, set_base_prebuilt_selection] = useState<string>("empty");

  function ChangeBaseMetarial(material: string) {
    set_prebuilt_base_material_type(material);
    dispatch(set_prebuilt_base_material_type(material));
    if (audio) {
      AudioPlayer(object_selecting_sound);
    }
  }

  function ChangePrebuiltBaseDesign(index: number, name: string) {
    console.log("click");
    if (selected_object_list === index) {
      set_base_prebuilt_selection("empty");
      dispatch(set_selected_object_list(-1));
      dispatch(set_model_creation_state(false));
      dispatch(set_create_prebuilt_base_state(false));
    } else {
      set_base_prebuilt_selection(name);
      dispatch(set_selected_object_list(index));
      dispatch(set_model_creation_state(true));
      dispatch(set_object_rotation_degree(90));
      dispatch(set_model_type_to_create(name));
      dispatch(set_create_prebuilt_base_state(true));
    }
    if (audio) {
      AudioPlayer(object_selecting_sound);
    }
  }

  useEffect(() => {
    set_add_prebuild_base_button_click(false);
  }, [page_mode]);

  useEffect(() => {
    if (selected_object_list < 1000) {
      set_base_prebuilt_selection("empty");
    }
  }, [create_prebuilt_base_state]);

  return (
    <>
      <div
        className={
          page_mode === "edit"
            ? "main_prebuilt_bases_design_navbar_container main_prebuilt_bases_design_navbar_container_displayed"
            : "main_prebuilt_bases_design_navbar_container main_prebuilt_bases_design_navbar_container_hidden"
        }
        onClick={() => {
          set_add_prebuild_base_button_click(!add_prebuild_base_button_click);
          if (audio) {
            AudioPlayer(object_selecting_sound);
          }
        }}
        onMouseEnter={() => {
          set_add_prebuild_base_button_hover(true);
        }}
        onMouseLeave={() => {
          set_add_prebuild_base_button_hover(false);
        }}
      >
        <a>Add prebuilt base</a>
        <div className="prebuilt_bases_design_icons_container">
          <FontAwesomeIcon icon={faHouse} size="2x" style={{ color: "#bbbbbb" }} />
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            style={{
              color: add_prebuild_base_button_hover || add_prebuild_base_button_click ? "#ffd5b3" : "#bbbbbb",
            }}
          />
        </div>
      </div>
      {page_mode === "edit" && (
        <div
          className={
            add_prebuild_base_button_click
              ? "main_prebuilt_bases_design_list_container main_prebuilt_bases_design_list_container_displayed"
              : "main_prebuilt_bases_design_list_container main_prebuilt_bases_design_list_container_hidden"
          }
        >
          <div className="prebult_bases_design_type_container">
            <div
              className="prebult_bases_design_type_container_cell"
              onClick={() => {
                ChangeBaseMetarial("stone");
              }}
            >
              <button
                className={
                  prebuilt_base_material_type === "stone"
                    ? "prebuilt_bases_design_type_buttons type_buttons_active"
                    : "prebuilt_bases_design_type_buttons type_buttons_inactive"
                }
                style={{
                  backgroundImage: `url(${stoneThumbnail})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></button>
              <a>stone</a>
            </div>
            <div
              className="prebult_bases_design_type_container_cell"
              onClick={() => {
                ChangeBaseMetarial("metal");
              }}
            >
              <button
                className={
                  prebuilt_base_material_type === "metal"
                    ? "prebuilt_bases_design_type_buttons type_buttons_active"
                    : "prebuilt_bases_design_type_buttons type_buttons_inactive"
                }
                style={{
                  backgroundImage: `url(${metalThumbnail})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></button>
              <a>metal</a>
            </div>
            <div
              className="prebult_bases_design_type_container_cell"
              onClick={() => {
                ChangeBaseMetarial("armored");
              }}
            >
              <button
                className={
                  prebuilt_base_material_type === "armored"
                    ? "prebuilt_bases_design_type_buttons type_buttons_active"
                    : "prebuilt_bases_design_type_buttons type_buttons_inactive"
                }
                style={{
                  backgroundImage: `url(${hq_metalThumbnail})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></button>
              <a>armored</a>
            </div>
          </div>
          <div className="prebuilt_bases_design_list">
            <div className="prebuilt_bases_design_list_divider_name">Starter Bases</div>
            <button
              className={
                base_prebuilt_selection === "PrebuildBaseI"
                  ? "base_design_button base_design_button_selected"
                  : "base_design_button base_design_button_deselected"
              }
              onClick={() => {
                ChangePrebuiltBaseDesign(1000, "PrebuildBaseI");
              }}
            >
              Starter Base 2x1 I
            </button>
          </div>
        </div>
      )}
    </>
  );
}
