import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ModeToggleBtn from "@/components/theme/theme-toggle";
import { MountainIcon, MenuIcon } from "@/components/ui/icon";
import { navItem } from "@/lib/types";

import { Link, useLocation } from "react-router-dom";
export default function Header() {
  let location = useLocation();
  let currentNavItem = navItem.find((item) => item.link === location.pathname);
  let currentTitle = currentNavItem ? currentNavItem.title : "Dashboard";
  return (
    <>
      <header className="header  h-14 xs:h-12 relative flex items-center	px-4 py-0 justify-between xs:px-2 z-30">
        <Sheet>
          <div className="flex text-xl font-bold items-center gap-3">
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <span>{currentTitle}</span>
          </div>
          <div>
            <ModeToggleBtn />
          </div>

          <SheetContent side="left" className="sm:hidden p-3">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetHeader>
                <Link
                  to="#"
                  className="group flex shrink-0 items-center justify-left gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className=" group flex p-2 shrink-0 items-center justify-center gap-2 rounded-md  text-lg font-semibold  md:text-base">
                      <MountainIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                    </div>
                    <SheetTitle className="text-xl">Blackcoffer</SheetTitle>
                  </div>

                  <SheetDescription className="sr-only">
                    A modern dashboard
                  </SheetDescription>
                </Link>
              </SheetHeader>

              {navItem.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className={`flex items-center px-2  ${
                    location.pathname == item.link
                      ? "text-foreground"
                      : "text-muted-foreground  hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="pl-4">{item.title}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
