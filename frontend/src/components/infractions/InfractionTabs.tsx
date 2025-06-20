
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InfractionTable from './InfractionTable';
import { Infraction } from '@/data/mockInfractions';

interface InfractionTabsProps {
  infractions: Infraction[];
}

const InfractionTabs: React.FC<InfractionTabsProps> = ({ infractions }) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Toutes</TabsTrigger>
        <TabsTrigger value="pending">En attente</TabsTrigger>
        <TabsTrigger value="processed">Traitées</TabsTrigger>
        <TabsTrigger value="paid">Payées</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <InfractionTable infractions={infractions} />
      </TabsContent>
      
      <TabsContent value="pending" className="mt-4">
        <InfractionTable 
          infractions={infractions.filter(i => i.status === 'pending')} 
        />
      </TabsContent>

      <TabsContent value="processed" className="mt-4">
        <InfractionTable 
          infractions={infractions.filter(i => i.status === 'processed')} 
        />
      </TabsContent>

      <TabsContent value="paid" className="mt-4">
        <InfractionTable 
          infractions={infractions.filter(i => i.status === 'paid')} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default InfractionTabs;
