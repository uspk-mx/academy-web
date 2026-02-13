import {
  Award,
  Clock,
  DownloadIcon,
  TrendingUp,
  UsersIcon,
} from "lucide-react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { Button } from "ui/components/button";
import { MetricCard } from "../metric-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";

export function TrackProgress() {
  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/courses", label: "Courses" },
          { href: "/courses/progress", label: "Track Progress" },
        ]}
      />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Track Progress</h1>
        <Button>
          <DownloadIcon size={18} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Overall Completion"
          value="73%"
          change="+5%"
          positive={true}
          icon={<Award className="text-emerald-600" />}
        />
        <MetricCard
          title="Active Learners"
          value="189"
          change="+12"
          positive={true}
          icon={<UsersIcon className="text-blue-600" />}
        />
        <MetricCard
          title="Avg. Time to Complete"
          value="8.5h"
          change="-1.2h"
          positive={true}
          icon={<Clock className="text-purple-600" />}
        />
        <MetricCard
          title="Courses in Progress"
          value="156"
          change="+8"
          positive={true}
          icon={<TrendingUp className="text-amber-600" />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Completion Trends</h2>
          <div className="h-64 bg-linear-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-around p-4">
            {[65, 72, 68, 75, 73, 78, 82].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 bg-linear-to-t from-blue-600 to-blue-400 rounded-t"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-gray-500">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Courses</h2>
          <div className="space-y-4">
            {[
              { name: "React Fundamentals", completion: 92 },
              { name: "UX Design Principles", completion: 85 },
              { name: "Project Management", completion: 78 },
              { name: "Data Analytics", completion: 71 },
            ].map((course, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{course.name}</span>
                  <span className="text-sm font-bold">
                    {course.completion}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Department Progress</h2>
        <Table className="w-full border-none">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                Department
              </TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                Employees
              </TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                Avg. Completion
              </TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-sm">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                dept: "Engineering",
                employees: 45,
                completion: 78,
                status: "On Track",
              },
              {
                dept: "Sales",
                employees: 32,
                completion: 65,
                status: "Needs Attention",
              },
              {
                dept: "Marketing",
                employees: 28,
                completion: 82,
                status: "Excellent",
              },
              {
                dept: "Operations",
                employees: 24,
                completion: 71,
                status: "On Track",
              },
            ].map((dept, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-4 px-4 font-medium">
                  {dept.dept}
                </TableCell>
                <TableCell className="py-4 px-4">{dept.employees}</TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                      <div
                        className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full"
                        style={{ width: `${dept.completion}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm">
                      {dept.completion}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dept.status === "Excellent"
                        ? "bg-emerald-50 text-emerald-700"
                        : dept.status === "On Track"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {dept.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
