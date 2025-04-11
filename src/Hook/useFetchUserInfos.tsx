import { useCallback, useEffect, useState } from 'react';
import useAxiosAuth from '../Auth/useAxiosAuth.ts';
import MessageApi from '../Components/MessagesApi/MessageApi.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import { logError } from '../utils/logError.ts';
import IUserCategory from '../Interfaces/IUserCategory.ts';
import IUserInfos from '../Interfaces/IUserInfos.ts';

const useFetchUserInfos = ({ messageApi }: { messageApi: any }) => {
  const axiosAuth = useAxiosAuth();

  const [userInfo, setUserInfo] = useState<IUserInfos>({
    firstname: '',
    lastname: '',
    email: '',
  });

  const [categoryOptions, setCategoryOptions] = useState<IUserCategory[]>([]);

  const refreshCategories = useCallback(() => {
    axiosAuth
      .get('/ExpenseCategory')
      .then((res) => {
        let categories = [{ value: 'all', label: 'Tout' }];
        for (const data of res.data) {
          categories.push({ value: data.id.toString(), label: data.name });
        }
        setCategoryOptions(categories);
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('UserFetchExpenseCategory', err);
      });
  }, [axiosAuth, messageApi]);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  useEffect(() => {
    axiosAuth
      .get('/User')
      .then((res) => {
        setUserInfo({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
        });
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('UserFetchError', err);
      });
  }, [axiosAuth, messageApi]);

  return { userInfo, categoryOptions, refreshCategories };
};

export default useFetchUserInfos;
