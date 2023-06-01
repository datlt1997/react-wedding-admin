import { useEffect, useState } from "react";
import imageApi from "../../api/imageApi";
import { actionStore, useStore } from "../../store";
import Loading from "../../components/loading";
import Image from "../../components/image";

function ImageWedding() 
{
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useStore()

  const { images, isShowModal } = state;

  const getImages = async () => {
    const params = {
      _limit: 25
    }
    const res = await imageApi.getAll({params})
    dispatch(actionStore.fetchImages(res))
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if(images.length) {
      setLoading(false);
    } else {
      getImages();
    }
    document.title = "List Image - Admin"
  }, []);

  const handleAddFormImage = () => {
    dispatch(actionStore.handleModal(isShowModal))
    dispatch(actionStore.setModal("add-image"))
  }

  const getImage = async (id) => {
    const res = await imageApi.get(id)
    dispatch(actionStore.getImage(res))
    dispatch(actionStore.handleModal(isShowModal))
  }

  const handleEditFormImage = id => {
    getImage(id)
    dispatch(actionStore.setModal("edit-image"))
  }

  const handleDeleteFormImage = id => {
    getImage(id)
    dispatch(actionStore.setModal("delete-image"))
  }

  if (loading) {
    return <Loading />
  }

  return <>
    <div className="title-form">List image</div>
    <button className="button-form" onClick={() => handleAddFormImage()}>Add image</button>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Image</th>
            <th>Type</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
        {images.map((item, index) => {
        return (
          <tr key={index}>
            <td>{ index + 1 }</td>
            <td><Image image={ item.image } className="image-thubnail" /></td>
            <td>{ item.type }</td>
            <td><button className="button-form" onClick={() => handleEditFormImage(item.id)}>Edit</button></td>
            <td><button className="button-form" onClick={() => handleDeleteFormImage(item.id)}>Delete</button></td>
          </tr>
        );
      })}
        </tbody>
      </table>
  </>
}

export default ImageWedding