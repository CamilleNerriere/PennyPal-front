import './UserExpenses.scss';
import { Select, DatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import Expenses from './Expenses.tsx';

function UserExpense() {
  const categoryOptions = [
    { value: 'voiture', label: 'Voiture' },
    {
      value: 'maison',
      label: 'Maison',
    },
    { value: 'courses', label: 'Courses' },
  ];

  const handleChangeCategory = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="userExpense">
      <h1>Dépenses</h1>
      <div className="userExpense__content">
        <div className="userExpense__content__selections">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionFontSize: 16,
                  fontSize: 18,
                },
                DatePicker: {
                  fontSize: 16, // ✅ Taille de la police du champ de saisie
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
        <div className="userExpense__content__expenses">
          <Expenses />
          <Expenses />
          <Expenses />
        </div>
      </div>
    </div>
  );
}

export default UserExpense;
