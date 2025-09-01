import { useState, useRef } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFilters {
  title: string;
  author: string;
  subject: string;
  year: string;
  isbn: string;
}

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    title: "",
    author: "",
    subject: "",
    year: "",
    isbn: ""
  });

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (query.trim() || Object.values(filters).some(f => f.trim())) {
      onSearch(query, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      title: "",
      author: "",
      subject: "",
      year: "",
      isbn: ""
    });
    setQuery("");
  };

  const hasActiveFilters = Object.values(filters).some(f => f.trim());

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div 
        ref={searchRef}
        className="search-glow relative bg-card border border-border rounded-2xl p-4 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for books by title, author, or keyword..."
              className="pl-12 pr-4 py-3 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`transition-colors duration-200 ${
                showFilters || hasActiveFilters ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn-hero h-12 px-8"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-card border border-border rounded-2xl p-6 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Advanced Search</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Title</label>
              <Input
                value={filters.title}
                onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Book title"
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Author</label>
              <Input
                value={filters.author}
                onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Author name"
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Subject/Genre</label>
              <Input
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Fiction, History, etc."
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Publication Year</label>
              <Input
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                placeholder="2023"
                type="number"
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">ISBN</label>
              <Input
                value={filters.isbn}
                onChange={(e) => setFilters(prev => ({ ...prev, isbn: e.target.value }))}
                placeholder="978-0-123456-78-9"
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSearch} className="btn-secondary">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};