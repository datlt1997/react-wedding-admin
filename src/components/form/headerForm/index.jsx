function HeaderForm({ modalType, data })
{
  if (modalType === "add-user") {
    return <h2>Form Add User</h2>
  }
  if (modalType === "edit-user") {
    return <h2>Edit Form User: {data?.user.full_name}</h2>
  }
  if (modalType === "delete-user") {
    return <h2>Delete User: {data?.user.full_name}</h2>
  }
  if (modalType === "add-address") {
    return <h2>Form Add Address</h2>
  }
  if (modalType === "edit-address") {
    return <h2>Edit Form Address: {data?.address.title}</h2>
  }
  if (modalType === "delete-address") {
    return <h2>Delete Address: {data?.address.title}</h2>
  }
  if (modalType === "add-image") {
    return <h2>Form Add Image</h2>
  }
  if (modalType === "edit-image") {
    return <h2>Edit Form Image: {data?.image.id}</h2>
  }
  if (modalType === "delete-image") {
    return <h2>Delete Image: {data?.image.id}</h2>
  }
}

export default HeaderForm