import axiosClient from "./axiosClient";

const userApi = {
  getAll(params) {
    const url = "/invite";
    return axiosClient.get(url, { params })
  },
  get(id) {
    const url = `invite/${id}`;
    return axiosClient.get(url)
  },
  add(data) {
    const url = "invite";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `invite/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `invite/${id}`;
    return axiosClient.delete(url);
  }
}

export default userApi