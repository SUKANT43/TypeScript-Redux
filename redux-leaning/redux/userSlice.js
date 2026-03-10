import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5300/users";

export const fetchUsers=createAsyncThunk("users/fetch",async()=>{
    const res=await axios.get(API);
    return res.data;
});

export const addUser=createAsyncThunk("users/add",async(users)=>{
    const res=await axios.post(API,users);
    return res.data.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
});


export const updateUser = createAsyncThunk("users/update", async (user) => {
    const res = await axios.put(`${API}/${user.id}`, user);
    return res.data.data;
});



const userSlice=createSlice({
name:"users",
initialState:{
    list:[],
    loading:false,
    error:null
},
reducers:{},
extraReducers:(builder)=>{
    builder
    .addCase(fetchUsers.pending,(state)=>{
        state.loading = true;
    })
    .addCase(fetchUsers.fulfilled,(state,action)=>{
        state.loading = false;
        state.list = action.payload;
    })
    .addCase(fetchUsers.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })

        .addCase(addUser.fulfilled, (state, action) => {
            state.list.push(action.payload);
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.list = state.list.filter(u => u.id !== action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const index = state.list.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        });


}

});

export default userSlice.reducer;




import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5300/users";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  list: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  list: [],
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetch",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

export const addUser = createAsyncThunk<User, User>(
  "users/add",
  async (users) => {
    const res = await axios.post(API, users);
    return res.data.data;
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  "users/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/update",
  async (user) => {
    const res = await axios.put(`${API}/${user.id}`, user);
    return res.data.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.list.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      });
  }
});

export default userSlice.reducer;
