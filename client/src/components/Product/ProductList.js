import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getProducts, filterProducts } from "./../../actions/product";
import Spinner from "./../Main/Spinner";
import ProductCard from "./ProductCard";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ProductList = ({ getProducts, products, filterProducts, alert }) => {
  const [genderFilter, setGenderFilter] = useState(null);
  const [categoryFilter, setCatogoryFilter] = useState(null);

  useEffect(() => {
    getProducts();
    console.log("/component/product 08: ", products);
  }, []);

  useEffect(() => {
    console.log("gender: ", genderFilter);
    filterProducts(genderFilter, categoryFilter);
  }, [genderFilter]);

  useEffect(() => {
    console.log("categoryFilter", categoryFilter);
    filterProducts(genderFilter, categoryFilter);
  }, [categoryFilter]);

  const categoryStyles = {
    margin: "3px",
    marginLeft: "10%",
  };

  return (
    <Fragment>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col s3">
          <h4>Explore</h4>
        </div>
        <div className="col s3">
          <h4>All</h4>
        </div>
        <div className="col s3">
          <Tabs
            style={{
              marginTop: "17px",
              backgroundColor: "#e9eef2",
              borderRadius: "10px",
              width: "93%",
            }}
          >
            <Tab
              label="Men"
              style={{ border: "1px solid lightgray", width: "30px" }}
              onClick={() => {
                setGenderFilter("men");
              }}
            />
            <Tab
              label="Women"
              style={{ border: "1px solid lightgray" }}
              onClick={() => {
                setGenderFilter("women");
              }}
            />
          </Tabs>
        </div>
        <div className="col s3"></div>
      </div>
      <div className="row">
        {alert.msg && (
          <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
        )}

        {!products.products && <Spinner />}
        <div className="row">
          <div className="col s3">
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("electronics");
              }}
            >
              <i class="material-icons" style={{ fontSize: "1rem" }}>
                flash_on
              </i>
              All
            </p>
            <br />
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("clothing");
              }}
            >
              <i class="fa fa-tshirt"></i>
              Clothing
            </p>{" "}
            <br />
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("footware");
              }}
            >
              <i class="fa fa-bolt"></i>
              Footwear
            </p>
            <br />
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("electronics");
              }}
            >
              <i class="fa fa-bolt"></i>
              Electronics
            </p>
            <br />
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("accessories");
              }}
            >
              <i class="fa fa-bolt"></i>
              Accessories
            </p>
            <br />
            <p
              style={categoryStyles}
              onClick={() => {
                setCatogoryFilter("beauty");
              }}
            >
              <i class="fa fa-bolt"></i>
              Beauty
            </p>
          </div>
          <div className="col s9">
            <div className="row">
              {products.products &&
              !products.genderFilter &&
              !products.categoryFilter
                ? products.products.map((product, index) => {
                    return (
                      <div className="col s4">
                        <ProductCard
                          product={product}
                          key={product._id}
                          index={index}
                        />
                      </div>
                    );
                  })
                : null}

              {products.products &&
              (products.genderFilter || products.categoryFilter)
                ? products.filteredProducts.map((product, index) => {
                    return (
                      <div className="col s4">
                        <ProductCard
                          product={product}
                          key={product._id}
                          index={index}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.prod,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, {
  getProducts,
  filterProducts,
})(ProductList);
