import React, { useEffect, useState } from "react";
import styles from "../../styles/CoursesList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { FILTER_BY_SEARCH, SORT_COURSES, selectFilteredCourses } from "../../redux/slice/filterSlice";
import CoursesCard from "./CoursesCard";

const CoursesList = ({courses}) => {

  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredCourses = useSelector(selectFilteredCourses);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9);

  // Get Current courses
  const indexOfLastCourse = currentPage *  coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_COURSES({ courses, sort }));
  }, [dispatch, courses, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ courses, search }));
  }, [dispatch, courses, search]);



  return (
    <div className={styles["course-list"]} id="course">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredCourses.length}</b> Course found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Courses */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {courses.lenght === 0 ? (
          <p>No course found.</p>
        ) : (
          <>
            {currentCourses.map((course) => {
              return (
                <div key={course.id}>
                  <CoursesCard {...course} grid={grid} course={course} />
                </div>
              );
            })}
          </>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          coursesPerPage={coursesPerPage}
          totalCourses={filteredCourses.length}
        />
      </div>
    </div>
  );
};

export default CoursesList





// import React from 'react';
// import CoursesCard from './CoursesCard'

// const CoursesList = ({data}) => {
//   return (
//     <>
//         {
//             data?.map((item, index) => (
//                 <CoursesCard item={item} key={index} />
//             ))
//         };       
//     </>
//   ); 
// };

// export default CoursesList