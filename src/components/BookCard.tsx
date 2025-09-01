import { Heart, BookOpen, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  first_sentence?: string[];
  subject?: string[];
}

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
  onFavoriteToggle: (book: Book) => void;
  isFavorite: boolean;
}

export const BookCard = ({ book, onBookClick, onFavoriteToggle, isFavorite }: BookCardProps) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div className="book-card bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 cursor-pointer stagger-fade fade-in group">
      <div className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative mb-4 mx-auto">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-32 h-48 bg-book-spine rounded-lg shadow-md flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(book);
            }}
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-200 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>

        {/* Book Info */}
        <div className="flex-1 space-y-3" onClick={() => onBookClick(book)}>
          <h3 className="font-semibold text-lg leading-snug text-card-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {book.title}
          </h3>
          
          {book.author_name && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm line-clamp-1">
                {book.author_name.slice(0, 2).join(", ")}
                {book.author_name.length > 2 && " & others"}
              </span>
            </div>
          )}
          
          {book.first_publish_year && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{book.first_publish_year}</span>
            </div>
          )}
          
          {book.first_sentence && (
            <p className="text-sm text-muted-foreground line-clamp-3 italic">
              "{book.first_sentence[0]}"
            </p>
          )}
          
          {book.subject && book.subject.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {book.subject.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};