const initState = {
  users: [],
  user: {},
  address: [],
  lAddress: {},
  images: [],
  image: {},
  isShowModal: false,
  modalType: "",
};

function reducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "setModal":
      return {
        ...state,
        modalType: action.payload,
      };
    case "handleModal":
      return {
        ...state,
        isShowModal: !action.payload,
      };
    case "fetchUser":
      return {
        ...state,
        users: [...action.payload],
      };
    case "getUser": {
      return {
        ...state,
        user: { ...action.payload },
      };
    }
    case "addUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "fetchAddress":
      return {
        ...state,
        lAddress: [...action.payload],
      };
    case "getAddress":
      return {
        ...state,
        address: { ...action.payload },
      };
    case "addAddress":
      return {
        ...state,
        lAddress: [...state.lAddress, action.payload],
      };
    case "fetchImages":
      return {
        ...state,
        images: [...action.payload],
      };
    case "getImage":
      return {
        ...state,
        image: { ...action.payload },
      };
    case "addImage":
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    default:
      console.log("error");
  }
}

export default reducer;
export { initState };
