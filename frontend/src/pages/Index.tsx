
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Redirection vers la page de login lors du chargement
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null; // Pas besoin de rendu car nous redirigeons
};

export default Index;
