import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { count } from "console";

export interface CounterState{
    value: number;
    status: string;
}

const initialState: CounterState={
    value: 0,
    status: '',
} 

const counterSlice=createSlice({
    name: 'counter',
    initialState,
    reducers: { //lấy trạng thái của ứng dụng, thực hiện một hành động và trả về trạng thái mới
        increment: (state)=>{
            state.value+=1; //mutation: gắn data trực tiếp k return
        },
        decrease: (state)=>{
            state.value-=1;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(incrementAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(incrementAsync.fulfilled,(state,action)=>{
            state.status='success';
            state.value+=action.payload;//payload chứa data của hành động
        })
        .addCase(incrementAsync.rejected,(state,action)=>{ //rejected:  action k thành công và state k đổi
            state.status='failed';
        })
    }
})

export const incrementAsync=createAsyncThunk(
    'counter/fetchCount',  //tên action
    async ()=>{
        const count: number= await new Promise((resolve)=>{
            setTimeout(() => {
                resolve(1);
            }, 1000);
    });
    return count;
})
export const {increment, decrease}=counterSlice.actions;//reducer và action gộp lại làm một
export default counterSlice.reducer;