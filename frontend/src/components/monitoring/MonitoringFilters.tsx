import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar, Download, Filter, Search } from 'lucide-react';

type MonitoringFiltersProps = {
  title: string;
  onPeriodChange?: (period: string) => void;
  onSearch?: (term: string) => void;
  onExport?: (format: 'csv' | 'pdf') => void;
  showPeriodFilter?: boolean;
  showSearch?: boolean;
  showExport?: boolean;
};

const MonitoringFilters: React.FC<MonitoringFiltersProps> = ({
  title,
  onPeriodChange,
  onSearch,
  onExport,
  showPeriodFilter = true,
  showSearch = true,
  showExport = true,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    if (onSearch && searchTerm.length >= 4) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          {showPeriodFilter && (
            <Select onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue placeholder="Période" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="yesterday">Hier</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          )}

          {showSearch && (
            <div className="flex gap-2">
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onSearch && e.target.value.length >= 4) {
                    onSearch(e.target.value);
                  }
                }}
                className="w-full sm:w-64"
              />
              <Button variant="outline" size="icon" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          )}

          {showExport && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport && onExport('csv')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport && onExport('pdf')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" />
          Filtres avancés
        </Button>
      </div>
    </div>
  );
};

export default MonitoringFilters;
