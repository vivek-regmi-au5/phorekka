import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { deleteCrowdFundedItem } from "./../actions/profile";

const CheckOut = (props) => {
  console.log("props at checkout", props);
  const [product, setProduct] = useState({
    name: props.item.productId.title,
    price: parseInt(props.item.productId.sellingPrice),
    productBy: props.item.productId.brand,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    console.log(props);

    return fetch("http://localhost:9122/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response: ", response);
        const { status } = response;

        if (response.status === 200) {
          props.history.push("/profile");
          props.setAlert("Payment Successful", "success");
          props.deleteCrowdFundedItem(
            props.item.productId._id,
            props.item.profileId._id
          );
          props.forceUpdate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StripeCheckout
      stripeKey="pk_test_51GDl42GbPn0OKeQiL3ARz4wElDyEAmisO00VkxJS8dneun7WBEDpKIhQMDOJ2YlYe3k9zjIPFHZ2KJWowgERumJQ00tJKt52nl"
      token={makePayment}
      name="Buy"
    />
  );
};

export default withRouter(
  connect(null, { setAlert, deleteCrowdFundedItem })(CheckOut)
);
