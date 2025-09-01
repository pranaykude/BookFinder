import { BookOpen, User, Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onShowAuth: () => void;
  onShowFavorites: () => void;
  user: any;
  favoriteCount: number;
}

export const Header = ({ 
  isDarkMode, 
  onThemeToggle, 
  onShowAuth, 
  onShowFavorites, 
  user, 
  favoriteCount 
}: HeaderProps) => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Book Finder
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Discover your next favorite book</p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowFavorites}
              className="relative transition-all duration-200 hover:bg-accent"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favoriteCount > 9 ? "9+" : favoriteCount}
                </span>
              )}
              <span className="hidden sm:inline ml-2">Favorites</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="transition-all duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Auth */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowAuth}
              className="transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">
                {user ? `Hi, ${user.name}` : "Sign In"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};