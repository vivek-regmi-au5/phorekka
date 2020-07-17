import React from "react";
import Header from "./Main/Header";
import Footer from "./Main/Footer";

function App(props) {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "92vh" }}>{props.children}</div>
      <Footer />
    </div>
  );
}

export default App;
