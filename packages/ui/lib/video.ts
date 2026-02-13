export function getYouTubeVideoId(url: string): string {
  if (!url) return "";

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    // youtube.com/watch?v=ID format
    if (hostname.includes("youtube.com") && searchParams.has("v")) {
      return searchParams.get("v") || "";
    }

    // youtu.be/ID format
    if (hostname === "youtu.be") {
      return pathname.substring(1);
    }

    // youtube.com/embed/ID format
    if (hostname.includes("youtube.com") && pathname.startsWith("/embed/")) {
      return pathname.split("/")[2];
    }

    // youtube.com/v/ID format
    if (hostname.includes("youtube.com") && pathname.startsWith("/v/")) {
      return pathname.split("/")[2];
    }

    return "";
  } catch (error) {
    // Return empty string if URL is invalid
    return "";
  }
}
