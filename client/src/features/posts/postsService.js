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

const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  const response = await axios.get(`${API_URL}list`, config)
  return response.data
}

const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + postId, config)

  return response.data
}



const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + postId, config)
  return response.data
}


const updatePost = async (postId, post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + postId, post, config)
  return response.data
}









const postsService = {
  createPost,
  getPosts,
  deletePost,
  getPost,
  updatePost
}






export default postsService