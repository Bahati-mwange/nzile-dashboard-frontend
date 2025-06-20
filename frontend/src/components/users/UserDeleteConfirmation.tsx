
import React from 'react';
import ConfirmationDialog from '../ui/confirmation-dialog';

// Pour maintenir la compatibilité avec le code existant
const UserDeleteConfirmation: React.FC<React.ComponentProps<typeof ConfirmationDialog>> = (props) => {
  return <ConfirmationDialog {...props} variant="destructive" />;
};

export default UserDeleteConfirmation;
