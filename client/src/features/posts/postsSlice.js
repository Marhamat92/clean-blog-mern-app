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
      const token = thunkAPI.getState().auth.user.token
      return await postsService.createPost(post, token)
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

export const getPostsSlice = createAsyncThunk('posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postsService.getPosts(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => state.initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createPostSlice.pending, (state) => {
          state.isLoading = true
        })
      .addCase(
        createPostSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.posts.push(action.payload)
        }
      )
      .addCase(
        createPostSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
          state.message = action.payload
        }
      )
      .addCase(
        getPostsSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getPostsSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.posts = action.payload
        }
      )
      .addCase(
        getPostsSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )

  }
})





export const { reset } = postSlice.actions
export default postSlice.reducer