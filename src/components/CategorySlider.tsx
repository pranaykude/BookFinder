import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Category {
  name: string;
  key: string;
  icon: string;
  color: string;
  description: string;
}

interface CategorySliderProps {
  onCategorySelect: (category: string) => void;
}

export const CategorySlider = ({ onCategorySelect }: CategorySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories: Category[] = [
    {
      name: "Fiction",
      key: "fiction",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
      description: "Imaginative stories and novels"
    },
    {
      name: "Science",
      key: "science",
      icon: "🔬",
      color: "from-blue-500 to-cyan-500",
      description: "Scientific research and discoveries"
    },
    {
      name: "History",
      key: "history",
      icon: "🏛️",
      color: "from-amber-500 to-orange-500",
      description: "Historical events and biographies"
    },
    {
      name: "Fantasy",
      key: "fantasy",
      icon: "🐉",
      color: "from-green-500 to-emerald-500",
      description: "Magical worlds and adventures"
    },
    {
      name: "Romance",
      key: "romance",
      icon: "💕",
      color: "from-rose-500 to-pink-500",
      description: "Love stories and relationships"
    },
    {
      name: "Mystery",
      key: "mystery",
      icon: "🔍",
      color: "from-slate-500 to-gray-600",
      description: "Suspense and detective stories"
    },
    {
      name: "Biography",
      key: "biography",
      icon: "👤",
      color: "from-indigo-500 to-purple-500",
      description: "Life stories of notable people"
    },
    {
      name: "Technology",
      key: "technology",
      icon: "💻",
      color: "from-blue-500 to-teal-500",
      description: "Computing and digital innovation"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const handleCategoryClick = (category: Category) => {
    setIsAutoPlaying(false);
    onCategorySelect(category.key);
  };

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Browse by Category</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ width: `${(categories.length / itemsPerView) * 100}%` }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.key}
              className="flex-shrink-0"
              style={{ width: `${100 / categories.length}%` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};