import './Expenses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Dispatch, JSX, SetStateAction } from 'react';
import dayjs from 'dayjs';

interface IExpenseToDelete {
  id: number;
  name: string;
}

interface Props {
  id: number;
  amount: number;
  categoryName: string;
  expenseName: string;
  date: string;
  setExpenseToDelete: Dispatch<SetStateAction<IExpenseToDelete | null>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSetExpenseToEdit: (id: number) => void;
}

function Expenses({
  id,
  amount,
  categoryName,
  expenseName,
  date,
  setExpenseToDelete,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleSetExpenseToEdit,
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
              className="Expenses__text-infos__additional__icons--icon"
              icon={faPenToSquare}
              cursor={'pointer'}
              aria-label="Éditer"
              title="Éditer"
              onClick={() => {
                handleSetExpenseToEdit(id);
              }}
            />
            <FontAwesomeIcon
              className="Expenses__text-infos__additional__icons--icon"
              icon={faTrashCan}
              cursor={'pointer'}
              aria-label="Supprimer"
              title="Supprimer"
              onClick={() => {
                setExpenseToDelete({ id: id, name: expenseName });
                setIsDeleteModalOpen(!isDeleteModalOpen);
              }}
            />
          </div>
        </div>
      </div>
      <div className="Expenses__numbers">
        <div className="Expenses__numbers-price">{amount}€</div>
        <div className="Expenses__numbers-date">
          {dayjs(date).format('DD/MM/YYYY')}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
