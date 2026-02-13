import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { SearchInput } from "ui/components/search-input";
import { ChevronDown, Plus } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { cn } from "ui/lib/utils";

// Utility function to get sort label
const getSortLabel = (sortBy: string) => {
  const labels: Record<string, string> = {
    all: "Todos",
    notStarted: "Por empezar",
    inProgress: "En progreso",
    "a-z": "A-Z",
    "z-a": "Z-A",
  };
  return labels[sortBy] || labels.all;
};

export const CourseFilters = ({
  isLoading,
  onSearch,
  ctaLabel,
  ctaHref,
  ctaStatus,
  ctaAction,
  className,
}: {
  isLoading: boolean;
  onSearch?: (query: string) => void;
  ctaLabel?: string;
  ctaHref?: string;
  ctaAction?: () => void;
  ctaStatus?: "disabled" | "active";
  className?: string;
}): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "newest";
  const searchTerm = searchParams.get("q") || "";
  const navigate = useNavigate();

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const query = formData.get("q") as string;
    onSearch?.(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  return (
    <div className={cn("flex items-center w-full gap-4", className)}>
      <form onSubmit={handleSearch}>
        <SearchInput
          placeholder="Busca tus cursos"
          name="q"
          isLoading={isLoading}
          defaultValue={searchTerm}
        />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="noShadowNeutral">
            {getSortLabel(sortBy)}
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={sortBy}
            onValueChange={handleSortChange}
          >
            <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="notStarted">
              Sin empezar
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="inProgress">
              En progreso
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="a-z">A-Z</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="z-a">Z-A</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {ctaLabel ? (
        <Button
          className="aspect-square max-sm:p-0 ml-auto"
          onClick={ctaAction ? ctaAction : () => navigate(ctaHref ?? "")}
          disabled={ctaStatus === "disabled"}
        >
          <Plus
            className="opacity-60 sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">{ctaLabel}</span>
        </Button>
      ) : null}
    </div>
  );
};
