
// Mock data file with comprehensive Gabonese data for the nZile system - 50 entries each

// Gabonese prefectures and localities
export const provinces = [
    {
        id: '1',
        name: 'Estuaire',
        capital: 'Libreville',
        population: 895689,
        area: 20740,
        prefect: 'Jean-Pierre Moussavou'
    },
    {
        id: '2',
        name: 'Haut-Ogooué',
        capital: 'Franceville',
        population: 250047,
        area: 36547,
        prefect: 'Marie Ndombi'
    },
    {
        id: '3',
        name: 'Moyen-Ogooué',
        capital: 'Lambaréné',
        population: 69287,
        area: 18535,
        prefect: 'Paul Biyoghe'
    },
    {
        id: '4',
        name: 'Ngounié',
        capital: 'Mouila',
        population: 100300,
        area: 23877,
        prefect: 'Sophie Mba'
    },
    {
        id: '5',
        name: 'Nyanga',
        capital: 'Tchibanga',
        population: 52854,
        area: 21285,
        prefect: 'Eric Djoue'
    },
    {
        id: '6',
        name: 'Ogooué-Ivindo',
        capital: 'Makokou',
        population: 63293,
        area: 46075,
        prefect: 'Carine Mboumba'
    },
    {
        id: '7',
        name: 'Ogooué-Lolo',
        capital: 'Koulamoutou',
        population: 65771,
        area: 25380,
        prefect: 'Pierre Ndong'
    },
    {
        id: '8',
        name: 'Ogooué-Maritime',
        capital: 'Port-Gentil',
        population: 157562,
        area: 22890,
        prefect: 'Rose Mihindou'
    },
    {
        id: '9',
        name: 'Woleu-Ntem',
        capital: 'Oyem',
        population: 154986,
        area: 38465,
        prefect: 'Antoine Ntoutoume'
    }
];

export const localities = [
    { id: '1', name: 'Libreville', province: 'Estuaire' },
    { id: '2', name: 'Port-Gentil', province: 'Ogooué-Maritime' },
    { id: '3', name: 'Franceville', province: 'Haut-Ogooué' },
    { id: '4', name: 'Oyem', province: 'Woleu-Ntem' },
    { id: '5', name: 'Mouila', province: 'Ngounié' },
    { id: '6', name: 'Lambaréné', province: 'Moyen-Ogooué' },
    { id: '7', name: 'Tchibanga', province: 'Nyanga' },
    { id: '8', name: 'Makokou', province: 'Ogooué-Ivindo' },
    { id: '9', name: 'Koulamoutou', province: 'Ogooué-Lolo' },
    { id: '10', name: 'Owendo', province: 'Estuaire' },
    { id: '11', name: 'Moanda', province: 'Haut-Ogooué' },
    { id: '12', name: 'Bitam', province: 'Woleu-Ntem' },
    { id: '13', name: 'Lastoursville', province: 'Ogooué-Lolo' },
    { id: '14', name: 'Ndendé', province: 'Ngounié' },
    { id: '15', name: 'Fougamou', province: 'Ngounié' },
];

// Gabonese names
export const gaboneseFirstNames = [
    'Jean', 'Pierre', 'Marie', 'Sophie', 'Paul', 'Carine', 'Eric',
    'Rose', 'Antoine', 'Olivia', 'Christian', 'Irma', 'Michel',
    'Jeanne', 'Bruno', 'Paulette', 'Marcel', 'Angèle', 'Pascal',
    'Thérèse', 'Georges', 'Anne', 'Nicolas', 'Sylvie', 'Robert',
    'Claudine', 'François', 'Marguerite', 'Louis', 'Berthe'
];

export const gaboneseSurnames = [
    'Moussavou', 'Ndombi', 'Biyoghe', 'Mba', 'Djoue', 'Mboumba',
    'Ndong', 'Mihindou', 'Ntoutoume', 'Obone', 'Ondo', 'Obame',
    'Essono', 'Mengue', 'Assoumou', 'Ndong-Sima', 'Nzue', 'Nzeng',
    'Meyo', 'Aboghe', 'Ella', 'Ndoutoume', 'Massala', 'Koumba', 'Ogandaga',
    'Akendengue', 'Boussougou', 'Ditengou', 'Ebang', 'Fang'
];

