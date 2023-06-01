import { useState } from "react";
import { actionStore, useStore } from "../../../store";
import uuid4 from "uuid4";
import imageApi from "../../../api/imageApi";
import Image from "../../image";

function ImageForm() {
  const [state, dispatch] = useStore();
  const { image, isShowModal, modalType } = state;
  const initValue = {
    "id": "",
    "image": "",
    "type": ""
  };
  console.log(state)

  const [imageInput, setimageInput] = useState(modalType === "edit-image" ? image : initValue);

  const handleEditInput = (type, value) => {
    const typeVariable = type;
    setimageInput({ ...imageInput, [typeVariable]: value });
  };

  const updateImageForm = async () => {
    await imageApi.update(imageInput);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await imageApi.getAll({ params });
    dispatch(actionStore.fetchImages(list));
  };

  const addImageForm = async () => {
    const id = uuid4()
    await imageApi.add({ ...imageInput, id: id });
    dispatch(actionStore.handleModal(isShowModal));
    dispatch(actionStore.addImage({ ...imageInput, id: id }))
  };

  const handleSubmitForm = () => {
    if (modalType === "edit-image") {
      updateImageForm();
    } else {
      addImageForm();
    }
  };

  const imageDefault = "https://i.ibb.co/bFpgWcr/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg"
  return (
    <form>
      
            
      <div className="form-group">
        <label htmlFor="image">link Image</label>
        <input
          id="image"
          type="text"
          value={imageInput.image}
          onChange={e => handleEditInput("image", e.target.value)}
        />
      </div>
      <div className="display-image">
        <Image image={imageInput.image ? imageInput.image : imageDefault}  className="image-loading" />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type</label>
        <input
          id="type"
          type="text"
          value={imageInput.type}
          onChange={e => handleEditInput("type", e.target.value)}
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

export default ImageForm