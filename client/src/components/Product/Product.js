import React from "react";
import { connect } from "react-redux";
import { addProductForCrowdFund } from "./../../actions/listProduct";

const Product = ({ product, addProductForCrowdFund }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product[0].title}</h5>
        <p className="card-text">{product[0].brand}</p>
        <button
          onClick={() => {
            addProductForCrowdFund(product[0]._id);
          }}
          className="btn btn-success"
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.prod.product,
  };
};

export default connect(mapStateToProps, { addProductForCrowdFund })(Product);
