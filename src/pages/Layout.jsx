

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Home, HelpCircle, Sparkles, User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppFooter from "@/components/layout/AppFooter";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Analyze Listing",
    url: createPageUrl("Analyze"),
    icon: Shield,
  },
  {
    title: "Help & FAQ",
    url: createPageUrl("FAQ"),
    icon: HelpCircle,
  },
  {
    title: "What's Next",
    url: createPageUrl("WhatsNext"),
    icon: Sparkles,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <style>
          {`
          :root {
            --canadian-red: #C8102E;
            --canadian-red-light: #E31E3B;
            --canadian-red-dark: #A00E26;
            --sidebar-bg: rgba(255, 255, 255, 0.95);
            --accent-gold: #FFD700;
          }
        `}
        </style>
        
        <Sidebar className="border-r border-red-100 bg-white/95 backdrop-blur-md">
          <SidebarHeader className="border-b border-red-100 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-600 fill-current">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">PropertyGuard</h2>
                <p className="text-xs text-red-700 font-medium">🍁 Fraud Detection</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-red-800 uppercase tracking-wider px-2 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-red-50 hover:text-red-700 transition-all duration-300 rounded-xl px-4 py-3 ${
                          location.pathname === item.url ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-red-800 uppercase tracking-wider px-2 py-2">
                Testing Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">URLs Tested</span>
                    <span className="font-bold text-blue-600">47</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Demo Scenarios</span>
                    <span className="font-bold text-green-600">3</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3 p-3 bg-red-50 rounded-lg">
                    🧪 App in testing phase - try demo URLs
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-red-100 p-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-red-700 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🍁
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">Protecting Canadians</p>
                  <p className="text-xs text-red-700">Stay safe in real estate</p>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-red-50 to-white">
          <header className="bg-white/80 backdrop-blur-md border-b border-red-100 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-red-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-gray-900">PropertyGuard 🍁</h1>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}

