import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        toast({
          title: "Error",
          description: "Name is required for signup",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords don't match",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = {
      id: Date.now().toString(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    };

    localStorage.setItem('bookfinder_user', JSON.stringify(user));
    onLogin(user);
    
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin ? "You've successfully signed in." : "Welcome to Book Finder!",
    });

    setIsLoading(false);
    onClose();
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full w-10 h-10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Full Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Confirm Password</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm your password"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6"
            variant="hero"
          >
            {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={switchMode}
            className="mt-1 text-primary"
          >
            {isLogin ? "Sign up here" : "Sign in here"}
          </Button>
        </div>
      </div>
    </div>
  );
};