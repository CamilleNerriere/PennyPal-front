import './HomeConnected.scss';
import { useEffect, useState } from 'react';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';

interface CategoryRemain {
  id: number;
  name: string;
  monthlyBudget: number;
  remain: number;
}

function HomeConnected() {
  const [budget, setBudget] = useState<number>(0);
  const [user, setUser] = useState('');
  const [categoriesRemains, setCategoriesRemains] = useState<
    CategoryRemain[] | null
  >(null);

  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, budgetRes, remainRes] = await Promise.all([
          axiosAuth.get('/User'),
          axiosAuth.get('/User/UserRemain'),
          axiosAuth.get('/User/UserCategoriesRemain'),
        ]);
        setUser(userRes.data.firstname + ' ' + userRes.data.lastname);
        setBudget(budgetRes.data);
        setCategoriesRemains(remainRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="HomeConnected">
      <h1 className="h1">Bienvenue {user}</h1>
      <div className="HomeConnected__content">
        <div className="HomeConnected__amount">
          <div className="HomeConnected__amount__header">
            <span className="HomeConnected__amount__text">Catégorie</span>
            <span className="HomeConnected__amount__text">Reste</span>
          </div>
          <div className="HomeConnected__amount__total">
            <span className="HomeConnected__amount__bold">Total </span>
            <span className="HomeConnected__amount__bold">{budget} €</span>
          </div>
          <div className="HomeConnected__category-remain">
            {categoriesRemains &&
              categoriesRemains.map((category: CategoryRemain) => (
                <div
                  className="HomeConnected__category-remain__category"
                  key={category.id}
                >
                  <div className="HomeConnected__category-remain__category__title">
                    <span className="HomeConnected__category-remain__category__name">
                      {category.name}
                    </span>
                    <span className="HomeConnected__category-remain__category__budget">
                      Budget : {category.monthlyBudget}€
                    </span>
                  </div>
                  <div className="HomeConnected__category-remain__category__remain">
                    {category.remain}€
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeConnected;
