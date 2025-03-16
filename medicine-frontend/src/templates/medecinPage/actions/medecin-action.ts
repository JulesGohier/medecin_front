import axios from "axios";

export const authenticateMedecin = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(`${API_URL}/api/login_token`, {
      email: "medecin3@medecin.com",
      password: "password123",
    });

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response.data.message == "Expired JWT Token") {
      window.location.href = "/session_expire";
    }
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
    if (error.response.data.message == "Expired JWT Token") {
      window.location.href = "/session_expire";
    }
    console.error(
      "Erreur lors de la récupération des données du médecin :",
      error
    );
    throw new Error("Impossible de récupérer les informations du médecin.");
  }
};

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
    if (error.response.data.message == "Expired JWT Token") {
      window.location.href = "/session_expire";
    }
    console.error("Erreur lors de la récupération des données :", error);
    throw new Error("Impossible de récupérer les informations.");
  }
};

export const deleteAppointement = async (appointmentId: string) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/api/rendez_vouses/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data.message == "Expired JWT Token") {
      window.location.href = "/session_expire";
    }
    console.error("Erreur lors de la récupération des données :", error);
    throw new Error("Impossible de récupérer les informations.");
  }
};

export const annulerAppointement = async (appointmentId: string) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${API_URL}/api/rendez_vouses/${appointmentId}`,
      { state: "annulé", annule_par: "medecin" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/merge-patch+json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data.message == "Expired JWT Token") {
      window.location.href = "/session_expire";
    }
    console.error("Erreur lors de l'annulation du rendez-vous :", error);
    throw new Error("Impossible d'annuler le rendez-vous.");
  }
};
