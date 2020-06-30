import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getProducts } from "./../../actions/product";
import Spinner from "./../Main/Spinner";
import ProductCard from "./ProductCard";

const ProductList = ({ getProducts, products }) => {
  useEffect(() => {
    getProducts();
    console.log("/component/product 08: ", products);
  }, []);

  return (
    <div>
      {!products.products && <Spinner />}
      {products.products
        ? products.products.map((product, index) => {
            return (
              <ProductCard product={product} key={product._id} index={index} />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.prod,
  };
};

export default connect(mapStateToProps, { getProducts })(ProductList);
