const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },     
    thumbnail: { type: String, required: true },   

    colors: [
      {
        name: String,   
        image: String   
      }
    ],

    sizes: [{ type: String }],  
    description: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);