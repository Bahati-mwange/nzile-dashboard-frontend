import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { useLoading } from '@/contexts/LoadingContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    if (!username || !password) {
      toast({
        title: "Erreur de connexion",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simuler une connexion (à remplacer par une vraie API)
    setTimeout(() => {
      setIsLoading(false);

      // Connexion réussie pour la démonstration
      if (username === "agent" && password === "password") {
        toast({
          title: "Connexion réussie",
          variant: "success"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Identifiants incorrects",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4 mb-8 text-center">
        <Logo size="large" />
      </div>

      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour accéder à l'application
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                placeholder="Entrez votre identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Utilisez "agent" pour la démo
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-600 hover:underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Utilisez "password" pour la démo
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-500">Se souvenir de moi</label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#082758] hover:bg-white hover:text-[#082758] text-white"
              type="submit"
            >
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </Card>
      <p className="text-center text-sm text-gray-500 mt-4">
        Système de contrôle routier &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Login;
