import { useCallback, useEffect, useState } from 'react';
import { Select, DatePicker, ConfigProvider, Modal } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ModalEditExpense from './ModalEditExpense.tsx';
import Expenses from './Expenses.tsx';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import MessageApi from '../MessagesApi/MessageApi.ts';
import { logError } from '../../utils/logError.ts';
import { handleApiError } from '../../utils/handleApiError.ts';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import IExpenseComplete from '../../Interfaces/IExpenseComplete.ts';
import './UserExpenses.scss';

interface Filters {
  Month: number | null;
  Year: number | null;
  CategoryId: string | null;
}

interface IExpenseToDelete {
  id: number;
  name: string;
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

function UserExpense({ messageApi }: { messageApi: any }) {
  const { categoryOptions } = useFetchUserInfos(messageApi);
  const date = dayjs();

  const [filters, setFilters] = useState<Filters>({
    Month: date.month() + 1,
    Year: date.year(),
    CategoryId: null,
  });

  const [expenses, setExpenses] = useState<IExpenseComplete[] | []>([]);
  const [expenseToEdit, setExpenseToEdit] = useState<IExpenseComplete | null>(
    null
  );
  const [expenseToDelete, setExpenseToDelete] =
    useState<IExpenseToDelete | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const axiosAuth = useAxiosAuth();

  const getExpensesByFilter = useCallback(
    (filters: {}) => {
      axiosAuth
        .get('/Expense', { params: filters })
        .then((res) => {
          let expenses: IExpenseComplete[] = [];
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
            }
            setExpenses(expenses);
          } else {
            setExpenses([]);
          }
        })
        .catch((err) => {
          const message = handleApiError(err);
          MessageApi(messageApi, message, 'error');
          logError('GetExpenseByFilters : ', err);
        });
    },
    [axiosAuth, categoryOptions, messageApi]
  );

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current > dayjs().endOf('day');
  };

  useEffect(() => {
    if (filters.Month && filters.Year) {
      getExpensesByFilter(filters);
    }
  }, [filters]);

  const handleChangeCategory = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      CategoryId: value === 'all' ? null : value,
    }));
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      Month: date.month() + 1,
      Year: date.year(),
    }));
  };

  // Edit Expense

  const handleSetExpenseToEdit = (id: number) => {
    const expenseToEdit: IExpenseComplete | undefined = expenses.find(
      (expense) => expense.id === id
    );
    if (expenseToEdit) setExpenseToEdit(expenseToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    axiosAuth
      .put(`Expense/Update`, {
        id: expenseToEdit?.id,
        categoryId: expenseToEdit?.categoryId,
        name: expenseToEdit?.expenseName,
        amount: expenseToEdit?.amount,
        date: expenseToEdit?.date,
        userId: expenseToEdit?.userId,
      })
      .then(() => {
        MessageApi(messageApi, 'Dépense éditée avec succès', 'success');
        getExpensesByFilter(filters);
        setExpenseToEdit(null);
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('Edit Expense : ', err);
      });
    setIsEditModalOpen(false);
  };

  // Delete Expense

  const handleDeleteOk = () => {
    axiosAuth
      .delete(`Expense/Delete/${expenseToDelete?.id ?? ''}`)
      .then(() => {
        MessageApi(messageApi, 'Dépense supprimée avec succès', 'success');
        getExpensesByFilter(filters);
        setExpenseToDelete(null);
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('Delete Expense : ', err);
      });
    setIsDeleteModalOpen(false);
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
                value={filters.CategoryId?.toString()}
                onChange={handleChangeCategory}
                options={categoryOptions}
                style={{ width: '48%', fontSize: '1.2rem', height: '3rem' }}
              />
              <DatePicker
                defaultValue={dayjs()}
                onChange={onChangeDate}
                disabledDate={disabledDate}
                picker="month"
                style={{ width: '48%', height: '3rem' }}
              />
            </ConfigProvider>
          </div>
        )}

        <div className="userExpense__content__expenses">
          {expenses.map((expense: IExpenseComplete) => (
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
        messageApi={messageApi}
        setExpenseToEdit={setExpenseToEdit}
        expenseToEdit={expenseToEdit}
        isEditModalOpen={isEditModalOpen}
        handleEditSubmit={handleEditSubmit}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  );
}

export default UserExpense;
