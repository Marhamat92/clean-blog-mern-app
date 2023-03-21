import axios from 'axios';

const API_URL = '/post/'

//create post 
const createPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}create`, post, config)

  if (response.data) {
    return response.data
  }
}

const getPosts = async (posts, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const response = await axios.get(`${API_URL}list`, config)


  return response.data

}

const postsService = {
  createPost,
  getPosts
}



export default postsService