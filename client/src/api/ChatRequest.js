import axios from 'axios';

const API = axios.create({baseURL: process.env.REACT_APP_API_URL});

export const userChats = async (id) => API.get(`/chat/${id}`)