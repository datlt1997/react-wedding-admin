import userApi from "../../../api/userApi";
import { actionStore, useStore } from "../../../store";

function DeleteUserForm({ id }) {
  const [state, dispatch] = useStore();
  const { isShowModal } = state;

  const deleteUserForm = async id => {
    await userApi.remove(id);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await userApi.getAll({ params });
    dispatch(actionStore.fetchUser(list));
  };

  const handleDeleteUserForm = id => {
    deleteUserForm(id);
  };
  return (
    <>
      <h2> Bạn Chắn chắn xóa User?</h2>
      <button className="btn-submit" onClick={() => handleDeleteUserForm(id)}>
        {" "}
        Submit
      </button>
    </>
  );
}

export default DeleteUserForm;