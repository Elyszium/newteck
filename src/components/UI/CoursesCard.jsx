
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";
import Card from "../Card/Card";
import styles from "../../styles/CourseCard.module.scss";

const CoursesCard = ({ course, id, grid, courseName, category, price, desc, imgUrl }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imgUrl} alt={courseName} />
          <span >{category}</span>
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(courseName, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(course)}
        >
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default CoursesCard;



// import React from 'react';
// import { motion } from 'framer-motion';
// import '../../styles/CoursesCard.css';
// import { Col } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useDispatch } from 'react-redux';
// import { 
//   ADD_TO_CART,
//   CALCULATE_TOTAL_QUANTITY,
//    } from '../../redux/slice/cartSlice';

// const CoursesCard = ({course, id, grid, courseName, category, price, imgUrl}) => {

//   const dispatch = useDispatch();
//   const shortenText = (text, n) => {
//     if (text.length > n) {
//       const shortenedText = text.substring(0, n).concat("...");
//       return shortenedText;
//     }
//     return text;
//   };

//   // const _id = courses.title;
//   // console.log(_id);

//   // const handleDetails = () =>{
//   //   console.log("details")
//   // }

//   const addToCart = (course) => {
//     dispatch(ADD_TO_CART(course));
//     dispatch(CALCULATE_TOTAL_QUANTITY());   
  
//     toast.success('Course Added Sucessfully')
//   };  

//   return (
//     <Col lg='3' md='4' className='mb-2 '>
//     <motion.div
//          whileHover={{scale: 1.1}}
//         className="Course__item-card"
//       >
//     <div className='course__item'>
//       {/* <div onClick={handleDetails} className=""> */}
//         <div  className="course__img">
//         <Link to={`/course/${id}`}>
//             <motion.img whileHover={{scale: 0.9}} className='img'
//              src={imgUrl} alt="" />
//         </Link>
//         </div>
//       {/* </div>  */}
        
//         <div className="p-2 course__info">
//         <h3 className="course__name">
//            <span>{courseName}</span> 
//         </h3>
//         <span >{category}</span>
//         </div>
//         <div className="course__card-bottom d-flex align-items-center justify-content-between p-2" >
//             <span className="price"> ₦{price} </span>
//             <h4>{shortenText(courseName, 18)}</h4>
//         </div>
//         {/* {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>} */}

//         <motion.span whileTap={{scale: 1.2}}
//           className="--btn --btn-danger"
//           onClick={() => addToCart(course)}
//         >
//             <i class="ri-add-line"></i>Add To Cart
//           </motion.span>

//             {/* <motion.span whileTap={{scale: 1.2}} onClick={addToCart}>
//                 <i class="ri-add-line"></i>
//             </motion.span> */}
//         </div>
       
//     </motion.div>
//     </Col>    
//   )
// }

// export default CoursesCard