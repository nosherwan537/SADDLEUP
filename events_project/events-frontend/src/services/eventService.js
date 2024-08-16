import axios from 'axios';

const API_URL = 'http://localhost:8000/api/events/';

export const getEvents = () => axios.get(API_URL);
export const createEvent = (event) => axios.post(API_URL, event);
export const updateEvent = (id, event) => axios.put(`${API_URL}${id}/`, event);
export const deleteEvent = (id) => axios.delete(`${API_URL}${id}/`);
