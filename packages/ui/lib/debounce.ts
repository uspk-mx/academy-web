type DebounceFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay = 300
): DebounceFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the previous timeout
    }

    timeoutId = setTimeout(() => {
      func(...args); // Execute the function with provided arguments
    }, delay);
  };
}
