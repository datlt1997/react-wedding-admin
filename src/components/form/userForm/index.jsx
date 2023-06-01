import { useState } from "react";
import { actionStore, useStore } from "../../../store";
import uuid4 from "uuid4";
import userApi from "../../../api/userApi";

function UserForm() {
  const [state, dispatch] = useStore();
  const { lAddress, user, isShowModal, modalType } = state;
  const initValue = {
    id: "",
    name: "",
    name_vn: "",
    position: "",
    full_name: "",
    relationship: false,
    status: false,
    participate: false,
    ceremony_id: "",
    ceremony: "",
    wish: "",
  };

  const [userInput, setUserInput] = useState(
    modalType === "edit-user" ? user : initValue
  );

  const handleEditInput = (type, value) => {
    const typeVariable = type;
    if (type === "full_name") {
      const fullNameArr = value.split(" ");
      const name_vn = fullNameArr[fullNameArr.length - 1];
      const name = name_vn
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
      setUserInput({
        ...userInput,
        name: name,
        name_vn: name_vn,
        full_name: value,
      });
    } else {
      setUserInput({ ...userInput, [typeVariable]: value });
    }
  };

  const updateForm = async () => {
    await userApi.update(userInput);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await userApi.getAll({ params });
    dispatch(actionStore.fetchUser(list));
  };

  const addUserForm = async () => {
    const id = uuid4();
    await userApi.add({ ...userInput, id: id });
    dispatch(actionStore.handleModal(isShowModal));
    dispatch(actionStore.addUser({ ...userInput, id: id }));
  };

  const handleSubmitForm = () => {
    if (modalType === "edit-user") {
      updateForm();
    } else {
      addUserForm();
    }
  };

  const handleChekboxCeremony = item => {
    setUserInput({
      ...userInput,
      ceremony_id: item.id,
      "ceremony": item.title
    });
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="full_name">Full Name</label>
        <input
          id="full_name"
          type="text"
          value={userInput.full_name}
          onChange={e => handleEditInput("full_name", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          value={userInput.position}
          onChange={e => handleEditInput("position", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">status</label>
        <input
          id="status"
          type="checkbox"
          checked={userInput.status}
          onChange={e => handleEditInput("status", !userInput.status)}
        />
      </div>
      {lAddress.map((item, key) => {
        return (
          <div className="form-group" key={key}>
            <label htmlFor="ceremony_man">{item.title}</label>
            <input
              id="ceremony_man"
              type="checkbox"
              checked={userInput.ceremony_id === item.id}
              onChange={() => handleChekboxCeremony(item)}
            />
          </div>
        );
      })}
      <div className="form-group">
        <label htmlFor="had_relationship">Đã có gia đình</label>
        <input
          id="had_relationship"
          type="checkbox"
          checked={userInput.relationship}
          onChange={e => handleEditInput("relationship", true)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="not_relationship">Độc Thân</label>
        <input
          id="not_relationship"
          type="checkbox"
          checked={!userInput.relationship}
          onChange={e => handleEditInput("relationship", false)}
        />
      </div>
      <div className="form-group">
        <input
          type="button"
          value="submit"
          onClick={() => handleSubmitForm()}
        />
      </div>
    </form>
  );
}

export default UserForm;