// Generate 50 people objects
export const generateGabonesePeople = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const firstName = gaboneseFirstNames[Math.floor(Math.random() * gaboneseFirstNames.length)];
        const surname = gaboneseSurnames[Math.floor(Math.random() * gaboneseSurnames.length)];
        const locality = localities[Math.floor(Math.random() * localities.length)];
        const province = provinces.find(p => p.name === locality.province);

        const birthYear = 1960 + Math.floor(Math.random() * 43); // Between 1960 and 2003
        const birthMonth = 1 + Math.floor(Math.random() * 12);
        const birthDay = 1 + Math.floor(Math.random() * 28);

        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        return {
            id: (i + 1).toString(),
            firstName,
            lastName: surname,
            fullName: `${firstName} ${surname}`,
            email: `${firstName.toLowerCase()}.${surname.toLowerCase()}@example.ga`,
            phone: `+241 ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
            birthDate: birthDate.toISOString().split('T')[0],
            age: new Date().getFullYear() - birthYear,
            locality: locality.name,
            province: province?.name || '',
            address: `${Math.floor(Math.random() * 1000)} Rue ${Math.floor(Math.random() * 100)}, ${locality.name}`,
            gender: Math.random() > 0.5 ? 'M' : 'F',
            nationality: 'Gabonaise',
        };
    });
};

// Generate 50 people
export const mockPeople = generateGabonesePeople(50);

// Vehicle makes and models common in Gabon
export const vehicleMakes = [
    'Toyota', 'Mercedes-Benz', 'Peugeot', 'Hyundai', 'Renault',
    'Chevrolet', 'Mitsubishi', 'Nissan', 'Ford', 'Kia'
];

export const vehicleModels = {
    'Toyota': ['Hilux', 'Land Cruiser', 'Corolla', 'RAV4', 'Prado', 'Fortuner'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'G-Class', 'GLE', 'Sprinter'],
    'Peugeot': ['308', '3008', '508', 'Partner', '207'],
    'Hyundai': ['Tucson', 'Santa Fe', 'Accent', 'i10', 'H1'],
    'Renault': ['Duster', 'Logan', 'Clio', 'Kangoo', 'Megane'],
    'Chevrolet': ['Tahoe', 'Trailblazer', 'Cruze', 'Captiva', 'Aveo'],
    'Mitsubishi': ['Pajero', 'L200', 'ASX', 'Outlander', 'Lancer'],
    'Nissan': ['Patrol', 'Navara', 'X-Trail', 'Qashqai', 'NP300'],
    'Ford': ['Ranger', 'Explorer', 'Focus', 'Everest', 'EcoSport'],
    'Kia': ['Sportage', 'Sorento', 'Rio', 'Picanto', 'K2700']
};

// Vehicle colors
export const vehicleColors = [
    'Blanc', 'Noir', 'Gris', 'Bleu', 'Rouge', 'Vert', 'Marron', 'Beige', 'Argent', 'Or'
];

// Vehicle types
export const vehicleTypes = [
    'Berline', 'SUV', 'Pick-up', 'Camionnette', 'Minibus', 'Bus', 'Camion', 'Moto'
];

// Generate vehicle plate number
export const generatePlateNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const prefectures = ['L', 'PG', 'F', 'O', 'M', 'T', 'K'];
    const prefix = prefectures[Math.floor(Math.random() * prefectures.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    const suffix = letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];

    return `${prefix} ${number} ${suffix}`;
};

// Generate 50 vehicles
export const generateVehicles = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const make = vehicleMakes[Math.floor(Math.random() * vehicleMakes.length)];
        const model = vehicleModels[make as keyof typeof vehicleModels][Math.floor(Math.random() * vehicleModels[make as keyof typeof vehicleModels].length)];
        const owner = mockPeople[Math.floor(Math.random() * mockPeople.length)];
        const year = 2000 + Math.floor(Math.random() * 23); // Between 2000 and 2023
        const regYear = year + Math.floor(Math.random() * 3);
        const regMonth = 1 + Math.floor(Math.random() * 12);
        const regDay = 1 + Math.floor(Math.random() * 28);

        const registrationDate = new Date(regYear, regMonth - 1, regDay);

        return {
            id: (i + 1).toString(),
            plateNumber: generatePlateNumber(),
            make,
            model,
            year,
            color: vehicleColors[Math.floor(Math.random() * vehicleColors.length)],
            type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
            ownerId: owner.id,
            ownerName: owner.fullName,
            registrationDate: registrationDate.toISOString().split('T')[0],
            lastInspection: new Date(2024, Math.floor(Math.random() * 5), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            status: Math.random() > 0.8 ? 'Non-conforme' : 'Conforme',
            insuranceValid: Math.random() > 0.2,
            fuelType: Math.random() > 0.7 ? 'Diesel' : 'Essence',
            mileage: Math.floor(Math.random() * 200000) + 10000,
        };
    });
};

export const mockVehicles = generateVehicles(50);

// Infraction types
export const infractionTypes = [
    'Excès de vitesse',
    'Stationnement interdit',
    'Défaut de permis',
    'Conduite en état d\'ivresse',
    'Non-respect du feu rouge',
    'Téléphone au volant',
    'Défaut d\'assurance',
    'Absence de contrôle technique',
    'Non-port de la ceinture',
    'Dépassement dangereux',
    'Pneus usés',
    'Éclairage défectueux'
];

// Infraction severity
export const infractionSeverity = [
    'Légère',
    'Moyenne',
    'Grave',
    'Très grave'
];

// Generate 50 infractions
export const generateInfractions = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const vehicle = mockVehicles[Math.floor(Math.random() * mockVehicles.length)];
        const driver = mockPeople[Math.floor(Math.random() * mockPeople.length)];
        const type = infractionTypes[Math.floor(Math.random() * infractionTypes.length)];
        const severity = infractionSeverity[Math.floor(Math.random() * infractionSeverity.length)];
        const year = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024
        const month = Math.floor(Math.random() * 5); // Last 5 months
        const day = 1 + Math.floor(Math.random() * 28);
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);

        const date = new Date(year, month, day, hour, minute);

        // Fine amount based on severity
        const baseAmount =
            severity === 'Légère' ? 15000 :
                severity === 'Moyenne' ? 50000 :
                    severity === 'Grave' ? 150000 : 300000;
        const fineAmount = baseAmount + Math.floor(Math.random() * 10000);

        // Status (paid or unpaid)
        const isPaid = Math.random() > 0.6;
        const status = isPaid ? 'Payée' : 'Non payée';

        // Payment date if paid
        let paymentDate = null;
        if (isPaid) {
            const payYear = date.getFullYear();
            const payMonth = date.getMonth() + Math.floor(Math.random() * 2);
            const payDay = date.getDate() + Math.floor(Math.random() * 14) + 1; // 1 to 14 days after infraction
            paymentDate = new Date(payYear, payMonth, payDay).toISOString().split('T')[0];
        }

        const locality = localities[Math.floor(Math.random() * localities.length)];

        return {
            id: `AM-2025-${String(i + 1).padStart(3, '0')}`,
            type,
            severity,
            date: date.toISOString(),
            formattedDate: `${date.toLocaleDateString()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
            vehicleId: vehicle.id,
            vehiclePlate: vehicle.plateNumber,
            vehicleInfo: `${vehicle.make} ${vehicle.model}`,
            driverId: driver.id,
            driverName: driver.fullName,
            driverLicense: `${driver.lastName.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 100000)}`,
            location: `${Math.floor(Math.random() * 1000)} Rue ${Math.floor(Math.random() * 100)}, ${locality.name}`,
            province: locality.province,
            locality: locality.name,
            fineAmount,
            status,
            paymentDate,
            agentId: Math.floor(Math.random() * 10) + 1,
            agentName: mockPeople[Math.floor(Math.random() * 5)].fullName,
            notes: Math.random() > 0.7 ? `Infractions répétées. Attention particulière requise.` : '',
            description: `Infraction de type ${type} de niveau ${severity.toLowerCase()} constatée le ${date.toLocaleDateString()}.`,
        };
    });
};

