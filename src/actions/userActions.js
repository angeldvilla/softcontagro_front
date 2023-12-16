import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    LOAD_STRIPE_API_KEY,
    LOAD_STRIPE_API_KEY_SUCCESS
} from '../constants/userConstants'
import { path } from "../constants/path";

// Inicio de sesion
export const login = (userData) => {
    return async (dispatch) => {
        try {

            dispatch({ type: LOGIN_REQUEST })

            const { data } = await axios.post(`${path}/api/v1/login`, userData);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message
            })
        }
    }
}


// Registrar usuario
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`${path}/api/v1/register`, userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Cargar usuario
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`${path}/api/v1/me`);
        console.log(data);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Actualizar perfil
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`${path}/api/v1/me/update`, userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Actualizar contraseña
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${path}/api/v1/password/update`, passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Recuperar contraseña
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${path}/api/v1/password/forgot`, email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Restablecer contraseña
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${path}/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Cerrar sesión
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`${path}/api/v1/logout`)

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Obtener todos los usuarios
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get(`${path}/api/v1/admin/users`)

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Actualizar usuario - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${path}/api/v1/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Obtener detalles de un usuario - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`${path}/api/v1/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Eliminar usuario - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`${path}/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const loadStripeApiKey = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_STRIPE_API_KEY })
        
        const { data } = await axios.get(`${path}/api/v1/stripeapi`);
        console.log(data);
        
        dispatch({
            type: LOAD_STRIPE_API_KEY_SUCCESS,
            payload: data.stripeApiKey,
        });
    } catch (error) {
        console.error("Error al obtener la clave de la API de Stripe:", error);
    }
};


// Limpiar errores
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}