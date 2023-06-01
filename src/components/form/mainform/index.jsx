import AddressForm from "../addressForm"
import DeleteAddressForm from "../deleteAddressForm"
import DeleteImageForm from "../deleteImage"
import DeleteUserForm from "../deleteUserForm"
import ImageForm from "../imageForm"
import UserForm from "../userForm"

function MainForm({ modalType, data })
{
  if (modalType === "edit-user" || modalType === "add-user") {
    return <UserForm />
  }
  if (modalType === "delete-user") {
    return <DeleteUserForm id={data?.user.id} />
  }
  if (modalType === "edit-address" || modalType === "add-address") {
    return <AddressForm />
  }
  if (modalType === "delete-address") {
    return <DeleteAddressForm id={data?.address.id} />
  }
  if (modalType === "edit-image" || modalType === "add-image") {
    return <ImageForm />
  }
  if (modalType === "delete-image") {
    return <DeleteImageForm id={data?.image.id} />
  }
}

export default MainForm