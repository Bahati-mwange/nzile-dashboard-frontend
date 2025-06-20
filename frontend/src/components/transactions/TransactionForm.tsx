import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface TransactionFormProps {
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
  defaultAmount?: number;
  title?: string;
  description?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSuccess,
  onCancel,
  defaultAmount = 0,
  title = "Enregistrer un paiement",
  description = "Remplissez les champs pour enregistrer un nouveau paiement"
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [amount, setAmount] = React.useState(defaultAmount.toString());
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !paymentMethod) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      const data = {
        amount: parseFloat(amount),
        paymentMethod,
        date: new Date().toISOString(),
        reference: `TX-${Math.floor(Math.random() * 10000)}`
      };
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      toast({
        title: "Transaction enregistrée",
        description: `Paiement de ${parseFloat(amount).toLocaleString()} FCFA effectué avec succès.`,
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant (FCFA)</Label>
            <Input 
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant en FCFA"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Méthode de paiement</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Sélectionner une méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Espèces</SelectItem>
                <SelectItem value="airtel">Airtel Money</SelectItem>
                <SelectItem value="moov">Moov Money</SelectItem>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="transfer">Virement bancaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Input 
              id="notes"
              placeholder="Notes ou observations"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90" disabled={isSubmitting}>
            {isSubmitting ? 'Traitement...' : 'Confirmer le paiement'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransactionForm;
