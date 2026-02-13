import { useState } from "react";
import { toast } from "sonner";
import type { UseMutationExecute, UseQueryExecute } from "urql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "ui/components/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";
import type { Exact, Scalars, UnassignInstructorMutation, User } from "gql-generated/generated/types";
import { getInitials } from "ui/lib/utils";

export function EnrollmentsCard({
  refecthEnrollments,
  enrollments,
  onDeleteUser,
  courseId,
  isDeleting,
}: {
  refecthEnrollments: UseQueryExecute
  enrollments: Omit<User, "createdAt" | "updatedAt">[];
  courseId: string;
  onDeleteUser: UseMutationExecute<
    UnassignInstructorMutation,
    Exact<{
      userId: Scalars["ID"]["input"];
      courseId: Scalars["ID"]["input"];
    }>
  >;
  isDeleting?: boolean;
}) {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const onSelectUser = (userID: string): void => {
    setSelectedUser(userID);
  };

  const handleUnassignUser = async (userID: string): Promise<void> => {
    try {
      await onDeleteUser({
        userId: userID,
        courseId,
      });
     refecthEnrollments({ requestPolicy: "network-only" });
      toast.success("Desaginado correctamente", { position: "top-right" });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Oops! algo salio mal, intentalo nuevamente!", {
        description: error as string,
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <Separator className="my-6" />
      <div className="space-y-4">
        <div className="font-medium text-sm">Usuarios asignados</div>
        {enrollments.length > 0 ? (
          enrollments.map((item) => (
            <div className="gap-6 grid" key={item.id}>
              <div className="flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage alt="" src={item.profilePicture ?? ""} />
                    <AvatarFallback>
                      {getInitials(item.fullName || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm leading-none">
                      {item.fullName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.email}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      onClick={(e) => {
                        onSelectUser(item.id);
                      }}
                      type="button"
                      variant="ghost"
                    >
                      Desasignar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Desasignar usuario?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto desasignara el
                        usuario del curso.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <form
                        action={() => {
                          handleUnassignUser(selectedUser);
                        }}
                        className="flex gap-4"
                      >
                        <input
                          defaultValue={
                            enrollments.find((user) => user.id === selectedUser)
                              ?.id
                          }
                          name="enrollmentID"
                          type="hidden"
                        />
                        <AlertDialogCancel
                          onClick={() => {
                            setSelectedUser("");
                          }}
                          type="button"
                        >
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction type="submit">
                          {isDeleting ? "Desasignando" : "Confirmar"}
                        </AlertDialogAction>
                      </form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <p>Sin usuarios asignados al curso</p>
        )}
      </div>
    </div>
  );
}
