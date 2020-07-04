import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addProductForCrowdFund,
  productDetail,
} from "./../../actions/listProduct";

const ProductCard = ({
  product,
  productDetail,
  addProductForCrowdFund,
  history,
  index,
}) => {
  return (
    <div>
      <div className="card mb-3" style={{ width: "100%" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src="https://dilavr.com.ua/image/catalog/empty-img.png"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.category}</p>
              <p className="card-text">
                <small className="text-muted">{product.brand}</small>
              </p>
            </div>
            <button
              onClick={() => {
                productDetail(index);
                history.push("/product/item");
              }}
              className="btn btn-primary"
            >
              View product
            </button>
            <button
              onClick={() => {
                addProductForCrowdFund(product._id);
              }}
              className="btn btn-success"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(
  connect(null, { addProductForCrowdFund, productDetail })(ProductCard)
);
