import React, { useContext, useReducer } from "react";

import axios from 'axios'

import reducer from "./reducer";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER
} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alretText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userlocation || '',
  jobLocaton: userlocation || '',
  showSidebar: false,

};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

const authFetch = axios.create({
  baseURL: '/api/v1',
 headers: {
   Authorization: `Bearer ${state.token}`,

  },
})

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUsertoLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('location', JSON.stringify(location))
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }






  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register',
        currentUser)
      console.log(response)
      const { user, token, location } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      })


      addUsertoLocalStorage({ user, token, location })
    }
    catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })

    }
    clearAlert()
  }



  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)

      const { user, token, location } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      })


      addUsertoLocalStorage({ user, token, location })
    }
    catch (error) {

      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })

    }
    clearAlert()
  }


  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }


  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
