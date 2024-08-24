import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};

export const listSlice = createSlice({
  name: "listslice",
  initialState,
  reducers: {
    listData: (state, action) => {
      // Ensure state.list is always an array
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const newItem = action.payload;
      state.list.push(newItem);
  
    },

    removeUser: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    clearList:(state,action)=>{
      state.list="";
    },

    editItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
      }
    },
    
     
  }
});

export const { listData, removeUser,clearList,editItem } =listSlice.actions;
export const listReducer= listSlice.reducer;