
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Settings,
  Car,
  FileText,
  UserCog,
  Shield,
  Filter,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  date: Date;
  read: boolean;
  category: 'system' | 'vehicle' | 'infraction' | 'user' | 'control';
}

// Données de démonstration
const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'Mise à jour du système',
    message: 'Une nouvelle version du système a été déployée avec des améliorations de performance.',
    type: 'info',
    date: new Date(2025, 3, 10, 9, 30),
    read: false,
    category: 'system'
  },
  {
    id: '2',
    title: 'Alerte de sécurité',
    message: 'Plusieurs tentatives de connexion échouées ont été détectées sur votre compte.',
    type: 'warning',
    date: new Date(2025, 3, 9, 14, 15),
    read: true,
    category: 'system'
  },
  {
    id: '3',
    title: 'Nouvelle infraction enregistrée',
    message: 'Une nouvelle infraction a été enregistrée pour le véhicule immatriculé GA-123-AB.',
    type: 'alert',
    date: new Date(2025, 3, 9, 11, 45),
    read: false,
    category: 'infraction'
  },
  {
    id: '4',
    title: 'Permis expiré',
    message: 'Le permis du conducteur MBOULOU Jean arrive à expiration dans 15 jours.',
    type: 'warning',
    date: new Date(2025, 3, 8, 16, 20),
    read: false,
    category: 'user'
  },
  {
    id: '5',
    title: 'Contrôle technique à jour',
    message: 'Le véhicule immatriculé GA-456-CD a passé avec succès son contrôle technique.',
    type: 'success',
    date: new Date(2025, 3, 8, 10, 10),
    read: true,
    category: 'vehicle'
  },
  {
    id: '6',
    title: 'Rapport mensuel disponible',
    message: 'Le rapport mensuel des infractions pour Mars 2025 est maintenant disponible.',
    type: 'info',
    date: new Date(2025, 3, 7, 8, 0),
    read: true,
    category: 'system'
  },
  {
    id: '7',
    title: 'Nouveau contrôle planifié',
    message: 'Un nouveau contrôle routier a été planifié pour le 15/04/2025 au PK12.',
    type: 'info',
    date: new Date(2025, 3, 6, 15, 30),
    read: true,
    category: 'control'
  },
  {
    id: '8',
    title: 'Échec de sauvegarde',
    message: 'La sauvegarde automatique des données du 09/04/2025 a échoué.',
    type: 'alert',
    date: new Date(2025, 3, 9, 23, 0),
    read: false,
    category: 'system'
  }
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    app: true,
    system: true,
    vehicle: true,
    infraction: true,
    user: true,
    control: true
  });

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.category === activeTab;
  });

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleToggleSetting = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'system': return <Settings className="h-4 w-4 text-gray-500" />;
      case 'vehicle': return <Car className="h-4 w-4 text-blue-500" />;
      case 'infraction': return <FileText className="h-4 w-4 text-red-500" />;
      case 'user': return <UserCog className="h-4 w-4 text-purple-500" />;
      case 'control': return <Shield className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Centre de notifications et alertes du système
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleMarkAllRead}>
          <CheckCircle className="h-4 w-4" />
          Tout marquer comme lu
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Centre de notifications</CardTitle>
                {unreadCount > 0 && (
                  <Badge className="bg-gabon-blue">{unreadCount} non lues</Badge>
                )}
              </div>
              <CardDescription>
                Restez informé des événements importants du système
              </CardDescription>
            </CardHeader>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="unread">Non lues</TabsTrigger>
                  <TabsTrigger value="system">Système</TabsTrigger>
                  <TabsTrigger value="infraction">Infractions</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-6">
                <TabsContent value={activeTab} className="space-y-4 mt-0">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border rounded-lg transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm md:text-base truncate">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                  >
                                    Marquer comme lu
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-red-500"
                                  onClick={() => handleDeleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{format(notification.date, 'PPp', { locale: fr })}</span>
                              <Separator orientation="vertical" className="mx-2 h-3" />
                              <div className="flex items-center">
                                {getCategoryIcon(notification.category)}
                                <span className="ml-1 capitalize">{notification.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">Aucune notification</h3>
                      <p className="text-sm text-muted-foreground">
                        Vous n'avez pas de notifications dans cette catégorie.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Canaux de notification</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Par email</label>
                    <p className="text-xs text-muted-foreground">
                      Recevoir les notifications par email
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.email}
                    onCheckedChange={() => handleToggleSetting('email')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Dans l'application</label>
                    <p className="text-xs text-muted-foreground">
                      Afficher les notifications dans l'application
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.app}
                    onCheckedChange={() => handleToggleSetting('app')}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Catégories de notification</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <label className="text-sm font-medium">Système</label>
                  </div>
                  <Switch 
                    checked={notificationSettings.system}
                    onCheckedChange={() => handleToggleSetting('system')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-500" />
                    <label className="text-sm font-medium">Véhicules</label>
                  </div>
                  <Switch 
                    checked={notificationSettings.vehicle}
                    onCheckedChange={() => handleToggleSetting('vehicle')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-500" />
                    <label className="text-sm font-medium">Infractions</label>
                  </div>
                  <Switch 
                    checked={notificationSettings.infraction}
                    onCheckedChange={() => handleToggleSetting('infraction')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-purple-500" />
                    <label className="text-sm font-medium">Utilisateurs</label>
                  </div>
                  <Switch 
                    checked={notificationSettings.user}
                    onCheckedChange={() => handleToggleSetting('user')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <label className="text-sm font-medium">Contrôles</label>
                  </div>
                  <Switch 
                    checked={notificationSettings.control}
                    onCheckedChange={() => handleToggleSetting('control')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enregistrer les préférences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtres rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('system')}
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Système
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('vehicle')}
                  className="w-full justify-start"
                >
                  <Car className="mr-2 h-4 w-4" />
                  Véhicules
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('infraction')}
                  className="w-full justify-start"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Infractions
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('unread')}
                  className="w-full justify-start"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Non lues ({unreadCount})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
