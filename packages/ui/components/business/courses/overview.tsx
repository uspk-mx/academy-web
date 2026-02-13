import { Clock, Grid, List, Search, UsersIcon } from "lucide-react";
import { useState } from "react";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";
import { SearchInput } from "ui/components/search-input";

export function CoursesOverview() {
  const [viewMode, setViewMode] = useState("grid");

  const courses = [
    {
      title: "React Fundamentals",
      category: "Development",
      duration: "8 hours",
      difficulty: "Beginner",
      enrolled: 45,
      image: "🎨",
    },
    {
      title: "Advanced TypeScript",
      category: "Development",
      duration: "12 hours",
      difficulty: "Advanced",
      enrolled: 23,
      image: "💻",
    },
    {
      title: "UX Design Principles",
      category: "Design",
      duration: "6 hours",
      difficulty: "Intermediate",
      enrolled: 67,
      image: "🎭",
    },
    {
      title: "Project Management",
      category: "Business",
      duration: "10 hours",
      difficulty: "Beginner",
      enrolled: 89,
      image: "📊",
    },
    {
      title: "Data Analytics",
      category: "Analytics",
      duration: "15 hours",
      difficulty: "Intermediate",
      enrolled: 34,
      image: "📈",
    },
    {
      title: "Cloud Architecture",
      category: "Development",
      duration: "20 hours",
      difficulty: "Advanced",
      enrolled: 12,
      image: "☁️",
    },
  ];

  return (
    <div className="p-8">
      <PageBreadCrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/courses", label: "Courses" },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <div className="flex items-center gap-3">
          <div className="flex border-2 border-border rounded-lg overflow-hidden">
            <button
              className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"} border-l-2 border-gray-200`}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <SearchInput placeholder="Search courses" />
        </div>

        <Select>
          <SelectTrigger variant="neutral" className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger variant="neutral" className="w-[180px]">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={viewMode === "grid" ? "grid grid-cols-3 gap-6" : "space-y-4"}
      >
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="aspect-video bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
              {course.image}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {course.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  {course.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon size={16} />
                  {course.enrolled} enrolled
                </div>
              </div>
              <Button variant="noShadowNeutral">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
