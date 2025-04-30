'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { useAuth } from '@/lib/auth/auth-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Award,
  Star,
  Users,
  Settings,
  CreditCard,
  User,
  LogOut,
  Menu,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
    },
    {
      href: '/dashboard/loyalty',
      label: 'Loyalty Program',
      icon: <Award className="w-5 h-5 mr-2" />,
    },
    {
      href: '/dashboard/reviews',
      label: 'Reviews',
      icon: <Star className="w-5 h-5 mr-2" />,
    },
    {
      href: '/dashboard/customers',
      label: 'Customers',
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5 mr-2" />,
    },
    {
      href: '/dashboard/billing',
      label: 'Billing',
      icon: <CreditCard className="w-5 h-5 mr-2" />,
    },
  ];

  // Check if the link is active
  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname?.startsWith(path);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <Logo className="mb-8" />
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    isActive(item.href) ? 'bg-accent' : 'transparent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Logo />
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {user?.email}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}