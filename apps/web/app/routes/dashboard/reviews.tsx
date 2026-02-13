import { Award, Book, Edit, Filter, Star, Trash2, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "ui/components/button";

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    courseId: 101,
    courseTitle: "Advanced Web Development with React",
    courseImage:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=3540&auto=format&fit=crop",
    instructor: "Sarah Johnson",
    rating: 5,
    comment:
      "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. The projects were challenging but very rewarding. I feel much more confident in my React skills now.",
    date: "2024-03-15",
    helpfulCount: 12,
  },
  {
    id: 2,
    courseId: 102,
    courseTitle: "Complete Python Masterclass",
    courseImage:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=3540&auto=format&fit=crop",
    instructor: "Michael Chen",
    rating: 4,
    comment:
      "Great course for Python beginners. The instructor is knowledgeable and the pace is perfect. I would have liked more advanced topics toward the end, but overall it was very good.",
    date: "2024-01-22",
    helpfulCount: 8,
  },
  {
    id: 3,
    courseId: 103,
    courseTitle: "UI/UX Design Fundamentals",
    courseImage:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=3540&auto=format&fit=crop",
    instructor: "Emma Rodriguez",
    rating: 3,
    comment:
      "Solid introduction to UI/UX principles. Some of the content felt a bit outdated, but the fundamentals were well explained. Would recommend for absolute beginners.",
    date: "2023-12-05",
    helpfulCount: 5,
  },
];

type Review = (typeof mockReviews)[0];
type FilterOption = "all" | "5" | "4" | "3" | "2" | "1";

