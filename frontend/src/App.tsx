import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import VehicleAdd from "./pages/VehicleAdd";
import Infractions from "./pages/Infractions";
import InfractionDetails from "./pages/InfractionDetails";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";
import Controls from "./pages/Controls";
// Removed duplicate import of RoadControlDetails
import Drivers from "./pages/Drivers";
import Surveillance from "./pages/Surveillance";
import Provinces from "./pages/Provinces";
import Institutions from "./pages/Institutions";
import Regulations from "./pages/Regulations";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Payments from "./pages/Payments";
import MainLayout from "./components/layout/MainLayout";
import Scanner from "./pages/Scanner";
import Licenses from "./pages/Licenses";
import Candidates from "./pages/Candidates";
import SuperviseurDashboard from "./pages/SuperviseurDashboard";
import DriverDetailsPage from "./pages/DriverDetails";
import RoadControlDetails from "./pages/RoadControlDetails";
import MonitoringEquipements from "./pages/monitoring/MonitoringEquipements";
import TransactionDetails from "./pages/TransactionDetails";
import AgentDetails from "./pages/AgentsDetails";
import EquipementDetails from "./pages/EquipementsDetails";
import UserEdit from "./pages/UserEdit";




// Monitoring pages - now they're direct routes, not nested
import MonitoringAgents from "./pages/monitoring/MonitoringAgents";
import MonitoringVehicules from "./pages/monitoring/MonitoringVehicules";
import MonitoringConducteurs from "./pages/monitoring/MonitoringConducteurs";
import MonitoringTransactions from "./pages/monitoring/MonitoringTransactions";
import MonitoringAmendes from "./pages/monitoring/MonitoringAmendes";
import MonitoringControles from "./pages/monitoring/MonitoringControles";
import MonitoringUtilisateurs from "./pages/monitoring/MonitoringUtilisateurs";
import MonitoringStatistiques from "./pages/monitoring/MonitoringStatistiques";
import { LoadingProvider } from "./contexts/LoadingContext";
import ChronotachygrapheOverview from "./pages/chronotachygraphe/ChronotachygrapheOverview";
import ChronotachygrapheConducteurs from "./pages/chronotachygraphe/ChronotachygrapheConducteurs";
import ChronotachygrapheVehicules from "./pages/chronotachygraphe/ChronotachygrapheVehicules";
import ChronotachygrapheSessions from "./pages/chronotachygraphe/ChronotachygrapheSessions";
import ChronotachygrapheRapports from "./pages/chronotachygraphe/ChronotachygrapheRapports";
import ChronotachygrapheConducteurDetails from "./pages/chronotachygraphe/ChronotachygrapheConducteurDetails";
import ChronotachygrapheVehiculeDetails from "./pages/chronotachygraphe/ChronotachygrapheVehiculeDetails";
import ChronotachygrapheSessionDetails from "./pages/chronotachygraphe/ChronotachygrapheSessionDetails";
import ChronotachygrapheRapportDetails from "./pages/chronotachygraphe/ChronotachygrapheRapportDetails";
import ChronotachygrapheOverviewDetails from "./pages/chronotachygraphe/ChronotachygrapheOverviewDetails";

import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={
            <LoadingProvider>
              <Login />
            </LoadingProvider>
          } />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="superviseur" element={<SuperviseurDashboard />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="controls" element={<Controls />} />
            <Route path="controls/:id" element={<RoadControlDetails />} />
            <Route path="vehicules" element={<Vehicles />} />
            <Route path="vehicules/:id" element={<VehicleDetail />} />
            <Route path="vehicles/new" element={<VehicleAdd />} />
            <Route path="licenses" element={<Licenses />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetailsPage />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="infractions" element={<Infractions />} />
            <Route path="infractions/:id" element={<InfractionDetails />} />
            <Route path="payments" element={<Payments />} />
            <Route path="payments/:id" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id" element={<ReportDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<Users />} />
            <Route path="surveillance" element={<Surveillance />} />
            <Route path="provinces" element={<Provinces />} />
            <Route path="institutions" element={<Institutions />} />
            <Route path="regulations" element={<Regulations />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="controles/:id" element={<RoadControlDetails />} />
            <Route path="transactions/:id" element={<TransactionDetails />} />
            <Route path="agents/:id" element={<AgentDetails />} />
            <Route path="equipements/:id" element={<EquipementDetails />} />
            <Route path="users/edit/:id" element={<UserEdit />} />





            {/* Monitoring Routes - now they're direct routes */}
            <Route path="monitoring/statistiques" element={<MonitoringStatistiques />} />
            <Route path="monitoring/agents" element={<MonitoringAgents />} />
            <Route path="monitoring/vehicules" element={<MonitoringVehicules />} />
            <Route path="monitoring/conducteurs" element={<MonitoringConducteurs />} />
            <Route path="monitoring/transactions" element={<MonitoringTransactions />} />
            <Route path="monitoring/amendes" element={<MonitoringAmendes />} />
            <Route path="monitoring/controles" element={<MonitoringControles />} />
            <Route path="monitoring/utilisateurs" element={<MonitoringUtilisateurs />} />
            <Route path="monitoring/equipements" element={<MonitoringEquipements />} />

            {/* Nested routes for monitoring */}
            {/* Chronotachygraphe Routes */}
            <Route path="chronotachygraphe" element={<ChronotachygrapheOverview />} />
            <Route path="chronotachygraphe/conducteurs" element={<ChronotachygrapheConducteurs />} />
            <Route path="chronotachygraphe/vehicules" element={<ChronotachygrapheVehicules />} />
            <Route path="chronotachygraphe/sessions" element={<ChronotachygrapheSessions />} />
            <Route path="chronotachygraphe/rapports" element={<ChronotachygrapheRapports />} />
            <Route path="chronotachygraphe/conducteurs/:id" element={<ChronotachygrapheConducteurDetails />} />
            <Route path="chronotachygraphe/vehicules/:id" element={<ChronotachygrapheVehiculeDetails />} />
            <Route path="chronotachygraphe/sessions/:id" element={<ChronotachygrapheSessionDetails />} />
            <Route path="chronotachygraphe/rapports/:id" element={<ChronotachygrapheRapportDetails />} />
            <Route path="chronotachygraphe/overview/:id" element={<ChronotachygrapheOverviewDetails />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
