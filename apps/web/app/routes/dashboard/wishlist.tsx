import { useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  Trash2,
  X,
  ShoppingCart,
  Book,
  Filter,
  TrendingDown,
  Bell,
  Share2,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "ui/components/button";

// Mock data for wishlist items
const mockCourses = [
  {
    id: 1,
    title: "Advanced Web Development with React",
    instructor: "Sarah Johnson",
    price: 49.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3601&auto=format&fit=crop",
    rating: 4.8,
    totalRatings: 245,
    duration: "12h 30m",
    addedDate: "2024-02-01",
  },
  {
    id: 2,
    title: "Complete Python Masterclass",
    instructor: "Michael Chen",
    price: 59.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3601&auto=format&fit=crop",
    rating: 4.9,
    totalRatings: 512,
    duration: "18h 45m",
    addedDate: "2024-02-05",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Rodriguez",
    price: 39.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3601&auto=format&fit=crop",
    rating: 4.7,
    totalRatings: 189,
    duration: "8h 15m",
    addedDate: "2024-02-03",
  },
];

const mockBundles = [
  {
    id: 1,
    title: "Full-Stack Developer Bundle",
    courses: [
      "Advanced Web Development with React",
      "Node.js for Beginners",
      "MongoDB Essentials",
    ],
    price: 99.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3601&auto=format&fit=crop",
    rating: 4.9,
    totalRatings: 178,
    totalDuration: "35h",
  },
  {
    id: 2,
    title: "Data Science Specialization",
    courses: [
      "Python for Data Analysis",
      "Machine Learning Fundamentals",
      "Data Visualization with D3.js",
    ],
    price: 129.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3601&auto=format&fit=crop",
    rating: 4.8,
    totalRatings: 203,
    totalDuration: "42h",
  },
];

type SortOption = "recent" | "price_low" | "price_high" | "rating";

export function meta() {
  return [
    { title: "Uspk Academy | Lista de Deseos" },
    { name: "description", content: "Lista de deseos de Uspk Academy, visualiza y gestiona tus cursos favoritos." },
  ];
}

export default function ImprovedWishlistPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [bundles, setBundles] = useState(mockBundles);
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const handleRemoveCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleRemoveBundle = (id: number) => {
    setBundles(bundles.filter((bundle) => bundle.id !== id));
  };

  const handleClearWishlist = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar tu lista de deseos?")) {
      setCourses([]);
      setBundles([]);
    }
  };

  // Sort courses
  const sortedCourses = [...courses].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "recent":
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const isEmpty = courses.length === 0 && bundles.length === 0;
  const totalItems = courses.length + bundles.length;
  const totalSavings = [
    ...courses.map((c) => c.originalPrice - c.price),
    ...bundles.map((b) => b.originalPrice - b.price),
  ].reduce((sum, saving) => sum + saving, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-destructive p-2">
                  <Heart
                    className="h-8 w-8 fill-white stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mi Lista de Deseos</h1>
                  {!isEmpty && (
                    <p className="text-sm text-muted-foreground">
                      {totalItems} {totalItems === 1 ? "item" : "items"} • Ahorras $
                      {totalSavings.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview - Only if not empty */}
        {!isEmpty && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                label: "Total Items",
                value: totalItems,
                icon: Heart,
                color: "bg-destructive/20",
              },
              {
                label: "Ahorros",
                value: `$${totalSavings.toFixed(0)}`,
                icon: TrendingDown,
                color: "bg-chart-2/20",
              },
              {
                label: "Cursos",
                value: courses.length,
                icon: Book,
                color: "bg-chart-4/20",
              },
              {
                label: "Paquetes",
                value: bundles.length,
                icon: ShoppingCart,
                color: "bg-chart-1/20",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-black tabular-nums leading-none">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs font-bold text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions Bar */}
        {!isEmpty && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border-2 border-black bg-card px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-main"
              >
                <option value="recent">Más reciente</option>
                <option value="price_low">Precio: menor a mayor</option>
                <option value="price_high">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="neutral"
                size="sm"
                className="border-2"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
              <Button
                onClick={handleClearWishlist}
                type="button"
                variant="reverse"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
                Vaciar lista
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-chart-2" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rotate-6 rounded-full border-4 border-black bg-main" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-black bg-card">
                    <Heart
                      className="h-20 w-20 stroke-destructive"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-black">
                  Tu lista de deseos está vacía
                </h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  Explora nuestros cursos y añade tus favoritos para estar al
                  tanto de ellos.
                </p>
                <Button type="button" asChild>
                  <Link to="/courses" className="group relative inline-block">
                    <Book className="h-5 w-5" />
                    Buscar cursos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Section */}
        {sortedCourses.length > 0 && (
          <div className="space-y-4">
            <h2 className="inline-block border-b-4 border-destructive pb-1 text-2xl font-black">
              Cursos ({courses.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedCourses.map((course) => (
                <div
                  key={course.id}
                  className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-destructive hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {/* Discount Badge */}
                    <div className="absolute bottom-2 left-2 rounded-lg border-2 border-black bg-chart-2 px-2 py-1 text-xs font-bold text-white">
                      {Math.round(
                        ((course.originalPrice - course.price) /
                          course.originalPrice) *
                          100
                      )}
                      % OFF
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 p-4">
                    <div>
                      <h3 className="line-clamp-2 text-base font-bold leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        por {course.instructor}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-chart-4 stroke-chart-4" />
                        <span>{course.rating}</span>
                        <span>({course.totalRatings})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-black">
                          ${course.price}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${course.originalPrice}
                        </span>
                      </div>
                    </div>

                    <Button type="button" className="w-full" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bundles Section */}
        {bundles.length > 0 && (
          <div className="space-y-4">
            <h2 className="inline-block border-b-4 border-chart-2 pb-1 text-2xl font-black">
              Paquetes de Cursos ({bundles.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={bundle.image}
                      alt={bundle.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-lg border-2 border-black bg-destructive px-3 py-1 text-xs font-bold text-white">
                      Bundle
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBundle(bundle.id)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-destructive hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 rounded-lg border-2 border-black bg-chart-2 px-2 py-1 text-xs font-bold text-white">
                      {Math.round(
                        ((bundle.originalPrice - bundle.price) /
                          bundle.originalPrice) *
                          100
                      )}
                      % OFF
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 p-4">
                    <div>
                      <h3 className="text-lg font-bold">{bundle.title}</h3>
                      <p className="text-xs font-bold text-muted-foreground">
                        {bundle.courses.length} cursos • {bundle.totalDuration}
                      </p>
                    </div>

                    {/* Course List */}
                    <div className="space-y-1">
                      {bundle.courses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full border-2 border-black bg-main" />
                          <span className="font-medium">{course}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black">
                          ${bundle.price}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${bundle.originalPrice}
                        </span>
                      </div>
                    </div>

                    <Button type="button" className="w-full">
                      <ShoppingCart className="h-4 w-4" />
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}