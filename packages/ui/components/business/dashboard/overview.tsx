import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { MetricCard } from "../metric-card";
import {
  Award,
  BookOpen,
  CreditCardIcon,
  DownloadIcon,
  PlusIcon,
  TrendingUp,
  UploadIcon,
  UsersIcon,
} from "lucide-react";
import { QuickActionButton } from "../quick-action-button";

export function DashboardOverview() {
  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }]}
      />
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Subscriptions"
          value="247"
          change="+12%"
          positive={true}
          icon={<UsersIcon className="text-emerald-600" />}
        />
        <MetricCard
          title="Total Courses"
          value="38"
          change="+3"
          positive={true}
          icon={<BookOpen className="text-blue-600" />}
        />
        <MetricCard
          title="Avg. Completion"
          value="73%"
          change="+5%"
          positive={true}
          icon={<TrendingUp className="text-purple-600" />}
        />
        <MetricCard
          title="Active Learners"
          value="189"
          change="-2%"
          positive={false}
          icon={<Award className="text-amber-600" />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {String.fromCharCode(64 + i)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    User completed "React Fundamentals"
                  </div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton icon={<PlusIcon />} label="Add Employee" />
            <QuickActionButton
              icon={<CreditCardIcon />}
              label="Buy Subscriptions"
            />
            <QuickActionButton icon={<UploadIcon />} label="Import Users" />
            <QuickActionButton icon={<DownloadIcon />} label="Export Report" />
          </div>
        </div>
      </div>
    </div>
  );
}
