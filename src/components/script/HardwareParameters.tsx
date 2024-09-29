import { getGPUTier } from "detect-gpu";
import { useDispatch } from "react-redux";
import { set_hardware_gpu, set_hardware_tier, set_hardware_is_mobile, set_hardware_monitor_resolution } from "../../Store.tsx"; //prettier-ignore
import { useEffect, useCallback } from "react";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Component that detects a user display resolution, mobile device and assings a GPU to a specific tier
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GetGpuTier = (gpu: string) => {
  const tier_3_gpus = [
    "nvidia geforce rtx 4090",
    "amd radeon rx 7900 xtx",
    "nvidia geforce rtx 4080 super",
    "nvidia geforce rtx 4080",
    "amd radeon rx 7900 xt",
    "nvidia geforce rtx 4070 ti super",
    "nvidia geforce rtx 4070 ti",
    "amd radeon rx 7900 gre",
    "nvidia geforce rtx 4070 super",
    "amd radeon rx 6950 xt",
    "nvidia geforce rtx 3090 ti",
    "amd radeon rx 7800 xt",
    "nvidia geforce rtx 3090",
    "amd radeon rx 6900 xt",
    "nvidia geforce rtx 3080 ti",
    "amd radeon rx 6800 xt",
    "nvidia geforce rtx 3080 12gb",
    "nvidia geforce rtx 4070",
    "nvidia geforce rtx 4080 laptop gpu",
    "nvidia geforce rtx 3080",
    "amd radeon rx 7700 xt",
    "amd radeon rx 6800",
    "nvidia geforce rtx 3070 ti",
    "amd radeon rx 6750 xt",
    "nvidia geforce rtx 4060 ti 16gb",
    "nvidia geforce rtx 4060 ti",
    "nvidia geforce rtx titan",
  ];

  const tier_2_gpus = [
    "amd radeon rx 6700 xt",
    "nvidia geforce rtx 3070",
    "nvidia geforce rtx 2080 ti",
    "amd radeon rx 7600 xt",
    "nvidia geforce rtx 3060 ti",
    "nvidia geforce rtx 3080 laptop gpu",
    "amd radeon rx 6700 10gb",
    "nvidia geforce rtx 4070 laptop gpu",
    "nvidia geforce rtx 2080 super",
    "nvidia geforce rtx 4060",
    "nvidia geforce rtx 2080",
    "nvidia geforce rtx 3070 ti laptop gpu",
    "amd radeon rx 7600",
    "amd radeon rx 6650 xt",
    "nvidia geforce rtx 2070 super",
    "nvidia geforce rtx 3070 laptop gpu",
    "nvidia geforce rtx 4060 laptop gpu",
    "intel arc a770 16gb",
    "intel arc a770 8gb",
    "amd radeon rx 6600 xt",
    "amd radeon rx 5700 xt",
    "nvidia geforce rtx 4050 laptop gpu",
    "nvidia geforce rtx 3060",
    "intel arc a750",
    "nvidia geforce rtx 2070",
    "amd radeon vii",
    "nvidia geforce gtx 1080ti",
    "nvidia geforce rtx 2060 super",
    "amd radeon rx 6600",
    "intel arc a580",
    "amd radeon rx 5700",
    "amd radeon rx 5600 xt",
    "amd radeon rx vega 64",
    "nvidia geforce rtx 2060",
    "nvidia geforce gtx 1080",
    "nvidia geforce rtx 3050",
    "nvidia geforce rtx 3060 laptop gpu",
    "nvidia geforce gtx 1070 ti",
    "amd radeon rx vega 56",
    "nvidia geforce gtx 1660 super",
    "nvidia geforce gtx 1660 ti",
    "nvidia geforce gtx 1070",
    "nvidia geforce gtx 1660",
    "amd radeon rx 5500 xt 8gb",
    "amd radeon rx 590",
    "nvidia geforce gtx 980 ti",
    "amd radeon rx 580 8gb",
    "amd radeon r9 fury x",
    "nvidia geforce rtx 3050 ti laptop gpu",
    "nvidia geforce gtx 1650 super",
    "nvidia geforce rtx 3050 laptop gpu",
    "amd radeon rx 5500 xt 4gb",
    "nvidia geforce gtx 1060 6gb",
  ];

  const tier_1_gpus = [
    "amd radeon rx 6500 xt",
    "amd radeon r9 390",
    "nvidia geforce gtx 980",
    "nvidia geforce gtx 1650 gddr6",
    "intel arc a380",
    "amd radeon rx 570 4gb",
    "nvidia geforce gtx 1650",
    "nvidia geforce gtx 970",
    "amd radeon rx 6400",
    "nvidia geforce gtx 1050 ti",
    "nvidia geforce gtx 1060 3gb",
    "nvidia geforce gtx 960",
    "nvidia geforce gtx 1630",
    "amd radeon rx 560 4gb",
    "nvidia geforce gtx 1050",
    "nvidia geforce gtx 750 ti",
    "amd radeon rx 550 4gb",
    "nvidia geforce gtx 1030",
    "nvidia geforce gtx 730",
  ];

  if (tier_3_gpus.includes(gpu.toLowerCase())) return "tier_3";
  if (tier_2_gpus.includes(gpu.toLowerCase())) return "tier_2";
  if (tier_1_gpus.includes(gpu.toLowerCase())) return "tier_1";

  return "gpu not detected";
};

export default function AssignGpuTier() {
  const dispatch = useDispatch();

  const assignGpuTier = useCallback(
    (gpu: string) => {
      const tier = GetGpuTier(gpu);
      dispatch(set_hardware_tier(tier));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchGpuTier = async () => {
      try {
        const gpu_tier = await getGPUTier();
        const gpuName = gpu_tier.gpu ?? "gpu not detected";
        dispatch(set_hardware_gpu(gpuName));
        dispatch(set_hardware_is_mobile(gpu_tier.isMobile));
        assignGpuTier(gpuName);
        dispatch(set_hardware_monitor_resolution({ width: window?.screen?.width ?? 0, height: window?.screen?.height ?? 0 })); //prettier-ignore
      } catch (error) {
        console.error("Failed to detect GPU tier:", error);
        dispatch(set_hardware_gpu("gpu not detected"));
      }
    };

    fetchGpuTier();
  }, [dispatch, assignGpuTier]);

  return null;
}
