import axios from "axios";

//authentification de l'utilisateur administrateur de l'application
export const authenticateAdministrator = async (adminEmail: string, pwdAdmin) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            email: adminEmail,
            password: pwdAdmin
        });
        
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        throw new Error("Impossible d'authentifier le médecin");
    }
}

//Récupération de tout les patients
export const getPatients = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/patients`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    }catch (error) {
        console.error("Erreur lors de la requête :", error);
        throw new Error("Impossible d'effectuer cette requête");
    }
}

//Récupération de tout les médecins
export const getMedecin = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/medecins`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error("Erreur lors de la requête :", error);
        throw new Error("Impossible d'effectuer cette requête");
    }
}

//Récupération de tout les rendez-vous
export const getRendezVous = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/rendez_vouses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error("Erreur lors de la requête :", error);
        throw new Error("Impossible d'effectuer cette requête");
    }
}

//Ajouter un médecin
export const postMedecin = async (medecin) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    
    try {
        const formData = new FormData();
        formData.append("email", medecin.email);
        formData.append("nom", medecin.nom);
        formData.append("prenom", medecin.prenom);
        formData.append("password", medecin.password);
        formData.append("num_rpps", medecin.num_rpps);
        formData.append("num_tel", medecin.num_tel);
        formData.append("specialite", medecin.specialite);
        
        await axios.post(`${API_URL}/api/register/medecin`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Erreur lors d'ajout du médecin :", error.response.data.error);
        throw error;
    }
}

export const editMedecin = async (medecinRpps: string, medecin) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    
    try {
        const data = {
            email: medecin.email,
            nom: medecin.nom,
            prenom: medecin.prenom,
            password: medecin.password,
            num_rpps: medecin.num_rpps,
            num_tel: medecin.num_tel,
            specialite: medecin.specialite,
        };
        
        await axios.patch(`${API_URL}/api/medecins/${medecinRpps}`, data, {
            headers: {
                "Content-Type": "application/merge-patch+json",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Erreur lors d'ajout du médecin :", error.response.data.error);
        throw error;
    }
}
