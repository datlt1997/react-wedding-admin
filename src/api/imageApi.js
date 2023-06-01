import axiosClient from "./axiosClient";

const imageApi = {
  getAll(params) {
    const url = "/images";
    return axiosClient.get(url, { params })
  },
  get(id) {
    const url = `images/${id}`;
    return axiosClient.get(url)
  },
  add(data) {
    const url = "images";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `images/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `images/${id}`;
    return axiosClient.delete(url);
  }
}

export default imageApi