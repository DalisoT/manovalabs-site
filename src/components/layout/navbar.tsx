"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navItems, siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-border-subtle" : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 lg:h-20 items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md overflow-hidden">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} logo`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                  priority
                />
              </span>
              <span className="hidden sm:inline-flex flex-col leading-none">
                <span className="text-label uppercase text-text-tertiary tracking-[0.18em]">
                  Manova
                </span>
                <span className="text-body font-semibold text-text-primary">
                  LABS
                </span>
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex h-10 items-center px-4 rounded-md text-body-sm transition-colors",
                        active
                          ? "text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-4 -bottom-px h-px bg-accent" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                asChild
                href="/start-project"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Start a Project
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-bg-elevated text-text-secondary hover:text-text-primary"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}