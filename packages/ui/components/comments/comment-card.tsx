import { useState } from "react";
import { CURRENT_USER } from "./constants";
import type { Comment } from "./types";
import { Avatar } from "./avatar";
import { CommentsEditor } from "./comments-editor";
import { ReactionBar } from "./reaction-bar";
import { timeAgo } from "./utils";

interface CommentCardProps {
  comment: Comment;
  onReact: (commentId: string, emoji: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  onDelete: (commentId: string) => void;
  onReply?: () => void;
  isReply?: boolean;
}

export function CommentCard({
  comment,
  onReact,
  onEdit,
  onDelete,
  onReply,
  isReply = false,
}: CommentCardProps) {
  const [editing, setEditing] = useState(false);
  const isOwn = comment.authorId === CURRENT_USER.id;

  return (
    <div className={`group ${isReply ? "pl-0" : ""}`}>
      <div className="flex gap-3">
        <Avatar initials={comment.authorAvatar} size={isReply ? 28 : 34} />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
            >
              {comment.authorName}
            </span>
            {isOwn && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{
                  background: "var(--main)",
                  color: "var(--mtext)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                you
              </span>
            )}
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              {timeAgo(comment.createdAt)}
            </span>
            {comment.editedAt && (
              <span
                className="text-xs italic"
                style={{ color: "var(--muted-foreground)" }}
              >
                · edited
              </span>
            )}
          </div>

          {/* Body or Editor */}
          {editing ? (
            <CommentsEditor
              initialContent={comment.content}
              onSubmit={(html) => {
                onEdit(comment.id, html);
                setEditing(false);
              }}
              onCancel={() => setEditing(false)}
              submitLabel="Save"
              autoFocus
            />
          ) : (
            <div
              className="text-sm leading-relaxed rich-content mb-2"
              style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          )}

          {/* Reaction bar */}
          {!editing && (
            <div className="mb-2">
              <ReactionBar
                reactions={comment.reactions}
                onReact={(emoji) => onReact(comment.id, emoji)}
              />
            </div>
          )}

          {/* Actions */}
          {!editing && (
            <div className="flex items-center gap-3">
              {onReply && (
                <button
                  onClick={onReply}
                  className="text-xs font-medium transition-all hover:opacity-70"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Reply
                </button>
              )}
              {isOwn && (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-xs font-medium transition-all hover:opacity-70"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="text-xs font-medium transition-all hover:opacity-70"
                    style={{ color: "var(--destructive)" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
