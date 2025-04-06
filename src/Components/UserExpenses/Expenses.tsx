import './Expenses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Dispatch, JSX, SetStateAction } from 'react';

interface IExpenseToDelete {
  id: number;
  name: string;
}

interface Props {
  id: number;
  amount: number;
  categoryName: string;
  expenseName: string;
  setExpenseToEdit: Dispatch<SetStateAction<number | null>>;
  setExpenseToDelete: Dispatch<SetStateAction<IExpenseToDelete | null>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

function Expenses({
  id,
  amount,
  categoryName,
  expenseName,
  setExpenseToEdit,
  setExpenseToDelete,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: Props): JSX.Element {
  return (
    <div className="Expenses">
      <div className="Expenses__text">
        <div className="Expenses__text-infos">
          <p className="Expenses__text-infos__name">{expenseName}</p>
          <p className="Expenses__text-infos__category">{categoryName}</p>
        </div>
        <div className="Expenses__text-infos__additional">
          <div className="Expenses__text-infos__additional__icons">
            <FontAwesomeIcon
              icon={faPenToSquare}
              cursor={'pointer'}
              onClick={() => {
                setExpenseToEdit(id);
              }}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              cursor={'pointer'}
              onClick={() => {
                setExpenseToDelete({ id: id, name: expenseName });
                setIsDeleteModalOpen(!isDeleteModalOpen);
              }}
            />
          </div>
        </div>
      </div>
      <div className="Expenses__price-info">{amount}€</div>
    </div>
  );
}

export default Expenses;
