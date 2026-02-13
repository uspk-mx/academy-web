import { Fragment, type ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "ui/components/breadcrumb";
import { Separator } from "ui/components/separator";
import { SidebarTrigger } from "ui/components/sidebar";

interface PageBreadCrumbsProps {
  items: { label: string; href?: string }[];
}

export function PageBreadCrumbs({ items }: PageBreadCrumbsProps): ReactNode {
  return (
    <header className="flex items-center gap-2 h-16 shrink-0">
      <div className="flex items-center gap-2 pr-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 h-4" orientation="vertical" />
        {items.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <Fragment key={item.label.toLowerCase()}>
                  <BreadcrumbItem className="md:block hidden">
                    {item.href ? (
                      <BreadcrumbLink href={`/${item.href}`}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {index < items.length - 1 ? (
                    <BreadcrumbSeparator className="md:block hidden">
                      {" "}
                      ·{" "}
                    </BreadcrumbSeparator>
                  ) : null}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        ) : null}
      </div>
    </header>
  );
}
