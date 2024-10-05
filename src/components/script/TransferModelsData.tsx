// TransferModelsData.tsx
import React, { useEffect, useRef, useState } from "react";
import { RootState, set_create_prebuilt_base_state, set_model_creation_state, set_model_type_to_create, set_prebuilt_base_objects_set} from "../../Store.tsx"; //prettier-ignore
import { useDispatch, useSelector } from "react-redux";
import { FileUpload } from "primereact/fileupload";

import pako from "pako";

import { useAudioPlayer } from "./AudioPlayer.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faEraser } from "@fortawesome/free-solid-svg-icons"; //prettier-ignore

interface ModelData {model: string, position: { x: number; y: number; z: number }, rotation: { x: number; y: number; z: number }} //prettier-ignore
interface TransferModelsDataProps {canvas_models_data: { [id: string]: ModelData }, data_index: number} //prettier-ignore

const TransferModelsData: React.FC<TransferModelsDataProps> = ({ canvas_models_data, data_index }) => {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const [transfer_models_data_type, set_transfer_models_data_type] = useState<string>("export");
  const [enable_base_placing, set_enable_base_placing] = useState<boolean>(false);

  const inputRef = useRef(null);
  const fileUploadRef = useRef<any>(null);

  const [imported_file_name, set_imported_file_name] = useState<string>("");
  const [imported_file_size, set_imported_file_size] = useState<number | null>(null);
  const [base_code_import_value, set_base_code_import_value] = useState<string>("");
  const [imported_base_data_length, set_imported_base_data_length] = useState<number>(0);
  const [decompressed_data, set_decompressed_data] = useState<string>("");

  const [compressed_data, set_compressed_data] = useState<string>("");
  const [export_base_code, set_export_base_code] = useState<string>("");

  const [loading_bar_info, set_loading_bar_info] = useState<string>("Export the base");

  const model_type_to_create = useSelector((state: RootState) => state.modelsData.model_type_to_create);
  const prebuilt_base_objects_set = useSelector((state: RootState) => state.modelsData.prebuilt_base_objects_set); //prettier-ignore

  //[SectionNav] import data, export data
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Data Transfer (Import + Export) ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function ExportCanvasModelsDataFile() {
    const blob = new Blob([compressed_data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rust_base_builder_base.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const ImportCanvasModelsDataFile = (event: { files: any[] }) => {
    const file = event.files[0];

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

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const removeFile = () => {
    playSound("buttons_sound");
    //  if (fileUploadRef.current) {
    fileUploadRef.current.clear();
    set_imported_file_name("");
    set_imported_file_size(null);
    set_decompressed_data("");
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_model_creation_state(false));
    dispatch(set_model_type_to_create(""));
    dispatch(set_prebuilt_base_objects_set([]));
    set_loading_bar_info("File removed");
    //  }
  };

  function ToggleBasePlacing() {
    if (!enable_base_placing) {
      dispatch(set_create_prebuilt_base_state(true));
      dispatch(set_model_creation_state(true));
      dispatch(set_model_type_to_create("ImportedBase"));
      dispatch(set_prebuilt_base_objects_set(decompressed_data));

      //////////////////////// rework

      //  if (Object.keys(prebuilt_base_objects_set).length > 0) {
      set_loading_bar_info("Imported base models");
      //  } else {
      //    set_loading_bar_info("Invalid file");
      //  }

      //////////////////////// rework
    } else {
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

  return (
    <div className="transfer_models_data_main_container">
      <div className={"transfer_models_data_progress_bar_container"}>
        <progress className={"transfer_models_data_progress_bar"} value={data_index} max={imported_base_data_length} />
        <div className="transfer_models_data_progress_bar_text">
          {loading_bar_info}
          {loading_bar_info === "Imported base models" && ` ${data_index}/${imported_base_data_length}`}
        </div>
      </div>
      <div className="transfer_models_data_type_buttons">
        <div
          className={
            transfer_models_data_type === "import"
              ? "transfer_models_data_button transfer_models_data_button_enabled"
              : "transfer_models_data_button transfer_models_data_button_disabled"
          }
          onClick={() => {set_transfer_models_data_type("import") , set_loading_bar_info("Import the base"), playSound("menu_sound")}} //prettier-ignore
        >
          import
        </div>
        <div
          className={
            transfer_models_data_type === "export"
              ? "transfer_models_data_button transfer_models_data_button_enabled"
              : "transfer_models_data_button transfer_models_data_button_disabled"
          }
          onClick={() => {set_transfer_models_data_type("export"), set_loading_bar_info("Export the base"), playSound("menu_sound")}} //prettier-ignore
        >
          export
        </div>
      </div>

      {transfer_models_data_type === "import" && (
        <div className="transfer_models_data_content_container">
          <div className="transfer_models_data_import_generate_base_button_container">
            <div
              className={
                enable_base_placing
                  ? "transfer_models_data_import_generate_base_button transfer_models_data_import_generate_base_button_enabled"
                  : "transfer_models_data_import_generate_base_button transfer_models_data_import_generate_base_button_disabled"
              }
              onClick={() => {
                ToggleBasePlacing(), playSound("buttons_sound");
              }}
            >
              place the imported base {enable_base_placing ? "(on)" : "(off)"}
            </div>
          </div>

          <div className="transfer_models_data_code_container">
            <div
              className="transfer_models_data_code_container_button"
              onClick={() => {playSound("buttons_sound"), set_decompressed_data(Base64DataDecompress(base_code_import_value)), set_loading_bar_info("Base code applied")}} //prettier-ignore
            >
              <FontAwesomeIcon icon={faCheck} style={{ width: "55%", height: "55%" }} />
              apply
            </div>
            <div
              className="transfer_models_data_code_container_button"
              onClick={() => {set_base_code_import_value(""), set_loading_bar_info("Base code cleared"), playSound("buttons_sound")}} //prettier-ignore
            >
              <FontAwesomeIcon icon={faEraser} style={{ width: "55%", height: "55%" }} />
              clear
            </div>

            <input
              className="transfer_models_data_code_input"
              type="text"
              value={base_code_import_value}
              onChange={HandleBaseCodeImportValueChange}
              placeholder="Enter / paste the base code"
            />
          </div>
          {/* prettier-ignore */}
          <div className="transfer_models_data_file">
            <FileUpload className="file_upload_container" ref={fileUploadRef} mode="advanced" name="demo[]" accept=".txt" maxFileSize={1000000} customUpload uploadHandler={ImportCanvasModelsDataFile} auto chooseLabel="Import base file" />
            <div className="file_upload_container_text">{imported_file_name ? `File: ${imported_file_name}` : "file name: empty"}</div>
            <div className="file_upload_container_text">{imported_file_size ? `Size: ${(imported_file_size / 1024).toFixed(2)} KB ` : "file size: empty"}</div>
            <button className= {imported_file_size ? "file_upload_container_remove_button" : "file_upload_container_remove_button file_upload_container_remove_button_disabled"} onClick={removeFile}>
              Remove File
            </button>
          </div>
        </div>
      )}

      {transfer_models_data_type === "export" && (
        <div className="transfer_models_data_content_container">
          <div className="transfer_models_data_import_generate_base_button_container">
            <div
              className="transfer_models_data_import_generate_base_button transfer_models_data_import_generate_base_button_disabled"
              onClick={() => {
                Base64DataCompression("code"), playSound("buttons_sound");
              }}
            >
              generate the base code
            </div>
          </div>

          <div className="transfer_models_data_code_container">
            <div
              className="transfer_models_data_code_container_button"
              onClick={() => {navigator.clipboard.writeText(export_base_code), set_loading_bar_info("Base code copied to clipboard"), playSound("buttons_sound")}} //prettier-ignore
            >
              <FontAwesomeIcon icon={faCopy} style={{ width: "55%", height: "55%" }} />
              copy
            </div>
            <div
              className="transfer_models_data_code_container_button"
              onClick={() => {set_export_base_code(""), set_loading_bar_info("Base code cleared"), playSound("buttons_sound")}} //prettier-ignore
            >
              <FontAwesomeIcon icon={faEraser} style={{ width: "55%", height: "55%" }} />
              clear
            </div>

            <input
              className="transfer_models_data_code_input"
              ref={inputRef}
              type="text"
              value={export_base_code}
              readOnly
              placeholder="↑ generate code or download ↓"
            />
          </div>
          <div
            className="transfer_models_data_file"
            onClick={() => {Base64DataCompression("export"), playSound("buttons_sound")}} //prettier-ignore
          >
            <div className="transfer_models_data_file_download_button">download the base</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferModelsData;
