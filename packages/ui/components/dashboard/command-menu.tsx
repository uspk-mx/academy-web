import { Command } from "cmdk";
import {
  Award,
  BarChart3,
  BookOpen,
  Calculator,
  Calendar,
  LogOut,
  Search,
  Settings,
  Smile,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface CommandMenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  group: "suggestions" | "navigation" | "settings";
  keywords?: string[];
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Close on escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems: CommandMenuItem[] = [
    // Navigation
    {
      id: "courses",
      title: "Mis Cursos",
      icon: <BookOpen className="h-5 w-5" />,
      action: () => {
        navigate("/courses");
        onClose();
      },
      group: "navigation",
      keywords: ["courses", "cursos", "learning"],
    },
    {
      id: "certificates",
      title: "Certificados",
      icon: <Award className="h-5 w-5" />,
      action: () => {
        navigate("/certificates");
        onClose();
      },
      group: "navigation",
      keywords: ["certificates", "certificados", "awards"],
    },
    {
      id: "reports",
      title: "Reportes",
      icon: <BarChart3 className="h-5 w-5" />,
      action: () => {
        navigate("/reports");
        onClose();
      },
      group: "navigation",
      keywords: ["reports", "reportes", "progress", "stats"],
    },
    {
      id: "team",
      title: "Mi Equipo",
      icon: <Users className="h-5 w-5" />,
      action: () => {
        navigate("/team");
        onClose();
      },
      group: "navigation",
      keywords: ["team", "equipo", "company"],
    },

    // Settings
    {
      id: "profile",
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      action: () => {
        navigate("/profile");
        onClose();
      },
      group: "settings",
      keywords: ["profile", "perfil", "account"],
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      action: () => {
        navigate("/settings");
        onClose();
      },
      group: "settings",
      keywords: ["settings", "configuración", "preferences"],
    },
    {
      id: "logout",
      title: "Logout",
      icon: <LogOut className="h-5 w-5" />,
      action: () => {
        // Handle logout
        onClose();
      },
      group: "settings",
      keywords: ["logout", "sign out", "cerrar sesión"],
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchLower),
      )
    );
  });

  const groupedItems = {
    suggestions: filteredItems.filter((item) => item.group === "suggestions"),
    navigation: filteredItems.filter((item) => item.group === "navigation"),
    settings: filteredItems.filter((item) => item.group === "settings"),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <Command
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border-4 border-black bg-main shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        shouldFilter={false}
      >
        {/* Search Input */}
        <div className="flex items-center border-b-4 border-black bg-main px-4">
          <Search className="h-5 w-5 shrink-0" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            className="flex h-14 w-full bg-transparent px-4 py-3 text-lg font-bold placeholder:text-foreground/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-black/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-12 text-center text-sm font-bold text-muted-foreground">
            No results found.
          </Command.Empty>
          {groupedItems.suggestions.length > 0 && (
            <Command.Group
              heading="Suggestions"
              className="mb-2 overflow-hidden rounded-lg border-2 border-black bg-card"
            >
              <div className="border-b-2 border-black bg-chart-1 px-3 py-2">
                <p className="text-sm font-black">Suggestions</p>
              </div>
              {groupedItems.suggestions.map((item, index) => (
                <Command.Item
                  key={item.id}
                  onSelect={item.action}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-3 font-bold transition-colors hover:bg-main ${
                    index !== groupedItems.suggestions.length - 1
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {groupedItems.navigation.length > 0 && (
            <Command.Group
              className="mb-2 overflow-hidden rounded-lg border-2 border-black bg-card"
            >
              <div className="border-b-2 border-black bg-chart-2 px-3 py-2">
                <p className="text-sm font-black text-white">Navigation</p>
              </div>
              {groupedItems.navigation.map((item, index) => (
                <Command.Item
                  key={item.id}
                  onSelect={item.action}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-3 font-bold transition-colors hover:bg-main ${
                    index !== groupedItems.navigation.length - 1
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* Settings */}
          {groupedItems.settings.length > 0 && (
            <Command.Group
              className="overflow-hidden rounded-lg border-2 border-black bg-card"
            >
              <div className="border-b-2 border-black bg-chart-4 px-3 py-2">
                <p className="text-sm font-black text-white">Settings</p>
              </div>
              {groupedItems.settings.map((item, index) => (
                <Command.Item
                  key={item.id}
                  onSelect={item.action}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-3 font-bold transition-colors hover:bg-main ${
                    index !== groupedItems.settings.length - 1
                      ? "border-b-2 border-black"
                      : ""
                  } ${item.id === "logout" ? "text-destructive" : ""}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {item.id === "profile" && (
                    <kbd className="ml-auto rounded border-2 border-black bg-muted px-2 py-1 text-xs font-black">
                      ⌘P
                    </kbd>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </Command>
    </div>
  );
}

// Hook to use in navigation
export function useCommandMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}
