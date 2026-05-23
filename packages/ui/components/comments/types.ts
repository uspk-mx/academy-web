export interface Reaction {
  emoji: string;
  count: number;
  reactedBy: string[]; // userIds
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string; // HTML string
  createdAt: Date;
  editedAt?: Date;
  reactions: Reaction[];
  replies: Comment[];
}