export const mockInfractions = generateInfractions(50);

// Generate 50 transactions
export const generateTransactions = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const infraction = mockInfractions[Math.floor(Math.random() * mockInfractions.length)];
        const agent = mockPeople[Math.floor(Math.random() * 10)]; // Premier 10 comme agents
        const locality = localities[Math.floor(Math.random() * localities.length)];

        const year = 2025;
        const month = Math.floor(Math.random() * 6); // 6 premiers mois
        const day = 1 + Math.floor(Math.random() * 28);
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);

        const date = new Date(year, month, day, hour, minute);

        const statut = Math.random() > 0.3 ? 'payé' : 'en_attente';

        return {
            id: `T${String(i + 1).padStart(3, '0')}`,
            numéro: `TX-2025-${String(i + 1).padStart(3, '0')}`,
            cléPaiement: `PAY-GABON-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
            montant: 15000 + Math.floor(Math.random() * 85000), // Entre 15k et 100k FCFA
            date: date.toISOString().split('T')[0],
            statut: statut as 'payé' | 'en_attente',
            agentId: agent.id,
            agentNom: agent.fullName,
            localisation: locality.name,
            infractions: [infraction.id],
        };
    });
};

export const mockTransactions = generateTransactions(50);

// Control types
export const controlTypes = [
    'Contrôle routier standard',
    'Opération spéciale',
    'Barrage fixe',
    'Contrôle mobile',
    'Contrôle ciblé'
];

// Generate 50 controls
export const generateControls = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const type = controlTypes[Math.floor(Math.random() * controlTypes.length)];
        const year = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024
        const month = Math.floor(Math.random() * 5); // Last 5 months
        const day = 1 + Math.floor(Math.random() * 28);
        const startHour = 6 + Math.floor(Math.random() * 12); // Between 6AM and 6PM
        const endHour = startHour + 1 + Math.floor(Math.random() * 6); // 1-6 hours after start

        const startDate = new Date(year, month, day, startHour, 0);
        const endDate = new Date(year, month, day, endHour, 0);

        const locality = localities[Math.floor(Math.random() * localities.length)];
        const vehiclesChecked = 10 + Math.floor(Math.random() * 90);
        const infractions = Math.floor(vehiclesChecked * (Math.random() * 0.3)); // 0-30% of checked vehicles

        const leadAgent = mockPeople[Math.floor(Math.random() * 5)];
        const numAgents = 2 + Math.floor(Math.random() * 6); // 2-7 agents

        return {
            id: (i + 1).toString(),
            type,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            formattedDate: startDate.toLocaleDateString(),
            formattedTime: `${startHour}:00 - ${endHour}:00`,
            location: `${Math.floor(Math.random() * 1000)} Rue ${Math.floor(Math.random() * 100)}, ${locality.name}`,
            province: locality.province,
            locality: locality.name,
            vehiclesChecked,
            infractions,
            leadAgentId: leadAgent.id,
            leadAgentName: leadAgent.fullName,
            numAgents,
            status: endDate > new Date() ? 'En cours' : 'Terminé',
            notes: Math.random() > 0.7 ? `Zone à risque élevé d'infractions.` : '',
        };
    });
};

