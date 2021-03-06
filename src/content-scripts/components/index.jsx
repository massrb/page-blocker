import React from "react";
import Blink from 'react-blink-text';
import SiteTracker from '../../lib/sitetracker.js';

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
    this.state = {blocked: false, previously_blocked: false};
    this.blockSite = this.blockSite.bind(this);
    this.site = window.location.hostname;
  }

  componentDidMount(){

    let that = this;
    if (SiteTracker.isBlocked(this.site).then(blocked => {
      that.setState({previously_blocked: blocked});
    }));

    let ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        bKey = 66;

    document.addEventListener("keydown", ev => {
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

  blockSite(site) {
    console.log("block_site()");
    let delay = 0;
    if (!this.state.previously_blocked) {
      delay = 5000;
      SiteTracker.blockSite(site);
    }

    setTimeout(function() { 
      chrome.runtime.sendMessage({closeThis: true}); 
    }, delay);
  }

  render() {
    let {previously_blocked, blocked} = this.state,
    message = "Pages from " + this.site + " will be blocked";
    if (blocked || previously_blocked) {
      this.blockSite(this.site);
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
