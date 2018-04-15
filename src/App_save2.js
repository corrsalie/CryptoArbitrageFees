import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from './Result';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import NavCoin from './NavCoin'

var data = require('./data')

class App extends Component {
  
  constructor(props) {
    super(props);
    this.allExchanges = ['Binance', 'Yobit', 'Cryptopia', 'Bitrex'];
    this.allCoins = ['BTC', 'ETH', 'LTC']
    this.allCoinPercentFees = [0.005, 0, 0.01, 0]
    this.allCoinFees = [0, 0.05, 0, 0.2]
    this.allTransferFees = [0, 0.05, 0, 0]
    this.allTransferFeesPercent = [0.05, 0, 0.02, 1]
    
    var pageState = {
      exchangeSource: 'Binance',
      exchangeDest: 'Yobit',
      minProfitPercent: 5,
      minProfit: 0.0001,
      availableMainCrypto: 0.0005,
      mainCrypto: 'BTC',
      altcoin: 'LTC',
      fromMainCrypto_To_AltcoinSrcFees: 0,
      fromMainCrypto_To_AltcoinSrcFeesPercent:0.05,
      fromExchangeSource_To_DestFees: 0.05,
      fromExchangeSource_To_DestFeesPercent:0,
      fromMainCrypto_To_AltcoinDstFees: 0,
      fromMainCrypto_To_AltcoinDstFeesPercent:0.05,
      fromMainCrypto_To_AltcoinSrc:0.002,
      fromMainCrypto_To_AltcoinDst:0.0033,
      display:'yes'
    };
    var resultState = {
      exchangeSource: '',
      exchangeDest: '',
      minProfitPercent: 0,
      minProfit: 0,
      availableMainCrypto: 0,
      mainCrypto: '',
      altcoin: '',
      fromMainCrypto_To_AltcoinSrcFees: 0,
      fromMainCrypto_To_AltcoinSrcFeesPercent:0,
      fromExchangeSource_To_DestFees: 0,
      fromExchangeSource_To_DestFeesPercent:0,
      fromMainCrypto_To_AltcoinDstFees: 0,
      fromMainCrypto_To_AltcoinDstFeesPercent:0,
      fromMainCrypto_To_AltcoinSrc:0,
      fromMainCrypto_To_AltcoinDst:0,
      display:'no'
    };
    
    this.state = {
      pageState: pageState,
      resultState: resultState,
      lang: "eng",
      displayHowTo: true,
      displayDisclaimer: true,
      displayGift: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.handleEN = this.handleEN.bind(this);
    this.handleFR = this.handleFR.bind(this);
    this.displayHowTo = this.displayHowTo.bind(this);
    this.displayDisclaimer = this.displayDisclaimer.bind(this);
    this.displayGift = this.displayGift.bind(this);
    
    this.handleChange_ExchangeSource = this.handleChange_ExchangeSource.bind(this);
    this.handleChange_ExchangeDest = this.handleChange_ExchangeDest.bind(this);
    this.handleChange_MinProfitPercent = this.handleChange_MinProfitPercent.bind(this);
    this.handleChange_MinProfit = this.handleChange_MinProfit.bind(this);
    this.handleChange_AvailableMainCrypto = this.handleChange_AvailableMainCrypto.bind(this);
    this.handleChange_MainCrypto = this.handleChange_MainCrypto.bind(this);
    this.handleChange_Altcoin = this.handleChange_Altcoin.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinSrc = this.handleChange_fromMainCrypto_To_AltcoinSrc.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinDst = this.handleChange_fromMainCrypto_To_AltcoinDst.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinSrcFees = this.handleChange_fromMainCrypto_To_AltcoinSrcFees.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent = this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent.bind(this);
    this.handleChange_FromExchangeSource_To_DestFees = this.handleChange_FromExchangeSource_To_DestFees.bind(this);
    this.handleChange_FromExchangeSource_To_DestFeesPercent = this.handleChange_FromExchangeSource_To_DestFeesPercent.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinDstFees = this.handleChange_fromMainCrypto_To_AltcoinDstFees.bind(this);
    this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent = this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent.bind(this);
  }
        
  
    handleSubmit(event) {
      var pageState = this.state.pageState ;
      this.setState({pageState:pageState, resultState:pageState});
    }    
  
    handleEN(event) {
      this.setState({lang: "eng"});
    }    
  
    handleFR(event) {
      this.setState({lang: "fr"});
    }  
  
    displayHowTo(event) {
      this.setState({displayHowTo: !this.state.displayHowTo});
    }
  
    displayDisclaimer(event) {
      this.setState({displayDisclaimer: !this.state.displayDisclaimer});
    }
  
    displayGift(event) {
      this.setState({displayGift: !this.state.displayGift});
    }
  
    handleChange_ExchangeSource(event) {
      var exchangeSource = event.target.value ;
      var index = this.allExchanges.indexOf(exchangeSource)
      var fromMainCrypto_To_AltcoinSrcFees = this.allCoinFees[index]
      var fromMainCrypto_To_AltcoinSrcFeesPercent = this.allCoinPercentFees[index]
      var fromExchangeSource_To_DestFees = this.allTransferFees[index]
      var fromExchangeSource_To_DestFeesPercent = this.allTransferFeesPercent[index]
      
      var pageState = this.state.pageState ;
      
      pageState.exchangeSource = exchangeSource;
      pageState.fromMainCrypto_To_AltcoinSrcFees = fromMainCrypto_To_AltcoinSrcFees;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercent = fromMainCrypto_To_AltcoinSrcFeesPercent;
      pageState.fromExchangeSource_To_DestFees = fromExchangeSource_To_DestFees;
      pageState.fromExchangeSource_To_DestFeesPercent = fromExchangeSource_To_DestFeesPercent;
	
      this.setState({pageState:pageState});
      
    }
    handleChange_ExchangeDest(event) {
      var exchangeDest = event.target.value ;
      var index = this.allExchanges.indexOf(exchangeDest)      
      var fromMainCrypto_To_AltcoinDstFees = this.allCoinFees[index]
      var fromMainCrypto_To_AltcoinDstFeesPercent = this.allCoinPercentFees[index]
      
      var pageState = this.state.pageState ;
      
      pageState.exchangeDest = exchangeDest;
      pageState.fromMainCrypto_To_AltcoinDstFees = fromMainCrypto_To_AltcoinDstFees;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercent = fromMainCrypto_To_AltcoinDstFeesPercent;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_MinProfitPercent(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.minProfitPercent = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_MinProfit(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.minProfit = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_AvailableMainCrypto(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.availableMainCrypto = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_MainCrypto(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.mainCrypto = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_Altcoin(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.altcoin = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinSrc(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinSrc = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinDst(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinDst = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinSrcFees(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinSrcFees = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercent = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_FromExchangeSource_To_DestFees(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromExchangeSource_To_DestFees = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_FromExchangeSource_To_DestFeesPercent(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromExchangeSource_To_DestFeesPercent = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinDstFees(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinDstFees = event.target.value;
	
      this.setState({pageState:pageState});
    }
    
    handleChange_fromMainCrypto_To_AltcoinDstFeesPercent(event) {
      
      var pageState = this.state.pageState ;
      
      pageState.fromMainCrypto_To_AltcoinDstFeesPercent = event.target.value;
	
      this.setState({pageState:pageState});
    }
  
   getExchangeSourceChoices = (exchange, i) => {
     
     return <option id={exchange+"ex_scr"} selected={exchange === this.state.pageState.exchangeSource} value={exchange}>{exchange}</option> ;
   }

   getExchangeDestChoices = (exchange, i) => {
     return <option id={exchange+"ex_dst"} selected={exchange === this.state.pageState.exchangeDest} value={exchange}>{exchange}</option> ;
   }

   getCoinSrcChoices = (coin, i) => {
     return <option id={coin+"co_src"} selected={coin === this.state.pageState.mainCrypto} value={coin}>{coin}</option> ;
   }

   getCoinDestChoices = (coin, i) => {
     return <option id={coin+"co_dst"} selected={coin === this.state.pageState.altcoin} value={coin}>{coin}</option> ;
   }
   
   howToUseAndWhy = () => {
     var arrow = "" ;
     var buttons = (
       <div>
	<button onClick={this.handleEN} disabled={this.state.lang ==="eng"}>EN</button>
	<button onClick={this.handleFR} disabled={this.state.lang ==="fr"}>FR</button>
       </div>
       );
     
	      
     
     if(this.state.displayHowTo){
       arrow = <Glyphicon glyph="menu-down" />
     }
     else{
       arrow = <Glyphicon glyph="menu-right" />
     }
       
     if(this.state.lang === "fr")
     {
       return (
	 <div className="explain">
	 <h1 onClick={this.displayHowTo}>{arrow} Comment utiliser Arbitrage Fees ?</h1>
	 {buttons}
	 <p hidden={!this.state.displayHowTo}>
	  
	    J'ai investi dans les cryptomonnaies depuis quelques temps, et j'ai découvert l'arbitrage. Vous pourrez facilement trouver des explications sur le net.<br/>
	    <t/>Par exemple ici : <a href="https://www.bitcoinzar.co.za/bitcoin-arbitrage-trading/">Making money with bitcoin arbitrage trading</a>.<br/>
	    <t/>Vous pourrez aussi trouver de nombreux outils d'arbitrage sur le net, certains payants, d'autres gratuits, comme <a href="http://arbiswap.com">Arbiswap</a>.<br/>
	    Le problème c'est qu'ils ne gèrent pas ou pas toujours les frais. C'est pour cela que j'ai construit cet outil<br/>
	    Vous devez commencer par choisir vos places d'échange de cryptomonnaies dans les listes.<br/>
	    Leurs frais sont déjà préconfigurés. Mais si vous ne trouvez pas votre place préférée ou si vous n'êtes pas d'accord avec les frais, aucun problème, laissez n'importe quelle place, et changez juste les frais associés dans le formulaire.<br/>
	    Le logiciel va faire les calculs avec trois configurations.<br/>
	    <ul>
	      <li>La première avec tout votre argent disponible.</li>
	      <li>La deuxième avec autant d'argent que nécessaire pour atteindre un profit minimum en nombre de coins.</li>
	      <li>La deuxième avec autant d'argent que nécessaire pour atteindre un pourcentage de profit minimum.</li>
	    </ul>  
	    Evidemment, en fonction des frais, il n'est pas toujours possible de faire du profit, dans ce cas, vous verrez <Glyphicon style={{color: 'red'}} glyph="remove" />. Et il est très déconseillé d'investir, vous perdriez de l'argent.<br/>
	    Si vous voyez <Glyphicon style={{color: 'green'}} glyph="ok" />, vous pouvez investir.<br/>
	    Si vous souhaitez le rajout d'autres places d'échanges, vous pouvez m'envoyer un email avec les informations sur les frais de trading et de transfert.<br/>
	  
	</p>
	</div>
	 
      );
     }
     else{
      return (<div className="explain">
	<h1 onClick={this.displayHowTo}>{arrow} How to use it Arbitrage Fees?</h1>
      {buttons}
	 <p hidden={!this.state.displayHowTo}>
      I am investing in cryptocurrencies for a while, and i discovered arbitrage. You can find out easily what is arbitrage on the net.<br/>
      <t/>For example here : <a href="https://www.bitcoinzar.co.za/bitcoin-arbitrage-trading/">Making money with bitcoin arbitrage trading</a>.<br/>
      <t/>You can find lots of tools on the net, free or not, like <a href="http://arbiswap.com">Arbiswap</a>.<br/>
      The problem is that they don't (or not always) manage the fees. That is why i made this tool.<br/>
      First you can choose the exchange places in the lists.<br/>
      They come with already preconfigured fees. But if you cannot find an exchange place, or disagree with fees, no worries, you can let any places, and just change the associated fees.<br/>
      The software will compute with three configuration.<br/>
      <ul>
	<li>The first one will use all your available coins.</li>
	<li>The second one will use as many coins as needed to obtain a minimum profit in coins.</li>
	<li>The third one will use as many coins as needed to obtain a minimum percentage of profit.</li>
      </ul>  
      Of course sometimes, profit is not possible, in this case you will see <Glyphicon style={{color: 'red'}} glyph="remove" />. And you should not invest.<br/>
      In the case you can invest, you will see a <Glyphicon style={{color: 'green'}} glyph="ok" />.<br/>
      If you want that i add other exchange places, please send me an email with the information about trading fees and transfer fees.
	</p>
      </div>);
     }
   }
 ;
 
 disclaimer = () => {
  var arrow = "" ;
     
  if(this.state.displayDisclaimer){
    arrow = <Glyphicon glyph="menu-down" />
  }
  else{
    arrow = <Glyphicon glyph="menu-right" />
  }
  return (
    <div className="disclaimer">
    <h1 onClick={this.displayDisclaimer}>{arrow}Disclaimer</h1>
    
    <div hidden={!this.state.displayDisclaimer}>
    
  <h2>Disclaimer regarding content</h2>
<p>This website and /or any affiliate information presented on this website cannot and does not represent or guarantee that any of the information available through the Services is accurate, reliable, current, complete or appropriate for your needs. Various information available through API’s are believed to be sources of reliable information. Nevertheless, due to various factors — including the inherent possibility of human and mechanical error — the accuracy, completeness, timeliness, results obtained from use, and correct sequencing of information available through the Services and Website are not and cannot be guaranteed by this website.</p>
<h2>Disclaimer regarding investment decisions and trading</h2>
<p>Decisions to buy, sell, hold or trade in currencies, securities, commodities and other investments involve risk and are best made based on the advice of qualified financial professionals. Any trading in securities or other investments involves a risk of substantial losses. The practice of “Day Trading” involves particularly high risks and can cause you to lose substantial sums of money. Before undertaking any trading program, you should consult a qualified financial professional. Please consider carefully whether such trading is suitable for you in light of your financial condition and ability to bear financial risks. Under no circumstances shall we be liable for any loss or damage you or anyone else incurs as a result of any security, currency, trading or investment activity that you or anyone else engages in based on any information or material you receive through this website or our Services.</p>    
  
    </div>
  </div>);
 
   }

   
 
 gift = () => {
  var arrow = "" ;
     
  if(this.state.displayGift){
    arrow = <Glyphicon glyph="menu-down" />
  }
  else{
    arrow = <Glyphicon glyph="menu-right" />
  }
  return (
    <div className="explain">
    <h1 onClick={this.displayGift}>{arrow}Thank you</h1>
    
    <div hidden={!this.state.displayGift}>
<p>Thank you for visiting my website. I propose this service for free. Don't hesitate to tell me what you think. My email address is in the top bar.<br/>
And if you are happy with it, please feel free to tell me, and please do not block the adds.<br/>
If you own a website, i would be happy to exchange links too.<br/>
You can also make a gift if you want to :). Here are my public crypto addresses :
<ul>
  <li>BTC: 18ti8w67yZkDcMRqJ8UQthzMetcT933yo</li>
  <li>ETH: 0x9955e18eb0d9ba7ad1e755adab8d8d16c563c3e3</li>
  <li>LTC: LRoszxGgVw74eGywstoaXHLHFcQRJ4C2Kd</li>
</ul>  
</p>  
    </div>
  </div>);
 
   }
   
  render() {
    return (
      <div className="App">	 
      
	<NavCoin/>
      	<Grid className="belowBar">
	  <Row className="show-grid">
	    <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
	      {this.howToUseAndWhy()}
	      <table className="form">
		<tr>
		  <td>
		    <label>
		      Exchange Source:
		      <select value={this.state.pageState.exchangeSource} onChange={this.handleChange_ExchangeSource}>
			{this.allExchanges.map(this.getExchangeSourceChoices)}
		      </select>
		    </label>
		  </td>
		  <td>
		    <label>
		      Exchange Destination:
		      <select value={this.state.pageState.exchangeDest} onChange={this.handleChange_ExchangeDest}>
			{this.allExchanges.map(this.getExchangeDestChoices)}
		      </select>
		    </label>
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Crypto name start (ex : BTC, ETH, LTC):
		      <select value={this.state.pageState.mainCrypto} onChange={this.handleChange_MainCrypto}>
			{this.allCoins.map(this.getCoinSrcChoices)}
		      </select>
		    </label>
		  </td>
		  <td>
		    <label>
		      Dest Crypto (coin of the arbitrage):
		      <select value={this.state.pageState.altcoin} onChange={this.handleChange_Altcoin}>
			{this.allCoins.map(this.getCoinDestChoices)}
		      </select>
		    </label>
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      How much {this.state.pageState.mainCrypto} available:
		      <input type="number" step="0.00001" min="0" value={this.state.pageState.availableMainCrypto} onChange={this.handleChange_AvailableMainCrypto} />
		    </label>{this.state.pageState.mainCrypto}
		  </td>
		  <td></td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Minimum Profit in {this.state.pageState.mainCrypto}:
		      <input type="number" step="0.00001" min="0" value={this.state.pageState.minProfit} onChange={this.handleChange_MinProfit} />
		    </label>{this.state.pageState.mainCrypto}
		  </td>
		  <td>
		    <label>
		      Minimum Profit in Percent:
		      <input type="number" step="1" min="0" value={this.state.pageState.minProfitPercent} onChange={this.handleChange_MinProfitPercent} />
		    </label>%
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Price from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
		      1{this.state.pageState.altcoin} = <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrc} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrc} />
		    </label> {this.state.pageState.mainCrypto}
		  </td>
		  <td>
		    <label>
		      Price from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeDest}<br/>
		      1{this.state.pageState.altcoin} = <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDst} onChange={this.handleChange_fromMainCrypto_To_AltcoinDst} />
		    </label> {this.state.pageState.mainCrypto}
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Fees in {this.state.pageState.mainCrypto} : from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFees} />
		    </label>{this.state.pageState.mainCrypto}
		  </td>
		  <td>
		    <label>
		      Fees in percentage : from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent} />
		    </label>%
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Fees in {this.state.pageState.mainCrypto} : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFees} onChange={this.handleChange_FromExchangeSource_To_DestFees} />
		    </label>{this.state.pageState.mainCrypto}
		  </td>
		  <td>
		    <label>
		      Fees in percentage : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesPercent} />
		    </label>%
		  </td>
		</tr>
		    
		<tr>
		  <td>
		    <label>
		      Fees in {this.state.pageState.mainCrypto}: from {this.state.pageState.altcoin} to {this.state.pageState.mainCrypto} on {this.state.pageState.exchangeDest}<br/>
		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFees} />
		    </label>{this.state.pageState.mainCrypto}
		  </td>
		  <td>
		    <label>
		      Fees : percentage: from {this.state.pageState.altcoin} to {this.state.pageState.mainCrypto} on {this.state.pageState.exchangeDest}<br/>
		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent} />
		    </label>%
		  </td>
		</tr>
		    
		<tr>
		  <td colspan="2" style={{textAlign: "center"}}>
		    <button onClick={this.handleSubmit}>Make Profit</button>
		  </td>
		</tr>
	      </table>
	    </Col>
	  </Row>
	  <Row className="show-grid">
	    <Result stateApp={this.state.resultState} />
	  </Row>
	  <Row className="show-grid">
	    <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
	      {this.gift()}
	    </Col>
	  </Row>
	  <Row className="show-grid">
	    <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
	      {this.disclaimer()}
	    </Col>
	  </Row>
	  </Grid>
	  
	
      </div>
    );
  }
}

export default App;