import { useState, useEffect } from "react";
import { BookOpen, Search, Heart, Users, Target, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

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

    // Check theme
    const savedTheme = localStorage.getItem('bookfinder_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description: "Search through millions of books with powerful filters including title, author, genre, year, and ISBN."
    },
    {
      icon: Heart,
      title: "Personal Library",
      description: "Save your favorite books and build your personal reading wishlist with easy access anytime."
    },
    {
      icon: BookOpen,
      title: "Rich Book Details",
      description: "Get comprehensive information about each book including covers, descriptions, and publication details."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Designed with readers in mind - clean, intuitive interface that works beautifully on all devices."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        onShowAuth={() => {}}
        onShowFavorites={() => {}}
        user={user}
        favoriteCount={favorites.length}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
            About Book Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your gateway to discovering amazing books from around the world. We make finding your next favorite read simple, enjoyable, and personal.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We believe that every reader deserves easy access to the world's vast collection of books. 
                Book Finder was created to bridge the gap between readers and their next great discovery, 
                using the power of technology to make book exploration intuitive, comprehensive, and delightful.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-16"
        >
          <Lightbulb className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We envision a world where discovering your next favorite book is as simple as a few clicks. 
            Where readers can effortlessly explore diverse literature, connect with stories that resonate, 
            and build their personal libraries with confidence and joy.
          </p>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Powered by Open Library</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Book Finder leverages the comprehensive Open Library database, giving you access to millions of books 
                from around the world. Our modern, responsive interface makes it easy to search, discover, and save 
                books across all your devices, ensuring your reading journey is always at your fingertips.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}