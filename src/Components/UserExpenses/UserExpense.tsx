import './UserExpenses.scss';
import { Select, DatePicker, ConfigProvider, Modal } from 'antd';
import ModalEditExpense from './ModalEditExpense.tsx';
import type { DatePickerProps, GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Expenses from './Expenses.tsx';
import { useEffect, useState } from 'react';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import MessageApi from '../MessagesApi/MessageApi.ts';

import useAxiosAuth from '../../Auth/useAxiosAuth.ts';

interface Filters {
  Month: number | null;
  Year: number | null;
  CategoryId: number | null;
}

interface Expense {
  id: number;
  amount: number;
  categoryName: string;
  categoryId: number;
  expenseName: string;
  date: string;
  userId: number;
}

interface IExpenseToDelete {
  id: number;
  name: string;
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

// TODO
//Mise à jour du state

function UserExpense({ messageApi }: { messageApi: any }) {
  const { categoryOptions } = useFetchUserInfos();
  const [filters, setFilters] = useState<Filters>({
    Month: null,
    Year: null,
    CategoryId: null,
  });

  const [expenses, setExpenses] = useState<Expense[] | []>([]);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] =
    useState<IExpenseToDelete | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const axiosAuth = useAxiosAuth();

  // Edit Expense

  const handleSetExpenseToEdit = (id: number) => {
    const expenseToEdit: Expense | undefined = expenses.find(
      (expense) => expense.id === id
    );
    if (expenseToEdit) setExpenseToEdit(expenseToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    axiosAuth
      .put(`Expense/Update`, {
        id: expenseToEdit?.id,
        categoryId: expenseToEdit?.categoryId,
        name: expenseToEdit?.expenseName,
        amount: expenseToEdit?.amount,
        date: expenseToEdit?.date,
        userId: expenseToEdit?.userId,
      })
      .then((res) => {
        if (res.status === 204) {
          MessageApi(messageApi, 'Dépense éditée avec succès', 'success');

          const expenseEdited = expenses.find(
            (exp) => exp.id === expenseToEdit!.id
          );
          if (expenseEdited?.categoryId !== expenseToEdit!.categoryId) {
            setExpenses((prev) =>
              prev.filter((exp) => exp.id !== expenseToEdit!.id)
            );
          } else {
            setExpenses((prev) =>
              prev.map((exp) =>
                exp.id === expenseToEdit!.id
                  ? {
                      ...exp,
                      categoryId: expenseToEdit!.categoryId,
                      amount: expenseToEdit!.amount,
                      date: expenseToEdit!.date,
                      expenseName: expenseToEdit!.expenseName,
                    }
                  : exp
              )
            );
          }
        } else {
          MessageApi(messageApi, "Erreur lors de l'édition", 'error');
        }
        setExpenseToEdit(null);
      })
      .catch((err) => {
        console.log(err);
        MessageApi(messageApi, "Erreur lors de l'édition", 'error');
      });
    setIsEditModalOpen(false);
  };

  // Delete Expense

  const handleDeleteOk = () => {
    axiosAuth
      .delete(`Expense/Delete/${expenseToDelete?.id ?? ''}`)
      .then((res) => {
        if (res.status === 204) {
          MessageApi(messageApi, 'Dépense supprimée avec succès', 'success');
          setExpenses((prev) =>
            prev.filter((exp) => exp.id !== expenseToDelete?.id)
          );
        } else {
          MessageApi(messageApi, 'Erreur lors de la suppression', 'error');
        }
        setExpenseToDelete(null);
      })
      .catch((err) => {
        console.log(err);
        MessageApi(messageApi, 'Erreur lors de la suppression', 'error');
      });
    setIsDeleteModalOpen(false);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current > dayjs().endOf('day');
  };

  const getExpensesByFilter = (filters: {}) => {
    axiosAuth
      .get('/Expense', { params: filters })
      .then((res) => {
        let expenses: Expense[] = [];
        if (res.data.length > 0) {
          for (let data of res.data) {
            expenses.push({
              id: data.id,
              amount: data.amount,
              expenseName: data.name,
              categoryName:
                categoryOptions.find((cat) => cat.value == data.categoryId)
                  ?.label || '',
              categoryId: data.categoryId,
              date: data.date,
              userId: data.userId,
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

  const handleChangeCategory = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      CategoryId: value === 'all' ? null : Number(value),
    }));
    console.log(`selected ${value}`);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      Month: date.month() + 1,
      Year: date.year(),
    }));
  };

  return (
    <div className="userExpense">
      <h1 className="h1">Dépenses</h1>
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
                defaultValue={categoryOptions[0]?.value}
                onChange={handleChangeCategory}
                options={categoryOptions}
                style={{ width: '48%', fontSize: '1.2rem', height: '3rem' }}
              />
              <DatePicker
                onChange={onChangeDate}
                disabledDate={disabledDate}
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
              id={expense.id}
              amount={expense.amount}
              categoryName={expense.categoryName}
              expenseName={expense.expenseName}
              date={expense.date}
              handleSetExpenseToEdit={handleSetExpenseToEdit}
              setExpenseToDelete={setExpenseToDelete}
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          ))}
        </div>
      </div>
      <Modal
        title={`Supprimer la dépense`}
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>
          Confirmez-vous la suppression de la dépense{' '}
          {expenseToDelete && expenseToDelete.name} ?{' '}
        </p>
      </Modal>
      <ModalEditExpense
        setExpenseToEdit={setExpenseToEdit}
        expenseToEdit={expenseToEdit}
        isEditModalOpen={isEditModalOpen}
        handleEditOk={handleEditOk}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  );
}

export default UserExpense;
