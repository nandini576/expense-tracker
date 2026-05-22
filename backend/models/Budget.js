import mongoose from 'mongoose'
import User from "./User.js"
const budgetSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref: "User"},
    category:{type:String,enum:["Food","Travel","Shopping","Bills","Movie","Health","Education","Other"],required:true},   
    monthlyBudget:{type:Number,required:true},
    month:{ type: Number, required: true},
    year: {type: Number,required: true}
}, { timestamps: true });
export default mongoose.model("Budget", budgetSchema);