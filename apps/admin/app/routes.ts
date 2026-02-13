import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("/login", "./login.tsx"),
  route("/signup", "./signup.tsx"),
  route("/invite", "./invite.tsx"),
  route("/password/reset", "./reset-password.tsx"),
  route("/password/change", "./change-password-global.tsx"),
  route("/auth/success", "./auth/success.tsx"),
  layout("./layout.tsx", [
    index("./home.tsx"),
    ...prefix("courses", [
      index("./courses/courses.tsx"),
      route("levels", "./courses/levels.tsx"),
      route("categories", "./courses/categories.tsx"),
      route("enrollments", "./enrollments/enrollments.tsx"),
    ]),
    route("bundles", "./bundles/bundles.tsx"),
    route("students", "./students/students.tsx"),
    route("instructors", "./instructors/instructors.tsx"),
    route("communication", "./communication/communication.tsx"),
    route("performance", "./performance/performance.tsx"),
    route("certificates", "./certificates/certificates.tsx"),
    route("memberships", "./memberships/memberships.tsx"),
    route("companies", "./companies/companies.tsx"),
    route("account/change-password", "./account/change-password.tsx"),
  ]),
  layout("./courses/create/create-course-layout.tsx", [
    route("courses/create", "./courses/create/create-course-page.tsx"),
  ]),

  // Separating course builder layout
  layout("./courses/builder/course-builder-layout.tsx", [
    route("courses/:cid/builder", "./courses/builder/course-builder.tsx"),
    route(
      "courses/:cid/curriculum",
      "./courses/builder/curriculum-builder.tsx",
    ),
    route(
      "courses/:cid/additional",
      "./courses/builder/additional-data-section.tsx",
    ),
  ]),
] satisfies RouteConfig;
