import React from "react";
import Select from 'react-select';

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
    let list_str = localStorage.getItem("blocked_sites") || '[]';
    console.log("sites:", list_str);
    let options = JSON.parse(list_str).map(site => ({value: site, label: site}));
    if (options.length > 0) {
      return(
        <div style={extensionContainer}>
          <Select options={options}/>
        </div>  
      ) 
    } else {
      return <div style={extensionContainer}>No Blocked Sites</div>;
    }
  }
}
