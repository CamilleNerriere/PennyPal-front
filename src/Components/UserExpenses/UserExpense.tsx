import './UserExpenses.scss';
import { Select, DatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import Expenses from './Expenses.tsx';
import { useEffect, useState } from 'react';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';

interface CategoryUser {
  value: number | null;
  label: string;
}

interface Filters {
  Month: number | null;
  Year: number | null;
  CategoryId: number | null;
}

interface Expense {
  id: number;
  amount: number;
  categoryName: string;
  expenseName: string;
}

function UserExpense() {
  const [categoryOptions, setCategoryOptions] = useState<CategoryUser[]>([]);
  const [filters, setFilters] = useState<Filters>({
    Month: null,
    Year: null,
    CategoryId: null,
  });

  const [expenses, setExpenses] = useState<Expense[] | []>([]);

  console.log(expenses);
  console.log(filters);

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth
      .get('/ExpenseCategory')
      .then((res) => {
        let categories = [{ value: null, label: 'Tout' }];
        for (const data of res.data) {
          categories.push({ value: data.id, label: data.name });
        }
        setCategoryOptions(categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const getExpensesByFilter = (filters: {}) => {
    axiosAuth
      .get('/Expense', { params: filters })
      .then((res) => {
        let expenses: Expense[] = [];
        console.log(res);
        if (res.data.length > 0) {
          for (let data of res.data) {
            expenses.push({
              id: data.id,
              amount: data.amount,
              expenseName: data.name,
              categoryName:
                categoryOptions.find((cat) => cat.value == data.categoryId)
                  ?.label || '',
            });
            setExpenses(expenses);
          }
        } else {
          setExpenses([]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (filters.Month && filters.Year) {
      getExpensesByFilter(filters);
    }
  }, [filters]);

  const handleChangeCategory = (value: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      CategoryId: value,
    }));
    console.log(`selected ${value}`);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      Month: date.month() + 1,
      Year: date.year(),
    }));
    console.log(date.year(), date.month());
  };

  return (
    <div className="userExpense">
      <h1>Dépenses</h1>
      <div className="userExpense__content">
        {categoryOptions.length > 0 && (
          <div className="userExpense__content__selections">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    optionFontSize: 16,
                    fontSize: 18,
                  },
                  DatePicker: {
                    fontSize: 16,
                  },
                },
              }}
            >
              <Select
                defaultValue={categoryOptions[0].value}
                onChange={handleChangeCategory}
                options={categoryOptions}
                style={{ width: '48%', fontSize: '1.2rem', height: '3rem' }}
              />
              <DatePicker
                onChange={onChangeDate}
                picker="month"
                style={{ width: '48%', height: '3rem' }}
              />
            </ConfigProvider>
          </div>
        )}

        <div className="userExpense__content__expenses">
          {expenses.map((expense: Expense) => (
            <Expenses
              key={expense.id}
              amount={expense.amount}
              categoryName={expense.categoryName}
              expenseName={expense.expenseName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserExpense;
