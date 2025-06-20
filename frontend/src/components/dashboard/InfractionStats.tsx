
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface InfractionStatsProps {
  data: Array<{
    name: string;
    count: number;
  }>;
  className?: string;
  variant?: 'province' | 'infraction';
  title?: string;
}

const InfractionStats: React.FC<InfractionStatsProps> = ({ 
  data, 
  className, 
  variant = 'infraction',
  title
}) => {
  // Déterminer la couleur en fonction du variant
  const getBarColor = () => {
    if (variant === 'province') {
      return 'hsl(var(--gabon-green))'; // Vert pour les provinces
    }
    return 'hsl(var(--gabon-blue))'; // Bleu pour les infractions
  };

  // Déterminer le titre en fonction du variant
  const getTitle = () => {
    if (title) return title;
    
    if (variant === 'province') {
      return 'Infractions par province';
    }
    return 'Répartition des infractions';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                tick={{ fontSize: 12 }}
                height={60}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px' 
                }}
                formatter={(value) => [`${value} cas`, 'Nombre']}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Nombre de cas"
                fill={getBarColor()}
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfractionStats;
