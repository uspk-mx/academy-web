import {
  ArrowLeft,
  ArrowLeftIcon,
  Calendar,
  CalendarIcon,
  DollarSign,
  Download,
  Package,
  Receipt,
  Search,
  ShoppingBagIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "urql";
import { Button } from "ui/components/button";
import { MeDocument } from "gql-generated/gql/graphql";
import type { MeQuery, MeQueryVariables } from "gql-generated/gql/graphql";
import { formatDate } from "ui/lib/utils";

const mockOrders = {
  courses: [
    {
      id: "ord_123456",
      title: "Advanced Web Development with React",
      type: "Course",
      price: 49.99,
      date: "March 15, 2023",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_456789",
      title: "UI/UX Design Fundamentals",
      type: "Course",
      price: 39.99,
      date: "December 10, 2022",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_789012",
      title: "React Testing Library with Jest / Vitest",
      type: "Course",
      price: 29.99,
      date: "January 21, 2022",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_345678",
      title: "GraphQL by Example",
      type: "Course",
      price: 44.99,
      date: "November 28, 2021",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_901234",
      title: "Complete SQL and Databases Bootcamp",
      type: "Course",
      price: 59.99,
      date: "October 17, 2021",
      paymentStatus: "completed",
      paymentMethod: "MasterCard",
      cardLast4: "4979",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
  ],
  bundles: [
    {
      id: "ord_234567",
      title: "Full-Stack Developer Bundle",
      type: "Bundle",
      price: 99.99,
      date: "February 28, 2023",
      paymentStatus: "completed",
      paymentMethod: "PayPal",
      email: "student@example.com",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_567890",
      title: "Data Science Specialization",
      type: "Bundle",
      price: 129.99,
      date: "November 5, 2022",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_123789",
      title: "3 courses purchased",
      type: "Bundle",
      price: 87.99,
      date: "December 4, 2021",
      paymentStatus: "completed",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
  ],
  subscriptions: [
    {
      id: "ord_345678",
      title: "Pro Membership - Monthly",
      type: "Subscription",
      price: 19.99,
      date: "January 15, 2023",
      paymentStatus: "on hold",
      paymentMethod: "American Express",
      cardLast4: "1003",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
    {
      id: "ord_678901",
      title: "Pro Membership - Annual",
      type: "Subscription",
      price: 199.99,
      date: "October 20, 2022",
      paymentStatus: "completed",
      paymentMethod: "PayPal",
      email: "student@example.com",
      invoiceUrl: "#",
      stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    },
  ],
};

type OrderType = "courses" | "bundles" | "subscriptions";

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<OrderType>("courses");
  const [showOrders, setShowOrders] = useState(true);
  const [{ data, fetching }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle empty state for demo
  const toggleEmptyState = () => {
    setShowOrders(!showOrders);
  };

  const getActiveOrders = () => {
    if (!showOrders) return [];
    return mockOrders[activeTab];
  };

  const allOrders = [
    ...mockOrders.courses,
    ...mockOrders.bundles,
    ...mockOrders.subscriptions,
  ];

  const stats = {
    totalOrders: allOrders.length,
    totalSpent: allOrders.reduce((sum, order) => sum + order.price, 0),
    courses: mockOrders.courses.length,
    bundles: mockOrders.bundles.length,
    subscriptions: mockOrders.subscriptions.length,
  };

  const activeOrders = mockOrders[activeTab];

  const filteredOrders = activeOrders.filter((order) =>
    order.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatPaymentMethod = (order: any) => {
    if (order.paymentMethod === "PayPal") {
      return order.email;
    }
    return `${order.paymentMethod} ****${order.cardLast4}`;
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link to="/">
          <Button type="button" variant="neutral">
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Button>
        </Link>

        <div className="relative mt-6">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-chart-1 p-2">
                  <ShoppingCart
                    className="h-8 w-8 fill-white stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Historial de Órdenes</h1>
                  <p className="text-sm text-muted-foreground">
                    {stats.totalOrders} órdenes • Total gastado: $
                    {stats.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            {
              label: "Total Órdenes",
              value: stats.totalOrders,
              icon: ShoppingCart,
              color: "bg-chart-1/20",
            },
            {
              label: "Total Gastado",
              value: `$${stats.totalSpent.toFixed(0)}`,
              icon: DollarSign,
              color: "bg-chart-2/20",
            },
            {
              label: "Cursos",
              value: stats.courses,
              icon: Package,
              color: "bg-chart-4/20",
            },
            {
              label: "Bundles",
              value: stats.bundles,
              icon: Package,
              color: "bg-destructive/20",
            },
            {
              label: "Suscripciones",
              value: stats.subscriptions,
              icon: Calendar,
              color: "bg-chart-2/20",
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

        {/* Tabs + Search */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: "courses", label: "Cursos", icon: ShoppingCart },
                { value: "bundles", label: "Bundles", icon: Package },
                {
                  value: "subscriptions",
                  label: "Suscripciones",
                  icon: Calendar,
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 rounded-xl border-4 border-black px-6 py-3 font-bold transition-all hover:-translate-y-0.5 ${
                  activeTab === tab.value
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar órdenes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-4 border-black bg-card py-3 pl-12 pr-4 font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-main"
            />
          </div>

          <p className="text-sm font-bold text-muted-foreground">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-main" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rotate-6 rounded-full border-4 border-black bg-destructive" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-black bg-card">
                    <ShoppingCart
                      className="h-20 w-20 stroke-chart-2"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-black">
                  {searchQuery
                    ? "No se encontraron órdenes"
                    : "Sin órdenes aún"}
                </h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  {searchQuery
                    ? `No hay órdenes que coincidan con "${searchQuery}"`
                    : "No has realizado compras en esta categoría."}
                </p>
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
                  >
                    Limpiar búsqueda
                  </button>
                ) : (
                  <Link to="/courses">
                    <Button type="button">Explorar Cursos</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Orders Grid
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/order-history/${order.id}`}
                className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Header */}
                <div className="border-b-4 border-black bg-main p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                        {order.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-muted-foreground">
                        {order.type}
                      </p>
                    </div>
                    <div
                      className={`rounded-full border-2 border-black px-3 py-1 text-xs font-bold ${
                        order.paymentStatus === "completed"
                          ? "bg-chart-2 text-white"
                          : order.paymentStatus === "active"
                            ? "bg-chart-4"
                            : "bg-muted"
                      }`}
                    >
                      {order.paymentStatus === "completed"
                        ? "Pagado"
                        : order.paymentStatus === "active"
                          ? "Activo"
                          : "Pendiente"}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 p-4">
                  {/* Price - Large */}
                  <div>
                    <p className="text-sm font-bold text-muted-foreground">
                      Total
                    </p>
                    <p className="text-3xl font-black tabular-nums">
                      ${order.price}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bold">{formatDate(order.date)}</span>
                  </div>

                  {/* Payment Method */}
                  <div className="rounded-lg border-2 border-black bg-card p-3">
                    <p className="mb-1 text-xs font-bold text-muted-foreground">
                      Método de Pago
                    </p>
                    <p className="text-sm font-bold">
                      {formatPaymentMethod(order)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("#", "_blank");
                      }}
                      className="flex-1 rounded-lg border-2 border-black bg-card px-3 py-2 text-sm font-bold transition-colors hover:bg-main"
                    >
                      <Receipt className="mx-auto h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("#", "_blank");
                      }}
                      className="flex-1 rounded-lg border-2 border-black bg-card px-3 py-2 text-sm font-bold transition-colors hover:bg-main"
                    >
                      <Download className="mx-auto h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
