import { Bell, Menu, Search } from "lucide-react";

import { Button } from "../ui/button";
import { ThemeToggle } from "../common/ThemeToggle";
import { useUser } from "../../context/UserContext";
export function Header({ title, onMenuClick }) {
  const { user, loadingUser } = useUser();

  // Generate initials from the real user's name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">

      {/* Mobile Menu */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Page Title */}
      <h1 className="text-base font-semibold tracking-tight md:text-lg">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-1.5 md:gap-2">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search transactions..."
            className="h-9 w-52 rounded-lg border border-border bg-muted/50 pl-9 pr-3 text-sm outline-none focus:bg-background lg:w-64"
          />
        </div>

        {/* Mobile Search */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        {/* Theme */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />

          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500 ring-2 ring-background" />
        </Button>

        {/* User */}
        <div className="ml-1 flex items-center gap-2.5 border-l border-border pl-2 md:pl-3">

          {/* Avatar */}
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {loadingUser ? "..." : initials}
          </div>

          {/* Name + Role */}
          <div className="hidden leading-tight sm:block">

            <p className="text-sm font-medium">
              {loadingUser
                ? "Loading..."
                : user?.name || "User"}
            </p>

            <p className="text-xs capitalize text-muted-foreground">
              {user?.role
                ? user.role.toLowerCase()
                : "user"}
            </p>

          </div>
        </div>

      </div>
    </header>
  );
}