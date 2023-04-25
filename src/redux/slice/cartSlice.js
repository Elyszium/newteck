
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      //   console.log(action.payload);
      const courseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (courseIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        state.cartItems[courseIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempCourse = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempCourse);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      console.log(action.payload);
      const courseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[courseIndex].cartQuantity > 1) {
        state.cartItems[courseIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[courseIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
































// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {

//   cartItems: [],
//   totalAmount: 0,
//   totalQuantity: 0
// }

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action)=>{
//       const newItem = action.payload
//       const existingItem = state.cartItems.find(item => item.id === newItem.id);
//       state.totalQuantity++
//       if(!existingItem){
//         state.cartItems.push({
//           id: newItem.id,
//           courseName: newItem.courseName,
//           imgUrl: newItem.imgUrl,
//           price: newItem.price,
//           quantity: 1,
//           totalPrices: newItem.price
//         })
//       }

//       else{
//         existingItem.quantity++
//         existingItem.totalPrices = Number(existingItem.totalPrices) + Number
//         (newItem.price)
//       }
//       state.totalAmount = state.cartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),0
//         );        
//     },
//     deleteItem:(state, action) =>{
//       const id = action.payload
//       const existingItem = state.cartItems.find(item => item.id === id)
  
//       if(existingItem){
//         state.cartItems = state.cartItems.filter(item => item.id !== id)
//         state.totalQuantity = state.totalQuantity = existingItem.quantity
//       }
//       state.totalAmount = state.cartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),0
//         ); 
//     }
//   }, 
// });

// export const cartActions = cartSlice.actions;
// export default cartSlice.reducer;






