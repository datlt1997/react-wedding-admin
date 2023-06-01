import { useEffect, useState } from "react";
import addressApi from "../../api/addressApi";
import { actionStore, useStore } from "../../store";
import Loading from "../../components/loading";
import Image from "../../components/image";

function Address() 
{
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useStore()

  const { lAddress, isShowModal } = state;

  const getAddressInvite = async () => {
    const params = {
      _limit: 25
    }
    const res = await addressApi.getAll({params})
    dispatch(actionStore.fetchAddress(res))
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if(lAddress.length) {
      setLoading(false);
    } else {
      getAddressInvite();
    }
    document.title = "List Address - Admin"
  }, []);

  const handleAddFormAddress = () => {
    dispatch(actionStore.handleModal(isShowModal))
    dispatch(actionStore.setModal("add-address"))
  }

  const getAddress = async (id) => {
    const res = await addressApi.get(id)
    dispatch(actionStore.getAddress(res))
    dispatch(actionStore.handleModal(isShowModal))
  }

  const handleEditFormAddress = id => {
    getAddress(id)
    dispatch(actionStore.setModal("edit-address"))
  }

  const handleDeleteFormAddress = id => {
    getAddress(id)
    dispatch(actionStore.setModal("delete-address"))
  }

  if (loading) {
    return <Loading />
  }

  return <>
    <div className="title-form">List Address</div>
    <button className="button-form" onClick={() => handleAddFormAddress()}>Add Address</button>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Location</th>
            <th>Time UTC</th>
            <th>Description</th>
            <th>Image</th>
            <th>Map</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
        {lAddress.map((item, index) => {
        return (
          <tr key={index}>
            <td>{ index + 1 }</td>
            <td>{ item.title }</td>
            <td>{ item.location }</td>
            <td>{ item.time_utc }</td>
            <td>{ item.description }</td>
            <td><Image image={ item.image } className="image-address" /></td>
            <td><a href={item.map} target="_blank" rel="noreferrer">Link map</a></td>
            <td><button className="button-form" onClick={() => handleEditFormAddress(item.id)}>Edit</button></td>
            <td><button className="button-form" onClick={() => handleDeleteFormAddress(item.id)}>Delete</button></td>
          </tr>
        );
      })}
        </tbody>
      </table>
  </>
}

export default Address