import axios from 'axios'
import { bindActionCreators } from 'redux'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED,USER_LOGOUT } from "../constants/userConstants"

export const logIn =(email,password) => async(dispatch) => {
    try {
        dispatch({
            type:  USER_LOGIN_REQUEST
        })
        const config = {
            headers: { 
                'Content-Type' : 'application/json'  
            }
         }
         
         const {data} = await axios.post ('/api/users/login',{email,password}, config) 
      
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
         })
         localStorage.setItem('userInfo', JSON.stringify(data))
        }

     catch (error) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }
}   

export const logOut = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    
    dispatch({
        type: USER_LOGOUT,
    })
}
