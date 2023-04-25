import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_TYPE,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/slice/filterSlice";
import {
    selectMaxPrice,
    selectMinPrice,
    selectCourses
  } from "../../redux/slice/courseSlice";
  import styles from "../../styles/CourseFilter.module.scss"
 

const CourseFilter = () => {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState(3000);
  const courses = useSelector(selectCourses);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set( courses.map((course) => course.category)),
  ];
  const allType = [
    "All",
    ...new Set( courses.map((course) => course.type)),
  ];
  // console.log(allType);

  useEffect(() => {
    dispatch(FILTER_BY_TYPE({ courses, type }));
  }, [dispatch, courses, type]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ courses, price }));
  }, [dispatch, courses, price]);

  const filterCourses = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ courses, category: cat }));
  };
  const clearFilters = () => {
    setCategory("All");
    setType("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterCourses(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Type</h4>
      <div className={styles.type}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {allType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default CourseFilter