import mongoose from "mongoose";

const riskSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    category:{type:String,enum:["Food","Travel","Shopping","Bills","Movie","Health","Education","Other"],required:true},   
    month: {type: Number,required: true},
    year: {type: Number,required: true},
    spent: {type: Number,default: 0},
    budget: {type: Number,default: 0},
    riskLevel: {type: String,enum: ["LOW", "MEDIUM", "HIGH", "OVER"],default: "LOW"},
    message: {type: String}
  },
  { timestamps: true }
);
export default mongoose.model("Risk", riskSchema);