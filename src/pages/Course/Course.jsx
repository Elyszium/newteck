import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectCourses,
  STORE_COURSES,
} from "../../redux/slice/courseSlice";
import styles from "../../styles/Course.module.scss";
import CourseFilter from "../../components/UI/CourseFilter";
import CoursesList from "../../components/UI/CoursesList";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Course = () => {
  const { data, isLoading } = useFetchCollection("courses");
  const [showFilter, setShowFilter] = useState(false);
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_COURSES({
       courses: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
       courses: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.courses}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <CourseFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <CoursesList courses={courses} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;


























// import React, {useState, useEffect} from 'react';
// import CommonSection from '../../components/UI/CommonSection';
// import { Container, Row, Col } from 'reactstrap';
// import CoursesList from '../../components/UI/CoursesList'
// import '../../styles/Course.css';
// import useGetData from '../../customHooks/useGetData';



// const Course = () => {

//   const [coursesData, setCoursesData] = useState([]) ;
  

//   const {data: courses, loading} = useGetData('courses')

//   // const [trendingCourses, setTrendingCourses] = useState([]);

//   useEffect(()=>{
//     const filteredCoursesData = courses.filter((item) => item.category  
//     );
//     setCoursesData(filteredCoursesData)
//   }, [courses]);





//   const handleFilter = e => {    
//     const filterValue = e.target.value;
//     if(filterValue === 'mobile'){
//       const filteredCourses = courses.filter(item => item.category === 'mobile')
//       setCoursesData(filteredCourses)
//     }
//     if(filterValue === 'web'){
//       const filteredCourses = courses.filter(item => item.category === 'web')
//       setCoursesData(filteredCourses)
//     }
//     if(filterValue === 'uiux'){
//       const filteredCourses = courses.filter(item => item.category === 'uiux')
//       setCoursesData(filteredCourses)
//     }   
//      if(filterValue === 'fullstack'){
//       const filteredCourses = courses.filter(item => item.category === 'fullstack')
//       setCoursesData(filteredCourses)
//     }
//     if(filterValue === 'graphic'){
//       const filteredCourses = courses.filter(item => item.category === 'graphic')
//       setCoursesData(filteredCourses)
//     }
//     if(filterValue === 'ios'){
//       const filteredCourses = courses.filter(item => item.category === 'ios')
//       setCoursesData(filteredCourses)
//     }   
//     if(filterValue === 'net'){
//       const filteredCourses = courses.filter(item => item.category === 'net')
//       setCoursesData(filteredCourses)
//     }   
//   };

//   const handleSearch = e => {
//     const searchCourses = e.target.value
    
//     const searchedCourses = courses.filter(item => item.courseName
//       .toLowerCase().includes(searchCourses.toLowerCase()))

//     setCoursesData(searchedCourses)
//   }


//   return <>

//     <CommonSection  title='Courses'/>

//     <section>
//       <Container>
//         <Row > 
//           <Col lg='3' md='6'>
//             <div className="filter__widget">
//               <select onChange={handleFilter}>
//                 <option value="">Categories</option>
//                 <option value="mobile">Mobile Apps</option>
//                 <option value="web">Web Site</option>
//                 <option value="ios">IOS</option>   
//                 <option value="ui">UI/UX</option>
//                 <option value="fullstack">Full Stack</option>
//                 <option value="graphic">Graphic Design</option>              
//               </select>
//             </div>
//           </Col>
//           <Col lg='3' md='6' className='text-end'>
//           <div className="filter__widget">
//               <select>
//               <option value="">Sort By</option>
//                 <option value="ascending">Ascending</option>
//                 <option value="descending">Descending</option>
//               </select>
//             </div>
//           </Col>
//           <Col lg='6' md='12'>
//             <div className="search__box">
//               <input type="text" placeholder='Search......' onChange={handleSearch} />
//               <span>
//                 <i class='ri-search-line'></i>
//               </span>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>

//     <section className='pt-0'>
//       <Container>
//         <Col>
//           <Row>          

//           {/* {
//           loading ? <h5 className='fw-bold'>Loading.....</h5>:
//           <CoursesList data={coursesData} />
//           } */}
//             {
//               coursesData.length === 0? (
//               loading ? <h5 className='fw-bold'>Loading.....</h5>: 
//                <h1 className='text-center fs-4'>No Courses are found!</h1>
//               ): <CoursesList data={coursesData} />
//             }
//           </Row>
//         </Col>
//       </Container>
//     </section>
//   </>
// };

// export default Course