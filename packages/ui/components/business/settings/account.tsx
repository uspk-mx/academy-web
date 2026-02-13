import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";
import { ToggleSwitch } from "../toggle-switch";
import { CheckIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/components/dialog';
import { useState } from "react";

export function Account() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/settings", label: "Settings" },
          { href: "/settings/account", label: "Account" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="max-w-3xl">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              JD
            </div>
            <div>
              <Button variant="noShadowNeutral">Change Photo</Button>
              <div className="text-xs text-gray-500 mt-1">
                JPG, PNG or GIF (max. 2MB)
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Dude"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="product@uspk.com.mx"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Password</h2>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <Button
              variant="noShadowNeutral"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-600">
                  Receive updates about your account via email
                </div>
              </div>
              <ToggleSwitch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Course Reminders</div>
                <div className="text-sm text-gray-600">
                  Get reminded about incomplete courses
                </div>
              </div>
              <ToggleSwitch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-gray-600">
                  Receive weekly progress reports
                </div>
              </div>
              <ToggleSwitch checked={false} />
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">
            Two-Factor Authentication
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium mb-1">Enable 2FA</div>
              <div className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </div>
            </div>
            <Button variant="noShadowNeutral">Enable</Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="noShadowNeutral">Cancel</Button>
          <Button variant="default">
            <CheckIcon size={18} />
            Save Changes
          </Button>
        </div>
      </div>

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña actual
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="neutral"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="default">Actualizar contraseña</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}