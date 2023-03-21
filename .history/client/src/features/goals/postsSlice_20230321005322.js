import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postsService from './postsService'

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

//create post
export const createPostSlice = createAsyncThunk('post/create',
  async (post, thunkAPI) => {
    try {
      return postsService.createPost(post)
    } catch (error) {
      const message =
        (
          error.message &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)