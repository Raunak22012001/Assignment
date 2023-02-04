const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
    user_id: { type: objectId,ref:"User" ,required: true },
    sub_total: { type: Number, required: true },
    phone_Number: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)