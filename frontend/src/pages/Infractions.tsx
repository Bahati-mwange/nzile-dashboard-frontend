
import React, { useState } from 'react';
import InfractionForm from '@/components/infractions/InfractionForm';
import InfractionTabs from '@/components/infractions/InfractionTabs';
import InfractionPageHeader from '@/components/infractions/InfractionPageHeader';
import { infractions } from '@/data/mockInfractions';

const Infractions: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <InfractionPageHeader 
        showForm={showForm}
        setShowForm={setShowForm}
      />
      
      {showForm ? (
        <InfractionForm />
      ) : (
        <InfractionTabs infractions={infractions} />
      )}
    </div>
  );
};

export default Infractions;
