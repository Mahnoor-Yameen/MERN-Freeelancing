const { Schema, model } = require('mongoose')

const OrdersSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true
    },
    totalBill: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    DeliveryMode: {
        type: String,
        required: true,
    },
    Deliveryfee: {
        type: String,
        required: true,
    },
    CardNumber: {
        type: String,
        required: true,
    },
    paymode: {
        type: String,
        required: true,
    },
    NameOnCard: {
        type: String,
        required: true,
    },
    CardExpiryDate: {
        type: String,
        required: true,
    },
    SecurityCode: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
   
    order_at: {
        type: Date,
        default: Date.now
    }
})

const Orders = model('order', OrdersSchema)
module.exports = Orders
