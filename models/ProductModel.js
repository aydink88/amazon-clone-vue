import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = model('Product', ProductSchema);
export default Product;
