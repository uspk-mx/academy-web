import { MoreVertical, Plus, PlusIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
import { StatusBadge, type Status } from "../status-badge";
import { Dialog, DialogContent } from "ui/components/dialog";

export function InviteAdmins() {
  const [showModal, setShowModal] = useState(false);

  const admins = [
    {
      name: "John Dude",
      email: "product@uspk.com.mx",
      role: "Super Admin",
      lastActive: "2 hours ago",
    },
    {
      name: "Sarah Connor",
      email: "sarah.c@uspk.com.mx",
      role: "Admin",
      lastActive: "1 day ago",
    },
  ];

  const pendingInvitations = [
    {
      email: "new.admin@uspk.com.mx",
      role: "Admin",
      sentDate: "2024-12-15",
      status: "pending",
    },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/users", label: "Users" },
        ]}
      />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Invite Admins</h1>
        <Button onClick={() => setShowModal(true)}>
          <PlusIcon size={18} />
          Invite New Admin
        </Button>
      </div>

      {/* Current Admins */}
      <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Administrators</h2>
        <div className="space-y-3">
          {admins.map((admin, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {admin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium">{admin.name}</div>
                  <div className="text-sm text-gray-500">{admin.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-right">
                    {admin.role}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last active: {admin.lastActive}
                  </div>
                </div>
                <Button variant="noShadow">
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="bg-white border-2 border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Invitations</h2>
        <div className="space-y-3">
          {pendingInvitations.map((invitation, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border-2 border-border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="text-gray-400" size={24} />
                </div>
                <div>
                  <div className="font-medium">{invitation.email}</div>
                  <div className="text-sm text-gray-500">
                    Sent on {invitation.sentDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={invitation.status as Status} />
                <Button variant="neutral" size="sm">
                  Resend
                </Button>
                <button className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Correo electronico
              </Label>
              <Input type="email" placeholder="admin@company.com" />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">Role</Label>
              <Select>
                <SelectTrigger variant="neutral">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus size={18} />
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
