import imageApi from "../../../api/imageApi";
import { actionStore, useStore } from "../../../store";

function DeleteImageForm({ id }) {
  const [state, dispatch] = useStore();
  const { isShowModal } = state;

  const deleteImageForm = async id => {
    await imageApi.remove(id);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await imageApi.getAll({ params });
    dispatch(actionStore.fetchImages(list));
  };

  const handleDeleteImageForm = id => {
    deleteImageForm(id);
  };
  return (
    <>
      <h2> Bạn Chắn chắn xóa Image?</h2>
      <button className="btn-submit" onClick={() => handleDeleteImageForm(id)}>
        {" "}
        Submit
      </button>
    </>
  );
}

export default DeleteImageForm;