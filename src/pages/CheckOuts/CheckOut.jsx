import { useState } from "react";
import { Container, Row, Col, Form, FormGroup,  } from 'reactstrap';
import CommonSection from '../../components/UI/CommonSection';
import '../../styles/CheckOut.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
// import styles from "../../components/Card/Card.module.scss";
import { useSelector } from 'react-redux';
import { SAVE_BILLING_ADDRESS } from '../../redux/slice/checkoutSlice';

const initialAddressState = {
  name: "",
  email: "",
  phone: "",
  address: "", 
  country: "",
};


const CheckOut = () => {

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout-details");
  };


  return <>
  <CommonSection title='CheckOut'/>

  <section>
    <Container>
      <Row>
        <Col lg='8'>
          <h5 className='mb-4 fw-bold'>Billing Infomation</h5>
          <Form  className='billing__form'>
             {/* <Card cardClass={styles.card}> */}
            <FormGroup className="form__group">
              <input type="text" placeholder='Name'
               required
               name="name"
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
               />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="email" placeholder='Email'
               required
               name="email"
              value={billingAddress.email}
              onChange={(e) => handleBilling(e)}
               />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="number" placeholder='Phone Number'
               required
               name="phone"
               value={billingAddress.phone}
               onChange={(e) => handleBilling(e)}
               />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="text" placeholder='Address'
               name="address"
               value={billingAddress.address}
               onChange={(e) => handleBilling(e)}
               />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="text" placeholder='Country'
               name="country"
               value={billingAddress.country}
               onChange={(e) => handleBilling(e)}
               />
            </FormGroup>
            {/* </Card> */}
          </Form>
        </Col>
        <Col lg='4'>
          <div className="checkout__cart">
            <h5>
              Total Qty: <span>{totalQty} items</span>
            </h5>
            <h5>
              Subtotal: <span>₦ {totalAmount}</span>
            </h5>
            <h3> 
              Total Cost: <span> {totalAmount} </span>
            </h3>
            <button  type="submit" className="buy__btn auth__btn w-100"  onSubmit={handleSubmit}> Proceed To Checkout</button>
          </div>
         
        </Col>
      </Row>
    </Container>
  </section>

  </>
}

export default CheckOut