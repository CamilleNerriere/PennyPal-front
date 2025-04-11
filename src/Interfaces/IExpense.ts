interface IExpense {
  category: number | null;
  amount: string | number | null;
  name: string;
  date: string | null;
}

export default IExpense;
