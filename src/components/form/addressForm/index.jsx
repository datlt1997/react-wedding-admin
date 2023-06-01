import { useState } from "react";
import { actionStore, useStore } from "../../../store";
import uuid4 from "uuid4";
import addressApi from "../../../api/addressApi";
import Image from "../../image";

function AddressForm() {
  const [state, dispatch] = useStore();
  const { address, isShowModal, modalType } = state;
  const initValue = {
    "id": "",
    "title": "",
    "location": "",
    "time_utc": "",
    "description": "",
    "image": "",
    "map": ""
  };
  console.log(state)

  const [AddressInput, setAddressInput] = useState(modalType === "edit-address" ? address : initValue);

  const handleEditInput = (type, value) => {
    const typeVariable = type;
    setAddressInput({ ...AddressInput, [typeVariable]: value });
  };

  const updateAddressForm = async () => {
    await addressApi.update(AddressInput);
    dispatch(actionStore.handleModal(isShowModal));
    const params = {
      _limit: 25,
    };
    const list = await addressApi.getAll({ params });
    dispatch(actionStore.fetchAddress(list));
  };

  const addAddressForm = async () => {
    const id = uuid4()
    await addressApi.add({ ...AddressInput, id: id });
    dispatch(actionStore.handleModal(isShowModal));
    dispatch(actionStore.addAddress({ ...AddressInput, id: id }))
  };

  const handleSubmitForm = () => {
    console.log(AddressInput);
    if (modalType === "edit-address") {
      updateAddressForm();
    } else {
      addAddressForm();
    }
  };

  const imageDefault = "https://i.ibb.co/bFpgWcr/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg"
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={AddressInput.title}
          onChange={e => handleEditInput("title", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Loaction</label>
        <input
          id="location"
          type="text"
          value={AddressInput.location}
          placeholder="Đà Nẵng"
          onChange={e => handleEditInput("location", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time_utc">time_utc</label>
        <input
          id="time_utc"
          type="text"
          value={AddressInput.time_utc}
          placeholder="2023-06-25 11:00:00"
          onChange={e => handleEditInput("time_utc", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={AddressInput.description}
          placeholder="299 Điện Biên Phủ, Duy Phước, Duy Xuyên, Quảng Nam"
          onChange={e => handleEditInput("description", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">link image</label>
        <input
          id="image"
          type="text"
          value={AddressInput.image}
          onChange={e => handleEditInput("image", e.target.value)}
        />
      </div>
      <div className="display-image">
        <Image image={AddressInput.image ? AddressInput.image : imageDefault}  className="image-loading" />
      </div>
      <div className="form-group">
        <label htmlFor="map">link map</label>
        <input
          id="map"
          type="text"
          value={AddressInput.map}
          onChange={e => handleEditInput("map", e.target.value)}
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

export default AddressForm