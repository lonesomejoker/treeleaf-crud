import { createSlice } from "@reduxjs/toolkit";

const pageSlice=createSlice({
    name:'pageslice',
    initialState:{
        datas:[],
        dataPerPage:5,
        currentPage:1,
    },

    reducers:{
        onNavigateNext:(state)=>{
            state.currentPage++;
        },
        onNavigatePrev:(state)=>{
            state.currentPage--;
        },
        onClickCurrentPage:(state,action)=>{
            state.currentPage=action.payload;
        },
        onChangeDataPerpage:(state,action)=>{
            state.dataPerPage=action.payload;
        },
    }
})

export const {onClickCurrentPage,onNavigateNext,onNavigatePrev,onChangeDataPerpage}=pageSlice.actions;
export const pageReducer=pageSlice.reducer;