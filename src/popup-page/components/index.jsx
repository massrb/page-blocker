import React from "react";

const extensionContainer = {
  width: "200px"
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    chrome.extension.getBackgroundPage().console.log('foo');
    console.log('mounted ljg');
  }

  render() {
    return <div style={extensionContainer}>my extension LJG</div>;
  }
}
