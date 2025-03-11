import axios from "axios";

export const fetchAllMedecins = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.get(`${API_URL}/api/medecins`);
        return response.data.member;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
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
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
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
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
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
        return response.data;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
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
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const createNewRDV = async (ObjectRDV: object) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/api/rendez_vouses`, ObjectRDV, {
            headers: {
                "Content-Type": "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const updateInformationPatient = async (ObjectRDV: object,num_secu_sociale: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.patch(`${API_URL}/api/patients/${num_secu_sociale}`, ObjectRDV, {
            headers: {
                "Content-Type": "application/merge-patch+json",
                Authorization: `Bearer ${token}`,
            },
        });

        const responses = response.data;
        const medecinId = responses.medecin_perso.split('/').pop();

        const updatePatient = { ...responses, medecin_perso: medecinId };
        localStorage.setItem("patient", JSON.stringify(updatePatient));

        return response.data;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
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
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const annuleAppointement = async (ObjectRDV: object,appointmentId: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.patch(`${API_URL}/api/rendez_vouses/${appointmentId}`, ObjectRDV, {
            headers: {
                "Content-Type": "application/merge-patch+json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};

export const deletePatient = async (num_secu_sociale: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.delete(`${API_URL}/api/patients/${num_secu_sociale}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        return response;
    } catch (error) {
        if(error.response.data.message == "Expired JWT Token"){
            window.location.href= "/session_expire";
        }
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
};