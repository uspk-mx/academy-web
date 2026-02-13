import { Plus, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { User } from "gql-generated/generated/types";
import { useParams } from "react-router";
import { Card, CardContent } from "ui/components/card";
import { Button } from "ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { Separator } from "ui/components/separator";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { UserSelector } from "./user-selector";

export function AddEnrollmentDialog({
  users,
  enrollments,
  onUpdateEnrollments,
  isUpdating,
}: {
  users: User[];
  enrollments: any[];
  onUpdateEnrollments: () => void;
  isUpdating?: boolean;
}): ReactNode {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    enrollments.map((item) => item.User)
  );
  const [searchUsers, setSearchUsers] = useState("");
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const { cid: courseID } = useParams();

  const addUser = (user: User) => {
    if (!selectedUsers.some((i) => i.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchUsers("");
    setIsSearchBoxOpen(false);
  };

  const removeUser = (userID: string) => {
    setSelectedUsers(selectedUsers.filter((i) => i.id !== userID));
  };

  return (
    <div className="ml-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">
            <Plus className="mr-2 w-4 h-4" /> Agregar estudiante
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 max-w-2xl">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Agregar estudiantes</DialogTitle>
            <DialogDescription>
              Busca y selecciona los estudiantes que quieras agregar, despues
              guarda tus cambios.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="gap-4 grid px-6">
            <UserSelector
              addUser={addUser}
              ariaLabel="Busca un estudiante"
              isOpen={isSearchBoxOpen}
              onOpenChange={setIsSearchBoxOpen}
              onSearch={setSearchUsers}
              searchQuery={searchUsers}
              selectedUsers={selectedUsers}
              userData={users}
            />
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 px-6 pt-2">
            {selectedUsers.map((user, index) => (
              <Card key={index}>
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex items-center">
                    <Avatar className="mr-3 w-10 h-10">
                      <AvatarImage
                        alt={user.fullName}
                        src={user.profilePicture || ""}
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span>{user.fullName}</span>
                      <span className="text-muted-foreground text-xs">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      removeUser(user.id);
                    }}
                    size="icon"
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter className="md:justify-end md:gap-4 p-6">
            <DialogClose asChild>
              <Button variant="neutral">Cancelar</Button>
            </DialogClose>
            <form action={onUpdateEnrollments}>
              <input name="courseID" type="hidden" value={courseID} />
              <input
                name="enrollmentIDs"
                type="hidden"
                value={JSON.stringify(selectedUsers.map((item) => item.id))}
              />
              <Button disabled={isUpdating} type="submit">
                {isUpdating ? "Guardando cambios" : "Guardar cambios"}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
