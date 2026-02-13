import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/invite", "routes/invite.tsx"),
  route("/password/reset", "routes/reset-password.tsx"),
  route("/password/change", "routes/change-password.tsx"),
  route("/auth/success", "pages/auth/success.tsx"),
  layout("routes/dashboard/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("courses", "routes/dashboard/courses/courses.tsx"),
    route("wishlist", "routes/dashboard/wishlist.tsx"),
    route("reviews", "routes/dashboard/reviews.tsx"),
    route("calendar", "routes/dashboard/calendar.tsx"),
    route("team", "routes/dashboard/business/team.tsx"),
    route("reports", "routes/dashboard/business/reports.tsx"),
    route("certificates", "routes/dashboard/business/certificates.tsx"),
  ]),
  route("/cart", "pages/cart/cart-page.tsx"),
  route("/checkout", "routes/checkout.tsx"),
  layout("routes/courses/course/layout.tsx", [
    route(
      "courses/:cid/lesson/:lessonId",
      "./routes/courses/course/lesson/lesson.tsx",
    ),
    route("courses/:cid/quiz/:quizId", "./routes/courses/course/quiz/quiz.tsx"),
  ]),
    layout("./routes/dashboard/second-layout.tsx", [
    route("/profile", "routes/dashboard/profile.tsx"),
    route("/quiz-attempts", "routes/dashboard/quiz-attempts/quiz-attempts.tsx"),
    route("/quiz-attempts/:qid", "routes/dashboard/quiz-attempts/details.tsx"),
    route("/order-history", "routes/dashboard/order-history/order-history.tsx"),
    route("/order-history/:oid", "routes/dashboard/order-history/details.tsx"),
  ]),
] satisfies RouteConfig;
