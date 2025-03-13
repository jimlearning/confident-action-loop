import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Link, useLocation } from "react-router-dom";
import * as NavigationMenu from "@/components/ui/navigation-menu"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation();

  const linkClass =
    "group flex h-9 w-max items-center justify-center rounded-md bg-background px-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[active]:bg-accent data-[active]:text-accent-foreground";

  return (
    <div className="w-full border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="mr-4 font-bold text-xl">读书笔记</Link>
        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu.Root className="relative hidden md:block">
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  active={pathname === '/'}
                >
                  <Link to="/" className={linkClass}>首页</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  active={pathname.startsWith('/timelines')}
                >
                  <Link to="/timelines" className={linkClass}>时间轴</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  active={pathname.startsWith('/tags')}
                >
                  <Link to="/tags" className={linkClass}>标签</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  active={pathname.startsWith('/categories')}
                >
                  <Link to="/categories" className={linkClass}>分类</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  active={pathname === '/about'}
                >
                  <Link to="/about" className={linkClass}>关于</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group flex items-center rounded-md bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              >
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
