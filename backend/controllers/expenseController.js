import Expense from "../models/Expense.js"
export const addExpense = async (req,res)=>{
    try{
        const { amount, category, description, date } = req.body;
        if (!amount || !category) 
           return res.status(400).json({ msg: "Amount and category required" });
        const expense = await Expense.create({userId:req.user.id,amount,category,description,date})
         res.status(201).json(expense);
    }catch(err){
        res.status(500).json({ message: "Error adding expense" });
    }
}
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
     userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(expenses);

  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};
export const deleteExpense = async (req, res) => {
  try {
        const expense = await Expense.findById(req.params.id);
        if (!expense)
        return res.status(404).json({ message: "Expense not found" });
        if (expense.userId.toString() !== req.user.id) 
        return res.status(403).json({ message: "Unauthorized" });
        await expense.deleteOne();
        res.json({ message: "Expense deleted" });
   } catch (err) {
        res.status(500).json({ message: "Error deleting expense" });
  }
};