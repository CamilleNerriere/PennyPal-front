import './Expenses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { JSX } from 'react';

interface Props {
  amount: number;
  categoryName: string;
  expenseName: string;
}

function Expenses({ amount, categoryName, expenseName }: Props): JSX.Element {
  return (
    <div className="Expenses">
      <div className="Expenses__text">
        <div className="Expenses__text-infos">
          <p className="Expenses__text-infos__name">{expenseName}</p>
          <p className="Expenses__text-infos__category">{categoryName}</p>
        </div>
        <div className="Expenses__text-infos__additional">
          <div className="Expenses__text-infos__additional__icons">
            <FontAwesomeIcon icon={faPenToSquare} />
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
      <div className="Expenses__price-info">{amount}€</div>
    </div>
  );
}

export default Expenses;
