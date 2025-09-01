import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

interface QuoteData {
  text: string;
  author: string;
}

export const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState<QuoteData>({
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin"
  });

  // Predefined literary quotes for consistent experience
  const literaryQuotes = [
    {
      text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      author: "George R.R. Martin"
    },
    {
      text: "The only thing that you absolutely have to know is the location of the library.",
      author: "Albert Einstein"
    },
    {
      text: "Books are a uniquely portable magic.",
      author: "Stephen King"
    },
    {
      text: "A room without books is like a body without a soul.",
      author: "Marcus Tullius Cicero"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      text: "Reading is to the mind what exercise is to the body.",
      author: "Joseph Addison"
    }
  ];

  useEffect(() => {
    // Get today's date to ensure same quote throughout the day
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('bookfinder_quote_date');
    const savedQuote = localStorage.getItem('bookfinder_quote');

    if (savedDate === today && savedQuote) {
      setQuote(JSON.parse(savedQuote));
    } else {
      // Pick a new quote based on the day
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const selectedQuote = literaryQuotes[dayOfYear % literaryQuotes.length];
      
      setQuote(selectedQuote);
      localStorage.setItem('bookfinder_quote_date', today);
      localStorage.setItem('bookfinder_quote', JSON.stringify(selectedQuote));
    }
  }, []);

  return (
    <div className="quote-section max-w-4xl mx-auto mb-12 fade-in-delay">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Quote className="w-6 h-6" />
          <span className="text-sm font-medium uppercase tracking-wider">Quote of the Day</span>
        </div>
        
        <blockquote className="text-lg md:text-xl font-medium text-card-foreground leading-relaxed italic">
          "{quote.text}"
        </blockquote>
        
        <p className="text-muted-foreground font-medium">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};