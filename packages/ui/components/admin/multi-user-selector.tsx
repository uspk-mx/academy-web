;

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn, getInitials } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "ui/components/command";
import { Label } from "ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "ui/components/popover";

interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
}

interface MultiUserSelectorProps {
  label?: string;
  users: User[];
  selectedUsers: string[];
  onSelectUsers: (users: string[]) => void;
}

export function MultiUserSelector({
  label,
  users,
  selectedUsers,
  onSelectUsers,
}: MultiUserSelectorProps): React.ReactNode {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      onSelectUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      onSelectUsers([...selectedUsers, userId]);
    }
  };

  const handleRemove = (userId: string) => {
    onSelectUsers(selectedUsers.filter((id) => id !== userId));
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='neutral'
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {selectedUsers.length > 0
              ? `${selectedUsers?.length} user${selectedUsers?.length > 1 ? "s" : ""} selected`
              : "Select users..."}
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[400px]">
          <Command>
            <CommandInput
              placeholder="Search users..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelect(user.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.fullName}
                    />
                    <AvatarFallback>
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.fullName}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedUsers.includes(user.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedUsers.map((userId) => {
            const user = users.find((u) => u.id === userId);
            if (!user) return null;
            return (
              <Badge
                key={user.id}
                variant='neutral'
                className="flex items-center gap-1"
              >
                <Avatar className="w-5 h-5">
                  <AvatarImage src={user.profilePicture} alt={user.fullName} />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                {user.fullName}
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 w-4 h-4"
                  onClick={() => handleRemove(user.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
