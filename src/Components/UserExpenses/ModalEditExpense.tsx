import { Select, DatePicker, Modal, Input, Space } from 'antd';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import React from 'react';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import IExpenseComplete from '../../Interfaces/IExpenseComplete.ts';

interface ModalEditExpenseProps {
  expenseToEdit: IExpenseComplete | null;
  setExpenseToEdit: React.Dispatch<
    React.SetStateAction<IExpenseComplete | null>
  >;
  isEditModalOpen: boolean;
  handleEditSubmit: () => void;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: any;
}

function ModalEditExpense({
  expenseToEdit,
  setExpenseToEdit,
  isEditModalOpen,
  handleEditSubmit,
  setIsEditModalOpen,
  messageApi,
}: ModalEditExpenseProps) {
  const { categoryOptions } = useFetchUserInfos(messageApi);

  const findCategory = (categoryId: number | undefined) =>
    categoryOptions.find((category) => Number(category.value) === categoryId);

  const setNewCategory = (value: string) => {
    const category = findCategory(Number(value));

    if (!category) return;

    setExpenseToEdit((prev) => {
      if (!prev) return expenseToEdit;

      return {
        ...prev,
        categoryName: category.label,
        categoryId: Number(value),
      };
    });
  };

  const setNewDate = (value: Dayjs | null) => {
    if (!value) return;
    setExpenseToEdit((prev) => {
      if (!prev) return expenseToEdit;

      return {
        ...prev,
        date: value.format('YYYY-MM-DDTHH:mm:ss'),
      };
    });
  };

  const setNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpenseToEdit((prev) => {
      if (!prev) return expenseToEdit;

      return {
        ...prev,
        expenseName: value,
      };
    });
  };

  const setNewAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setExpenseToEdit((prev) => {
        if (!prev) return expenseToEdit;

        return {
          ...prev,
          amount: Number(value),
        };
      });
    }
  };

  return (
    <Modal
      title={`Éditer la dépense`}
      open={isEditModalOpen}
      onOk={handleEditSubmit}
      onCancel={() => {
        setIsEditModalOpen(false);
        setExpenseToEdit(null);
      }}
    >
      <form onSubmit={handleEditSubmit}>
        <Select
          placeholder="Catégorie"
          options={categoryOptions.filter((cat) => cat.value !== 'all')}
          style={{ width: '100%', marginBottom: '1rem' }}
          onChange={(value: string) => setNewCategory(value)}
          value={expenseToEdit?.categoryId?.toString()}
        />
        <DatePicker
          value={dayjs(expenseToEdit?.date)}
          onChange={(value) => setNewDate(value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={expenseToEdit?.expenseName}
            placeholder="Nom"
            onChange={(e) => setNewName(e)}
            style={{ width: '70%' }}
          />
          <Input
            value={expenseToEdit?.amount}
            placeholder="Montant"
            onChange={(e) => setNewAmount(e)}
            style={{ width: '30%' }}
          />
        </Space.Compact>
      </form>
    </Modal>
  );
}

export default ModalEditExpense;
