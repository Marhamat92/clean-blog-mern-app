import axios from 'axios';

const API_URL = 'http://localhost:5000/post/'

//create post 
const createPost = async (post) => {
  const response = await axios.post(`${API_URL}create`, post)

  if (response.data) {
    return response.data
  }
}

const postsService = {
  createPost
}

export default postsService