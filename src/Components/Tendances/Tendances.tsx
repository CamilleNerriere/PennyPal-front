import './Tendances.scss';
import {
  ConfigProvider,
  DatePicker,
  type TimeRangePickerProps,
  Select,
} from 'antd';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

function Tendances() {
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

  const onChangeDate: TimeRangePickerProps['onChange'] = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    console.log(dates?.[0], dates?.[1]);
  };

  return (
    <div className="tendances">
      <h1>Tendances</h1>
      <div className="tendances__content">
        <div className="tendances__content__selections">
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
            <RangePicker
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
              onChange={onChangeDate}
              picker="month"
              style={{ width: '48%', height: '3rem' }}
            />
          </ConfigProvider>
        </div>
        <div className="tendances__content__text">
          <p>Dépense moyenne/mois : 146.67 €</p>
        </div>
      </div>
    </div>
  );
}

export default Tendances;
