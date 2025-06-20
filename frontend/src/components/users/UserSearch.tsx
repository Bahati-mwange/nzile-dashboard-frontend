
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface UserSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (role: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch, onFilterChange }) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex space-x-2">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Rechercher un utilisateur..." 
          className="pl-10"
          onChange={handleSearchInput}
        />
      </div>
      <Select onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tous les rôles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les rôles</SelectItem>
          <SelectItem value="admin">Administrateur</SelectItem>
          <SelectItem value="police">Police</SelectItem>
          <SelectItem value="ministry">Ministère</SelectItem>
          <SelectItem value="surveillance">Surveillance</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">
        <Search className="mr-2 h-4 w-4" />
        Filtrer
      </Button>
    </div>
  );
};

export default UserSearch;
