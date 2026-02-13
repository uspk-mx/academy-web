import { CheckIcon, UploadIcon } from "lucide-react";
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

export function CompanyProfile() {
  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/settings", label: "Settings" },
          { href: "/settings/profile", label: "Company Profile" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Company Profile</h1>

      <div className="max-w-3xl">
        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Company Name
              </Label>
              <Input type="text" defaultValue="Uspk Academy" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Industry
                </Label>
                <Select defaultValue="technology">
                  <SelectTrigger variant="neutral">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Company Size
                </Label>
                <Select defaultValue="1-50">
                  <SelectTrigger variant="neutral">
                    <SelectValue placeholder="Select a company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Company Logo</h2>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center text-white text-3xl font-bold">
              U
            </div>
            <div className="flex-1">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <UploadIcon className="mx-auto mb-2 text-gray-400" size={32} />
                <div className="text-sm font-medium mb-1">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Address</h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Street Address
              </Label>
              <Input type="text" placeholder="123 Main St" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-2">City</Label>
                <Input type="text" placeholder="San Francisco" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">
                  State / Province
                </Label>
                <Input type="text" placeholder="California" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-2">
                  ZIP / Postal Code
                </Label>
                <Input type="text" placeholder="94102" />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Country
                </Label>
                <Select defaultValue="US">
                  <SelectTrigger variant="neutral">
                    <SelectValue placeholder="United States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Branding</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                defaultValue="#FFD700"
                className="w-16 h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
              />
              <Input type="text" defaultValue="#FFD700" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="neutral">Cancel</Button>
          <Button>
            <CheckIcon size={18} />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
