import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../language/LanguageSwitcher";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type NavItem = {
  to: string;
  label: string;
};

export function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const isAuthenticated = localStorage.getItem("access_token");

  const links: readonly NavItem[] = isAuthenticated
    ? [
        { to: "/", label: t("navigation.main") },
        { to: "/chat", label: t("navigation.chat") },
        { to: "/upload", label: t("navigation.upload") },
      ]
    : [
        { to: "/", label: t("navigation.main") },
        { to: "/login", label: t("navigation.login") },
        { to: "/register", label: t("navigation.register") },
      ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="
      sticky top-0 z-50
      border-b
      bg-background/80
      backdrop-blur
      supports-[backdrop-filter]:bg-background/60
    "
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          AI DOCS
        </NavLink>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex gap-1">
            {links.map((link) => (
              <Button key={link.to} variant="ghost" asChild>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {link.label}
                </NavLink>
              </Button>
            ))}
          </nav>

          <LanguageSwitcher />
          <ThemeToggle />

          {isAuthenticated && (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" />
              {t("navigation.logout")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <nav className="mt-8 flex flex-col gap-2">
                {links.map((link) => (
                  <Button
                    key={link.to}
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setSheetOpen(false)}
                      className={({ isActive }) =>
                        isActive ? "font-semibold" : "text-muted-foreground"
                      }
                    >
                      {link.label}
                    </NavLink>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
