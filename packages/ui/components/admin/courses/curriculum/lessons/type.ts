export interface LessonActions {
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
  isVisible: boolean;
}
