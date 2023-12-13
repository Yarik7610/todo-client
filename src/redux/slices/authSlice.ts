import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { instance } from '../../api/axios'

export interface IAuthForm {
  nickname: string
  password: string
}

interface IReturnedReg {
  message: string
}

interface IReturnedLog {
  token: string
  nickname: string
}

interface IReturnedMe {
  token: string
  nickname: string
  message: string
}

interface IAuthSlice {
  nickname: string | null
  token: string | null
  isLoading: boolean
  statusMsg: string | null
  error: SerializedError | null
}

const initialState: IAuthSlice = {
  nickname: null,
  token: window.localStorage.getItem('token'),
  isLoading: false,
  statusMsg: null,
  error: null
}

export const registerUser = createAsyncThunk<IReturnedReg, IAuthForm>(
  'auth/register',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<IReturnedReg>('/auth/registration', params)
      return data
    } catch (e: any) {
      return rejectWithValue(e.response.data.message) //e.response.data == action.payload
    }
  }
)

export const loginUser = createAsyncThunk<IReturnedLog, IAuthForm>(
  'auth/login',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<IReturnedLog>('/auth/login', params)
      return data
    } catch (e: any) {
      return rejectWithValue(e.response.data.message)
    }
  }
)

export const me = createAsyncThunk<IReturnedMe>('auth/me', async () => {
  const { data } = await instance.get<IReturnedMe>('/auth/me')
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.nickname = null
      state.token = null
      window.localStorage.removeItem('token')
    },
    resetStatusMsg: (state) => {
      state.statusMsg = null
    }
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload.message
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload as string
        state.error = action.error
      })
      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.nickname = action.payload.nickname
        state.token = action.payload.token
        window.localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload as string
        state.error = action.error
      })
      //Me
      .addCase(me.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.nickname = action.payload.nickname
        state.token = action.payload.token
        window.localStorage.setItem('token', action.payload.token)
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
        state.token = null
      })
  }
})

export const { logout, resetStatusMsg } = authSlice.actions
export default authSlice.reducer
