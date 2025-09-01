import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, BookOpen, Heart, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user
    const savedUser = localStorage.getItem('bookfinder_user');
    if (!savedUser) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(savedUser);
    setUser(userData);
    setEditName(userData.name);
    setEditEmail(userData.email);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bookfinder_user');
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate('/');
  };

  const handleSaveEdit = () => {
    const updatedUser = { ...user, name: editName, email: editEmail };
    setUser(updatedUser);
    localStorage.setItem('bookfinder_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        onShowAuth={() => {}}
        onShowFavorites={() => navigate('/')}
        user={user}
        favoriteCount={favorites.length}
      />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">My Profile</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your account information and view your reading preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Profile Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Name</Label>
                        <p className="text-lg font-medium">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="text-lg font-medium">{user.email}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Reading Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Favorite Books</span>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-secondary" />
                        <span className="font-bold text-lg">{favorites.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-medium">Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Books
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/')}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    View Favorites
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}