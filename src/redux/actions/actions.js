import axios from "axios";
import { ENDPOINT, LOGIN_URL, LOGOUT_URL } from "./path.js";
import { AUTH_LOGIN, LOGOUT } from "./actionsTypes.js";
import { toast } from "sonner";

// Acción para autenticar al usuario y redirigirlo a la página de inicio
export const authLogin = (userData, navigate) => {
  return async (dispatch) => {
    const loginPath = `${ENDPOINT}${LOGIN_URL}`;
    try {
      const { data } = await axios.post(loginPath, userData);

      // Mostrar un mensaje de éxito y redirigir al usuario a la página de inicio
      setTimeout(() => {
        toast.success("Ingreso correctamente!");
        navigate("/inicio");
      }, 1000);
      return dispatch({
        type: AUTH_LOGIN,
        payload: data,
      });
    } catch (error) {
      // En caso de error, mostrar un mensaje de error
      toast.error(`${error.response.data.mensaje}, intente de nuevo!`);
    }
  };
};

export const logoutUser = (unAuthenticated, navigate) => {
  return async (dispatch) => {
    const logoutPath = `${ENDPOINT}${LOGOUT_URL}`;
    try {
      await axios.post(logoutPath, unAuthenticated);

      // Realizar el proceso de cierre de sesión
      setTimeout(() => {
        toast.success("Cerraste sesión, hasta pronto!");
        navigate("/");
      }, 1200);

      return dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    }
  };
};
