import { getGPUTier } from "detect-gpu";
import { useDispatch } from "react-redux";
import {
  set_hardware_gpu,
  set_hardware_tier,
  set_hardware_is_mobile,
  set_hardware_monitor_resolution,
} from "../../Store.tsx";
import { useEffect } from "react";

export default function Version() {
  const dispatch = useDispatch();

  useEffect(() => {
    const assignGpuTier = (gpu: string) => {
      if (
        gpu === "nvidia geforce rtx 4090" ||
        gpu === "amd radeon rx 7900 xtx" ||
        gpu === "nvidia geforce rtx 4080 super" ||
        gpu === "nvidia geforce rtx 4080" ||
        gpu === "amd radeon rx 7900 xt" ||
        gpu === "nvidia geforce rtx 4070 ti super" ||
        gpu === "nvidia geforce rtx 4070 ti" ||
        gpu === "amd radeon rx 7900 gre" ||
        gpu === "nvidia geforce rtx 4070 super" ||
        gpu === "amd radeon rx 6950 xt" ||
        gpu === "nvidia geforce rtx 3090 ti" ||
        gpu === "amd radeon rx 7800 xt" ||
        gpu === "nvidia geforce rtx 3090" ||
        gpu === "amd radeon rx 6900 xt" ||
        gpu === "nvidia geforce rtx 3080 ti" ||
        gpu === "amd radeon rx 6800 xt" ||
        gpu === "nvidia geforce rtx 3080 12gb" ||
        gpu === "nvidia geforce rtx 4070" ||
        gpu === "nvidia geforce rtx 4080 laptop gpu" ||
        gpu === "nvidia geforce rtx 3080" ||
        gpu === "amd radeon rx 7700 xt" ||
        gpu === "amd radeon rx 6800" ||
        gpu === "nvidia geforce rtx 3070 ti" ||
        gpu === "amd radeon rx 6750 xt" ||
        gpu === "nvidia geforce rtx 4060 ti 16gb" ||
        gpu === "nvidia geforce rtx 4060 ti" ||
        gpu === "nvidia geforce rtx titan"
      ) {
        dispatch(set_hardware_tier("tier_3"));
      } else if (
        gpu === "amd radeon rx 6700 xt" ||
        gpu === "nvidia geforce rtx 3070" ||
        gpu === "nvidia geforce rtx 2080 ti" ||
        gpu === "amd radeon rx 7600 xt" ||
        gpu === "nvidia geforce rtx 3060 ti" ||
        gpu === "nvidia geforce rtx 3080 laptop gpu" ||
        gpu === "amd radeon rx 6700 10gb" ||
        gpu === "nvidia geforce rtx 4070 laptop gpu" ||
        gpu === "nvidia geforce rtx 2080 super" ||
        gpu === "nvidia geforce rtx 4060" ||
        gpu === "nvidia geforce rtx 2080" ||
        gpu === "nvidia geforce rtx 3070 ti laptop gpu" ||
        gpu === "amd radeon rx 7600" ||
        gpu === "amd radeon rx 6650 xt" ||
        gpu === "nvidia geforce rtx 2070 super" ||
        gpu === "nvidia geforce rtx 3070 laptop gpu" ||
        gpu === "nvidia geforce rtx 4060 laptop gpu" ||
        gpu === "intel arc a770 16gb" ||
        gpu === "intel arc a770 8gb" ||
        gpu === "amd radeon rx 6600 xt" ||
        gpu === "amd radeon rx 5700 xt" ||
        gpu === "nvidia geforce rtx 4050 laptop gpu" ||
        gpu === "nvidia geforce rtx 3060" ||
        gpu === "intel arc a750" ||
        gpu === "nvidia geforce rtx 2070" ||
        gpu === "amd radeon vii" ||
        gpu === "nvidia geforce gtx 1080ti" ||
        gpu === "nvidia geforce rtx 2060 super" ||
        gpu === "amd radeon rx 6600" ||
        gpu === "intel arc a580" ||
        gpu === "amd radeon rx 5700" ||
        gpu === "amd radeon rx 5600 xt" ||
        gpu === "amd radeon rx vega 64" ||
        gpu === "nvidia geforce rtx 2060" ||
        gpu === "nvidia geforce gtx 1080" ||
        gpu === "nvidia geforce rtx 3050" ||
        gpu === "nvidia geforce rtx 3060 laptop gpu" ||
        gpu === "nvidia geforce gtx 1070 ti" ||
        gpu === "amd radeon rx vega 56" ||
        gpu === "nvidia geforce gtx 1660 super" ||
        gpu === "nvidia geforce gtx 1660 ti" ||
        gpu === "nvidia geforce gtx 1070" ||
        gpu === "nvidia geforce gtx 1660" ||
        gpu === "amd radeon rx 5500 xt 8gb" ||
        gpu === "amd radeon rx 590" ||
        gpu === "nvidia geforce gtx 980 ti" ||
        gpu === "amd radeon rx 580 8gb" ||
        gpu === "amd radeon r9 fury x" ||
        gpu === "nvidia geforce rtx 3050 ti laptop gpu" ||
        gpu === "nvidia geforce gtx 1650 super" ||
        gpu === "nvidia geforce rtx 3050 laptop gpu" ||
        gpu === "amd radeon rx 5500 xt 4gb" ||
        gpu === "nvidia geforce gtx 1060 6gb"
      ) {
        dispatch(set_hardware_tier("tier_2"));
      } else if (
        gpu === "amd radeon rx 6500 xt" ||
        gpu === "amd radeon r9 390" ||
        gpu === "nvidia geforce gtx 980" ||
        gpu === "nvidia geforce gtx 1650 gddr6" ||
        gpu === "intel arc a380" ||
        gpu === "amd radeon rx 570 4gb" ||
        gpu === "nvidia geforce gtx 1650" ||
        gpu === "nvidia geforce gtx 970" ||
        gpu === "amd radeon rx 6400" ||
        gpu === "nvidia geforce gtx 1050 ti" ||
        gpu === "nvidia geforce gtx 1060 3gb" ||
        gpu === "nvidia geforce gtx 960" ||
        gpu === "nvidia geforce gtx 1630" ||
        gpu === "amd radeon rx 560 4gb" ||
        gpu === "nvidia geforce gtx 1050" ||
        gpu === "nvidia geforce gtx 750 ti" ||
        gpu === "amd radeon rx 550 4gb" ||
        gpu === "nvidia geforce gtx 1030" ||
        gpu === "nvidia geforce gtx 730"
      ) {
        dispatch(set_hardware_tier("tier_1"));
      } else {
        dispatch(set_hardware_tier("gpu not detected"));
      }
    };

    (async () => {
      const gpu_tier = await getGPUTier();
      dispatch(set_hardware_gpu(gpu_tier.gpu ?? "gpu tier unknown"));
      dispatch(set_hardware_is_mobile(gpu_tier.isMobile));
      assignGpuTier(gpu_tier.gpu ?? "gpu not detected");
      dispatch(set_hardware_monitor_resolution({ width: window.screen.width, height: window.screen.height }));
    })();
  }, [dispatch]);

  return null;
}
