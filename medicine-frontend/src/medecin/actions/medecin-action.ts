import axios from "axios";

//Permet d'authentifier le médecin et sauvegarder le JWT.
export const authenticateMedecin = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            username: "medecin3",
            password: "password123"
        });
        
        const token = response.data?.token;
        if (token) {
            localStorage.setItem("token", token);
        }
        
        return token;
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        throw new Error("Impossible d'authentifier le médecin");
    }
};

//Récupération du médecin en fonction de son numéro rpps
export const fetchMedecinByRpps = async (medecinRpps: number) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.get(`${API_URL}/api/medecins/${medecinRpps}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du médecin :", error);
        throw new Error("Impossible de récupérer les informations du médecin.");
    }
}


//Récupération de donnée en fonction d'une route spécifique
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

export const deleteAppointement = async (appointmentId: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    
    
    try {
        const response = await axios.delete(`${API_URL}/api/rendez_vouses/${appointmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw new Error("Impossible de récupérer les informations.");
    }
}