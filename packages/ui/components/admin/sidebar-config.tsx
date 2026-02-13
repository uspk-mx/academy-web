import {
  BadgeCheckIcon,
  BadgeDollarSign,
  BarChart,
  BookOpen,
  BuildingIcon,
  CreditCard,
  Frame,
  GraduationCap,
  LayersIcon,
  LayoutDashboard,
  LifeBuoy,
  MapIcon,
  MessageSquareTextIcon,
  PieChart,
  Send,
  Settings,
  Users,
  UsersRoundIcon,
} from "lucide-react";
import type { SidebarConfig } from "./types";

export const sidebarConfig: SidebarConfig = {
  navMain: {
    title: "Plataforma",
    items: [
      {
        title: "Cursos",
        url: "/courses",
        icon: BookOpen,
        isActive: false,
        items: [
          {
            title: "Niveles",
            url: "/courses/levels",
          },
          {
            title: "Categorias",
            url: "/courses/categories",
          },
          {
            title: "Inscripciones",
            url: "/courses/enrollments",
          },
        ],
      },
      {
        title: "Bundles",
        url: "/bundles",
        icon: LayersIcon,
      },
      {
        title: "Estudiantes",
        url: "/students",
        icon: UsersRoundIcon,
      },
      {
        title: "Instructores",
        url: "/instructors",
        icon: GraduationCap,
      },
      {
        title: "Membresias",
        url: "/memberships",
        icon: BadgeDollarSign,
      },
      {
        title: "Empresas",
        url: "/companies",
        icon: BuildingIcon,
      },
    ],
  },
  businessNav: {
    title: "Plataforma",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        // isActive: true,
        items: [], // Overview of subscriptions, users, and courses
      },
      {
        title: "Licencias",
        url: "/licenses",
        icon: BadgeDollarSign,
        items: [
          {
            title: "Resumen",
            url: "/licenses",  
          },
          {
            title: "Ordenar Licencias",
            url: "/licenses/request",
          },
          {
            title: "Ordenes",
            url: "/licenses/orders",
          },
          {
            title: "Invitar y Asignar Licencias",
            url: "/licenses/assign",
          },
        ],
      },
      {
        title: "Usuarios",
        url: "/users",
        icon: Users,
        items: [
          {
            title: "Administar Empleados",
            url: "/users/employees",
          },
          {
            title: "Administar Administradores",
            url: "/users/admins",
          },
        ],
      },
      {
        title: "Cursos",
        url: "/courses",
        icon: BookOpen,
        items: [
          {
            title: "Ver Cursos",
            url: "/courses/catalog",
          },
          {
            title: "Seguimiento de Progreso",
            url: "/courses/progress",
          },
        ],
      },
      {
        title: "Facturación",
        url: "/billing",
        icon: CreditCard,
        items: [
          {
            title: "Métodos de Pago",
            url: "/billing/methods",
          },
          {
            title: "Facturas",
            url: "/billing/invoices",
          },
        ],
      },
      {
        title: "Ajustes",
        url: "/settings",
        icon: Settings,
        items: [
          {
            title: "Perfil de la Empresa",
            url: "/settings/profile",
          },
          {
            title: "Cuenta de la Empresa",
            url: "/settings/account",
          },
        ],
      },
    ],
  },
  tools: {
    title: "Herramientas",
    items: [
      {
        title: "Certificados",
        url: "/certificates",
        icon: BadgeCheckIcon,
        items: [{ title: "Plantillas", url: "/certificates/templates" }],
      },
      {
        title: "Comunicacion",
        url: "/communication",
        icon: MessageSquareTextIcon,
      },
      {
        title: "Performance",
        url: "/performance",
        icon: BarChart,
      },
    ],
  },
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Certificados",
      url: "/certificates",
      icon: Frame,
    },
    {
      name: "Bundles",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Subscriptions",
      url: "#",
      icon: MapIcon,
    },
  ],
};
