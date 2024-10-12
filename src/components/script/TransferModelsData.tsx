// TransferModelsData.tsx
import React, { useEffect, useRef, useState } from "react";
import { RootState, set_create_prebuilt_base_state, set_model_creation_state, set_model_type_to_create, set_prebuilt_base_objects_set, set_allow_canvas_interaction_after_first_load, set_selected_object_list} from "../../Store.tsx"; //prettier-ignore
import { useDispatch, useSelector } from "react-redux";
import { FileUpload } from "primereact/fileupload";

import pako from "pako";

import ProgressBar from "react-bootstrap/ProgressBar";

import { useAudioPlayer } from "./AudioPlayer.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faDownload, faEraser, faFile, faKeyboard, faUpload } from "@fortawesome/free-solid-svg-icons"; //prettier-ignore

interface ModelData {model: string, position: { x: number; y: number; z: number }, rotation: { x: number; y: number; z: number }} //prettier-ignore
interface TransferModelsDataProps {canvas_models_data: { [id: string]: ModelData }, data_index: number} //prettier-ignore

const TransferModelsData: React.FC<TransferModelsDataProps> = ({ canvas_models_data, data_index }) => {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const model_type_to_create = useSelector((state: RootState) => state.modelsData.model_type_to_create);
  const prebuilt_base_objects_set = useSelector((state: RootState) => state.modelsData.prebuilt_base_objects_set); //prettier-ignore

  const [loading_bar_info, set_loading_bar_info] = useState<string>("Export the base");
  const [transfer_models_data_mode, set_transfer_models_data_mode] = useState<string>("export");
  const [transfer_models_data_type, set_transfer_models_data_type] = useState<string>("code");
  const [enable_base_placing, set_enable_base_placing] = useState<boolean>(false);

  const [imported_file_name, set_imported_file_name] = useState<string>("");
  const [imported_file_size, set_imported_file_size] = useState<number | null>(null);
  const [base_code_import_value, set_base_code_import_value] = useState<string>("");
  const [imported_base_data_length, set_imported_base_data_length] = useState<number>(0);
  const [decompressed_data, set_decompressed_data] = useState<string>("");
  const [compressed_data, set_compressed_data] = useState<string>("");
  const [export_base_code, set_export_base_code] = useState<string>("");
  const [base_export_custom_file_name, set_base_export_custom_file_name] = useState<string>("rust_base_builder_base");
  const inputRef = useRef(null);
  const fileUploadRef = useRef<any>(null);

  //[SectionNav] import data, export data
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Data Transfer (Import + Export) ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function ExportCanvasModelsDataFile() {
    const blob = new Blob([compressed_data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${base_export_custom_file_name}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    set_compressed_data("");
  }

  const ImportCanvasModelsDataFile = (event: { files: any[] }) => {
    const file = event.files[0];

    set_loading_bar_info("Base imported");

    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      set_imported_file_name(file.name);
      set_imported_file_size(file.size);

      reader.onload = (e) => {
        const target = e.target as FileReader;

        if (target && target.result) {
          const imported_file_content = target.result as string;

          try {
            set_decompressed_data(Base64DataDecompress(imported_file_content));
          } catch (error) {
            console.error("Error decompressing or parsing the file content", error);
          }
        }
      };

      reader.readAsText(file);
    } else {
      console.error("Please upload a valid text file.");
    }

    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  //[SectionNav] base64 compression, deflate
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Base64 compression + deflate ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function Base64DataCompression(type: string) {
    const data_string = JSON.stringify(canvas_models_data, null, 2);
    const compressed_data_string = pako.deflate(data_string);
    const compressedBase64 = btoa(String.fromCharCode(...compressed_data_string));

    playSound("buttons_sound");
    if (type === "export") {
      set_compressed_data(compressedBase64);
      set_loading_bar_info("Base downloaded");
    } else if (type === "code") {
      set_export_base_code(compressedBase64);
      set_loading_bar_info("Base code generated");
    }
  }

  function Base64DataDecompress(data: string) {
    const compressedBase64 = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    const decompressed = pako.inflate(compressedBase64, { to: "string" });
    const decompressed_data_string = JSON.parse(decompressed);

    return decompressed_data_string;
  }

  //[SectionNav] remove file, buttons toggle, data interaction
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Data interaction / background logic ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const removeFile = () => {
    playSound("buttons_sound");
    fileUploadRef.current.clear();
    set_imported_file_name("");
    set_imported_file_size(null);
    set_decompressed_data("");
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_model_creation_state(false));
    dispatch(set_model_type_to_create(""));
    dispatch(set_prebuilt_base_objects_set([]));
    set_loading_bar_info("File removed");
  };

  function ToggleBasePlacing() {
    if (!enable_base_placing) {
      dispatch(set_allow_canvas_interaction_after_first_load(false));
      dispatch(set_create_prebuilt_base_state(true));
      dispatch(set_model_creation_state(true));
      dispatch(set_model_type_to_create("ImportedBase"));
      dispatch(set_prebuilt_base_objects_set(decompressed_data));
      set_loading_bar_info("Imported base models");
    } else {
      dispatch(set_allow_canvas_interaction_after_first_load(true));
      dispatch(set_create_prebuilt_base_state(false));
      dispatch(set_model_creation_state(false));
      dispatch(set_model_type_to_create(""));
      dispatch(set_prebuilt_base_objects_set([]));
      set_loading_bar_info("Import the base");
    }
    set_enable_base_placing(!enable_base_placing);
  }

  const HandleBaseCodeImportValueChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    set_base_code_import_value(e.target.value);
  };

  const HandleBaseDownloadCustomFileName = (e: { target: { value: React.SetStateAction<string> } }) => {
    set_base_export_custom_file_name(e.target.value);
  };

  function HandleTransferModelsDataModeSwitch(mode: string) {
    dispatch(set_allow_canvas_interaction_after_first_load(true));
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_model_creation_state(false));
    dispatch(set_model_type_to_create(""));
    dispatch(set_prebuilt_base_objects_set([]));
    set_loading_bar_info("Import the base");
    set_transfer_models_data_mode(mode);
    set_loading_bar_info(`${mode === "import" ? "Import" : "Export"} the base`);
    playSound("menu_sound");
  }

  function HandleTransferModelsDataTypeSwitch(type: string) {
    dispatch(set_selected_object_list(-1));
    dispatch(set_allow_canvas_interaction_after_first_load(true));
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_model_creation_state(false));
    dispatch(set_model_type_to_create(""));
    dispatch(set_prebuilt_base_objects_set([]));
    set_loading_bar_info("Import the base");
    set_transfer_models_data_type(type);
    playSound("menu_sound");
  }

  function ApplyImportedBaseCode() {
    set_imported_file_name("");
    set_imported_file_size(null);
    set_decompressed_data("");
    dispatch(set_prebuilt_base_objects_set([]));
    playSound("buttons_sound");
    set_decompressed_data(Base64DataDecompress(base_code_import_value));
    set_loading_bar_info("Base code applied");
  }

  function ClearImportedBaseCode() {
    set_base_code_import_value("");
    set_loading_bar_info("Base code cleared");
    playSound("buttons_sound");
  }

  function CopyGeneratedBaseCode() {
    navigator.clipboard.writeText(export_base_code);
    set_loading_bar_info("Base code copied to clipboard");
    playSound("buttons_sound");
  }

  function ClearGeneratedBaseCode() {
    set_export_base_code("");
    set_loading_bar_info("Base code cleared");
    playSound("buttons_sound");
  }

  useEffect(() => {
    if (compressed_data) {
      ExportCanvasModelsDataFile();
    }
  }, [compressed_data]);

  useEffect(() => {
    if (model_type_to_create !== "ImportedBase") {
      set_enable_base_placing(false);
    }
  }, [model_type_to_create]);

  useEffect(() => {
    set_imported_base_data_length(Object.keys(decompressed_data).length);
  }, [decompressed_data]);

  useEffect(() => {
    if (Object.keys(prebuilt_base_objects_set).length === 0 && model_type_to_create === "ImportedBase") {
      set_loading_bar_info("Base not imported / incorrect file");
    }
  }, [prebuilt_base_objects_set]);

  useEffect(() => {
    if (Object.keys(prebuilt_base_objects_set).length === data_index) {
      set_loading_bar_info(`Base imported correctly! ${data_index}/${imported_base_data_length}`);
    }
  }, [data_index]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <>
      <div className="transfer_models_data_main_settings_container">
        {/* prettier-ignore */}
        <div className="transfer_models_data_dynamic_info">
          {loading_bar_info} {loading_bar_info === "Imported base models" && ` ${data_index}/${imported_base_data_length}`}
        </div>
        {/* prettier-ignore */}
        <ProgressBar className={!enable_base_placing ? "imported_data_progress_bar_inactive" : loading_bar_info === "Base not imported / incorrect file" ? "imported_data_progress_bar_invalid" : "imported_data_progress_bar"} striped now={enable_base_placing ? data_index : 1} max={enable_base_placing ? imported_base_data_length : 1} />
        <div className="transfer_models_data_type_buttons_container">
          <div className="transfer_models_data_type_buttons_container_row">
            <div
              className={transfer_models_data_mode === "import" ? "transfer_models_data_button transfer_models_data_button_enabled" : "transfer_models_data_button transfer_models_data_button_disabled"} //prettier-ignore
              onClick={() => {HandleTransferModelsDataModeSwitch("import")}} //prettier-ignore
            >
              <div className="transfer_models_data_button_description">import</div>
              <div className="transfer_models_data_button_icon">
                <FontAwesomeIcon icon={faDownload} style={{ width: "70%", height: "70%" }} />
              </div>
            </div>
            <div
              className={transfer_models_data_mode === "export" ? "transfer_models_data_button transfer_models_data_button_enabled" : "transfer_models_data_button transfer_models_data_button_disabled"} //prettier-ignore
              onClick={() => {HandleTransferModelsDataModeSwitch("export")}} //prettier-ignore
            >
              <div className="transfer_models_data_button_description">export</div>
              <div className="transfer_models_data_button_icon">
                <FontAwesomeIcon icon={faUpload} style={{ width: "70%", height: "70%" }} />
              </div>
            </div>
          </div>

          <div className="transfer_models_data_type_buttons_container_row">
            <div
              className={transfer_models_data_type === "code" ? "transfer_models_data_button transfer_models_data_button_enabled" : "transfer_models_data_button transfer_models_data_button_disabled"} //prettier-ignore
              onClick={() => {HandleTransferModelsDataTypeSwitch("code")}} //prettier-ignore
            >
              <div className="transfer_models_data_button_description">via code</div>
              <div className="transfer_models_data_button_icon">
                <FontAwesomeIcon icon={faKeyboard} style={{ width: "90%", height: "90%" }} />
              </div>
            </div>
            <div
              className={transfer_models_data_type === "file" ? "transfer_models_data_button transfer_models_data_button_enabled" : "transfer_models_data_button transfer_models_data_button_disabled"} //prettier-ignore
              onClick={() => {HandleTransferModelsDataTypeSwitch("file")}} //prettier-ignore
            >
              <div className="transfer_models_data_button_description">via .txt file</div>
              <div className="transfer_models_data_button_icon">
                <FontAwesomeIcon icon={faFile} style={{ width: "60%", height: "60%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transfer_models_data_main_content_container">
        {transfer_models_data_mode === "import" && transfer_models_data_type === "code" && (
          <>
            {/* prettier-ignore */}
            <div className="transfer_models_data_import_via_code_container">
              <input className="transfer_models_data_import_via_code_container_input" type="text" value={base_code_import_value} onChange={HandleBaseCodeImportValueChange} placeholder="Enter / paste the base code"/>
            </div>

            <div className="transfer_models_data_code_buttons_container">
              <div
                onClick={() => {ApplyImportedBaseCode()}} //prettier-ignore
                className="transfer_models_data_code_button"
              >
                <div className="transfer_models_data_code_button_description">apply</div>
                <div className="transfer_models_data_code_button_icon">
                  <FontAwesomeIcon icon={faCheck} style={{ width: "65%", height: "65%" }} />
                </div>
              </div>

              <div
                onClick={() => {ClearImportedBaseCode()}} //prettier-ignore
                className="transfer_models_data_code_button"
              >
                <div className="transfer_models_data_code_button_description">clear</div>
                <div className="transfer_models_data_code_button_icon">
                  <FontAwesomeIcon icon={faEraser} style={{ width: "75%", height: "75%" }} />
                </div>
              </div>
            </div>
          </>
        )}

        {transfer_models_data_mode === "import" && transfer_models_data_type === "file" && (
          <>
            {/* prettier-ignore */}
            <div className="transfer_models_data_import_remove_file_container">
              <FileUpload className="file_upload_container" ref={fileUploadRef} mode="advanced" name="demo[]" accept=".txt" maxFileSize={1000000} customUpload uploadHandler={ImportCanvasModelsDataFile} auto chooseLabel="Import base file"/>
              <button
                className={imported_file_size ? "file_upload_container_remove_button" : "file_upload_container_remove_button file_upload_container_remove_button_disabled"} //prettier-ignore
                onClick={removeFile}
              >
                Remove File
              </button>
            </div>
            <div className="file_upload_container_text">
              {imported_file_name ? `File: ${imported_file_name}` : "file name: empty"}
            </div>
            <div className="file_upload_container_text">
              {imported_file_size ? `Size: ${(imported_file_size / 1024).toFixed(2)} KB ` : "file size: empty"}
            </div>
          </>
        )}

        {transfer_models_data_mode === "import" && (
          <div className="transfer_models_data_base_place_button_container">
            <div
              onClick={() => {ToggleBasePlacing(), playSound("menu_sound")}} // prettier-ignore
              className={enable_base_placing ? "transfer_models_data_base_place_button transfer_models_data_base_place_button_enabled" : "transfer_models_data_base_place_button transfer_models_data_base_place_button_disabled"} //prettier-ignore
            >
              place the base {enable_base_placing ? "(on)" : "(off)"}
            </div>
          </div>
        )}

        {transfer_models_data_mode === "export" && transfer_models_data_type === "code" && (
          <>
            <div className="transfer_models_data_generate_base_code_container">
              <div
                onClick={() => {Base64DataCompression("code")}} // prettier-ignore
                className={enable_base_placing ? "transfer_models_data_generate_base_code_button transfer_models_data_generate_base_code_button_enabled" : "transfer_models_data_generate_base_code_button transfer_models_data_generate_base_code_button_disabled"} //prettier-ignore
              >
                generate the base code
              </div>
            </div>

            {/* prettier-ignore */}
            <div className="transfer_models_data_import_via_code_container">
              <input className="transfer_models_data_import_via_code_container_input" ref={inputRef} type="text" value={export_base_code} readOnly placeholder="generated code"/>
            </div>

            <div className="transfer_models_data_code_buttons_container">
              <div
                onClick={() => {CopyGeneratedBaseCode()}} //prettier-ignore
                className="transfer_models_data_code_button"
              >
                <div className="transfer_models_data_code_button_description">copy</div>
                <div className="transfer_models_data_code_button_icon">
                  <FontAwesomeIcon icon={faCopy} style={{ width: "65%", height: "65%" }} />
                </div>
              </div>

              <div
                onClick={() => {ClearGeneratedBaseCode()}} //prettier-ignore
                className="transfer_models_data_code_button"
              >
                <div className="transfer_models_data_code_button_description">clear</div>
                <div className="transfer_models_data_code_button_icon">
                  <FontAwesomeIcon icon={faEraser} style={{ width: "75%", height: "75%" }} />
                </div>
              </div>
            </div>
          </>
        )}

        {transfer_models_data_mode === "export" && transfer_models_data_type === "file" && (
          <>
            {/* prettier-ignore */}
            <div className="transfer_models_data_custom_file_name_input_container">
              <input className="transfer_models_data_custom_file_name_input" type="text" value={base_export_custom_file_name} onChange={HandleBaseDownloadCustomFileName} placeholder="name: rust_base_builder_base"/>
              <div className="transfer_models_data_custom_file_name_input_description">.txt</div>
            </div>
            <div
              onClick={() => {Base64DataCompression("export")}} //prettier-ignore
              className="transfer_models_data_file_download_button"
            >
              download the base <br /> .txt file
            </div>

            <div className="transfer_models_data_file_download_info">
              File not downloading = enable multiple file downloads in the browser (top-right corner)
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TransferModelsData;
