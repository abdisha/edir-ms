import { Outlet, Link } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import {
  Home,
  LayoutDashboard,
  Handshake,
  BarChart,
  LogIn,
} from "lucide-react"; // Assuming lucide-react for icons
import {Button} from "@/shared/components/ui/button";

export default function MainLayout() {
  return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b bg-background">
          <div className="container mx-auto flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
                to="/"
                className="text-xl font-bold"
            >
              LogiFlow
            </Link>

            {/* Navigation */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} sm:px-2 md:px-3`}
                  >
                    <Link to="/home" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} sm:px-2 md:px-3`}
                  >
                    <Link to="/" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} sm:px-2 md:px-3`}
                  >
                    <Link to="/Contribution" className="flex items-center gap-2">
                      <Handshake className="h-4 w-4" />
                      <span>Contribution</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>


                <NavigationMenuItem>
                  <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} sm:px-2 md:px-3`}
                  >
                    <Link to="/reports" className="flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      <span>Reports</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* User menu / Login button */}
              <Button>
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto flex-1 px-4 py-8">
          <Outlet />
        </main>

        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LogiFlow. All rights reserved.
        </footer>
      </div>
  );
}