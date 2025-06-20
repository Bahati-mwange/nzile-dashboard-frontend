
import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserAddDialogProps {
  onSubmit: () => void;
}

const UserAddDialog: React.FC<UserAddDialogProps> = ({ onSubmit }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Nouvel utilisateur</DialogTitle>
        <DialogDescription>
          Créez un nouveau compte utilisateur pour accéder au système.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
          <Input id="name" placeholder="Nom et prénom" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="utilisateur@exemple.ga" />
        </div>
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">Rôle</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrateur</SelectItem>
              <SelectItem value="police">Police</SelectItem>
              <SelectItem value="ministry">Ministère</SelectItem>
              <SelectItem value="surveillance">Surveillance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">Département</label>
          <Input id="department" placeholder="Département ou service" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90" onClick={onSubmit}>
          Créer l'utilisateur
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UserAddDialog;
