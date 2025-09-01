import { useState, useEffect } from "react";
import { BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Components
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { BookDetail } from "@/components/BookDetail";
import { AuthModal } from "@/components/AuthModal";
import { FavoritesModal } from "@/components/FavoritesModal";
import { QuoteOfTheDay } from "@/components/QuoteOfTheDay";
import { Footer } from "@/components/Footer";
import { CategorySlider } from "@/components/CategorySlider";
import { SearchHistory } from "@/components/SearchHistory";
import { FloatingBook } from "@/components/FloatingBook";

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

interface SearchFilters {
  title: string;
  author: string;
  subject: string;
  year: string;
  isbn: string;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Popular/trending searches for the homepage
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Check for saved user
    const savedUser = localStorage.getItem('bookfinder_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('bookfinder_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Check theme preference
    const savedTheme = localStorage.getItem('bookfinder_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Load trending books on initial load
    searchTrendingBooks();
  }, []);

  const searchTrendingBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/search.json?q=subject:fiction&limit=6&sort=rating');
      const data = await response.json();
      if (data.docs) {
        setTrendingBooks(data.docs);
      }
    } catch (error) {
      console.error('Error fetching trending books:', error);
    }
  };

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setIsLoading(true);
    setHasSearched(true);

    // Add to search history
    if ((window as any).addToSearchHistory) {
      (window as any).addToSearchHistory(query, filters);
    }

    try {
      let searchParams = new URLSearchParams();
      
      if (query.trim()) {
        searchParams.append('q', query);
      }
      
      if (filters.title) searchParams.append('title', filters.title);
      if (filters.author) searchParams.append('author', filters.author);
      if (filters.subject) searchParams.append('subject', filters.subject);
      if (filters.year) searchParams.append('first_publish_year', filters.year);
      if (filters.isbn) searchParams.append('isbn', filters.isbn);
      
      searchParams.append('limit', '24');
      
      const response = await fetch(`https://openlibrary.org/search.json?${searchParams}`);
      const data = await response.json();
      
      if (data.docs) {
        setBooks(data.docs);
        if (data.docs.length === 0) {
          toast({
            title: "No results found",
            description: "Try adjusting your search terms or filters.",
          });
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error searching for books. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (book: Book) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.key === book.key);
    
    let newFavorites;
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(fav => fav.key !== book.key);
      toast({
        title: "Removed from favorites",
        description: `"${book.title}" was removed from your favorites.`,
      });
    } else {
      newFavorites = [...favorites, book];
      toast({
        title: "Added to favorites",
        description: `"${book.title}" was added to your favorites.`,
      });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('bookfinder_favorites', JSON.stringify(newFavorites));
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bookfinder_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bookfinder_theme', 'light');
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    // Redirect to profile page after successful login
    window.location.href = '/profile';
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bookfinder_user');
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        onShowAuth={() => setShowAuth(true)}
        onShowFavorites={() => setShowFavorites(true)}
        user={user}
        favoriteCount={favorites.length}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 fade-in relative">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
              Discover Your Next
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Favorite Book
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Search through millions of books with advanced filters, save your favorites, and explore literary treasures from around the world.
            </p>
          </div>
          <FloatingBook />
        </div>

        {/* Quote of the Day */}
        <QuoteOfTheDay />

        {/* Search Section */}
        <div className="mb-12 fade-in">
          <SearchHistory onSearchSelect={(query, filters) => handleSearch(query, filters || {})} />
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results or Trending Section */}
        {hasSearched ? (
          // Search Results
          <div className="fade-in">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-muted-foreground">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-lg">Searching for books...</span>
                </div>
              </div>
            ) : books.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold text-foreground">Search Results</h3>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {books.length} books found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <BookCard
                      key={book.key}
                      book={book}
                      onBookClick={setSelectedBook}
                      onFavoriteToggle={toggleFavorite}
                      isFavorite={favorites.some(fav => fav.key === book.key)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
                <p className="text-muted-foreground">Try different search terms or adjust your filters.</p>
              </div>
            )}
          </div>
        ) : (
          // Trending Books Section
          <div className="fade-in-delay">
            {/* Category Slider */}
            <CategorySlider onCategorySelect={(category) => handleSearch('', { title: '', author: '', subject: category, year: '', isbn: '' })} />
            
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Trending Now</h3>
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            
            {trendingBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingBooks.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onBookClick={setSelectedBook}
                    onFavoriteToggle={toggleFavorite}
                    isFavorite={favorites.some(fav => fav.key === book.key)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-muted-foreground">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span>Loading trending books...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onFavoriteToggle={toggleFavorite}
          isFavorite={favorites.some(fav => fav.key === selectedBook.key)}
        />
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
      />

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemoveFavorite={toggleFavorite}
        onBookClick={setSelectedBook}
      />

      <Footer />
    </div>
  );
};

export default Index;
