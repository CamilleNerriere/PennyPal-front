import './Gestion.scss';
import { useState } from 'react';
import { Input, Button, Space, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Gestion() {
  const [expense, setExpense] = useState<{ category: string; amount: number }>({
    category: '',
    amount: 0,
  });
  const [categoryToAdd, setCategoryToAdd] = useState<string>('');
  const [categoryToDelete, setCategoryToDelete] = useState<string>('');

  const [showItems, setShowItems] = useState<{
    expenseToAdd: boolean;
    categoryToAdd: boolean;
    categoryToDelete: boolean;
  }>({
    expenseToAdd: false,
    categoryToAdd: false,
    categoryToDelete: false,
  });

  const categoryOptions = [
    { value: 'voiture', label: 'Voiture' },
    {
      value: 'maison',
      label: 'Maison',
    },
    { value: 'courses', label: 'Courses' },
  ];

  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setExpense((prev) => ({
        ...prev,
        amount: value === '' ? 0 : Number(value),
      }));
    }
  };

  const handleAddChangeCategory = (value: string) => {
    setExpense((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleAddExpenseClick = () => {
    console.log('Submitted value:', expense.amount, expense.category);
  };

  const handleAddCategoryClick = () => {
    console.log('Submitted value:', categoryToAdd);
  };

  const handleDeleteCategoryClick = () => {
    console.log('Submitted value:', categoryToDelete);
  };

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
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  placeholder="Catégorie"
                  onChange={handleAddChangeCategory}
                  options={categoryOptions}
                  style={{ width: '70%', fontSize: '1.2rem' }}
                />
                <Input
                  value={expense.amount}
                  onChange={(e) => handleInputAmountChange(e)}
                  placeholder="Montant"
                  style={{ width: '30%' }}
                />
                <Button
                  className="button"
                  onClick={handleAddExpenseClick}
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
            onClick={handleAddCategoryVisibility}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Ajouter une catégorie</p>
          </div>
          {showItems.categoryToAdd && (
            <div className="gestion__modules__item__content--add-category">
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  placeholder="Catégorie"
                  onChange={(value) => setCategoryToAdd(value)}
                  options={categoryOptions}
                  style={{ width: '85%', fontSize: '1.2rem' }}
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
                  options={categoryOptions}
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
