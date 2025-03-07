import axios from "axios";


export const authenticateMedecin = async () => {
    const API_URL = import.meta.env.VITE_API_URL;


    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            email: "patient1@patient.com",
            password: "password123"
        });

        const { token, roles, patient } = response.data;

        if (token) {
            localStorage.setItem("token", token);
        }
        if (roles) {
            localStorage.setItem("role", roles);
        }

        if (patient) {
            localStorage.setItem("patient", patient);
        }

        return { token, roles, patient };
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        throw new Error("Impossible d'authentifier le médecin");
    }
};

export const fetchAllMedecins = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.get(`${API_URL}/api/medecins`);
        return response.data.member;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du médecin :", error);
        throw new Error("Impossible de récupérer les informations du médecin.");
    }
}

export const fetchMedecinsId = async (numRpps: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/api/medecins/${numRpps}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const fetchMedecinsRDV = async (numRpps: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/api/rendez_vouses/medecin/${numRpps}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const fetchRDVPatient = async (num_secu_sociale: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/api/rendez_vouses/patient/${num_secu_sociale}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const fetchProchainRDVPatient = async (num_secu_sociale: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/api/rendez_vouses/prochain/${num_secu_sociale}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const createNewRDV = async (ObjectRDV: object) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/api/rendez_vouses`, JSON.stringify(ObjectRDV), {
            headers: {
                "Content-Type": "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const updateInformationPatient = async (ObjectRDV: object,num_secu_sociale: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.patch(`${API_URL}/api/patients/${num_secu_sociale}`, JSON.stringify(ObjectRDV), {
            headers: {
                "Content-Type": "application/merge-patch+json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const fetchData = async (route: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}${route}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};