export const mockControls = generateControls(50);

// User roles
export const userRoles = [
    'admin',
    'ministry',
    'police',
    'surveillance',
    'superviseur'
];

// User departments
export const userDepartments = [
    'Direction Générale',
    'Police Routière - Libreville',
    'Ministère des Transports',
    'Service de Surveillance Routière',
    'Direction Provinciale - Port-Gentil',
    'Direction Provinciale - Franceville',
    'Brigade Mobile'
];

// Generate 50 users
export const generateUsers = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const person = mockPeople[i];
        const role = userRoles[Math.floor(Math.random() * userRoles.length)];
        const department = userDepartments[Math.floor(Math.random() * userDepartments.length)];

        const lastYear = 2024;
        const lastMonth = Math.floor(Math.random() * 5);
        const lastDay = 1 + Math.floor(Math.random() * 28);
        const lastHour = Math.floor(Math.random() * 24);
        const lastMinute = Math.floor(Math.random() * 60);

        const lastLogin = new Date(lastYear, lastMonth, lastDay, lastHour, lastMinute);

        return {
            id: person.id,
            name: person.fullName,
            email: `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}@transport.gouv.ga`,
            role,
            department,
            status: Math.random() > 0.2 ? 'active' : 'inactive',
            lastLogin: `${lastLogin.toLocaleDateString()} ${lastLogin.getHours()}:${String(lastLogin.getMinutes()).padStart(2, '0')}`,
            phone: person.phone,
            createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        };
    });
};

