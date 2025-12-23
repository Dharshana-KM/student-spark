import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Lightbulb, 
  BookOpen, 
  Rocket, 
  Users, 
  User, 
  Sparkles,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Guidance Hub", url: "/guidance", icon: Lightbulb },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Impact Board", url: "/impact", icon: Rocket },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      {/* Mobile header with trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold">GrowthPath</span>
        </div>
      </div>

      <Sidebar
        className={cn(
          "border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
        collapsible="icon"
      >
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg">GrowthPath</span>
          )}
        </div>

        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url || 
                    (item.url !== "/dashboard" && location.pathname.startsWith(item.url));
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "h-11 rounded-xl transition-all duration-200",
                          isActive 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "hover:bg-sidebar-accent"
                        )}
                      >
                        <NavLink to={item.url} className="flex items-center gap-3">
                          <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
                          {!collapsed && <span className="font-medium">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto p-4">
          <SidebarTrigger className="w-full justify-center" />
        </div>
      </Sidebar>
    </>
  );
}
