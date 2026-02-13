export const VideoMetadataDisplay = ({ duration }: { duration: number }) => {
  const formatDuration = (durationSec: number) => {
    const hours = Math.floor(durationSec / 3600); // Get the hours
    const minutes = Math.floor((durationSec % 3600) / 60); // Get the minutes
    const seconds = durationSec % 60; // Get the remaining seconds

    let formattedDuration = "";

    // Add hours if present
    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }

    // Add minutes if present
    if (minutes > 0 || hours > 0) {
      // Include minutes if there's at least one hour or minutes
      formattedDuration += `${minutes}m `;
    }

    // Add seconds if present
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      // Include seconds if no hours/minutes or if it's just seconds
      formattedDuration += `${seconds}s`;
    }

    return formattedDuration.trim(); // Trim any trailing spaces
  };

  return <p className="text-xs text-slate-700">{formatDuration(duration)}</p>;
};
