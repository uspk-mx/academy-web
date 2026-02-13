/* eslint-disable no-nested-ternary -- is a valid use case */
import { CircleX, LoaderCircle, PlusIcon, Search } from "lucide-react";
import type { ReactNode} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "gql-generated/generated/types";
import { Card, CardContent } from "ui/components/card";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { ScrollArea } from "ui/components/scroll-area";
import { getInitials } from "ui/lib/utils";

interface MultipleUserSelectorProps {
  userData: User[];
  addUser: (value: User) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  searchQuery: string;
  onSearch: (value: string) => void;
  ariaLabel: string;
  selectedUsers: User[];
  label?: string;
}

export function MultipleUserSelector({
  userData,
  addUser,
  isOpen,
  onOpenChange,
  searchQuery,
  onSearch,
  ariaLabel,
  selectedUsers,
  label,
}: MultipleUserSelectorProps): ReactNode {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(userData);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClearInput = (): void => {
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- is a valid use case
  const debouncedSearch = useCallback(
    useMemo(
      () =>
        // eslint-disable-next-line @typescript-eslint/require-await -- is a valid use case
        debounce(async (query: string) => {
          setIsLoading(true);
          try {
            const filteredUsers = users.filter(
              (user) => user.fullName === query
            );
            setUsers(filteredUsers);
            onOpenChange(true);
          } finally {
            setIsLoading(false);
          }
        }, 300),
      [onOpenChange, users]
    ),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setUsers([]);
      onOpenChange(false);
    }
  }, [searchQuery, debouncedSearch, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onOpenChange]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) => !selectedUsers.some((selected) => selected.id === user.id)
      ),
    [users, selectedUsers]
  );

  return (
    <div className="relative">
      <div className="space-y-2">
        {label ? (
          <Label htmlFor="search-input">{label}</Label>
        ) : (
          <Label className="sr-only" htmlFor="search-input">
            {ariaLabel}
          </Label>
        )}
        <div className="relative">
          <Input
            className="pe-9 peer ps-9"
            id="search-input"
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            placeholder="Search..."
            type="text"
            value={searchQuery}
          />
          <div className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground/80 pointer-events-none ps-3 start-0">
            {isLoading ? (
              <LoaderCircle
                aria-hidden="true"
                className="animate-spin"
                role="presentation"
                size={16}
                strokeWidth={2}
              />
            ) : (
              <Search aria-hidden="true" size={16} strokeWidth={2} />
            )}
          </div>
          {searchQuery ? (
            <button
              aria-label="Clear input"
              className="absolute inset-y-0 flex justify-center items-center disabled:opacity-50 zoom-in-75 border border-transparent focus-visible:border-ring rounded-e-lg focus-visible:ring-2 focus-visible:ring-ring/30 ring-offset-background focus-visible:ring-offset-2 w-9 h-full text-muted-foreground/80 hover:text-foreground focus-visible:text-foreground transition-shadow animate-in disabled:cursor-not-allowed disabled:pointer-events-none end-0 fade-in focus-visible:outline-none"
              onClick={handleClearInput}
              type="button"
            >
              <CircleX aria-hidden="true" size={16} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>
      {searchQuery && isOpen ? (
        <Card className="z-10 absolute shadow-lg mt-1 w-full">
          <CardContent className="p-0">
            <ScrollArea className="max-h-[300px]">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  Loading...
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="gap-2 grid p-2">
                  {filteredUsers.map((user) => (
                    <div
                      className="flex justify-between items-center hover:bg-accent p-2 rounded-lg"
                      key={user.id}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            alt={user.fullName}
                            src={user.profilePicture ?? ""}
                          />
                          <AvatarFallback>
                            {getInitials(user.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {user.fullName}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="rounded-full size-6"
                        onClick={() => {
                          addUser(user);
                        }}
                        size="icon"
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No se encontraron usuarios.
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

// Utility function for debouncing
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- is a valid use case
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- is a valid use case
    timeout = setTimeout(() => func(...args), wait);
  };
}
