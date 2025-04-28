import {  createSlice } from '@reduxjs/toolkit';

const cartSlice=createSlice({
name:'cart',
initialState:{
    items:[],
} ,
reducers:{
    addtocart:(state,action)=>{
        const item=(action.payload)
        const existing=state.items.find(i=>i.id===item.id)
        if(existing){
           existing.quantity+=Number(item.quantity)||1
        }else{
            state.items.push({...item,quantity: Number(item.quantity) || 1})
        }
    },
    removefromcart:(state,action)=>{
    state.items=state.items.filter(item=>item.id!==action.payload)
},
    updatequantity:(state,action)=>{
        const {id,quantity}=action.payload;
        const item=state.items.find(i=>i.id===id)
        if(item){
            item.quantity=quantity
        }
    },
    clearcart:(state)=>{
        state.items=[]
    }
}



})
export const {addtocart,removefromcart,updatequantity,clearcart} =cartSlice.actions;
export default cartSlice.reducer;
