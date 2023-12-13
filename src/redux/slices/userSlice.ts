import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { instance } from '../../api/axios'

const getTheme = () => {
  return localStorage.getItem('theme')! as TypeThemeColor
}
export interface ITask {
  _id: string
  title: string
  isDone: boolean
  description: string
  date: string
  images: Array<String>
}
export type FilterValuesType = 'All' | 'Completed' | 'Active'

export interface ITodolist {
  filter: FilterValuesType
  title: string
  _id: string
  tasks: Array<ITask>
}

interface IUpdateTodo {
  _id: string
  title: string
}

interface IChangeFilter {
  _id: string
  filter: FilterValuesType
}

interface IAddTask {
  todoId: string
  title: string
  isDone: boolean
}
type TReturnedAddTask = ITask & {
  todoId: string
}
type IReturnedPatchTask = {
  taskId: string
  todoId: string
  title: string
  isDone: boolean
  description: string
  date: string
  images: Array<String>
}
interface IPatchTask {
  taskId: string
  todoId: string
  formData: FormData
}
interface IDeleteTask {
  taskId: string
  todoId: string
}

export type TypeThemeColor = 'white' | 'dark'
interface IUserSlice {
  todolists: Array<ITodolist>
  isLoading: boolean
  error: SerializedError | null
  theme: TypeThemeColor
  query: string
}
const initialState: IUserSlice = {
  todolists: [],
  isLoading: false,
  error: null,
  theme: getTheme(),
  query: ''
}

export const getTodos = createAsyncThunk<Array<ITodolist>>('user/getTodos', async () => {
  const { data } = await instance.get<Array<ITodolist>>('/user/todos')
  return data
})

export const addTodo = createAsyncThunk<ITodolist, string>('user/addTodo', async (title) => {
  const { data } = await instance.post<ITodolist>('/user/todos', { title })
  return data
})

export const deleteTodo = createAsyncThunk('user/deleteTodo', async (id: string) => {
  const { data } = await instance.delete(`/user/todos/${id}`)
  return data
})

export const updateTodo = createAsyncThunk<IUpdateTodo, IUpdateTodo>(
  'user/updateTodo',
  async (params) => {
    const { data } = await instance.patch(`/user/todos/${params._id}`, { title: params.title })
    return data
  }
)

export const changeFilter = createAsyncThunk<IChangeFilter, IChangeFilter>(
  'user/changeFilter',
  async (params) => {
    const { data } = await instance.put(`/user/todos/${params._id}`, { filter: params.filter })
    return data
  }
)

export const addTask = createAsyncThunk<TReturnedAddTask, IAddTask>(
  'user/addTask',
  async (params) => {
    const { data } = await instance.post(`/user/todos/${params.todoId}`, {
      title: params.title,
      isDone: params.isDone
    })
    return data
  }
)
export const patchTask = createAsyncThunk<IReturnedPatchTask, IPatchTask>(
  'user/patchTask',
  async (params) => {
    const { data } = await instance.patch(
      `user/todos/${params.todoId}/tasks/${params.taskId}`,
      params.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return data
  }
)

export const deleteTask = createAsyncThunk<IDeleteTask, IDeleteTask>(
  'user/deleteTask',
  async (params) => {
    const { data } = await instance.delete(`user/todos/${params.todoId}/tasks/${params.taskId}`)
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      localStorage.setItem('theme', action.payload)
      state.theme = action.payload
    },
    setTodoQuery: (state, action) => {
      state.query = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //getTodos
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todolists = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //addTodo
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todolists.push(action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //deleteTodo
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todolists = state.todolists.filter((tl) => tl._id !== action.payload._id)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        let foundTodo = state.todolists.find((tl) => tl._id === action.payload._id)
        if (foundTodo) foundTodo.title = action.payload.title
        state.isLoading = false
        state.error = null
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //changeFilter
      .addCase(changeFilter.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(changeFilter.fulfilled, (state, action) => {
        let foundTodo = state.todolists.find((tl) => tl._id === action.payload._id)
        if (foundTodo) foundTodo.filter = action.payload.filter
        state.isLoading = false
        state.error = null
      })
      .addCase(changeFilter.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //addTask
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        let foundTodo = state.todolists.find((tl) => tl._id === action.payload.todoId)
        if (foundTodo)
          foundTodo.tasks.push({
            title: action.payload.title,
            isDone: action.payload.isDone,
            _id: action.payload._id,
            description: action.payload.description,
            date: action.payload.date,
            images: action.payload.images
          })
        state.isLoading = false
        state.error = null
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //patchTask
      .addCase(patchTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(patchTask.fulfilled, (state, action) => {
        let foundTodo = state.todolists.find((tl) => tl._id === action.payload.todoId)
        if (foundTodo) {
          const foundTask = foundTodo.tasks.find((t) => t._id === action.payload.taskId)
          if (foundTask) {
            foundTask.isDone = action.payload.isDone
            foundTask.title = action.payload.title
            foundTask.description = action.payload.description
            foundTask.date = action.payload.date
            foundTask.images = action.payload.images
          }
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(patchTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      //deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        let foundTodo = state.todolists.find((tl) => tl._id === action.payload.todoId)
        if (foundTodo) {
          foundTodo.tasks = foundTodo.tasks.filter((t) => t._id !== action.payload.taskId)
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})
export const { changeTheme, setTodoQuery } = userSlice.actions
export default userSlice.reducer
