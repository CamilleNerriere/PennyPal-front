import { useEffect, useState } from 'react';
import {
  ConfigProvider,
  DatePicker,
  type TimeRangePickerProps,
  Select,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import { handleApiError } from '../../utils/handleApiError.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';
import { logError } from '../../utils/logError.ts';
import './Tendances.scss';

const { RangePicker } = DatePicker;

interface ITendancesFilters {
  month1: number | null;
  year1: number | null;
  month2: number | null;
  year2: number | null;
  categoryId: number | null;
}

function Tendances({ messageApi }: { messageApi: any }) {
  const { categoryOptions } = useFetchUserInfos(messageApi);

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
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('GetTendances : ', err);
      });
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
      <h1 className="h1">Tendances</h1>
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
              className="tendances__select"
              defaultValue={categoryOptions[0]?.value}
              onChange={handleChangeCategory}
              options={categoryOptions}
            />
            <RangePicker
              className="tendances__range-picker"
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
              onChange={onChangeDate}
              picker="month"
              popupClassName="custom-range-picker-dropdown"
              disabledDate={(current) => {
                return current && current > dayjs().endOf('day');
              }}
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
