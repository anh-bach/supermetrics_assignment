import axios from 'axios';
//get posts from user's token
export const getPosts = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
    params: {
      sl_token: token,
      page: 2,
    },
  });
};
