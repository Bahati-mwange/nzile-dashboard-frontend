import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Report } from '@/pages/Reports';

const formSchema = z.object({
  vehiclePlate: z.string().min(6, "La plaque d'immatriculation est requise"),
  driverName: z.string().min(3, "Le nom du conducteur est requis"),
  reason: z.string().min(5, "Le motif de l'infraction est requis"),
  amount: z.coerce.number().min(5000, "Le montant minimum est de 5000 XAF"),
  date: z.string().min(1, "La date est requise"),
  location: z.string().min(5, "Le lieu de l'infraction est requis"),
  status: z.enum(["pending", "paid", "contested"]),
  officer: z.string().min(3, "Le nom de l'agent est requis"),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmit: (data: Omit<Report, 'id'>) => void;
  onCancel: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehiclePlate: '',
      driverName: '',
      reason: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      location: '',
      status: 'pending',
      officer: '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    const reportData: Omit<Report, 'id'> = {
      vehiclePlate: values.vehiclePlate,
      driverName: values.driverName,
      reason: values.reason,
      amount: values.amount,
      date: values.date,
      location: values.location,
      status: values.status,
      officer: values.officer,
    };
    onSubmit(reportData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="vehiclePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plaque d'immatriculation</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: AB-123-CD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du conducteur</FormLabel>
                <FormControl>
                  <Input placeholder="Nom complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif de l'infraction</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Excès de vitesse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant (XAF)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Montant en XAF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de l'infraction</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Boulevard Triomphal, Libreville" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="paid">Payé</SelectItem>
                    <SelectItem value="contested">Contesté</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="officer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent verbalisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Nom et grade de l'agent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90">
            Enregistrer le PV
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReportForm;
