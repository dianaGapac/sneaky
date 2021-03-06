import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {listMyOrders, getOrderDetails} from '../actions/orderActions'
import FormContainer from '../components/FormContainer'

const ProfileScreen = ({history, location}) => {

      //local state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const dispatch = useDispatch()
    
    //redux state
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const myOrderList = useSelector(state => state.myOrderList)
    const {loading: loadingOrders, error:errorOrders, orders} =  myOrderList

    //To check if there is someone logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {success} = userUpdateProfile 

    const submitHandler =(e)=>{
        e.preventDefault()
      if(password !== confirmPassword)
      {
          setMessage('Passwod not Matched') 
      }
      else{
        //DISPATCh UPDATE  PROFILE
        dispatch(updateUserProfile({ id: user.id, name, email,password}))
    
      }
        
    }
    const getOrderHandler =(id)=>{
        dispatch(getOrderDetails(id))
        history.push(`/orders/${id}`)
    }

    useEffect (()=>{
        window.scrollTo(0, 0)
        if(!userInfo){
            history.push('/login') 
        }
         else{
                if(!user.name){
                  dispatch(getUserDetails('profile'))
                  dispatch(listMyOrders())
                }
                 else{
         
                     setName(user.name)
                     setEmail(user.email)
                    }
            }
        }
    , [dispatch, history,userInfo, user,orders])

    return (
        <FormContainer > 
            <Col  md={6} lg={12} >
            <h4 className= 'mt-2' > MY PROFILE  </h4>

            {message && <Message variant='danger' > {message} </Message> }
            {error && <Message variant='danger' > {error} </Message> }
            {success && <Message variant='success' > {"SUCCESSFULLY UPDATED PROFILE"} </Message> }
            {loading && <Loader/> }
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label className="mt-1"> Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value= {name} onChange={(e) => setName(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

           
                <Form.Group controlId='email'>
                    <Form.Label className="mt-1"> Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value= {email} onChange={(e) => setEmail(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

              
                <Form.Group controlId='password'>
                    <Form.Label className="mt-1"> Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value= {password} onChange={(e) => setPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label className="mt-1"> Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'  className =' my-2'> 
                    UPDATE
                </Button>
            </Form>

            </Col>
            
        </FormContainer>
    )
}

export default ProfileScreen
