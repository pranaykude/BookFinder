import { X, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Book[];
  onRemoveFavorite: (book: Book) => void;
  onBookClick: (book: Book) => void;
}

export const FavoritesModal = ({ 
  isOpen, 
  onClose, 
  favorites, 
  onRemoveFavorite, 
  onBookClick 
}: FavoritesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Your Favorites</h2>
            <p className="text-muted-foreground mt-1">
              {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full w-10 h-10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                No favorites yet
              </h3>
              <p className="text-muted-foreground">
                Start exploring and save books you'd like to read!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((book) => {
                const coverUrl = book.cover_i 
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : null;

                return (
                  <div key={book.key} className="bg-background rounded-xl p-4 border border-border group hover:border-primary/30 transition-all duration-200">
                    <div className="flex gap-4">
                      {/* Book Cover */}
                      <div className="flex-shrink-0">
                        {coverUrl ? (
                          <img
                            src={coverUrl}
                            alt={book.title}
                            className="w-16 h-24 object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
                            onClick={() => onBookClick(book)}
                          />
                        ) : (
                          <div 
                            className="w-16 h-24 bg-book-spine rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
                            onClick={() => onBookClick(book)}
                          >
                            <BookOpen className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-semibold text-card-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                          onClick={() => onBookClick(book)}
                        >
                          {book.title}
                        </h3>
                        
                        {book.author_name && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {book.author_name.slice(0, 2).join(", ")}
                          </p>
                        )}
                        
                        {book.first_publish_year && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {book.first_publish_year}
                          </p>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveFavorite(book)}
                          className="mt-2 text-muted-foreground hover:text-destructive p-0 h-auto"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};