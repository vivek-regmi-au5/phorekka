import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addProductForCrowdFund,
  productDetail,
} from "./../../actions/listProduct";
import { setAlert } from "./../../actions/alert";
import Radium from "radium";

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
    <div className="card" style={{ maxWidth: "100%" }}>
      <div className="card-image waves-effect waves-block waves-light">
        <img
          style={{ height: "300px", width: "100%" }}
          src={product.images[0]}
          className="activator"
          alt="..."
        />
      </div>
      <div className="card-content">
        <span class="card-title activator grey-text text-darken-4">
          {product.title}
          <i class="material-icons right">more_vert</i>
        </span>
        <p>{product.brand}</p>
      </div>
      <div className="card-action">
        <a
          style={{ ":hover": { cursor: "pointer" } }}
          onClick={() => {
            productDetail(product._id);
            history.push("/product/item");
          }}
        >
          View
        </a>
        {isAuthenticated && !profile && (
          <a
            onClick={async () => {
              setAlert("Create a CrowdFunding profile to add items", "warning");
            }}
          >
            Add
          </a>
        )}
        {isAuthenticated && profile && (
          <a
            onClick={async () => {
              addProductForCrowdFund(product._id, profile._id);
              setAlert("Product has been added suucessfully", "success");
            }}
          >
            Add
          </a>
        )}
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {product.title}
          <i className="material-icons right">close</i>
        </span>
        <p>
          <p>{product.descriptionMain}</p>
          Here is some more information about this product that is only revealed
          once clicked on.
        </p>
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
  connect(mapStateToProps, {
    addProductForCrowdFund,
    productDetail,
    setAlert,
  })(Radium(ProductCard))
);
