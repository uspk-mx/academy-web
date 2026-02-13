import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("/login", "./routes/login.tsx"),
  route("/signup", "./routes/signup.tsx"),
  route("/invite", "./routes/invite.tsx"),
  route("/password/reset", "./routes/reset-password.tsx"),
  route("/password/change", "./routes/change-password-global.tsx"),
  route("/auth/success", "./routes/auth/success.tsx"),
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    ...prefix("settings", [
      route("change-password", "./routes/change-password.tsx"),
    ]),
    ...prefix("users", [
      index("./routes/users/users.tsx"),
      route("invite-admins", "./routes/users/invite-admins.tsx"),
      route("employees", "./routes/users/employees.tsx"),
      route("admins", "./routes/users/admins.tsx"),
    ]),
    ...prefix("licenses", [
      index("./routes/licenses/overview.tsx"),
      route("request", "./routes/licenses/request-licenses.tsx"),
      route("manage", "./routes/licenses/manage-licenses.tsx"),
      route("assign", "./routes/licenses/assign-page.tsx"),
      route("purchase", "./routes/licenses/purchase-more-codes.tsx"),
      route("orders", "./routes/licenses/orders-page.tsx"),
    ]),
    ...prefix("courses", [
      index("./routes/courses/courses.tsx"),
      route("catalog", "./routes/courses/catalog.tsx"),
      // route("view", "./routes/courses/courses.tsx"),
      route("progress", "./routes/courses/progress.tsx"),
    ]),
    ...prefix("billing", [
      route("methods", "./routes/billing/methods.tsx"),
      route("invoices", "./routes/billing/invoices.tsx"),
    ]),
    ...prefix("settings", [
      route("profile", "./routes/settings/profile.tsx"),
      route("account", "./routes/settings/account.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