export const mockUsers = generateUsers(50);

// Equipment types
export const equipmentTypes = [
    'Caméra de surveillance',
    'Radar fixe',
    'Radar mobile',
    'Éthylotest',
    'Terminal mobile',
    'Système de reconnaissance de plaque'
];

// Generate 50 equipment items
export const generateEquipment = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        const locality = localities[Math.floor(Math.random() * localities.length)];
        const installDate = new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const lastMaintenance = new Date(2024, Math.floor(Math.random() * 5), Math.floor(Math.random() * 28) + 1);

        // Status (operational, maintenance, or out of order)
        const statusRand = Math.random();
        const status = statusRand > 0.8 ? 'En maintenance' :
            statusRand > 0.9 ? 'Hors service' : 'Opérationnel';

        // Random agent assigned to this equipment
        const agent = mockPeople[Math.floor(Math.random() * mockPeople.length)];

        return {
            id: (i + 1).toString(),
            serialNumber: `EQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            type,
            model: `${type.split(' ')[0]}-${Math.floor(Math.random() * 1000)}`,
            location: `${Math.floor(Math.random() * 1000)} Rue ${Math.floor(Math.random() * 100)}, ${locality.name}`,
            province: locality.province,
            locality: locality.name,
            status,
            installDate: installDate.toISOString().split('T')[0],
            lastMaintenance: lastMaintenance.toISOString().split('T')[0],
            nextMaintenance: new Date(lastMaintenance.getFullYear(), lastMaintenance.getMonth() + 3, lastMaintenance.getDate()).toISOString().split('T')[0],
            assignedAgentId: agent.id,
            assignedAgentName: agent.fullName,
            notes: Math.random() > 0.7 ? `Équipement nécessitant une calibration tous les 3 mois.` : '',
        };
    });
};

export const mockEquipment = generateEquipment(50);

// Payment methods
export const paymentMethods = [
    'Carte bancaire',
    'Virement',
    'Espèces',
    'Mobile money',
    'Chèque'
];

// Generate 50 payments
export const generatePayments = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const infraction = mockInfractions[Math.floor(Math.random() * mockInfractions.length)];
        const isPaid = Math.random() > 0.3;
        const method = isPaid ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] : null;

        const year = 2024;
        const month = Math.floor(Math.random() * 5);
        const day = 1 + Math.floor(Math.random() * 28);
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);

        const date = new Date(year, month, day, hour, minute);
        const dueDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

        return {
            id: (i + 1).toString(),
            infractionId: infraction.id,
            infractionType: infraction.type,
            amount: infraction.fineAmount,
            status: isPaid ? 'Payé' : Math.random() > 0.5 ? 'En attente' : 'En retard',
            paymentMethod: method,
            paymentDate: isPaid ? date.toISOString() : null,
            formattedPaymentDate: isPaid ? `${date.toLocaleDateString()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}` : null,
            dueDate: dueDate.toISOString().split('T')[0],
            vehicleId: infraction.vehicleId,
            vehiclePlate: infraction.vehiclePlate,
            driverId: infraction.driverId,
            driverName: infraction.driverName,
            receiptNumber: isPaid ? `RC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` : null,
            notes: Math.random() > 0.7 ? `Paiement effectué après relance.` : '',
        };
    });
};

export const mockPayments = generatePayments(50);

// License types
export const licenseTypes = [
    'A - Moto',
    'B - Véhicule léger',
    'C - Poids lourd',
    'D - Transport en commun',
    'E - Remorque',
    'F - Véhicule spécial'
];

// Generate 50 licenses
export const generateLicenses = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const person = mockPeople[i];
        const type = licenseTypes[Math.floor(Math.random() * licenseTypes.length)];

        const issueYear = 2010 + Math.floor(Math.random() * 14); // Between 2010 and 2024
        const issueMonth = Math.floor(Math.random() * 12);
        const issueDay = 1 + Math.floor(Math.random() * 28);

        const issueDate = new Date(issueYear, issueMonth, issueDay);
        const expiryDate = new Date(issueYear + 5, issueMonth, issueDay); // Valid for 5 years

        // Status (valid, expired, suspended)
        const statusRand = Math.random();
        const status = expiryDate < new Date() ? 'Expiré' :
            statusRand > 0.9 ? 'Suspendu' : 'Valide';

        return {
            id: (i + 1).toString(),
            number: `${person.lastName.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 100000)}`,
            type,
            driverId: person.id,
            driverName: person.fullName,
            issueDate: issueDate.toISOString().split('T')[0],
            expiryDate: expiryDate.toISOString().split('T')[0],
            status,
            restrictions: Math.random() > 0.8 ? 'Port de lunettes obligatoire' : '',
            issuingAuthority: 'Ministère des Transports - Gabon',
            points: status === 'Valide' ? Math.floor(Math.random() * 6) + 7 : Math.floor(Math.random() * 7), // Out of 12
            notes: Math.random() > 0.7 ? `A suivi un stage de récupération de points en ${2020 + Math.floor(Math.random() * 4)}.` : '',
        };
    });
};

export const mockLicenses = generateLicenses(50);

// Report types
export const reportTypes = [
    'Rapport mensuel',
    'Rapport trimestriel',
    'Rapport annuel',
    'Rapport d\'activité',
    'Rapport d\'incident',
    'Rapport statistique'
];

// Generate 50 reports
export const generateReports = (count: number = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const type = reportTypes[Math.floor(Math.random() * reportTypes.length)];
        const author = mockUsers[Math.floor(Math.random() * mockUsers.length)];

        const year = 2023 + Math.floor(Math.random() * 2); // 2023 or 2024
        const month = Math.floor(Math.random() * 5); // Last 5 months
        const day = 1 + Math.floor(Math.random() * 28);

        const date = new Date(year, month, day);

        let title = '';
        if (type === 'Rapport mensuel') {
            const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            title = `Rapport mensuel - ${monthNames[month]} ${year}`;
        } else if (type === 'Rapport trimestriel') {
            const quarter = Math.floor(month / 3) + 1;
            title = `Rapport du ${quarter}e trimestre ${year}`;
        } else if (type === 'Rapport annuel') {
            title = `Rapport annuel ${year}`;
        } else {
            title = `${type} - ${date.toLocaleDateString()}`;
        }

        const province = provinces[Math.floor(Math.random() * provinces.length)];

        return {
            id: (i + 1).toString(),
            title,
            type,
            date: date.toISOString().split('T')[0],
            authorId: author.id,
            authorName: author.name,
            department: author.department,
            province: province.name,
            status: Math.random() > 0.2 ? 'Publié' : 'Brouillon',
            summary: `Ce rapport présente ${Math.random() > 0.5 ? 'les statistiques' : 'l\'analyse'} des activités ${Math.random() > 0.5 ? 'de contrôle routier' : 'de sécurité routière'} pour la période concernée.`,
            downloadUrl: '#',
            tags: Math.random() > 0.5 ? ['statistiques', 'sécurité'] : ['contrôle', 'infractions'],
        };
    });
};

export const mockReports = generateReports(50);

// Comprehensive mock data export
export default {
    provinces,
    localities,
    people: mockPeople,
    vehicles: mockVehicles,
    infractions: mockInfractions,
    transactions: mockTransactions,
    controls: mockControls,
    users: mockUsers,
    equipment: mockEquipment,
    payments: mockPayments,
    licenses: mockLicenses,
    reports: mockReports
};