import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { useStore, actionStore } from "../../store";
import "./style.css"
import Loading from "../../components/loading";
import addressApi from "../../api/addressApi";

function User() {
  const [state, dispatch] = useStore();
  const { users, isShowModal } = state;
  const [loading, setLoading] = useState(true);
  const host = process.env.REACT_APP_HOSTNAME_SERVER;

  console.log(users.length)
  const getListMemberInvite = async () => {
    const params = {
      _limit: 25
    }
    const res = await userApi.getAll({params})
    dispatch(actionStore.fetchUser(res))
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (users.length) {
      setLoading(false);
    } else {
      getListMemberInvite();
    }
    document.title = "List User - Admin"
  }, []);
  
  if (loading) {
    return <Loading />
  }

  const getMemberInvite = async (id) => {
    const res = await userApi.get(id)
    dispatch(actionStore.getUser(res))
    dispatch(actionStore.handleModal(isShowModal))
  }

  const getDataAddress = async () => {
    const res = await addressApi.getAll()
    dispatch(actionStore.fetchAddress(res))
  }

  const handleEditUser = id => {
    getMemberInvite(id)
    getDataAddress();
    dispatch(actionStore.setModal("edit-user"))
  }

  const handleDeleteUser = id => {
    getMemberInvite(id)
    dispatch(actionStore.setModal("delete-user"))
  }
  
  const handleAddUser = () => {
    dispatch(actionStore.handleModal(isShowModal))
    getDataAddress()
    dispatch(actionStore.setModal("add-user"))
  }

  return (
    <>
      <div className="title-form">List user</div>
      <button className="button-form" onClick={() => handleAddUser()}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Full Name</th>
            <th>Position</th>
            <th>Relationship</th>
            <th>Status</th>
            <th>Ceremony</th>
            <th>Link</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => {
        return (
          <tr key={index}>
            <td>{ index + 1 }</td>
            <td>{ user.name_vn }</td>
            <td>{ user.full_name }</td>
            <td>{ user.position }</td>
            <td>{ user.relationship ? "Có gia đình" : "Độc thân" }</td>
            <td>{ user.status ? "Active" : "Inactive"}</td>
            <td>{ user.ceremony}</td>
            <td><a href={ `${host}user/?name=${user.name}&id=${user.id}` } target="_blank" rel="noreferrer">link inivte</a></td>
            <td><button className="button-form" onClick={() => handleEditUser(user.id)}>Edit</button></td>
            <td><button className="button-form" onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
          </tr>
        );
      })}
        </tbody>
      </table>
      
    </>
  );
}

export default User;
