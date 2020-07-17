import React from "react";
import { connect } from "react-redux";
import { addProductForCrowdFund } from "./../../actions/listProduct";

const Product = ({ product, addProductForCrowdFund }) => {
  const style = {};
  return (
    <>
      <div className="row" style={{ marginTop: "60px" }}>
        <div className="col s5">
          <img
            style={{ height: "500px", width: "100%" }}
            src="https://www.amazon.in/images/I/71vmTAEmPQL._UL1500_.jpg"
            alt="..."
          />
        </div>
        <div className="col s4 ">
          <h4 className="grey-text text-darken-4">{product[0].title}</h4>
          <p style={{ fontSize: "1.5rem" }} className="grey-text">
            {product[0].brand}
          </p>
          <span class="fa fa-star " style={{ color: "orange" }}></span>
          <span class="fa fa-star " style={{ color: "orange" }}></span>
          <span class="fa fa-star " style={{ color: "orange" }}></span>
          <span class="fa fa-star" style={{ color: "orange" }}></span>
          <span class="fa fa-star"></span>
          <i
            class="fa fa-caret-down"
            style={{ marginLeft: "10px" }}
            aria-hidden="true"
          ></i>
          <span style={{ marginLeft: "10px" }} className="blue-text">
            355 ratings
          </span>
          <br />
          <span
            className="blue-text"
            style={{ borderLeft: "2px solid lightgrey", paddingLeft: "10px" }}
          >
            78 answered questions
          </span>
          <hr style={{ borderTop: "1.5px solid lightgrey" }} />
          <span
            className="grey-text text-darken-2 "
            style={{ fontSize: "1.5rem", textDecoration: "line-through" }}
          >
            M.R.P: {product[0].originalPrice}
          </span>
          <br />
          <span
            className="red-text text-darken-2 "
            style={{ fontSize: "1.5rem" }}
          >
            Price: {product[0].sellingPrice}
          </span>
          <br />
          <span
            className="red-text text-darken-2 "
            style={{ fontSize: "1.5rem" }}
          >
            <span
              className="grey-text text-darken-2 "
              style={{ fontSize: "1.4rem" }}
            >
              You save
            </span>{" "}
            Rs.
            {product[0].originalPrice - product[0].sellingPrice}(
            {product[0].discount}%)
          </span>
          <br />
          <br />

          <li>{product[0].descriptionMain}</li>
          <li>{product[0].descriptionSub}</li>
          <li>{product[0].descriptionSmall}</li>

          <button
            onClick={() => {
              addProductForCrowdFund(product[0]._id);
            }}
            className="btn"
            style={{ marginTop: "8%" }}
          >
            Add Item
          </button>
        </div>

        <div className="col s3"></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.prod.product,
  };
};

export default connect(mapStateToProps, { addProductForCrowdFund })(Product);
