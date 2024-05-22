const express=require('express');
const router=express.Router()
const { placeorder, allOrders,trackOrder, OrderByUserEmail, DeleteOrder } = require('./Controller')


router.post('/place-order', placeorder)  //
router.get('/get-all-orders', allOrders)   //all orders
router.get('/order-by-user-email', OrderByUserEmail)   //one customer order
router.get('/track-order-by-id', trackOrder)
router.delete('/delete-order', DeleteOrder);

module.exports=router
