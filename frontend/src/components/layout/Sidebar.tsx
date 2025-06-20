import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Car,
  Users,
  FileWarning,
  Shield,
  Bell,
  Settings,
  PanelLeft,
  DollarSign,
  Camera,
  Activity,
  User,
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart,
  UserCheck,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Types
type SidebarItemType = {
  name: string;
  path: string;
  icon: React.ReactNode;
  access: string[];
  children?: SidebarItemType[];


};

type SidebarItemProps = {
  name: string;
  path: string;
  icon: React.ReactNode;
  collapsed: boolean;
  children?: SidebarItemType[];
  level?: number;
};

type SidebarHeaderProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

type SidebarNavigationProps = {
  userRole: string;
  collapsed: boolean;
};


// Items de navigation (on les extrait ici pour les rendre accessibles partout)
const sidebarItems: SidebarItemType[] = [
  { name: 'Tableau de bord', path: '/dashboard', icon: <PanelLeft className="h-5 w-5" />, access: ['admin', 'ministry', 'police', 'surveillance'] },
  { name: 'Statistiques', path: '/monitoring/statistiques', icon: <Activity className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Agents', path: '/monitoring/agents', icon: <Users className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Véhicules', path: '/monitoring/vehicules', icon: <Car className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Conducteurs', path: '/monitoring/conducteurs', icon: <User className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Transactions', path: '/monitoring/transactions', icon: <DollarSign className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Amendes', path: '/monitoring/amendes', icon: <FileWarning className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Contrôles', path: '/monitoring/controles', icon: <Shield className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Équipements', path: '/monitoring/equipements', icon: <Camera className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  { name: 'Utilisateurs', path: '/monitoring/utilisateurs', icon: <Users className="h-5 w-5" />, access: ['admin', 'ministry', 'superviseur'] },
  {
    name: 'Chronotachygraphe',
    path: '/chronotachygraphe',
    icon: <Clock className="h-5 w-5" />,
    access: ['admin', 'ministry', 'superviseur', 'police'],
    children: [
      { name: 'Vue d\'ensemble', path: '/chronotachygraphe', icon: <BarChart className="h-4 w-4" />, access: ['admin', 'ministry', 'superviseur', 'police'] },
      { name: 'Conducteurs', path: '/chronotachygraphe/conducteurs', icon: <UserCheck className="h-4 w-4" />, access: ['admin', 'ministry', 'superviseur', 'police'] },
      { name: 'Véhicules', path: '/chronotachygraphe/vehicules', icon: <Car className="h-4 w-4" />, access: ['admin', 'ministry', 'superviseur', 'police'] },
      { name: 'Sessions', path: '/chronotachygraphe/sessions', icon: <FileText className="h-4 w-4" />, access: ['admin', 'ministry', 'superviseur', 'police'] },
      { name: 'Rapports', path: '/chronotachygraphe/rapports', icon: <Download className="h-4 w-4" />, access: ['admin', 'ministry', 'superviseur'] }
    ]
  },
  { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" />, access: ['admin', 'ministry', 'police'] },
  { name: 'Paramètres', path: '/settings', icon: <Settings className="h-5 w-5" />, access: ['admin', 'ministry'] },
];

// Composants
const SidebarItem: React.FC<SidebarItemProps> = ({ name, path, icon, collapsed, children, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn(
            'flex items-center px-4 py-3 my-1 text-sm font-medium rounded-md transition-colors',
            isActive
              ? "bg-white text-[#082758]"
              : "text-white hover:bg-white hover:text-[#082758]",
            collapsed ? 'justify-center' : '',
            level > 0 ? 'ml-4' : ''
          )
        }
        onClick={hasChildren ? (e) => { e.preventDefault(); setOpen(!open); } : undefined}
        style={{ cursor: hasChildren ? 'pointer' : 'auto' }}
      >
        {icon}
        {!collapsed && <span className="ml-2">{name}</span>}
        {hasChildren && !collapsed && (
          <span className="ml-auto">{open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
        )}
      </NavLink>
      {hasChildren && open && !collapsed && (
        <div className="ml-6 border-l border-[#FFD700] pl-2">
          {children!.map(child => (
            <SidebarItem
              key={child.name}
              name={child.name}
              path={child.path}
              icon={child.icon}
              collapsed={collapsed}
              children={child.children}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, toggleCollapsed }) => {
  return (
    <div className="p-4 flex items-center justify-between">
      {!collapsed && (
        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <div className="h-2 w-12 bg-gabon-green"></div>
            <div className="h-2 w-12 bg-[#FFD700]"></div>
            <div className="h-2 w-12 bg-gabon-blue"></div>
          </div>
          <h1 className="text-xl font-bold">nZile</h1>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapsed}
        className="text-white hover:bg-white hover:text-[#082758] rounded-full"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ userRole, collapsed }) => {
  // Filtrer les sous-menus selon le rôle
  const filterItems = (items: SidebarItemType[]): SidebarItemType[] =>
    items
      .filter(item => item.access.includes(userRole))
      .map(item => ({
        ...item,
        children: item.children ? filterItems(item.children) : undefined
      }));

  const filteredItems = filterItems(sidebarItems);

  return (
    <nav className="mt-5 flex-1 space-y-1 px-2">
      {filteredItems.map(item => (
        <SidebarItem
          key={item.name}
          name={item.name}
          path={item.path}
          icon={item.icon}
          collapsed={collapsed}
          children={item.children}
        />
      ))}
    </nav>
  );
};

// Main Sidebar Component
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userRole = 'admin'; // TODO: à remplacer par une vraie valeur dynamique

  return (
    <aside
      className={cn(
        "bg-[#082758] text-white transition-all duration-300 h-screen flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
      <ScrollArea className="flex-1 bg-[#082758]">
        <SidebarNavigation userRole={userRole} collapsed={collapsed} />
      </ScrollArea>
      <div className="border-t border-[#FFD700] p-4">
        {!collapsed && (
          <div className="text-sm">
            <p className="text-white font-medium">République Gabonaise</p>
            <p className="text-gray-200">Ministère des Transports</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
