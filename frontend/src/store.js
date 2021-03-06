import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,} from './reducers/userReducers'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeliverReducer, orderReceivedReducer, orderCreateReviewReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    userList: userListReducer, 
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    orderReceived: orderReceivedReducer,
    orderCreateReview: orderCreateReviewReducer,
    

})



const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage =  !userInfoFromStorage? [] : localStorage.getItem('cartItems')
&& userInfoFromStorage ? JSON.parse(localStorage.getItem('cartItems')) : [] 

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const selectedItemsFromStorage = localStorage.getItem('selectedItems') 
? JSON.parse(localStorage.getItem('selectedItems')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
? JSON.parse(localStorage.getItem('paymentMethod')) : 'Paypal'

const initialState = {

    cart: {cartItems: cartItemsFromStorage,
           selectedItems: selectedItemsFromStorage ,
           shippingAddress: shippingAddressFromStorage,
           paymentMethod: paymentMethodFromStorage,
        },
    userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store


