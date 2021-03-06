import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer  from '../components/FormContainer'
import { logIn } from '../actions/userActions'


const LoginScreen = ({location, history}) => {
    //local state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    //redux state
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
    const redirect = location.search? location.search.split('=')[1]: '/' 

    const submitHandler =(e)=>{
        e.preventDefault()
        //dispatch login 
        dispatch(logIn(email,password));
    }

    useEffect (()=>{
        window.scrollTo(0, 0)

        if(userInfo){
            history.push('/')
            window.location.reload(false) }
        }, [history,userInfo, redirect] )

    return (
        <FormContainer >
           <h4 > <strong> LOG IN </strong></h4>
            <Form onSubmit={submitHandler}>
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

                <Button type='submit' variant='primary'  className =' my-2'> 
                    Log In
                </Button>
            </Form>
            <Row classname='py-3'>
                <Col > Doesn't have an account yet?
                <Link    to = {redirect? `register?redirect=${redirect}`: '/register' }>
                Register </Link>
                </Col>

            </Row>
            {error && <Message variant='danger' > {error} </Message> }
            {loading && <Loader/> }
            
        </FormContainer>
    )
}


export default LoginScreen
