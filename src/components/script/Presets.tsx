const Preset = () => {
  return (
    <>
      <div className="presets_container">
        <div className="preset preset_a">
          <button className="preset_button preset_a"></button>
          <span className="preset_name_text">A</span>
        </div>

        <div className="preset preset_b">
          <button className="preset_button preset_b"></button>
          <span className="preset_name_text">B</span>
        </div>

        <div className="preset preset_c">
          <button className="preset_button preset_c"></button>
          <span className="preset_name_text">C</span>
        </div>

        <div className="preset preset_d">
          <button className="preset_button preset_d"></button>
          <span className="preset_name_text">D</span>
        </div>

        <div className="preset preset_e">
          <button className="preset_button preset_e"></button>
          <span className="preset_name_text">E</span>
        </div>
      </div>
    </>
  );
};

export default Preset;
