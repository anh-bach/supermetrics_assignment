import axios from 'axios';
//get user token
export const login = async ({ name, email }) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
    client_id: process.env.REACT_APP_API_CLIENT_ID,
    email,
    name,
  });
};
