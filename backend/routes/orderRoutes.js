import express from 'express'
const router = express.Router()

import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered, updateOrderToReceived, updateOrderToRated} from'../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'



router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders) 
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered)
router.route('/:id/receive').put(protect, updateOrderToReceived)
router.route('/:id/review').put(protect, updateOrderToRated)





export default router