import {
  HANDLE_MODAL,
  MODAL_TYPE,
  FETCH_USER,
  ADD_USER,
  GET_USER,
  UPDATE_USER,
  FETCH_ADDRESS,
  ADD_ADDRESS,
  GET_ADDRESS,
  EDIT_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_IMAGES,
  ADD_IMAGE,
  GET_IMAGE,
  EDIT_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE
} from "./constant";

export const addUser = payload => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const handleModal = payload => {
  return {
    type: HANDLE_MODAL,
    payload,
  };
};

export const fetchUser = payload => {
  return {
    type: FETCH_USER,
    payload,
  };
};

export const getUser = payload => {
  return {
    type: GET_USER,
    payload,
  };
};

export const updateUser = payload => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const setModal = payload => {
  return {
    type: MODAL_TYPE,
    payload,
  };
};

export const fetchAddress = payload => {
  return {
    type: FETCH_ADDRESS,
    payload,
  };
};
export const getAddress = payload => {
  return {
    type: GET_ADDRESS,
    payload,
  };
};
export const addAddress = payload => {
  return {
    type: ADD_ADDRESS,
    payload,
  };
};
export const fetchImages = payload => {
  return {
    type: FETCH_IMAGES,
    payload,
  };
};
export const getImage = payload => {
  return {
    type: GET_IMAGE,
    payload,
  };
};
export const addImage = payload => {
  return {
    type: ADD_IMAGE,
    payload,
  };
};
