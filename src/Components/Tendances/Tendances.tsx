import './Tendances.scss';
import {
  ConfigProvider,
  DatePicker,
  type TimeRangePickerProps,
  Select,
} from 'antd';
import { Dayjs } from 'dayjs';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

interface ITendancesFilters {
  month1: number | null;
  year1: number | null;
  month2: number | null;
  year2: number | null;
  categoryId: number | null;
}

function Tendances() {
  const { categoryOptions } = useFetchUserInfos();

  const [tendancesFilters, setTendancesFilters] = useState<ITendancesFilters>({
    month1: null,
    year1: null,
    month2: null,
    year2: null,
    categoryId: null,
  });

  const [amount, setAmount] = useState<number | null>(null);

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const filters = {
      Month1: tendancesFilters.month1,
      Month2: tendancesFilters.month2,
      Year1: tendancesFilters.year1,
      Year2: tendancesFilters.year2,
      categoryId: tendancesFilters.categoryId,
    };
    axiosAuth
      .get('Expense/Tendances', { params: filters })
      .then((res) => setAmount(res.data))
      .catch((err) => console.log(err));
  }, [tendancesFilters]);

  const handleChangeCategory = (value: string) => {
    setTendancesFilters((prevState) => ({
      ...prevState,
      categoryId: value === 'all' ? null : Number(value),
    }));
  };

  const onChangeDate: TimeRangePickerProps['onChange'] = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    if (!dates || dates[0] == null || dates[1] == null) return;

    const startDate = dates[0];
    const endDate = dates[1];

    setTendancesFilters((prevState) => ({
      ...prevState,
      month1: startDate.month() + 1,
      year1: startDate.year(),
      month2: endDate.month() + 1,
      year2: endDate.year(),
    }));
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
              defaultValue={categoryOptions[0]?.value}
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
          <p>Dépense moyenne/mois : {amount ? `${amount} €` : null}</p>
        </div>
      </div>
    </div>
  );
}

export default Tendances;
