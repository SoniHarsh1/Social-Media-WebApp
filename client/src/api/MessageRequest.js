import axios from 'axios';

const API = axios.create({baseURL: process.env.REACT_APP_API_URL});

export const getMessages = async (id) => API.get(`/message/${id}`);