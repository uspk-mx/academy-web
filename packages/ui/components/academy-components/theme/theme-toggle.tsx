import { Moon, Sun } from "lucide-react";
import { Button } from "../../button";
import { useTheme } from "./theme-provider";

export function ThemeToggle({
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      {...rest}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:text-white" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-white" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
