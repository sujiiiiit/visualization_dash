import { navItem } from "@/lib/types";
import { MountainIcon } from "@/components/ui/icon";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden  flex-col border-r bg-background md:flex md:w-64 w-0 p-2">
        <nav className="flex flex-col ">
          <Link
            to="#"
            className="group flex items-center p-1.5  gap-2 text-2xl font-semibold  mb-3"
          >
            <span className="flex h-9 aspect-square justify-center items-center bg-primary rounded-lg text-primary-foreground">
              <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            </span>
            <span>Blackcoffer</span>
          </Link>

          {navItem.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`group  flex px-3 py-5 my-1 justify-start items-center rounded-md  transition-colors text-base md:h-8 ${
                location.pathname == item.link
                  ? "bg-black/10 dark:bg-white/10 text-foreground"
                  : "hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="pl-4">{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
