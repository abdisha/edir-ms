import {Link, NavLink, Outlet, useNavigate} from "react-router";
import {
  BarChart3,
  CalendarsIcon,
  Handshake,
  Home,
  LogIn,
  LogOut,
  SettingsIcon,
  ShelvingUnit,
  User,
  Users2Icon
} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {useAuth} from "@/features/auths/useAuth";

const navigation = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Members",
    href: "/members",
    icon: Users2Icon
  },
  {
    title: "Contributions",
    href: "/contributions",
    icon: Handshake,
  },
  {
    title: "Funeral Event",
    href: "/funeral-event",
    icon: CalendarsIcon,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: ShelvingUnit,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/setting",
    icon: SettingsIcon,
  },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const {user, isAuthenticated, logout} = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
      <div className="flex min-h-screen flex-col bg-linear-to-b from-background via-muted/20 to-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <Link
                to="/"
                className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground shadow">
                E
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold tracking-tight">
                  EdirMIS
                </h1>
                <p className="text-xs text-muted-foreground">
                  Edir Management Information System
                </p>
              </div>
            </Link>

            {/* Navigation */}
            {isAuthenticated && (
              <NavigationMenu>
                <NavigationMenuList>
                  {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavigationMenuItem  key={item.href}>

                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        navigationMenuTriggerStyle(),
                                        "gap-2",
                                        isActive &&
                                        "bg-accent text-accent-foreground"
                                    )
                                }
                            >
                              <Icon className="h-4 w-4" />
                              {item.title}
                            </NavLink>
                        </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button aria-label="User" variant="ghost" size="icon" className="rounded-full">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {user.firstName?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 text-sm">
                      <p className="font-semibold">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="lg" className="sm:w-auto" variant="default">
                  <Link  to="/login" className="flex items-center gap-2 py-2">
                    <LogIn className="h-4 w-3" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          <div className="container mx-auto flex h-full max-w-7xl flex-col px-6 py-10">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background/60">
          <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} EdirMIS. All rights reserved.
            </p>

            <p className="hidden md:block">
              Built with React, TypeScript & Shadcn UI
            </p>
          </div>
        </footer>
      </div>
  );
}