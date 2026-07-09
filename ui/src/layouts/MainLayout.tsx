import {Link, NavLink, Outlet} from "react-router";
import {BarChart3, Handshake, Home, LogIn, SettingsIcon, Users2Icon,} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";

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
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink>
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
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side */}
            <div className="flex items-center ">
              <Button  size="lg" className="sm:w-auto" variant="default">
                <Link to="/login" className="flex items-center gap-2 py-2">
                  <LogIn className="h-4 w-3" />
                  Login
                </Link>
              </Button>
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