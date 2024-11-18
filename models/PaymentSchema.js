const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Success", "Failed"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model("Payment", paymentSchema)