
import React from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UserEditDialog from './UserEditDialog';

export type UserRole = 'admin' | 'police' | 'ministry' | 'surveillance';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
};

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDeleteRequest: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDeleteRequest }) => {
  
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-gabon-blue text-white">
            Administrateur
          </Badge>
        );
      case 'police':
        return (
          <Badge className="bg-gabon-green text-white">
            Police
          </Badge>
        );
      case 'ministry':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Ministère
          </Badge>
        );
      case 'surveillance':
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Surveillance
          </Badge>
        );
    }
  };
  
  const getStatusBadge = (status: 'active' | 'inactive') => {
    return status === 'active' ? (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        Actif
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
        Inactif
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Département</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière connexion</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <UserEditDialog user={user} onSubmit={() => onEdit(user)} />
                    </Dialog>
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onSelect={(e) => {
                        e.preventDefault();
                        onDeleteRequest(user.id);
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
