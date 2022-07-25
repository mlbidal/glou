import axios from 'axios'
import { GET_BUDGETS, CLEAR_BUDGET, GET_USER, ERROR } from "../constants";

const endpointBudgets = "https://glou-back.herokuapp.com/budgets";
const endpointAuth = "https://glou-back.herokuapp.com/auth";

export const postBudget = async function (newBudget, token) {
    
    const { data } = await axios.post(endpointBudgets, newBudget, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}
export const getBudget = async function (id, token) {
    const { data } = await axios.get(`${endpointBudgets}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const postAuth = async function (input) {
    try {
        const data = await axios.post(endpointAuth, input)
        return data
    } catch (error) {
        return error
    }
}

export const signIn = (input) => {
    return async (dispatch) => {
        try {
            const data = await postAuth(input)
            if (data.data) {
                dispatch({
                    type: GET_USER,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: ERROR,
                    payload: data.response.data
                })
            }
        } catch (error) {
            return error
        }
    }
}

export const createNewBudget = (newBudget, token) => {
    return async (dispatch) => {
        try {
            const data = await postBudget(newBudget, token)
            dispatch({
                type: GET_BUDGETS,
                payload: data
            })
        } catch (error) {
            return error
        }
    }
}

export const getUserBudget = (id, token) => {
    return async (dispatch) => {
        try {
            const data = await getBudget(id, token)
            
            dispatch({
                type: GET_BUDGETS,
                payload: data
            })
        } catch (error) {
            return error
        }
    }
}

export const clearBudget = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type:CLEAR_BUDGET,
            })
        } catch (error) {
            return error
        }
    }
}