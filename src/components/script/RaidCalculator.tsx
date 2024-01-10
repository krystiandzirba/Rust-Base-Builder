export default function RaidCalculator() {
  return (
    <>
      <div className="raid_type_main_container">
        <div className="raid_type_button">most efficient (automatic)</div>
        <div className="raid_type_button">rocket</div>
        <div className="raid_type_button">explosives</div>
        <div className="raid_type_button">exp. 5.56</div>
        <div className="raid_type_button">satchel</div>
      </div>

      <div className="main_container raid_tools_cost_main_container">
        <div className="cost_description">raid cost (tools)</div>
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
                <div>0</div>
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
                <div>0</div>
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
                <div>0</div>
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
