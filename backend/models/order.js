const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  size: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true
  }

}, {
  _id: false
});


const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  customerName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  phone: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  district: {
    type: String,
    required: true
  },

  ward: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  note: {
    type: String,
    default: "",
    maxlength: 500
  },

  items: [orderItemSchema],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "shipping",
      "completed",
      "cancelled"
    ],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "VNPAY", "MOMO"],
    default: "COD"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);