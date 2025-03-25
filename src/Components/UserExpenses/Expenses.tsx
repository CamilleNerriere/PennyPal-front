import './Expenses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function Expenses() {
  return (
    <div className="Expenses">
      <div className="Expenses__text">
        <div className="Expenses__text-infos">
          <p className="Expenses__text-infos__name">Café</p>
          <p className="Expenses__text-infos__category">Alimentation</p>
        </div>
        <div className="Expenses__text-infos__additional">
          <div className="Expenses__text-infos__additional__icons">
            <FontAwesomeIcon icon={faPenToSquare} />
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
      <div className="Expenses__price-info">10€</div>
    </div>
  );
}

export default Expenses;
