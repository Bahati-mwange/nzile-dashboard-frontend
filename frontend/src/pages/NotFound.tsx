
import React from "react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-transport-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oups ! La page que vous recherchez n'existe pas.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full bg-transport-blue hover:bg-transport-lightBlue">
            <Link to="/dashboard">Retourner au tableau de bord</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support technique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
