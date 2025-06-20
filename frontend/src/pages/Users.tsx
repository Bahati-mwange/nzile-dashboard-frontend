
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UserSearch from '@/components/users/UserSearch';
import UserTable, { User, UserRole } from '@/components/users/UserTable';
import UserAddDialog from '@/components/users/UserAddDialog';
import UserDeleteConfirmation from '@/components/users/UserDeleteConfirmation';

// Données fictives pour les utilisateurs
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Jean Koumba',
    email: 'jean.koumba@transport.gouv.ga',
    role: 'admin',
    department: 'Direction Générale',
    status: 'active',
    lastLogin: '2025-04-01 08:30',
  },
  {
    id: '2',
    name: 'Marie Moussavou',
    email: 'marie.moussavou@police.gouv.ga',
    role: 'police',
    department: 'Police Routière - Libreville',
    status: 'active',
    lastLogin: '2025-04-03 10:15',
  },
  {
    id: '3',
    name: 'Pierre Ndong',
    email: 'pierre.ndong@transport.gouv.ga',
    role: 'ministry',
    department: 'Ministère des Transports',
    status: 'active',
    lastLogin: '2025-04-02 14:45',
  },
  {
    id: '4',
    name: 'François Ondo',
    email: 'francois.ondo@surveillance.gouv.ga',
    role: 'surveillance',
    department: 'Service de Surveillance Routière',
    status: 'inactive',
    lastLogin: '2025-03-28 09:00',
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setUserToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditUser = (user: User) => {
    // In a real app, this would save the edits to the backend
    console.log('Editing user:', user);
  };

  const handleAddUser = () => {
    // In a real app, this would add a new user to the database
    console.log('Adding new user');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter the users based on the search query
  };

  const handleFilterChange = (role: string) => {
    setRoleFilter(role);
    // In a real app, this would filter the users based on the role
  };

  const handleDeleteRequest = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <UserAddDialog onSubmit={handleAddUser} />
        </Dialog>
      </div>
      
      <UserSearch 
        onSearch={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      
      <UserTable 
        users={users}
        onEdit={handleEditUser}
        onDeleteRequest={handleDeleteRequest}
      />
      
      <UserDeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default Users;
