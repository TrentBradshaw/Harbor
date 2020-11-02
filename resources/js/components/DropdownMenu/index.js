import React from "react";
import ReactDOM from "react-dom";
import ButtonWithDropDown from "./buttonDropDownCmp";

function App() {
  return <ButtonWithDropDown />;
}

const rootElement = document.getElementById("Header");
ReactDOM.render(<App />, rootElement);
