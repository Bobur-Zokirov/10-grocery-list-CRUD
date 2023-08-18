import { FaEdit, FaTrashAlt } from "react-icons/fa";
const List = ({ list, deleteItem, editHandler }) => {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id} className="grocery-item">
          <h4 className="title">{item.title}</h4>
          <div>
            <button className="edit-btn" onClick={() => editHandler(item.id)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
