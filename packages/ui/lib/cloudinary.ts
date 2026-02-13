// TODO: move this to env
export const CLOUDINARY_CLOUD_NAME = "uspk";
export const CLOUDINARY_UPLOAD_PRESET = "academy";

export async function uploadFileToCloudinary(
  file: File,
  resourceType: "image" | "video"
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    const data = resourceType === "image" ? result.secure_url : result;
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
    return null;
  }
}

/**
 * Extracts the filename from a Cloudinary URL.
 * @param url The Cloudinary URL
 * @returns The extracted filename
 */
export function extractFilenameFromCloudinaryUrl(url: string): string {
  // Use a regular expression to match the filename
  const match = url.match(/\/([^/]+)\.([^.]+)$/);

  if (match && match[1] && match[2]) {
    // If we have a match, return the filename with its extension
    return `${match[1]}.${match[2]}`;
  }

  // If no match is found, return the original URL
  return url;
}

export function extractFilenameFromUrl(url: string): string {
  // For Digital Ocean URLs, split by known directories and take the last part
  const digitalOceanPaths = [
    "attachments/",
    "images/",
    "videos/",
    "course-intro-videos/",
    "lesson-videos/",
    "uploads/",
    "audios/",
  ];

  if (url.includes("cloudflarestorage.com")) {
    for (const path of digitalOceanPaths) {
      if (url.includes(path)) {
        const match = url.split(path).pop();
        return match || url;
      }
    }
  }

  // Keep existing Cloudinary logic
  const match = url.match(/\/([^/]+)\.([^.]+)$/);
  if (match && match[1] && match[2]) {
    return `${match[1]}.${match[2]}`;
  }

  return url;
}

export function extractFilenamesFromSpacesUrls(urls: string[]): string[] {
  return urls.map(extractFilenameFromUrl);
}

/**
 * Extracts filenames from an array of Cloudinary URLs.
 * @param urls Array of Cloudinary URLs
 * @returns Array of extracted filenames
 */
export function extractFilenamesFromCloudinaryUrls(urls: string[]): string[] {
  return urls.map(extractFilenameFromCloudinaryUrl);
}

export async function fetchCloudinaryResources(resourceName: string) {
  const API_URL = process.env.API_TARGET;
  try {
    // TODO: move api to env
    const response = await fetch(
      `${API_URL}/externals/cloudinary/resources?resourceName=${resourceName}`
    );
    if (!response.ok) throw new Error("Failed to fetch Cloudinary resources");

    const data = await response.json();
    return data.resources;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Removes the file extension from a filename.
 * Handles cases with multiple dots and no extension.
 *
 * @param filename The filename to process.
 * @returns The filename without the extension, or the original filename if no extension is found.
 */

export function removeFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return filename; // No extension found
  }

  return filename.substring(0, lastDotIndex);
}
