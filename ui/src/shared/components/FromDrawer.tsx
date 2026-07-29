import type {ReactNode} from "react";
import {Loader2} from "lucide-react";
import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,} from "@/shared/components/ui/drawer";

interface FormDrawerProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  title: string;
  description?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
}

export function FormDrawer({
  open,
  onOpenChange,
  title,
  description,
  loading = false,
  size = "md",
  children,
}: FormDrawerProps) {
  const maxWidth = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }[size];

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (loading) return;
        onOpenChange(value);
      }}
      swipeDirection={'right'}
      showSwipeHandle={true}
      modal={true}
    >
      <DrawerContent className={`mx-auto ${maxWidth}`}>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>{title}</DrawerTitle>
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </div>
            {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
          </div>
        </DrawerHeader>
        <div className="relative p-6 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40 transition-colors">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Saving changes...</p>
              </div>
            </div>
          )}
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}