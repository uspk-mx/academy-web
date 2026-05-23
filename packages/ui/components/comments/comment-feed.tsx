
import { useState, useCallback } from "react";
import { MOCK_COMMENTS, CURRENT_USER } from "./constants";
import { generateId } from "./utils";
import type { Comment } from "./types";
import { Avatar } from "./avatar";
import { CommentsEditor } from "./comments-editor";
import { CommentThread } from "./comment-thread";

export function CommentFeed() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);

  const handleReact = useCallback((commentId: string, emoji: string) => {
    setComments((prev) => {
      const toggle = (c: Comment): Comment => {
        if (c.id !== commentId) return { ...c, replies: c.replies.map(toggle) };
        const existing = c.reactions.find((r) => r.emoji === emoji);
        const alreadyReacted = existing?.reactedBy.includes(CURRENT_USER.id);
        const reactions = existing
          ? c.reactions.map((r) =>
              r.emoji !== emoji
                ? r
                : {
                    ...r,
                    count: alreadyReacted ? r.count - 1 : r.count + 1,
                    reactedBy: alreadyReacted
                      ? r.reactedBy.filter((id) => id !== CURRENT_USER.id)
                      : [...r.reactedBy, CURRENT_USER.id],
                  },
            )
          : [...c.reactions, { emoji, count: 1, reactedBy: [CURRENT_USER.id] }];
        return { ...c, reactions };
      };
      return prev.map(toggle);
    });
  }, []);

  const handleEdit = useCallback((commentId: string, content: string) => {
    setComments((prev) => {
      const edit = (c: Comment): Comment => {
        if (c.id === commentId) return { ...c, content, editedAt: new Date() };
        return { ...c, replies: c.replies.map(edit) };
      };
      return prev.map(edit);
    });
  }, []);

  const handleDelete = useCallback((commentId: string) => {
    setComments((prev) => {
      const del = (list: Comment[]): Comment[] =>
        list
          .filter((c) => c.id !== commentId)
          .map((c) => ({ ...c, replies: del(c.replies) }));
      return del(prev);
    });
  }, []);

  const handleReply = useCallback((parentId: string, content: string) => {
    const newReply: Comment = {
      id: generateId(),
      authorId: CURRENT_USER.id,
      authorName: CURRENT_USER.name,
      authorAvatar: CURRENT_USER.avatar,
      content,
      createdAt: new Date(),
      reactions: [],
      replies: [],
    };
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c,
      ),
    );
  }, []);

  const handleNewComment = useCallback((content: string) => {
    const newComment: Comment = {
      id: generateId(),
      authorId: CURRENT_USER.id,
      authorName: CURRENT_USER.name,
      authorAvatar: CURRENT_USER.avatar,
      content,
      createdAt: new Date(),
      reactions: [],
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-xl font-bold mb-0.5"
            style={{ color: "var(--text)", fontFamily: "var(--font-heading)" }}
          >
            Discussion
          </h1>
          <p className="text-sm text-muted-foreground">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* New comment composer */}
        <div className="mb-8">
          <div className="flex gap-3">
            <Avatar initials={CURRENT_USER.avatar} size={34} />
            <div className="flex-1">
              <CommentsEditor
                placeholder="Ask a question or share your thoughts…"
                onSubmit={handleNewComment}
                submitLabel="Post"
              />
            </div>
          </div>
        </div>

        {/* Thread list */}
        <div className="rounded-xl border overflow-hidden border-input bg-bw">
          {comments.length === 0 ? (
            <div className="py-16 text-center">
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                No comments yet. Be the first!
              </p>
            </div>
          ) : (
            <div className="px-5">
              {comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  onReact={handleReact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReply={handleReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .rich-content a { color: hsl(217 91% 50%); text-decoration: underline; text-underline-offset: 2px; }
        .rich-content code { background: rgba(0,0,0,0.07); padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 0.88em; }
        .rich-content strong, .rich-content b { font-weight: 700; }
        .rich-content em, .rich-content i { font-style: italic; }
      `}</style>
    </div>
  );
}
