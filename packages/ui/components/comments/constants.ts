import type { Comment } from "./types";

export const CURRENT_USER = { id: "user-alvaro", name: "alvaro", avatar: "AV" };

export const EMOJI_OPTIONS = ["👍", "❤️", "😂", "🎉", "🤔", "👀"];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    authorId: "user-sarah",
    authorName: "sarah_chen",
    authorAvatar: "SC",
    content:
      "<p>Has anyone found a clean way to handle optimistic updates with GraphQL subscriptions? I'm running into race conditions when the subscription fires before the mutation response comes back.</p>",
    createdAt: new Date("2024-11-15T10:22:00"),
    reactions: [
      {
        emoji: "👍",
        count: 4,
        reactedBy: ["user-mike", "user-tom", "user-lisa", "user-jen"],
      },
      { emoji: "🤔", count: 2, reactedBy: ["user-bob", "user-kate"] },
    ],
    replies: [
      {
        id: "c1r1",
        authorId: "user-mike",
        authorName: "mikeprzybylski",
        authorAvatar: "MP",
        content:
          "<p>We solved this by adding a client-side request ID to each mutation, then filtering out subscription events that match pending mutations. Works well once you centralize the logic in a custom hook.</p>",
        createdAt: new Date("2024-11-15T11:05:00"),
        reactions: [
          {
            emoji: "🎉",
            count: 3,
            reactedBy: ["user-sarah", "user-tom", "user-alvaro"],
          },
        ],
        replies: [],
      },
      {
        id: "c1r2",
        authorId: "user-alvaro",
        authorName: "alvaro",
        authorAvatar: "AV",
        content:
          "<p>+1 on the request ID approach. We also debounce the subscription handler by ~100ms which gives the mutation response time to land first. Not perfect but practical.</p>",
        createdAt: new Date("2024-11-15T11:42:00"),
        reactions: [],
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    authorId: "user-tom",
    authorName: "tomvanderberg",
    authorAvatar: "TV",
    content:
      "<p>What's the recommended pattern for <code style='background:rgba(0,0,0,0.08);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.88em'>@defer</code> with Apollo Client v3? The docs feel incomplete and I can't find real-world examples beyond the basic counter demo.</p>",
    createdAt: new Date("2024-11-18T14:07:00"),
    reactions: [
      {
        emoji: "👀",
        count: 6,
        reactedBy: [
          "user-sarah",
          "user-mike",
          "user-alvaro",
          "user-bob",
          "user-kate",
          "user-jen",
        ],
      },
    ],
    replies: [],
  },
];
