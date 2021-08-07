import React from 'react'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../actions/userActions'
import Message from './Message'
import Loader from './Loader'


const Header = () => {
    const dispatch = useDispatch()


    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const logOutHandler =()=>{
        dispatch(logOut())
      
        
    }
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                         <Navbar.Brand >MARKET | SHOP</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">
                        <LinkContainer to='/cart/:id'>
                            <Nav.Link >
                                <i className='fa fa-shopping-cart px-2'></i>CART
                            </Nav.Link>
                        </LinkContainer>
                        { userInfo? (
                            <NavDropdown title ={userInfo.name}  id='username'> 
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                 </LinkContainer>

                                 <NavDropdown.Item onClick={logOutHandler}> 
                                     Log Out
                                 </NavDropdown.Item>
                            </NavDropdown>

                        ): <LinkContainer to='/login' >
                             <Nav.Link>
                             <i className='fa fa-user px-2'></i>LOG IN
                             </Nav.Link>
                          </LinkContainer>}
                        
                    </Nav>
                    </Container>
             </Navbar>

             {userLogin.message && <Message variant='success' > {userLogin.message} </Message> }
         


        </header>
    )
}

export default Header
