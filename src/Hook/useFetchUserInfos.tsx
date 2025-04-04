import useAxiosAuth from '../Auth/useAxiosAuth.ts';
import { useEffect, useState } from 'react';

interface IUserCategory {
  value: string;
  label: string;
}

interface IUserInfos {
  firstname: string;
  lastname: string;
  email: string;
}

const useFetchUserInfos = () => {
  const axiosAuth = useAxiosAuth();

  const [userInfo, setUserInfo] = useState<IUserInfos>({
    firstname: '',
    lastname: '',
    email: '',
  });

  const [categoryOptions, setCategoryOptions] = useState<IUserCategory[]>([]);

  useEffect(() => {
    axiosAuth
      .get('/ExpenseCategory')
      .then((res) => {
        let categories = [{ value: 'all', label: 'Tout' }];
        for (const data of res.data) {
          categories.push({ value: data.id.toString(), label: data.name });
        }
        setCategoryOptions(categories);
      })
      .catch((err) => console.log(err));
  }, []);

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
        console.log(err);
      });
  }, []);

  return { userInfo, categoryOptions };
};

export default useFetchUserInfos;
