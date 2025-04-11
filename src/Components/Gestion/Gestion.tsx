import { useState } from 'react';
import { Input, Button, Space, Select, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';
import { handleApiError } from '../../utils/handleApiError.ts';
import { logError } from '../../utils/logError.ts';
import IExpense from '../../Interfaces/IExpense.ts';
import './Gestion.scss';

interface IGestionItems {
  expenseToAdd: boolean;
  categoryToAdd: boolean;
  categoryToEdit: boolean;
  categoryToDelete: boolean;
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

  const { categoryOptions, refreshCategories } = useFetchUserInfos(messageApi);

  const axiosAuth = useAxiosAuth();

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

  const handleAddExpenseSubmit = () => {
    axiosAuth
      .post('/Expense/Add', {
        categoryId: expense.category,
        name: expense.name,
        amount: expense.amount,
        date: expense.date,
      })
      .then(() => {
        MessageApi(messageApi, 'Dépense ajoutée avec succès', 'success');
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GestionAddExpense : ', err);
      });
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

  const handleAddCategorySubmit = () => {
    axiosAuth
      .post('/ExpenseCategory', {
        name: categoryToAdd.name,
        monthlyBudget: categoryToAdd.budget,
      })
      .then(() => {
        refreshCategories();
        MessageApi(messageApi, 'Catégorie ajoutée avec succès', 'success');
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GestionAddCategory : ', err);
      });
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
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GestionFindCategoryById : ', err);
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

  const handleEditCategorySubmit = () => {
    axiosAuth
      .put('/ExpenseCategory', {
        id: categoryToEdit.id,
        name: categoryToEdit.name,
        monthlyBudget: categoryToEdit.budget,
      })
      .then(() => {
        refreshCategories();
        setCategoryToEdit({ id: null, name: '', budget: null });
        MessageApi(messageApi, 'Catégorie éditée avec succès.', 'success');
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GestionEditCategory : ', err);
      });
  };

  // Delete a category

  // we need this in order to memorize the category label to rerender in case of category delete

  const handleDeleteCategoryClick = () => {
    axiosAuth
      .delete(`/ExpenseCategory/${categoryToDelete}`)
      .then(() => {
        refreshCategories();
        setCategoryToDelete(null);
        MessageApi(messageApi, 'Dépense supprimée avec succès.', 'success');
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GestionDeleteCategory : ', err);
      });
  };

  // Toggle gestions

  const toggleVisibility = (key: keyof IGestionItems) => {
    setShowItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="gestion">
      <h1 className="h1">Gestion</h1>
      <div className="gestion__modules">
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={() => toggleVisibility('expenseToAdd')}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Ajouter une dépense</p>
          </div>
          {showItems.expenseToAdd && (
            <form
              className="gestion__modules__item__content--expense"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddExpenseSubmit();
              }}
            >
              <Select
                placeholder="Catégorie"
                onChange={handleAddChangeCategory}
                options={categoryOptions.filter((cat) => cat.value !== 'all')}
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
                  type="primary"
                  htmlType="submit"
                  style={{ width: '15%' }}
                >
                  Ok
                </Button>
              </Space.Compact>
            </form>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={() => toggleVisibility('categoryToAdd')}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Ajouter une catégorie</p>
          </div>
          {showItems.categoryToAdd && (
            <form
              className="gestion__modules__item__content--add-category"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCategorySubmit();
              }}
            >
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
                  htmlType="submit"
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </form>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={() => toggleVisibility('categoryToEdit')}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Éditer une catégorie</p>
          </div>
          {showItems.categoryToEdit && (
            <form
              className="gestion__modules__item__content--edit-category"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditCategorySubmit();
              }}
            >
              <Select
                placeholder="Catégorie"
                onChange={(value) => handleSelectCategoryToEdit(value)}
                value={categoryToEdit.id?.toString() ?? undefined}
                options={categoryOptions.filter((cat) => cat.value !== 'all')}
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
                  htmlType="submit"
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </form>
          )}
        </div>
        <div className="gestion__modules__item">
          <div
            className="gestion__modules__item__title"
            onClick={() => toggleVisibility('categoryToDelete')}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Supprimer une catégorie</p>
          </div>
          {showItems.categoryToDelete && (
            <form
              className="gestion__modules__item__content--delete-category"
              onSubmit={(e) => {
                e.preventDefault();
                handleDeleteCategoryClick();
              }}
            >
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  placeholder="Catégorie"
                  onChange={(value) => setCategoryToDelete(value)}
                  value={categoryToDelete ?? undefined}
                  options={categoryOptions.filter((cat) => cat.value !== 'all')}
                  style={{ width: '85%', fontSize: '1.2rem' }}
                />
                <Button
                  className="button"
                  style={{ width: '15%' }}
                  htmlType="submit"
                  type="primary"
                >
                  Ok
                </Button>
              </Space.Compact>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gestion;
