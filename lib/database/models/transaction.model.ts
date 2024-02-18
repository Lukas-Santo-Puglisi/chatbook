import { Schema, model, models } from "mongoose";

/* A transaction is used as a reference between the user and the image created. We make a connection between the payment and the credits for each user. 
*/
const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;