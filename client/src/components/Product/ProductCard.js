import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addProductForCrowdFund,
  productDetail,
} from "./../../actions/listProduct";
import { setAlert } from "./../../actions/alert";

const ProductCard = ({
  product,
  productDetail,
  addProductForCrowdFund,
  history,
  setAlert,
  isAuthenticated,
  profile,
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
                productDetail(product._id);
                history.push("/product/item");
              }}
              className="btn btn-primary"
            >
              View product
            </button>
            {isAuthenticated && !profile && (
              <button
                onClick={async () => {
                  setAlert(
                    "Create a CrowdFunding profile to add items",
                    "warning"
                  );
                }}
                className="btn btn-success"
              >
                Add Item
              </button>
            )}
            {isAuthenticated && profile && (
              <button
                onClick={async () => {
                  addProductForCrowdFund(product._id, profile._id);
                  setAlert("Product has been added suucessfully", "success");
                }}
                className="btn btn-success"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.prof.profile,
  };
};

export default withRouter(
  connect(mapStateToProps, { addProductForCrowdFund, productDetail, setAlert })(
    ProductCard
  )
);
