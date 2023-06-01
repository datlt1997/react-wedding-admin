import addressApi from "../../../api/addressApi";
import userApi from "../../../api/userApi";
import { actionStore, useStore } from "../../../store";

function DeleteAddressForm({ id }) {
  const [state, dispatch] = useStore();
  const { isShowModal } = state;

  const deleteAddressForm = async id => {
    await addressApi.remove(id);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await addressApi.getAll({ params });
    dispatch(actionStore.fetchAddress(list));
  };

  const handleDeleteAddressForm = id => {
    deleteAddressForm(id);
  };
  return (
    <>
      <h2> Bạn Chắn chắn xóa Address?</h2>
      <button className="btn-submit" onClick={() => handleDeleteAddressForm(id)}>
        {" "}
        Submit
      </button>
    </>
  );
}

export default DeleteAddressForm;