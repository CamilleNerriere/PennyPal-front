import './Gestion.scss';
import { useState } from 'react';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import type { DatePickerProps } from 'antd';
import { Input, Button, Space, Select, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// TODO
// MAJ du state en cas d'ajout ou suppression de la catégorie

interface IGestionItems {
  expenseToAdd: boolean;
  categoryToAdd: boolean;
  categoryToEdit: boolean;
  categoryToDelete: boolean;
}

interface IExpense {
  category: number | null;
  amount: string | number | null;
  name: string;
  date: string | null;
}

interface ICategoryToAdd {
  name: string;
  budget: string | null;
}

interface ICategoryToEdit {
  id: number | null;
  name: string;
  budget: string | null;
}

function Gestion({ messageApi }: { messageApi: any }) {
  const [expense, setExpense] = useState<IExpense>({
    category: null,
    amount: null,
    name: '',
    date: null,
  });

  const [categoryToAdd, setCategoryToAdd] = useState<ICategoryToAdd>({
    name: '',
    budget: null,
  });

  const [categoryToEdit, setCategoryToEdit] = useState<ICategoryToEdit>({
    id: null,
    name: '',
    budget: null,
  });

  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const [showItems, setShowItems] = useState<IGestionItems>({
    expenseToAdd: false,
    categoryToAdd: false,
    categoryToEdit: false,
    categoryToDelete: false,
  });

  // Messages

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  const { categoryOptions } = useFetchUserInfos();

  const categoryOptionsWithoutAll = categoryOptions.filter(
    (category) => category.value !== 'all'
  );

  // Add an expense

  const handleAddChangeCategory = (value: number) => {
    setExpense((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setExpense((prev) => ({
        ...prev,
        amount: value === '' ? 0 : value,
      }));
    }
  };

  const handleAddDateChange: DatePickerProps['onChange'] = (date) => {
    setExpense((prev) => ({ ...prev, date: date.toISOString() }));
  };

  // Add a category

  const handleAddInputBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCategoryToAdd((prev) => ({
        ...prev,
        budget: value,
      }));
    }
  };

  // Edit a category

  const handleSelectCategoryToEdit = (value: string) => {
    axiosAuth
      .get(`/ExpenseCategory/${value}`)
      .then((res) => {
        setCategoryToEdit({
          id: res.data.id,
          name: res.data.name,
          budget: res.data.monthlyBudget,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditInputBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCategoryToEdit((prev) => ({
        ...prev,
        budget: value,
      }));
    }
  };

  // Handle submit
  const axiosAuth = useAxiosAuth();

  const handleAddExpenseClick = () => {
    axiosAuth
      .post('/Expense/Add', {
        categoryId: expense.category,
        name: expense.name,
        amount: expense.amount,
        date: expense.date,
      })
      .then((res) => {
        if (res.status === 200) {
          success('Dépense ajoutée avec succès.');
        } else {
          error("Erreur lors de l'ajout");
        }
      })
      .catch((err) => {
        console.log(err);
        error("Erreur lors de l'ajout");
      });
  };

  const handleAddCategoryClick = () => {
    axiosAuth
      .post('/ExpenseCategory', {
        name: categoryToAdd.name,
        monthlyBudget: categoryToAdd.budget,
      })
      .then((res) => {
        if (res.status === 200) {
          success('Dépense ajoutée avec succès.');
        } else {
          error("Erreur lors de l'ajout");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEditExpenseClick = () => {
    axiosAuth
      .put('/ExpenseCategory', {
        id: categoryToEdit.id,
        name: categoryToEdit.name,
        monthlyBudget: categoryToEdit.budget,
      })
      .then((res) => {
        if (res.status === 200) {
          success('Dépense éditée avec succès.');
        } else {
          error("Erreur lors de l'édition");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCategoryClick = () => {
    axiosAuth
      .delete(`/ExpenseCategory/${categoryToDelete}`)
      .then((res) => {
        if (res.status === 200) {
          success('Dépense supprimée avec succès.');
        } else {
          error('Erreur lors de la suppression.');
        }
      })
      .catch((err) => console.log(err));
  };

  // Toggle gestions
  const handleAddExpenseVisibility = () => {
    setShowItems((prev) => ({
      ...prev,
      expenseToAdd: !prev.expenseToAdd,
    }));
  };

  const handleAddCategoryVisibility = () => {
    setShowItems((prev) => ({
      ...prev,
      categoryToAdd: !prev.categoryToAdd,
    }));
  };

  const handleEditExpenseVisibility = () => {
    setShowItems((prev) => ({
      ...prev,
      categoryToEdit: !prev.categoryToEdit,
    }));
  };

  const handleDeleteExpenseVisibility = () => {
    setShowItems((prev) => ({
      ...prev,
      categoryToDelete: !prev.categoryToDelete,
    }));
  };

  return (
    <div className="gestion">
      <h1>Gestion</h1>
      <div className="gestion__modules">
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={handleAddExpenseVisibility}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Ajouter une dépense</p>
          </div>
          {showItems.expenseToAdd && (
            <div className="gestion__modules__item__content--expense">
              <Select
                placeholder="Catégorie"
                onChange={handleAddChangeCategory}
                options={categoryOptionsWithoutAll}
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <DatePicker
                onChange={handleAddDateChange}
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={expense.name}
                  onChange={(e) =>
                    setExpense((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Nom"
                  style={{ width: '55%' }}
                />
                <Input
                  value={expense.amount ? expense.amount : ''}
                  onChange={(e) => handleInputAmountChange(e)}
                  placeholder="Montant"
                  style={{ width: '30%' }}
                />
                <Button
                  className="button"
                  onClick={handleAddExpenseClick}
                  type="primary"
                  style={{ width: '15%' }}
                >
                  Ok
                </Button>
              </Space.Compact>
            </div>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={handleAddCategoryVisibility}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Ajouter une catégorie</p>
          </div>
          {showItems.categoryToAdd && (
            <div className="gestion__modules__item__content--add-category">
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder={'Nom'}
                  onChange={(e) => {
                    setCategoryToAdd((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  value={categoryToAdd.name}
                  style={{ width: '55%' }}
                />
                <Input
                  placeholder={'Budget'}
                  onChange={(e) => {
                    handleAddInputBudgetChange(e);
                  }}
                  value={categoryToAdd.budget ? categoryToAdd.budget : ''}
                  style={{ width: '30%' }}
                />
                <Button
                  className="button"
                  style={{ width: '15%' }}
                  onClick={handleAddCategoryClick}
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </div>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={handleEditExpenseVisibility}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Éditer une catégorie</p>
          </div>
          {showItems.categoryToEdit && (
            <div className="gestion__modules__item__content--edit-category">
              <Select
                placeholder="Catégorie"
                onChange={(value) => handleSelectCategoryToEdit(value)}
                options={categoryOptionsWithoutAll}
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder={'Nom'}
                  onChange={(e) => {
                    setCategoryToEdit((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  value={categoryToEdit.name}
                  style={{ width: '55%' }}
                />
                <Input
                  placeholder={'Budget'}
                  onChange={(e) => {
                    handleEditInputBudgetChange(e);
                  }}
                  value={categoryToEdit.budget ? categoryToEdit.budget : ''}
                  style={{ width: '30%' }}
                />
                <Button
                  className="button"
                  style={{ width: '15%' }}
                  onClick={handleEditExpenseClick}
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </div>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={handleDeleteExpenseVisibility}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Supprimer une catégorie</p>
          </div>
          {showItems.categoryToDelete && (
            <div className="gestion__modules__item__content--delete-category">
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  placeholder="Catégorie"
                  onChange={(value) => setCategoryToDelete(value)}
                  options={categoryOptionsWithoutAll}
                  style={{ width: '85%', fontSize: '1.2rem' }}
                />
                <Button
                  className="button"
                  style={{ width: '15%' }}
                  onClick={handleDeleteCategoryClick}
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gestion;
