import mongoose from 'mongoose'
const expenseSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    amount:{type:Number,required:true},
   category:{type:String,enum:["Food","Travel","Shopping","Bills","Movie","Health","Education","Other"],required:true},   
    description:String,
    date:{type:Date,default:Date.now}
},{timestamps:true});
export default mongoose.model("Expense",expenseSchema)