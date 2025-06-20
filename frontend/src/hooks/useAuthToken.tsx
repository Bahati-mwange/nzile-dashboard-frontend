
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Simulated token expiration time (30 minutes)
const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000;

export const useAuthToken = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  // Simulate token expiration check
  useEffect(() => {
    // For demo purposes, set a timer to simulate token expiration
    const expirationTimer = setTimeout(() => {
      setIsExpired(true);
      setShowDialog(true);
    }, TOKEN_EXPIRATION_TIME);
    
    return () => clearTimeout(expirationTimer);
  }, []);
  
  // Handle token refresh
  const refreshToken = useCallback(() => {
    // Simulate token refresh
    setIsExpired(false);
    setShowDialog(false);
    toast({
      title: "Session rafraîchie",
      description: "Votre session a été rafraîchie avec succès",
    });
  }, []);
  
  // Handle logout
  const logout = useCallback(() => {
    // Redirect to login page
    window.location.href = "/login";
  }, []);
  
  // Token expiration dialog
  const TokenExpirationDialog = () => (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Session expirée</DialogTitle>
          <DialogDescription>
            Votre session a expiré. Veuillez vous reconnecter ou rafraîchir la session pour continuer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={logout}>
            Reconnexion
          </Button>
          <Button onClick={refreshToken}>
            Rafraîchir la session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  return { isExpired, TokenExpirationDialog };
};
