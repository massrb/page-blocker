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

function get_blocked_sites() {
  let site_list_str = localStorage.getItem("blocked_sites") || '[]';
  let site_list = JSON.parse(site_list_str);
  return site_list;
}

function save_blocked_sites(sites) {
  localStorage.setItem("blocked_sites", JSON.stringify(sites));
}

function isBlocked(site) {
  let sites = get_blocked_sites();
  return sites.includes(site);
}
    

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blocked: false, previously_blocked: false};
    this.block_site = this.block_site.bind(this);
    this.site = window.location.hostname;
  }

  componentDidMount(){
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
    console.log('mounted content ljg !');

    if (isBlocked(this.site)) {
      this.setState({previously_blocked: true});
    }

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

  block_site(site) {
    console.log("block_site()");
    let site_list = get_blocked_sites();
    let delay = this.state.previously_blocked ? 0 : 5000;
    site_list.push(site);
    save_blocked_sites(site_list);

    setTimeout(function() { 
      chrome.runtime.sendMessage({closeThis: true}); 
    }, delay);
  }

  render() {
    console.log('render');
    let {previously_blocked, blocked} = this.state,
    message = "Pages from " + this.site + " will be blocked";
    if (blocked || previously_blocked) {
      console.log('call block_site()');
      this.block_site(this.site);
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
