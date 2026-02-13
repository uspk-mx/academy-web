import { useState, type ReactNode } from "react";
import { useParams } from "react-router";
import type { UseMutationExecute, UseQueryExecute } from 'urql';
import type {
  AssignInstructorMutationVariables,
  Exact,
  Scalars,
  UnassignInstructorMutation,
  User
} from "gql-generated/generated/types";
import { EnrollmentsCard } from "./enrollments-card";
import { UserSelector } from "./user-selector";

interface CourseEnrollmentsProps {
  users: User[];
  enrollments: Omit<User, 'createdAt' | 'updatedAt'>[];
  isDeleting?: boolean;
  onDeleteUser: UseMutationExecute<UnassignInstructorMutation, Exact<{
    userId: Scalars["ID"]["input"];
    courseId: Scalars["ID"]["input"];
}>>
  refecthEnrollments: UseQueryExecute;
  onAssingInstructor?: (variables: AssignInstructorMutationVariables) => void;
}

export function CourseEnrollments({
  users,
  enrollments,
  onDeleteUser,
  isDeleting,
  onAssingInstructor,
  refecthEnrollments,
}: CourseEnrollmentsProps): ReactNode {
  const [selectedUsers, setSelectedUsers] = useState<Omit<User, 'createdAt' | 'updatedAt'>[]>(enrollments);
  const [searchUsers, setSearchUsers] = useState("");
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const { cid: courseId } = useParams();

  const addUser = (user: User) => {
    if (!selectedUsers.some((i) => i.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      if (courseId && user.id) {
        onAssingInstructor?.({
          courseId,
          userId: user.id,
        });
      }
    }
    setSearchUsers("");
    setIsSearchBoxOpen(false);
  };

  const removeUser = (userID: string) => {
    setSelectedUsers(selectedUsers.filter((i) => i.id !== userID));
  };

  return (
    <>
      <div className="justify-between">
        <div className="gap-4 grid">
          <UserSelector
            addUser={addUser}
            ariaLabel="Busca un estudiante"
            isOpen={isSearchBoxOpen}
            onOpenChange={setIsSearchBoxOpen}
            onSearch={setSearchUsers}
            searchQuery={searchUsers}
            selectedUsers={selectedUsers}
            userData={users.filter((item) => !selectedUsers.includes(item))}
          />
        </div>
      </div>
      <EnrollmentsCard
        enrollments={selectedUsers}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- is a valid use case
        courseId={courseId!}
        isDeleting={isDeleting}
        onDeleteUser={onDeleteUser}
        refecthEnrollments={refecthEnrollments}
      />
    </>
  );
}
