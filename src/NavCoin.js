import React, { Component } from 'react';
import './App.css';
import {Navbar, Nav} from 'react-bootstrap';

class NavCoin extends Component {
       
   getContact = () => {
    var username = "b2a1coralie";

    var hostname = "gmail";

    var domain = "com";

    var linktext = username + "@" + hostname + "." + domain;

    return <a href={"mail" + "to:" + username + "@" + hostname + "." + domain} >{linktext}</a>;
   }
   
  
  render() {
    return (
      <Navbar fixedTop>
	<Navbar.Header>
	  <Navbar.Brand>
	    Arbitrage Fees
	  </Navbar.Brand>
	</Navbar.Header>
	<Nav>
	  <Navbar.Text>
	    Contact me: {this.getContact()}
	  </Navbar.Text>
	  <Navbar.Text>
	    <a href="http://arbiswap.com">Arbiswap</a>
	  </Navbar.Text>
	</Nav>
      </Navbar>
    );
  }
}

export default NavCoin;