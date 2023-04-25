import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCourses: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const {courses, search } = action.payload;
      const tempCourses =courses.filter(
        (course) =>
         courses.name.toLowerCase().includes(search.toLowerCase()) ||
         courses.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredCourses = tempCourses;
    },
    SORT_COURSES(state, action) {
      const {courses, sort } = action.payload;
      let tempCourses = [];
      if (sort === "latest") {
        tempCourses =courses;
      }

      if (sort === "lowest-price") {
        tempCourses = courses.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempCourses = courses.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempCourses = courses.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempCourses = courses.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredCourses = tempCourses;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { courses, category } = action.payload;
      let tempCourses = [];
      if (category === "All") {
        tempCourses = courses;
      } else {
        tempCourses = courses.filter(
          (course) => course.category === category
        );
      }
      state.filteredCourses = tempCourses;
    },
    FILTER_BY_TYPE(state, action) {
      const { courses, type } = action.payload;
      let tempCourses = [];
      if (type === "All") {
        tempCourses =courses;
      } else {
        tempCourses =courses.filter((course) => course.type === type);
      }
      state.filteredCourses = tempCourses;
    },
    FILTER_BY_PRICE(state, action) {
      const { courses, price } = action.payload;
      let tempCourses = [];
      tempCourses = courses.filter((course) => course.price <= price);

      state.filteredCourses = tempCourses;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_COURSES,
  FILTER_BY_CATEGORY,
  FILTER_BY_TYPE,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredCourses = (state) => state.filter.filteredCourses;

export default filterSlice.reducer;
