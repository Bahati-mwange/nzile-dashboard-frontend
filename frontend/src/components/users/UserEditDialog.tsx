
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

type Utilisateur = {
  id: string;
  nom: string;
  prénom: string;
  email: string;
  rôle: 'admin' | 'superviseur' | 'agent';
  statut: 'actif' | 'inactif';
  dernièreConnexion?: string;
};

interface UserEditDialogProps {
  user: Utilisateur;
  onSubmit: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ user, onSubmit }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogDescription>
          Mettre à jour les informations de l'utilisateur.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nom complet</label>
          <Input defaultValue={`${user.nom} ${user.prénom}`} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" defaultValue={user.email} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Rôle</label>
          <Select defaultValue={user.rôle}>
            <SelectTrigger>
              <SelectValue />
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
          <label className="text-sm font-medium">Statut</label>
          <Select defaultValue={user.statut}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Dernière connexion</label>
          <Input type="text" defaultValue={user.dernièreConnexion} disabled />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90" onClick={onSubmit}>
          Sauvegarder les modifications
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UserEditDialog;
