import { useState } from "react";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Alert box if mobile device is detected
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function MobileAlert() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [continue_to_app, set_continue_to_app] = useState<boolean>(false);

  return (
    <>
      {isMobile && !continue_to_app && (
        <div className="mobile_alert_container">
          <p className="mobile_alert_text">
            Mobile version is not yet supported <br /> For optimal performance and experience, please use your PC
          </p>
          <button className="mobile_alert_confirm" onClick={() => set_continue_to_app(true)}>
            continue anyway
          </button>
        </div>
      )}
    </>
  );
}
