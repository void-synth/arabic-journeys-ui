import { Menu, User } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";

interface NavbarProps {
  title: string;
  userName: string;
  onMenuToggle: () => void;
}

export function Navbar({ title, userName, onMenuToggle }: NavbarProps) {
  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <div className="flex items-center gap-2 pl-2 border-l border-border ml-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">{userName}</span>
        </div>
      </div>
    </header>
  );
}
