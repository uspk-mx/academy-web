import type { ReactNode } from "react";
import { useId } from "react";
import type { User } from "gql-generated/generated/types";
import { getInitials } from "ui/lib/utils";
import { Label } from "ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";

interface UserSelectorProps {
  label?: string;
  users: Pick<User, "id" | "fullName" | "email" | "profilePicture">[];
  selectedUser?: string;
  onSelectUser?: (value: string) => void;
  placeholder?: string
}

export function UserSelector({
  label,
  users,
  selectedUser,
  onSelectUser,
  placeholder
}: UserSelectorProps): ReactNode {
  const id = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={selectedUser}
        onValueChange={(value) => {
          onSelectUser?.(value);
        }}
      >
        <SelectTrigger
          className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
          id={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <span className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    alt={user.fullName}
                    src={user.profilePicture || ""}
                  />
                  <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>

                <span>
                  <span className="block font-medium">{user.fullName}</span>
                  <span className="block mt-0.5 text-muted-foreground text-xs">
                    {user.email}
                  </span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
