import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies,setCookie,removeCookie]=useCookies(null);
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : null,
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }

    } catch (err) {
      console.log(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response=await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      });
      if(response.status===200){
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(preVal => {
      return {
        ...preVal,
        [name]: value
      }
    })
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{`${mode} you task`}</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            type="text"
            maxLength={30}
            placeholder="Type todo"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="range">Drag you current progress</label>
          <input
            type="range"
            min="0"
            max="10"
            name="progress"
            id="range"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            type="submit"
            className={mode}
            value={"Add"}
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  )
}

export default Modal