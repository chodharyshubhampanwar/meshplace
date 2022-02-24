import React, { useContext, useReducer } from "react";

import axios from 'axios'

import reducer from "./reducer";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,HANDLE_CHANGE,
  CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR,GET_JOBS_BEGIN,GET_JOBS_SUCCESS
} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editJobId: '',
  position: "",
  company:'',
  jobLocaton: userlocation || '',
  showSidebar: false,
  userLocation: userlocation || '',
  jobTypeOptions: ['full-time', 'part-time','remote','intership'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs:[],
  totalJobs: 0,
  numOfPages:1,
  page: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

const authFetch = axios.create({
  baseURL: '/api/v1',
})

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response interceptor
authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
   
    if (error.response.status === 401) {
    logoutUser()
    }
    return Promise.reject(error)
  }
)

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
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
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
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
  
      // no token
      const { user, location, token } = data
  
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
  
      addUsertoLocalStorage({ user, location, token })
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  
const createJob = async () => {
  dispatch({type:CREATE_JOB_BEGIN})
  try {
    const  { position, company, jobLocation, jobType, status } = state
    await authFetch.post('/jobs',{
      position, company, jobLocation, jobType, status,
      
    })
    dispatch({type: CREATE_JOB_SUCCESS})
    dispatch({
      type: CLEAR_VALUES
    })
  }
  catch(error){
    if(error.response.status ===401) return
      dispatch({
        type: CREATE_JOB_ERROR, payload:{msg: error.response.data.msg},
       })
  }
  clearAlert()
}
  
const getAllJobs = async () => {

  let url = `/jobs`

  dispatch({ type: GET_JOBS_BEGIN })

  try {

    const {data} = await authFetch(url)
    const {jobs,totalJobs, numOfPages} = data
    dispatch ({
      type: GET_JOBS_SUCCESS,
      payload: {
      jobs,
      totalJobs,
      numOfPages,
    },
    
  })

  }

  catch(error) {  
    console.log(error.response)

  }
  clearAlert()
}

  
  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser,handleChange,clearValues,createJob,getAllJobs }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };


