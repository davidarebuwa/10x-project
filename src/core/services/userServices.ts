import axios from "axios";

interface userResponse {
  data: any;
}

export async function fetchUsers(): Promise<userResponse> {
 // return await axios.get(`https://reqres.in/api/users`);
  return await axios.get(`https://reqres.in/api/users`);
}

export async function createUser(user: any): Promise<userResponse> {
  return await axios.post(`https://reqres.in/api/users`, user);
}

export async function fetchUser(id: number): Promise<userResponse> {
  return await axios.get(`https://reqres.in/api/users/${id}`);
}

export async function updateUser(id: number, user: any): Promise<userResponse> {
  return await axios.put(`https://reqres.in/api/users/${id}`, user);
}

export async function deleteUser(id: number): Promise<userResponse> {
  return await axios.delete(`https://reqres.in/api/users/${id}`);
}