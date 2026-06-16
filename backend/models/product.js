const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true},
    price: { type: Number, required: true },
    category: { type: String, required: true }, 
    type: { type: String, required: true },    
    thumbnail: { type: String, required: true },   

    colors: [
      {
        name: String,
        code: String,   
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

/* Tự động tạo slug khi tạo sản phẩm */
productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true
    });
  }
});

/* Tự động cập nhật slug khi đổi tên */
productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update?.name) {
    update.slug = slugify(update.name, {
      lower: true,
      strict: true,
      trim: true
    });
  }
});

module.exports = mongoose.model("Product", productSchema);