import React from "react";
import Blink from 'react-blink-text';

const messageStyle = {
  position: "fixed",
  top: "200px",
  left: "100px",
  backgroundColor: "lightblue",
  margin: "40px",
  border: "4px dotted black",
  padding: "15px"
}

    

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blocked: false};
  }

  componentDidMount(){
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
    console.log('mounted content ljg !');

    let ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        bKey = 66;

    document.addEventListener("keydown", ev => {
      console.log('key down !');
      if (ev.keyCode == ctrlKey || ev.keyCode == cmdKey) 
        {
        ctrlDown = true;
        }
    });
    document.addEventListener("keyup", ev => {
      if (ev.keyCode == ctrlKey || ev.keyCode == cmdKey) 
        {
        ctrlDown = false;
        } 
    });
    document.addEventListener("keydown", ev => {
      if (ctrlDown && (ev.keyCode == bKey)) {
        console.log("Document catch Ctrl+B");
        this.setState({
          blocked: true
        });
      }
    });
  }

  block_site(site) {
    let site_list_str = localStorage.getItem("blocked_sites") || '[]';
    let site_list = JSON.parse(site_list_str);
    site_list.push(site);
    localStorage.setItem("blocked_sites", JSON.stringify(site_list));
  }

  render() {
    console.log('render');
    let {blocked} = this.state,
    site = window.location.hostname,
    message = "Pages from " + site + " will be blocked";
    if (blocked) {
      return( 
        <div className="page-blocker-message" style={messageStyle}>
        <Blink color='Black'
        text={message} 
        fontSize='30px'/>
      </div>);
    } else {
      return null;
    }
  }
}
