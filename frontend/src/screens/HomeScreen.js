import React,{useState, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {

    const [products,setProducts] = useState([]);

    
    //fetch data from api in backend
    useEffect(()=>{
        const fetchProducts = async () =>{
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    },[])

    
    return (
        <div>
            <h4 className='my-3'>LATEST PRODUCTS</h4>
            <Row>
            {products.map(product =>(
                   <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                    <Product product = {product}/>
                   </Col>
               ))}
            </Row>
        </div>
    )
}

export default HomeScreen
