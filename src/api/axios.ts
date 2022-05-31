import axiosDefault from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const axios = axiosDefault.create({
  baseURL: BASE_URL,
});