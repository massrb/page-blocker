import React from "react";
import ReactDOM from "react-dom";
import Index from "./components";

console.log("loaded App for popup");
chrome.extension.getBackgroundPage().console.log('Loaded popup notification');


const Element = document.createElement("div");
Element.setAttribute("id", "dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf");
document.body.appendChild(Element);
ReactDOM.render(
  <Index />,
  document.getElementById("dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf")
);
