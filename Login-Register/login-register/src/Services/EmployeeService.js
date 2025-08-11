import axios from "axios"

const REST_API_URL = "http://localhost:8080/Users";


export const Users = () => { return axios.get(REST_API_URL); }

export const DeleteUser = (User_id) => { return axios.delete(REST_API_URL+ '/' + User_id); }