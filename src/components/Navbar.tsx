
import { useThemeContext } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoonIcon, 
  SunIcon, 
  Menu as MenuIcon, 
  MonitorIcon 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden mr-2">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">打开菜单</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px]">
            <nav className="flex flex-col gap-4 mt-8">
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
          </SheetContent>
        </Sheet>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex ml-auto space-x-2">
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
        
        <div className="ml-auto md:ml-4 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group p-2 rounded-md bg-background text-foreground hover:bg-accent"
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <MonitorIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all" 
                  style={{ 
                    opacity: theme === 'system' ? 1 : 0,
                    transform: theme === 'system' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)'
                  }} 
                />
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
