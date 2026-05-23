import { redirect } from "react-router";

export const loader = async () => {
  return redirect("/settings/account");
};

export default function Settings() {
  return null
}
