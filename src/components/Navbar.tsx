import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, X, BookOpen, Home, User, Tag, BookMarked, Library } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, isActive, onClick }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-4 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavItem: React.FC<NavItemProps> = ({ href, label, icon, isActive, onClick }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="text-lg">{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: '首页', icon: <Home className="w-5 h-5" /> },
    { href: '/books', label: '书籍', icon: <Library className="w-5 h-5" /> },
    { href: '/categories', label: '分类', icon: <BookMarked className="w-5 h-5" /> },
    { href: '/tags', label: '标签', icon: <Tag className="w-5 h-5" /> },
    { href: '/about', label: '关于我', icon: <User className="w-5 h-5" /> },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl">CheatSheets</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <span className="font-bold text-xl">CheatSheets</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <nav className="flex-1 overflow-auto py-4 px-2 space-y-1">
                  {navItems.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      isActive={location.pathname === item.href}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </nav>
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="mr-2 h-5 w-5" />
                        <span>切换到浅色模式</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-5 w-5" />
                        <span>切换到深色模式</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;