import { X, ExternalLink, Calendar, User, Tag, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  first_sentence?: string[];
  subject?: string[];
  publisher?: string[];
  isbn?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

interface BookDetailProps {
  book: Book;
  onClose: () => void;
  onFavoriteToggle: (book: Book) => void;
  isFavorite: boolean;
}

export const BookDetail = ({ book, onClose, onFavoriteToggle, isFavorite }: BookDetailProps) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const openLibraryUrl = `https://openlibrary.org${book.key}`;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">Book Details</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="sticky top-0">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="w-full max-w-sm mx-auto aspect-[2/3] bg-book-spine rounded-2xl shadow-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => onFavoriteToggle(book)}
                    variant={isFavorite ? "default" : "outline"}
                    className="w-full"
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(openLibraryUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Open Library
                  </Button>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-4">
                  {book.title}
                </h1>
                
                {book.author_name && (
                  <div className="flex items-start gap-3 mb-4">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">
                        {book.author_name.length === 1 ? "Author" : "Authors"}
                      </p>
                      <p className="text-muted-foreground">
                        {book.author_name.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
                
                {book.first_publish_year && (
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-card-foreground">First Published</p>
                      <p className="text-muted-foreground">{book.first_publish_year}</p>
                    </div>
                  </div>
                )}
              </div>

              {book.first_sentence && (
                <div className="bg-quote rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-card-foreground mb-3">Opening Line</h3>
                  <blockquote className="text-muted-foreground italic text-lg leading-relaxed">
                    "{book.first_sentence[0]}"
                  </blockquote>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.publisher && book.publisher.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Publishers</h3>
                    <p className="text-muted-foreground">
                      {book.publisher.slice(0, 3).join(", ")}
                      {book.publisher.length > 3 && ` & ${book.publisher.length - 3} more`}
                    </p>
                  </div>
                )}

                {book.number_of_pages_median && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Pages</h3>
                    <p className="text-muted-foreground">{book.number_of_pages_median}</p>
                  </div>
                )}

                {book.language && book.language.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Languages</h3>
                    <p className="text-muted-foreground">
                      {book.language.slice(0, 5).join(", ")}
                    </p>
                  </div>
                )}

                {book.isbn && book.isbn.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">ISBN</h3>
                    <p className="text-muted-foreground font-mono text-sm">
                      {book.isbn[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Subjects/Genres */}
              {book.subject && book.subject.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-card-foreground">Subjects & Genres</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 12).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 12 && (
                      <span className="text-muted-foreground text-sm px-3 py-1">
                        +{book.subject.length - 12} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};