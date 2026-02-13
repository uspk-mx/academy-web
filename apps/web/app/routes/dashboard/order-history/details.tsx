import { ArrowLeft, ArrowLeftIcon, Calendar, CheckCircle2, Clock, CreditCard, Download, ExternalLink, Package, Receipt, Tag, User } from "lucide-react";

import type { GetProfileQuery, GetProfileQueryVariables } from "gql-generated/gql/graphql";
import { GetProfileDocument } from "gql-generated/gql/graphql";
import { Link, useParams } from "react-router";
import { Button } from "ui/components/button";
import { Header } from "ui/components/dashboard/header";
import { useQuery } from "urql";
import { formatDate } from "ui/lib/utils";

  // Mock data for orders
  const mockOrders = {
  ord_123456: {
    id: "ord_123456",
    title: "Advanced Web Development with React",
    type: "Course",
    courseId: "course_123",
    price: 49.99,
    date: "2023-03-15T14:30:22",
    paymentStatus: "completed",
    paymentMethod: "American Express",
    cardLast4: "1003",
    stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    items: [
      {
        name: "Advanced Web Development with React",
        description: "Learn advanced React techniques and patterns",
        price: 49.99,
        quantity: 1,
      },
    ],
    subtotal: 49.99,
    discount: 0,
    tax: 4.0,
    total: 53.99,
  },
  ord_234567: {
    id: "ord_234567",
    title: "Full-Stack Developer Bundle",
    type: "Bundle",
    courseId: "bundle_234",
    price: 99.99,
    date: "2023-02-28T09:15:47",
    paymentStatus: "completed",
    paymentMethod: "PayPal",
    paypalEmail: "student@demotutor.com",
    stripeId: "pi_3NkLmE2eZvKYlo2C1MFsaXYZ",
    items: [
      {
        name: "Advanced Web Development with React",
        description: "Learn advanced React techniques and patterns",
        price: 49.99,
        quantity: 1,
      },
      {
        name: "Node.js for Beginners",
        description: "Get started with server-side JavaScript",
        price: 39.99,
        quantity: 1,
      },
      {
        name: "MongoDB Essentials",
        description: "Master the popular NoSQL database",
        price: 29.99,
        quantity: 1,
      },
    ],
    subtotal: 119.97,
    discount: 19.98,
    tax: 8.0,
    total: 107.99,
  },
};


  export default function OrderDetailsPage() {
 const params = useParams();
  const id = params.oid as string;
  const order = mockOrders[id as keyof typeof mockOrders];

    const [{ data }] = useQuery<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
    });

  if (!order) {
    return (
      <div className="min-h-screen bg-bg p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <Link to="/order-history">
            <Button type="button">
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a órdenes
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-destructive" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <h2 className="text-2xl font-black">Orden no encontrada</h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  La orden que buscas no existe o ha sido eliminada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
    return (
      <div className="min-h-screen bg-bg p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Back Button */}
          <Link to="/order-history">
            <Button type="button" variant="neutral">
              <ArrowLeft className="h-4 w-4" />
              Volver a órdenes
            </Button>
          </Link>

          {/* Order header */}
          <div className="overflow-hidden mt-6 rounded-xl border-4 border-black bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-4 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-black">Orden #{order.id}</h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold">
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <div
                      className={`rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold ${
                        order.paymentStatus === "completed"
                          ? "bg-chart-2 text-white"
                          : "bg-chart-4"
                      }`}
                    >
                      <CheckCircle2 className="mr-1 inline h-4 w-4" />
                      {order.paymentStatus === "completed"
                        ? "Completado"
                        : "Pendiente"}
                    </div>
                    <div className="rounded-full border-2 border-black bg-main px-4 py-1.5 text-sm font-bold">
                      <Package className="mr-1 inline h-4 w-4" />
                      {order.type}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button type="button" variant="neutral" size="sm">
                    <Receipt className="h-4 w-4" />
                    Recibo
                  </Button>
                  <Button type="button" size="sm">
                    <Download className="h-4 w-4" />
                    Factura
                  </Button>
                </div>
              </div>

              {/* Access Course Button - Prominent */}
              {order.courseId && (
                <Link to={`/courses/${order.courseId}`}>
                  <button
                    type="button"
                    className="w-full rounded-xl border-4 border-black bg-main py-4 font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <ExternalLink className="mr-2 inline h-5 w-5" />
                    Acceder al Curso
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content - 2 columns */}
            <div className="space-y-6 lg:col-span-2">
              {/* Items Purchased */}
              <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b-4 border-black bg-chart-4 p-4">
                  <h2 className="text-xl font-black">Items Comprados</h2>
                </div>
                <div className="divide-y-4 divide-black p-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs font-bold text-muted-foreground">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black tabular-nums">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b-4 border-black bg-chart-2 p-4">
                  <h2 className="text-xl font-black">Resumen de Orden</h2>
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Subtotal</span>
                    <span className="font-bold tabular-nums">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="font-bold">Descuento</span>
                      <span className="font-bold tabular-nums text-chart-2">
                        -${order.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-bold">Impuestos</span>
                    <span className="font-bold tabular-nums">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t-4 border-black pt-3">
                    <div className="flex justify-between">
                      <span className="text-2xl font-black">Total</span>
                      <span className="text-2xl font-black tabular-nums">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Payment Info */}
              <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b-4 border-black bg-destructive p-4">
                  <h2 className="font-black text-white">Información de Pago</h2>
                </div>
                <div className="space-y-4 p-4">
                  <div>
                    <p className="mb-2 text-xs font-bold text-muted-foreground">
                      Método de Pago
                    </p>
                    <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-main p-3">
                      <CreditCard className="h-5 w-5 shrink-0" />
                      <div>
                        <p className="font-bold">{order.paymentMethod}</p>
                        {order.paymentMethod === "American Express" && 'cardLast4' in order && order.cardLast4 && (
                          <p className="text-sm">****{order.cardLast4}</p>
                        )}
                        {order.paymentMethod === "PayPal" && 'paypalEmail' in order && order.paypalEmail && (
                          <p className="text-sm">{order.paypalEmail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold text-muted-foreground">
                      Estado de Pago
                    </p>
                    <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-chart-2/10 p-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2" />
                      <span className="font-bold text-chart-2">Completado</span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold text-muted-foreground">
                      ID de Transacción
                    </p>
                    <p className="break-all rounded-lg border-2 border-black bg-muted p-3 font-mono text-xs">
                      {order.stripeId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b-4 border-black bg-chart-1 p-4">
                  <h2 className="font-black">Estadísticas</h2>
                </div>
                <div className="space-y-3 p-4">
                  {[
                    {
                      label: "Items",
                      value: order.items.length,
                      icon: Package,
                    },
                    {
                      label: "Ahorro",
                      value: `$${order.discount.toFixed(2)}`,
                      icon: Tag,
                    },
                    {
                      label: "Procesado",
                      value: formatDate(order.date, {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).split(",")[1],
                      icon: Clock,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded-lg border-2 border-black bg-main p-3"
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon className="h-4 w-4" />
                        <span className="font-bold">{stat.label}</span>
                      </div>
                      <span className="font-black tabular-nums">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