export default function ImprovedReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filterRating, setFilterRating] = useState<FilterOption>("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [editedRating, setEditedRating] = useState(0);
  const [editedComment, setEditedComment] = useState("");

  // Calculate stats
  const stats = {
    total: reviews.length,
    averageRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : "0.0",
    fiveStars: reviews.filter((r) => r.rating === 5).length,
    fourStars: reviews.filter((r) => r.rating === 4).length,
  };

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true;
    return review.rating === Number(filterRating);
  });

  // Handlers
  const handleEditClick = (review: Review) => {
    setCurrentReview(review);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (review: Review) => {
    setCurrentReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateReview = () => {
    if (!currentReview) return;
    const updatedReviews = reviews.map((review) =>
      review.id === currentReview.id
        ? { ...review, rating: editedRating, comment: editedComment }
        : review
    );
    setReviews(updatedReviews);
    setIsEditModalOpen(false);
  };

  const handleDeleteReview = () => {
    if (!currentReview) return;
    const updatedReviews = reviews.filter(
      (review) => review.id !== currentReview.id
    );
    setReviews(updatedReviews);
    setIsDeleteModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-chart-4 p-2">
                  <Star
                    className="h-8 w-8 fill-white stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mis Reseñas</h1>
                  {reviews.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {stats.total} {stats.total === 1 ? "reseña" : "reseñas"} •
                      Promedio: {stats.averageRating} ⭐
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                label: "Total",
                value: stats.total,
                icon: Book,
                color: "bg-chart-4/20",
              },
              {
                label: "Promedio",
                value: stats.averageRating,
                icon: Star,
                color: "bg-chart-1/20",
              },
              {
                label: "5 Estrellas",
                value: stats.fiveStars,
                icon: Award,
                color: "bg-chart-2/20",
              },
              {
                label: "4 Estrellas",
                value: stats.fourStars,
                icon: TrendingUp,
                color: "bg-chart-3/20",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
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

        {/* Filter Bar */}
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Filtrar:</span>
            {(["all", "5", "4", "3", "2", "1"] as FilterOption[]).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setFilterRating(rating)}
                className={`rounded-xl border-4 border-black px-4 py-2 font-bold transition-all hover:-translate-y-0.5 ${
                  filterRating === rating
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {rating === "all" ? "Todas" : `${rating} ⭐`}
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredReviews.length}{" "}
              {filteredReviews.length === 1 ? "resultado" : "resultados"})
            </span>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-chart-4" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rotate-6 rounded-full border-4 border-black bg-chart-2" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-black bg-card">
                    <Star
                      className="h-20 w-20 stroke-chart-4"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-black">
                  Aún no has dejado ninguna reseña
                </h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  ¡Comparte tus ideas sobre los cursos que has tomado para
                  ayudar a otros estudiantes!
                </p>
                <Button type="button" asChild>
                  <Link to="/courses">Explora tus cursos completados</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Reviews Grid
          <div className="grid gap-4 md:grid-cols-2">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={review.courseImage}
                    alt={review.courseTitle}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Rating Badge */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border-2 border-black bg-card px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Star className="h-4 w-4 fill-chart-4 stroke-chart-4" />
                    <span className="text-sm font-black">{review.rating}/5</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  {/* Course Info */}
                  <div>
                    <Link
                      to={`/courses/${review.courseId}`}
                      className="group/link"
                    >
                      <h3 className="line-clamp-1 text-lg font-bold transition-colors group-hover/link:text-main">
                        {review.courseTitle}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      por {review.instructor}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-chart-4 stroke-chart-4"
                              : "fill-muted stroke-muted"
                          }`}
                        />
                      ))}
                  </div>

                  {/* Comment */}
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {review.comment}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between border-t-2 border-border pt-3 text-xs">
                    <span className="font-bold text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                    <span className="font-bold text-muted-foreground">
                      {review.helpfulCount} útiles
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="noShadowNeutral"
                      size="sm"
                      className="flex-1 border-2"
                      onClick={() => handleEditClick(review)}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="reverse"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDeleteClick(review)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Filter Results */}
        {reviews.length > 0 && filteredReviews.length === 0 && (
          <div className="rounded-2xl border-4 border-black bg-card p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mx-auto max-w-md space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-muted">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-black">
                No hay reseñas con {filterRating} estrellas
              </h2>
              <p className="text-muted-foreground">
                Intenta con otro filtro para ver más reseñas
              </p>
              <button
                type="button"
                onClick={() => setFilterRating("all")}
                className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
              >
                Ver todas
              </button>
            </div>
          </div>
        )}

        {/* Edit Review Modal */}
        {isEditModalOpen && currentReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 -rotate-2 rounded-xl border-4 border-black bg-chart-4" />
              <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black">Editar Reseña</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black hover:bg-destructive hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold">{currentReview.courseTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    por {currentReview.instructor}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block font-bold">Calificación</label>
                  <div className="flex gap-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setEditedRating(i + 1)}
                          className="group"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              i < editedRating
                                ? "fill-chart-4 stroke-chart-4"
                                : "fill-muted stroke-muted"
                            } stroke-2 transition-all group-hover:scale-110`}
                          />
                        </button>
                      ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-bold">Tu Reseña</label>
                    <span className="text-xs text-muted-foreground">
                      {editedComment.length}/500
                    </span>
                  </div>
                  <textarea
                    value={editedComment}
                    onChange={(e) =>
                      setEditedComment(e.target.value.slice(0, 500))
                    }
                    rows={5}
                    className="w-full rounded-lg border-4 border-black bg-card p-3 font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-4 focus:ring-main"
                    placeholder="Comparte tu experiencia con este curso..."
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    variant="neutral"
                  >
                    Cancelar
                  </Button>
                  <Button type="button" onClick={handleUpdateReview}>
                    Actualizar Reseña
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && currentReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rotate-2 rounded-xl border-4 border-black bg-destructive" />
              <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black">Eliminar Reseña</h2>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black hover:bg-destructive hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="mb-6 text-lg font-bold">
                  ¿Estás seguro de que quieres eliminar tu reseña de "
                  {currentReview.courseTitle}"? Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    variant="neutral"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDeleteReview}
                    variant="reverse"
                  >
                    Eliminar Reseña
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}