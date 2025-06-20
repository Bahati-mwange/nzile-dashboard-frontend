
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApiData } from '@/hooks/useApiData';

interface HourlyActivityData {
    heure: string;
    infractions: number;
    controles: number;
}

const generateHourlyData = (): HourlyActivityData[] => {
    const data: HourlyActivityData[] = [];

    for (let i = 6; i <= 22; i++) {
        // Créer une distribution avec un pic le matin et le soir (heures de pointe)
        const heureMatin = i >= 7 && i <= 9;
        const heureSoir = i >= 16 && i <= 19;
        const heureCreuse = i >= 11 && i <= 15;
        const heureNuit = i >= 20;

        let facteurControles = 1;
        let facteurInfractions = 1;

        if (heureMatin) {
            facteurControles = 1.8;
            facteurInfractions = 1.5;
        } else if (heureSoir) {
            facteurControles = 2;
            facteurInfractions = 2.2;
        } else if (heureCreuse) {
            facteurControles = 0.7;
            facteurInfractions = 0.6;
        } else if (heureNuit) {
            facteurControles = 0.5;
            facteurInfractions = 0.8;
        }

        // Valeurs de base avec facteur aléatoire
        const baseControles = Math.round((10 + Math.random() * 10) * facteurControles);
        const baseInfractions = Math.round((baseControles * 0.35) * facteurInfractions);

        data.push({
            heure: `${i}h`,
            controles: baseControles,
            infractions: baseInfractions
        });
    }

    return data;
};

const HourlyActivityChart: React.FC = () => {
    const { données, chargement } = useApiData<HourlyActivityData[]>(
        'https://votre-api.com/analytics/hourly-activity',
        undefined,
        generateHourlyData
    );

    if (chargement) {
        return <div className="h-[300px] flex items-center justify-center">Chargement des données...</div>;
    }

    if (!données || données.length === 0) {
        return <div className="h-[300px] flex items-center justify-center">Aucune donnée disponible</div>;
    }

    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={données}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="heure" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number, name: string) => {
                            const label = name === 'controles' ? 'Contrôles' : 'Infractions';
                            return [`${value} ${label}`, ''];
                        }}
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend />
                    <Bar dataKey="controles" name="Contrôles" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                    <Bar dataKey="infractions" name="Infractions" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HourlyActivityChart;