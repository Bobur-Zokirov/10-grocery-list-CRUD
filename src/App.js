import { useEffect, useState } from "react";
import { Alert, List } from "./components";

const getLocaleStorage = JSON.parse(localStorage.getItem("list"))

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocaleStorage || []);
  const [edit, setEdit] = useState({ status: false, id: null })
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const changeHandler = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const showAlert = (show = false, type, msg) => {
    setAlert({ show, msg, type })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, "alert-danger", "Please enter value")
    }
    else if (name && edit.status) {
      editItem(edit.id)
      showAlert(true, "alert-success", "Edited successfully")
    }
    else {
      addItem()
    }
  }

  const addItem = () => {
    const newItem = { id: list.length + 1, title: name }
    setList(prev => [newItem, ...prev])

    setName("")
    showAlert(true, "alert-success", "Added successfully")
  }

  const editItem = (id) => {
    setList(
      list.map(item => {
        if (item.id === id) {
          return { ...item, title: name }
        }
        return item
      })
    )

    setName("")
    setEdit({ status: false, id: null })
  }

  const editHandler = (id) => {
    const specificItem = list.find(item => item.id === id)
    setName(specificItem.title)
    setEdit({ status: true, id: id })
  }

  const deleteItem = (id) => {
    setList(prev => prev.filter(c => c.id !== id))

    showAlert(true, "alert-danger", "Deleted successfully")
  }

  const clearItems = () => {
    setList([])
    showAlert(true, "alert-danger", "All items removed")
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <>
      <section className="section-center">
        <div className="grocery-form">
          {alert.show && <Alert msg={alert.msg} type={alert.type} removeAlert={showAlert} list={list} />}
          <form onSubmit={handleSubmit}>
            <h3>Grocery List</h3>
            <div className="form-control">
              <input type="text" className="grocery" autoFocus value={name} onChange={e => changeHandler(e)} placeholder="e.g eggs" />
              <button type="submit" className="submit-btn">{edit.status ? "Edit" : "Submit"}</button>
            </div>
          </form>
        </div>
        {list.length !== 0 && (
          <>
            <div className="grocery-container">
              <List list={list} deleteItem={deleteItem} editHandler={editHandler} />
            </div>
            <button type="button" className="clear-btn" onClick={clearItems}>Clear Items</button></>
        )}
      </section></>
  );
}

export default App;
