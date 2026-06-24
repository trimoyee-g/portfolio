export function detectOS() {
  const override = new URLSearchParams(window.location.search).get("os");
  if (override === "mac" || override === "windows") return override;

  if (typeof navigator === "undefined") return "mac";
  if (navigator?.userAgentData?.platform) {
    const p = navigator.userAgentData.platform.toLowerCase();
    if (p.includes("mac")) return "mac";
    if (p.includes("win")) return "windows";
  }
  const ua = navigator.userAgent || "";
  if (/Mac/.test(ua)) return "mac";
  if (/Win/.test(ua)) return "windows";
  return "mac";
}
