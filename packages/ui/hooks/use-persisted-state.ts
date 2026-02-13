import { useEffect, useState } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T
): readonly [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- we return any type <T>
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
