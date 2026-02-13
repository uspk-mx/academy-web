import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "ui/components/sidebar";
import type { NavItem } from "./types";

export interface SidebarNavProps {
  title: string;
  items: NavItem[];
}

export function NavMain({ title, items }: SidebarNavProps): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCollapses, setActiveCollapses] = useState<
    Record<string, boolean>
  >({});

  //   const userBasePath = `/users/${params.id}`;
  // const isUserDetailsRoute =
  //   pathname === userBasePath || location.pathname.startsWith(`${userBasePath}/`);

  // Comparación exacta - para marcar items como activos
  const isExactRouteActive = useCallback(
    (url: string) => {
      return location.pathname === url;
    },
    [location.pathname],
  );

  // Incluye sub-rutas - para expandir colapsibles
  const isRouteOrChildActive = useCallback(
    (url: string) => {
      if (url === "/") {
        return location.pathname === "/";
      }
      return (
        location.pathname === url || location.pathname.startsWith(`${url}/`)
      );
    },
    [location.pathname],
  );

  const handleCheckCollapse = useCallback(
    (itemTitle: string, itemUrl: string, subItems?: { url: string }[]) => {
      const isAnySubItemActive = subItems?.some((subItem) =>
        isExactRouteActive(subItem.url),
      );
      return isAnySubItemActive || isRouteOrChildActive(itemUrl);
    },
    [isExactRouteActive, isRouteOrChildActive],
  );

  useEffect(() => {
    const newActiveCollapses: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.items?.length) {
        newActiveCollapses[item.title] = handleCheckCollapse(
          item.title,
          item?.url as string,
          item.items as any,
        );
      }
    });
    setActiveCollapses(newActiveCollapses);
  }, [handleCheckCollapse, items, location.pathname]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            <Collapsible
              asChild
              className="group/collapsible"
              key={item.title}
              onOpenChange={(open) => {
                setActiveCollapses((prev) => ({ ...prev, [item.title]: open }));
              }}
              open={item.isActive || activeCollapses[item.title]}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isExactRouteActive(item.url ?? "")}
                    tooltip={item.title}
                    asChild
                  >
                    <Link to={item.url ?? ""} viewTransition>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                      <ChevronRight className="group-data-[state=open]/collapsible:rotate-90 ml-auto transition-transform duration-200" />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            className={
                              isExactRouteActive(subItem.url ?? "")
                                ? "bg-main! font-bold! !data-[active=true]:hover:bg-blue-50"
                                : ""
                            }
                            data-active={isExactRouteActive(subItem.url ?? "")}
                            to={subItem.url ?? ""}
                            viewTransition
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isExactRouteActive(item.url ?? "")}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? "bg-blue-50" : "")}
                  data-active={isExactRouteActive(item.url ?? "")}
                  to={item.url ?? ""}
                  end={item.url === "/"}
                >
                  {item.icon ? <item.icon /> : null}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
