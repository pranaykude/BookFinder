import { useState, useEffect } from "react";
import { Clock, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  filters?: any;
}

interface SearchHistoryProps {
  onSearchSelect: (query: string, filters?: any) => void;
}

export const SearchHistory = ({ onSearchSelect }: SearchHistoryProps) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookfinder_search_history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (query: string, filters?: any) => {
    if (!query.trim()) return;

    const newItem: SearchHistoryItem = {
      query: query.trim(),
      timestamp: Date.now(),
      filters
    };

    const updatedHistory = [
      newItem,
      ...searchHistory.filter(item => item.query !== query.trim())
    ].slice(0, 5); // Keep only last 5 searches

    setSearchHistory(updatedHistory);
    localStorage.setItem('bookfinder_search_history', JSON.stringify(updatedHistory));
  };

  const removeFromHistory = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('bookfinder_search_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('bookfinder_search_history');
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Expose addToHistory function globally so SearchBar can use it
  useEffect(() => {
    (window as any).addToSearchHistory = addToHistory;
    return () => {
      delete (window as any).addToSearchHistory;
    };
  }, [searchHistory]);

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-primary" />
            Recent Searches
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <AnimatePresence>
            {searchHistory.map((item, index) => (
              <motion.div
                key={`${item.query}-${item.timestamp}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto group hover:bg-accent"
                  onClick={() => onSearchSelect(item.query, item.filters)}
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{item.query}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => removeFromHistory(index, e)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};