import axios from "axios";

export const authenticate = async ({email, password}:{email: string, password: string}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            email: email,
            password: password
        });

        const { token, roles } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", roles);

        if (roles == "ROLE_MEDECIN"){
            localStorage.setItem("id", response.data.id);
        }else if (roles == "ROLE_PATIENT"){
            localStorage.setItem("patient", response.data.patient);
        }

        return roles;
    } catch (error) {
        if (error.response) {
            if (error.response.status == 401) {
                throw new Error(`Erreur d'authentification : ${error.response.data.error || 'Identifiants invalides'}`);
            }
            throw new Error(`Erreur serveur : ${error.response.data.error || 'Veuillez réessayer plus tard'}`);
        } else {
            throw new Error("Erreur de connexion : Vérifiez votre connexion et réessayez.");
        }
    }
};