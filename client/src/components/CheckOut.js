import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAlert } from "../actions/alert";

const CheckOut = (props) => {
  const [product, setProduct] = useState({
    name: "Round Tshirt",
    price: 29,
    productBy: "Jockey",
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:9122/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response: ", response);
        const { status } = response;

        if (status === 200) {
          props.dispatch({
            type: "SUCCESS_PAYMENT",
          });
          props.history.push("/profile");
          props.setAlert("Payment Successful", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StripeCheckout
      stripeKey="pk_test_jVRMGELoDklS8VslpjW8El6h00J2QSoyyI"
      token={makePayment}
      name="Buy"
    />
  );
};

export default withRouter(connect(null, { setAlert })(CheckOut));
