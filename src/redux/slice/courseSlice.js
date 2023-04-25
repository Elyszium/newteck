import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  minPrice: null,
  maxPrice: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    STORE_COURSES(state, action) {
      //   console.log(action.payload);
      state.courses = action.payload.courses;
    },
    GET_PRICE_RANGE(state, action) {
      const { courses } = action.payload;
      const array = [];
      courses.map((course) => {
        const price = course.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_COURSES, GET_PRICE_RANGE } = courseSlice.actions;

export const selectCourses = (state) => state.course.courses;
export const selectMinPrice = (state) => state.course.minPrice;
export const selectMaxPrice = (state) => state.course.maxPrice;

export default courseSlice.reducer;
