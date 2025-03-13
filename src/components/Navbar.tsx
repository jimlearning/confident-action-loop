
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useThemeContext } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import {
  Menu as MenuIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useThemeContext();
  const { pathname } = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/timelines', label: '时间轴' },
    { path: '/tags', label: '标签' },
    { path: '/categories', label: '分类' },
    { path: '/about', label: '关于' },
  ];

  return (
    <div className="w-full border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="mr-4 font-bold text-xl">读书笔记</Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center md:hidden">
          <Sheet>
            <SheetTrigger className="p-2">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">打开菜单</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px] flex flex-col">
              <nav className="flex flex-col gap-4 mt-8 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <span>主题设置</span>
                      <div className="relative w-5 h-5">
                        <SunIcon
                          className="absolute inset-0 h-5 w-5 transition-all"
                          style={{
                            transform: theme === 'light' ? 'scale(1) rotate(0)' : 'scale(0) rotate(-90deg)',
                            opacity: theme === 'light' ? 1 : 0
                          }}
                        />
                        <MoonIcon
                          className="absolute inset-0 h-5 w-5 transition-all"
                          style={{
                            transform: theme === 'dark' ? 'scale(1) rotate(0)' : 'scale(0) rotate(90deg)',
                            opacity: theme === 'dark' ? 1 : 0
                          }}
                        />
                        <MonitorIcon
                          className="absolute inset-0 h-5 w-5 transition-all"
                          style={{
                            transform: theme === 'system' ? 'scale(1) rotate(0)' : 'scale(0) rotate(90deg)',
                            opacity: theme === 'system' ? 1 : 0
                          }}
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <SunIcon className="mr-2 h-4 w-4" />
                      <span>亮色模式</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <MoonIcon className="mr-2 h-4 w-4" />
                      <span>暗色模式</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <MonitorIcon className="mr-2 h-4 w-4" />
                      <span>系统设置</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative w-10 h-10 rounded-md text-foreground hover:bg-accent flex items-center justify-center"
              >
                <div className="relative w-5 h-5">
                  <SunIcon
                    className="absolute inset-0 h-5 w-5 transition-all"
                    style={{
                      transform: `scale(${theme === 'light' ? 1 : 0})`,
                      opacity: theme === 'light' ? 1 : 0
                    }}
                  />
                  <MoonIcon
                    className="absolute inset-0 h-5 w-5 transition-all"
                    style={{
                      transform: `scale(${theme === 'dark' ? 1 : 0})`,
                      opacity: theme === 'dark' ? 1 : 0
                    }}
                  />
                  <MonitorIcon
                    className="absolute inset-0 h-5 w-5 transition-all"
                    style={{
                      transform: `scale(${theme === 'system' ? 1 : 0})`,
                      opacity: theme === 'system' ? 1 : 0
                    }}
                  />
                </div>
                <span className="sr-only">切换主题</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <SunIcon className="mr-2 h-4 w-4" />
                <span>亮色模式</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <MoonIcon className="mr-2 h-4 w-4" />
                <span>暗色模式</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <MonitorIcon className="mr-2 h-4 w-4" />
                <span>系统设置</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
