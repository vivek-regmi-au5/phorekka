import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getProducts, filterProducts } from "./../../actions/product";
import Spinner from "./../Main/Spinner";
import ProductCard from "./ProductCard";

const ProductList = ({ getProducts, products, filterProducts }) => {
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

  return (
    <div>
      {products.products && (
        <div>
          <label class="radio-inline">
            <input
              type="radio"
              value="men"
              checked={genderFilter === "men"}
              name="radio1"
              onChange={() => {
                setGenderFilter("men");
              }}
              name="radio1"
            />
            men
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              value="men"
              name="radio1"
              checked={genderFilter === "women"}
              onChange={() => {
                setGenderFilter("women");
              }}
            />
            women
          </label>
        </div>
      )}
      {!products.products && <Spinner />}
      <div className="row">
        <div className="col-4">
          <button
            onClick={() => {
              setCatogoryFilter("clothing");
            }}
            className="btn btn-outline-danger btn-block mb-1"
          >
            Clothing
          </button>{" "}
          <br />
          <button
            onClick={() => {
              setCatogoryFilter("footware");
            }}
            className="btn btn-outline-danger btn-block mb-1"
          >
            Footwear
          </button>
          <br />
          <button
            onClick={() => {
              setCatogoryFilter("electronics");
            }}
            className="btn btn-outline-danger btn-block mb-1"
          >
            Electronics
          </button>
          <br />
          <button
            onClick={() => {
              setCatogoryFilter("accessories");
            }}
            className="btn btn-outline-danger btn-block mb-1"
          >
            Accessories
          </button>
          <br />
          <button
            onClick={() => {
              setCatogoryFilter("beauty");
            }}
            className="btn btn-outline-danger btn-block mb-1"
          >
            Beauty
          </button>
        </div>
        <div className="col-8">
          {products.products &&
          !products.genderFilter &&
          !products.categoryFilter
            ? products.products.map((product, index) => {
                return (
                  <div className="row">
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
                  <div>
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
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.prod,
  };
};

export default connect(mapStateToProps, {
  getProducts,
  filterProducts,
})(ProductList);
