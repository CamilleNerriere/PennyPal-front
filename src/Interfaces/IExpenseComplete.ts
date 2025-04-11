interface IExpenseComplete {
  id: number;
  amount: number;
  categoryName: string;
  categoryId: number;
  expenseName: string;
  date: string;
  userId: number;
}

export default IExpenseComplete;
