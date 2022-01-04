import http from "./http";
const backend_url = "http://172.16.10.5:3000";

export function getAll() {
  return http.get(`${backend_url}/emps`);
}

export function addNew(data) {
  return http.post(`${backend_url}/emps`, data);
}

export function updateData(data) {
  return http.put(`${backend_url}/emps/${data.ID}`, data);
}

export function deleteData(_id) {
  return http.delete(`${backend_url}/emps/${_id}`);
}
