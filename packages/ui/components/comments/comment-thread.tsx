import { useState } from "react";
import { CommentCard } from "./comment-card";
import type { Comment } from "./types";
import { CommentsEditor } from "./comments-editor";
import { Avatar } from "./avatar";
import { CURRENT_USER } from "./constants";

interface CommentThreadProps {
  comment: Comment;
  onReact: (commentId: string, emoji: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onReply: (parentId: string, content: string) => void;
}

export function CommentThread({ comment, onReact, onEdit, onDelete, onReply }: CommentThreadProps) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);

  return (
    <div className="py-5 border-b last:border-b-0" style={{ borderColor: "var(--input)" }}>
      <CommentCard
        comment={comment}
        onReact={onReact}
        onEdit={onEdit}
        onDelete={onDelete}
        onReply={() => setShowReplyEditor(r => !r)}
      />

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4 ml-10 pl-4 border-l-2 space-y-4" style={{ borderColor: "var(--input)" }}>
          {comment.replies.map(reply => (
            <CommentCard
              key={reply.id}
              comment={reply}
              onReact={onReact}
              onEdit={onEdit}
              onDelete={onDelete}
              isReply
            />
          ))}
        </div>
      )}

      {/* Reply composer */}
      {showReplyEditor && (
        <div className="mt-4 ml-10 pl-4 border-l-2" style={{ borderColor: "var(--main)" }}>
          <div className="flex gap-2.5">
            <Avatar initials={CURRENT_USER.avatar} size={28} />
            <div className="flex-1">
              <CommentsEditor
                placeholder={`Reply to ${comment.authorName}…`}
                onSubmit={(html) => { onReply(comment.id, html); setShowReplyEditor(false); }}
                onCancel={() => setShowReplyEditor(false)}
                submitLabel="Reply"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}