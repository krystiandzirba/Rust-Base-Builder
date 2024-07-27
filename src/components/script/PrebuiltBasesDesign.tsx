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

import { faPlus, faHouse, faUser, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
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
  const audio = useSelector((state: RootState) => state.pageSettings.audio);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const prebuilt_base_material_type = useSelector((state: RootState) => state.modelsData.prebuilt_base_material_type);
  const create_prebuilt_base_state = useSelector((state: RootState) => state.modelsData.create_prebuilt_base_state);

  const [add_prebuild_base_button_hover, set_add_prebuild_base_button_hover] = useState<boolean>(false);
  const [add_prebuild_base_button_click, set_add_prebuild_base_button_click] = useState<boolean>(false);

  const [base_prebuilt_selection, set_base_prebuilt_selection] = useState<string>("empty");

  const prebuiltBases = [
    { id: "PrebuildBaseI", label: "Simple Starter Base 2x1", size: "solo", tutorial_materials: false },
    { id: "PrebuildBaseII", label: 'The "Chad Cube" 2x1 by Reksmore (YT)', size: "solo", tutorial_materials: false },
    { id: "PrebuildBaseIII", label: 'The "Hermit" by Dust (YT)', size: "solo", tutorial_materials: true },
    { id: "PrebuildBaseIV", label: 'The "Diamond" by STELIC (YT)', size: "duo", tutorial_materials: true },
    { id: "PrebuildBaseV", label: 'The "Vulcan" by Dust (YT)', size: "clan", tutorial_materials: true },
  ];

  function ChangeBaseMetarial(material: string) {
    set_prebuilt_base_material_type(material);
    dispatch(set_prebuilt_base_material_type(material));
    if (audio) {
      AudioPlayer(object_selecting_sound);
    }
  }

  function ChangePrebuiltBaseDesign(index: number, name: string) {
    if (base_prebuilt_selection === name) {
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
          <FontAwesomeIcon icon={faHouse} size="xl" />
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
                if (base_prebuilt_selection !== "PrebuildBaseI" && base_prebuilt_selection !== "PrebuildBaseII") {
                  ChangeBaseMetarial("tutorial");
                }
              }}
            >
              <button
                className={
                  base_prebuilt_selection === "PrebuildBaseI" || base_prebuilt_selection === "PrebuildBaseII"
                    ? "prebuilt_bases_design_type_buttons_disabled"
                    : prebuilt_base_material_type === "tutorial"
                    ? "prebuilt_bases_design_type_buttons type_buttons_active"
                    : "prebuilt_bases_design_type_buttons type_buttons_inactive"
                }
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="3x"
                  style={{
                    color:
                      base_prebuilt_selection === "PrebuildBaseI" || base_prebuilt_selection === "PrebuildBaseII"
                        ? "rgba(179, 179, 179, 0.75)"
                        : "black",
                  }}
                />
              </button>
              <a>tutorial</a>
            </div>
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
            {prebuiltBases.map((base) => (
              <button
                key={base.id}
                className={
                  base_prebuilt_selection === base.id
                    ? "base_design_button base_design_button_selected"
                    : "base_design_button base_design_button_deselected"
                }
                onClick={() => {
                  ChangePrebuiltBaseDesign(1000, base.id);

                  if (!base.tutorial_materials) {
                    set_prebuilt_base_material_type("stone");
                    dispatch(set_prebuilt_base_material_type("stone"));
                  }
                }}
              >
                <div className="base_name"> {base.label}</div>
                <div className="base_group_size_indicator">
                  <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#ffd5b3" }} />
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    style={{
                      color:
                        base.size === "duo" || base.size === "trio" || base.size === "squad" || base.size === "clan"
                          ? "#ffd5b3"
                          : "#4a4a4a",
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    style={{
                      color:
                        base.size === "trio" || base.size === "squad" || base.size === "clan" ? "#ffd5b3" : "#4a4a4a",
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    style={{ color: base.size === "squad" || base.size === "clan" ? "#ffd5b3" : "#4a4a4a" }}
                  />
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ color: base.size === "clan" ? "#ffd5b3" : "#4a4a4a" }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
