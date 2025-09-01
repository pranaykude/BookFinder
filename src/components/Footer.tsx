import { BookOpen, Heart, User, Mail, Info } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Book Finder
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md">
              Discover your next favorite book with our powerful search engine. 
              Explore millions of books, save your favorites, and find literary treasures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Home
              </Link>
              <Link 
                to="/about" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </nav>
          </div>

          {/* User Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <nav className="space-y-2">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Heart className="w-4 h-4" />
                Favorites
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Made with ❤️ by <span className="font-medium text-primary">Pranay</span>
          </p>
        </div>
      </div>
    </footer>
  );
};