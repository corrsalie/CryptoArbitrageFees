import React, { Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from './Result';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import NavCoin from './NavCoin'
var data = require('./data');

class App extends Component {

  constructor(props) {
    super(props);

    this.dataContent = data.getData() ;





    this.allExchanges = data.getAllPlaces(this.dataContent) ;
    this.allCoins = data.getAllDistinctCoinsOfAllPlaces(this.dataContent)

    var firstMainCrypto = this.allCoins[0] ;
    var firstAltcoin = this.allCoins[1] ;


    var exchangeSource = this.allExchanges[0]
    var exchangeDest = this.allExchanges[1]

    var dataContentSrc = data.getPlaceContentFromName(this.dataContent, exchangeSource)
    var dataContentDest = data.getPlaceContentFromName(this.dataContent, exchangeDest)

    var firstTradingFeesSrc = data.getTradingFees(dataContentSrc, firstMainCrypto)
    var firstTradingFeesPercentSrc = data.getTradingFeesPercent(dataContentSrc, firstMainCrypto);

    var firstTransferFeesSrc = data.getWithdrawFees(dataContentSrc, firstAltcoin)
    var firstTransferFeesPercentSrc = data.getWithdrawFeesPercent(dataContentSrc, firstAltcoin);


    var firstTransferFeesDest = data.getDepositFees(dataContentDest, firstAltcoin)
    var firstTransferFeesPercentDest = data.getDepositFeesPercent(dataContentDest, firstAltcoin);


    var firstTradingFeesDest = data.getTradingFees(dataContentDest, firstAltcoin)
    var firstTradingFeesPercentDest = data.getTradingFeesPercent(dataContentDest, firstAltcoin);

    var pageState = {
      exchangeSource: exchangeSource,
      exchangeDest: exchangeDest,
      minProfitPercent: 0,
      minProfit: 0,
      availableMainCrypto: 0,
      mainCrypto: firstMainCrypto,
      altcoin: firstAltcoin,
      fromMainCrypto_To_AltcoinSrcFees: firstTradingFeesSrc.tradingFees,
      fromMainCrypto_To_AltcoinSrcFeesPercent:firstTradingFeesPercentSrc.tradingFeesPercent,
      fromExchangeSource_To_DestFees: firstTransferFeesSrc.withdrawFees,
      fromExchangeSource_To_DestFeesPercent:firstTransferFeesPercentSrc.withdrawFeesPercent,
      fromMainCrypto_To_AltcoinDstFees: firstTradingFeesDest.tradingFees,
      fromMainCrypto_To_AltcoinDstFeesPercent:firstTradingFeesPercentDest.tradingFeesPercent,
      fromExchangeSource_To_DestFeesDepo: firstTransferFeesDest.depositFees,
      fromExchangeSource_To_DestFeesDepoPercent:firstTransferFeesPercentDest.depositFeesPercent,

      fromMainCrypto_To_AltcoinSrcFeesStatus: firstTradingFeesSrc.status,
      fromMainCrypto_To_AltcoinSrcFeesPercentStatus:firstTradingFeesPercentSrc.status,
      fromExchangeSource_To_DestFeesStatus: firstTransferFeesSrc.status,
      fromExchangeSource_To_DestFeesPercentStatus:firstTransferFeesPercentSrc.status,
      fromMainCrypto_To_AltcoinDstFeesStatus: firstTradingFeesDest.status,
      fromMainCrypto_To_AltcoinDstFeesPercentStatus:firstTradingFeesPercentDest.status,
      fromExchangeSource_To_DestFeesDepoStatus: firstTransferFeesDest.status,
      fromExchangeSource_To_DestFeesDepoPercentStatus:firstTransferFeesPercentDest.status,

      fromMainCrypto_To_AltcoinSrcFeesStatusDisplay: true,
      fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay:true,
      fromExchangeSource_To_DestFeesStatusDisplay: true,
      fromExchangeSource_To_DestFeesPercentStatusDisplay:true,
      fromMainCrypto_To_AltcoinDstFeesStatusDisplay: true,
      fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay:true,
      fromExchangeSource_To_DestFeesDepoStatusDisplay: true,
      fromExchangeSource_To_DestFeesDepoPercentStatusDisplay:true,

      fromMainCrypto_To_AltcoinSrc:0,
      fromMainCrypto_To_AltcoinDst:0,
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
      fromExchangeSource_To_DestFeesDepo: 0,
      fromExchangeSource_To_DestFeesDepoPercent:0,
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
    this.handleChange_FromExchangeSource_To_DestFeesDepo = this.handleChange_FromExchangeSource_To_DestFeesDepo.bind(this);
    this.handleChange_FromExchangeSource_To_DestFeesDepoPercent = this.handleChange_FromExchangeSource_To_DestFeesDepoPercent.bind(this);
  }


    handleSubmit(event) {
      var pageState = this.state.pageState ;
      var resultState = {
      exchangeSource: pageState.exchangeSource,
      exchangeDest: pageState.exchangeDest,
      minProfitPercent: pageState.minProfitPercent,
      minProfit: pageState.minProfit,
      availableMainCrypto: pageState.availableMainCrypto,
      mainCrypto: pageState.mainCrypto,
      altcoin: pageState.altcoin,
      fromMainCrypto_To_AltcoinSrcFees: pageState.fromMainCrypto_To_AltcoinSrcFees,
      fromMainCrypto_To_AltcoinSrcFeesPercent:pageState.fromMainCrypto_To_AltcoinSrcFeesPercent,
      fromExchangeSource_To_DestFees: pageState.fromExchangeSource_To_DestFees,
      fromExchangeSource_To_DestFeesPercent:pageState.fromExchangeSource_To_DestFeesPercent,
      fromMainCrypto_To_AltcoinDstFees: pageState.fromMainCrypto_To_AltcoinDstFees,
      fromMainCrypto_To_AltcoinDstFeesPercent:pageState.fromMainCrypto_To_AltcoinDstFeesPercent,
      fromMainCrypto_To_AltcoinSrc:pageState.fromMainCrypto_To_AltcoinSrc,
      fromMainCrypto_To_AltcoinDst:pageState.fromMainCrypto_To_AltcoinDst,
      fromExchangeSource_To_DestFeesDepo: pageState.fromExchangeSource_To_DestFeesDepo,
      fromExchangeSource_To_DestFeesDepoPercent:pageState.fromExchangeSource_To_DestFeesDepoPercent,
      display:'yes'
    };
      this.setState({resultState:resultState});
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


    displayTradingFeesSrcStatus() {
      var status = this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTradingFeesPercentSrcStatus() {
      var status = this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTransferFeesSrcStatus() {
      var status = this.state.pageState.fromExchangeSource_To_DestFeesStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTransferFeesPercentSrcStatus() {
      var status = this.state.pageState.fromExchangeSource_To_DestFeesPercentStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTransferFeesDstStatus() {
      var status = this.state.pageState.fromExchangeSource_To_DestFeesDepoStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTransferFeesPercentDstStatus() {
      var status = this.state.pageState.fromExchangeSource_To_DestFeesDepoPercentStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTradingFeesDestStatus() {
      var status = this.state.pageState.fromMainCrypto_To_AltcoinDstFeesStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }

    displayTradingFeesPercentDestStatus() {
      var status = this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatus;
      if(status!="ok"){
	return status;
      }
      else{
	return "";
      }
    }


    displayExchangeSrcInfo() {
      var exchangeSource = this.state.pageState.exchangeSource ;
      var dataContentSrc = data.getPlaceContentFromName(this.dataContent, exchangeSource)
      return data.getExchangeInfo(dataContentSrc)
    }


    displayExchangeDestInfo() {
      var exchangeDest = this.state.pageState.exchangeDest ;
      var dataContentDest = data.getPlaceContentFromName(this.dataContent, exchangeDest)
      return data.getExchangeInfo(dataContentDest)
    }

    handleChange_ExchangeSource(event) {
      var exchangeSource = event.target.value ;
      var dataContentSrc = data.getPlaceContentFromName(this.dataContent, exchangeSource)

      var tradingFeesSrc = data.getTradingFees(dataContentSrc, this.state.pageState.mainCrypto)
      var tradingFeesPercentSrc = data.getTradingFeesPercent(dataContentSrc, this.state.pageState.mainCrypto);

      var transferFeesSrc = data.getWithdrawFees(dataContentSrc, this.state.pageState.altcoin)
      var transferFeesPercentSrc = data.getWithdrawFeesPercent(dataContentSrc, this.state.pageState.altcoin);

      var pageState = this.state.pageState ;

      pageState.exchangeSource = exchangeSource;
      pageState.fromMainCrypto_To_AltcoinSrcFees = tradingFeesSrc.tradingFees;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercent = tradingFeesPercentSrc.tradingFeesPercent;
      pageState.fromExchangeSource_To_DestFees = transferFeesSrc.withdrawFees;
      pageState.fromExchangeSource_To_DestFeesPercent = transferFeesPercentSrc.withdrawFeesPercent;

      pageState.fromMainCrypto_To_AltcoinSrcFeesStatus = tradingFeesSrc.status;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatus = tradingFeesPercentSrc.status;
      pageState.fromExchangeSource_To_DestFeesStatus = transferFeesSrc.status;
      pageState.fromExchangeSource_To_DestFeesPercentStatus = transferFeesPercentSrc.status;

      pageState.fromMainCrypto_To_AltcoinSrcFeesStatusDisplay= true;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay=true;
      pageState.fromExchangeSource_To_DestFeesStatusDisplay= true;
      pageState.fromExchangeSource_To_DestFeesPercentStatusDisplay=true;

      this.setState({pageState:pageState});

    }
    handleChange_ExchangeDest(event) {
      var exchangeDest = event.target.value ;
      var dataContentDest = data.getPlaceContentFromName(this.dataContent, exchangeDest)


      var transferFeesDest = data.getDepositFees(dataContentDest, this.state.pageState.altcoin)
      var transferFeesPercentDest = data.getDepositFeesPercent(dataContentDest, this.state.pageState.altcoin);


      var tradingFeesDest = data.getTradingFees(dataContentDest, this.state.pageState.altcoin)
      var tradingFeesPercentDest = data.getTradingFeesPercent(dataContentDest, this.state.pageState.altcoin);

      var pageState = this.state.pageState ;


      pageState.fromExchangeSource_To_DestFeesDepo = transferFeesDest.depositFees;
      pageState.fromExchangeSource_To_DestFeesDepoPercent = transferFeesPercentDest.depositFeesPercent;

      pageState.fromExchangeSource_To_DestFeesDepoStatus = transferFeesDest.status;
      pageState.fromExchangeSource_To_DestFeesDepoPercentStatus = transferFeesPercentDest.status;

      pageState.fromExchangeSource_To_DestFeesDepoStatusDisplay= true;
      pageState.fromExchangeSource_To_DestFeesDepoPercentStatusDisplay=true;

      pageState.exchangeDest = exchangeDest;
      pageState.fromMainCrypto_To_AltcoinDstFees = tradingFeesDest.tradingFees;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercent = tradingFeesPercentDest.tradingFeesPercent;
      pageState.fromMainCrypto_To_AltcoinDstFeesStatus = tradingFeesDest.status;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatus = tradingFeesPercentDest.status;
      pageState.fromMainCrypto_To_AltcoinDstFeesStatusDisplay = true;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay = true;

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
      var exchangeSource = pageState.exchangeSource ;
      var mainCrypto = event.target.value;
      var dataContentSrc = data.getPlaceContentFromName(this.dataContent, exchangeSource)

      var tradingFeesSrc = data.getTradingFees(dataContentSrc, mainCrypto)
      var tradingFeesPercentSrc = data.getTradingFeesPercent(dataContentSrc, mainCrypto);

      pageState.fromMainCrypto_To_AltcoinSrcFees = tradingFeesSrc.tradingFees;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercent = tradingFeesPercentSrc.tradingFeesPercent;
      pageState.fromMainCrypto_To_AltcoinSrcFeesStatus = tradingFeesSrc.status;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatus = tradingFeesPercentSrc.status;
      pageState.fromMainCrypto_To_AltcoinSrcFeesStatusDisplay = true;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay = true;
      pageState.mainCrypto = mainCrypto;

      this.setState({pageState:pageState});
    }

    handleChange_Altcoin(event) {
      var pageState = this.state.pageState ;
      var altcoin = event.target.value;
      var exchangeSource = pageState.exchangeSource ;

      var dataContentSrc = data.getPlaceContentFromName(this.dataContent, exchangeSource)

      var transferFeesSrc = data.getWithdrawFees(dataContentSrc, altcoin)
      var transferFeesPercentSrc = data.getWithdrawFeesPercent(dataContentSrc, altcoin);

      var exchangeDest = pageState.exchangeDest ;
      var dataContentDest = data.getPlaceContentFromName(this.dataContent, exchangeDest)

      var transferFeesDest = data.getDepositFees(dataContentDest, altcoin)
      var transferFeesPercentDest = data.getDepositFeesPercent(dataContentDest, altcoin);

      var tradingFeesDest = data.getTradingFees(dataContentDest, altcoin)
      var tradingFeesPercentDest = data.getTradingFeesPercent(dataContentDest, altcoin);

      pageState.fromExchangeSource_To_DestFees = transferFeesSrc.withdrawFees;
      pageState.fromExchangeSource_To_DestFeesPercent = transferFeesPercentSrc.withdrawFeesPercent;

      pageState.fromExchangeSource_To_DestFeesDepo = transferFeesDest.depositFees;
      pageState.fromExchangeSource_To_DestFeesDepoPercent = transferFeesPercentDest.depositFeesPercent;

      pageState.fromMainCrypto_To_AltcoinDstFees = tradingFeesDest.tradingFees;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercent = tradingFeesPercentDest.tradingFeesPercent;
      pageState.fromExchangeSource_To_DestFeesStatus = transferFeesSrc.status;
      pageState.fromExchangeSource_To_DestFeesPercentStatus = transferFeesPercentSrc.status;

      pageState.fromExchangeSource_To_DestFeesDepoStatus = transferFeesDest.status;
      pageState.fromExchangeSource_To_DestFeesDepoPercentStatus = transferFeesPercentDest.status;

      pageState.fromMainCrypto_To_AltcoinDstFeesStatus = tradingFeesDest.status;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay = true;
      pageState.fromExchangeSource_To_DestFeesStatusDisplay = true;
      pageState.fromExchangeSource_To_DestFeesPercentStatusDisplay = true;

      pageState.fromExchangeSource_To_DestFeesDepoStatusDisplay = true;
      pageState.fromExchangeSource_To_DestFeesDepoPercentStatusDisplay = true;

      pageState.fromMainCrypto_To_AltcoinDstFeesStatusDisplay = true;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay = true;
      pageState.altcoin = altcoin;

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
      pageState.fromMainCrypto_To_AltcoinSrcFeesStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent(event) {

      var pageState = this.state.pageState ;

      pageState.fromMainCrypto_To_AltcoinSrcFeesPercent = event.target.value;
      pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_FromExchangeSource_To_DestFees(event) {

      var pageState = this.state.pageState ;

      pageState.fromExchangeSource_To_DestFees = event.target.value;
      pageState.fromExchangeSource_To_DestFeesStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_FromExchangeSource_To_DestFeesPercent(event) {

      var pageState = this.state.pageState ;

      pageState.fromExchangeSource_To_DestFeesPercent = event.target.value;
      pageState.fromExchangeSource_To_DestFeesPercentStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_FromExchangeSource_To_DestFeesDepo(event) {

      var pageState = this.state.pageState ;

      pageState.fromExchangeSource_To_DestFeesDepo = event.target.value;
      pageState.fromExchangeSource_To_DestFeesDepoStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_FromExchangeSource_To_DestFeesDepoPercent(event) {

      var pageState = this.state.pageState ;

      pageState.fromExchangeSource_To_DestFeesDepoPercent = event.target.value;
      pageState.fromExchangeSource_To_DestFeesDepoPercentStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_fromMainCrypto_To_AltcoinDstFees(event) {

      var pageState = this.state.pageState ;

      pageState.fromMainCrypto_To_AltcoinDstFees = event.target.value;
      pageState.fromMainCrypto_To_AltcoinDstFeesStatusDisplay = false;

      this.setState({pageState:pageState});
    }

    handleChange_fromMainCrypto_To_AltcoinDstFeesPercent(event) {

      var pageState = this.state.pageState ;

      pageState.fromMainCrypto_To_AltcoinDstFeesPercent = event.target.value;
      pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay = false;

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
<p>Thank you for visiting my website. I propose this service for free. Dont hesitate to tell me what you think. My email address is in the top bar.<br/>
And if you are happy with it, please feel free to tell me, and please do not block the adds.<br/>
If you own a website, i would be happy to exchange links too.<br/>
If you know how to update efficiently the fees from exchanges that do not expose it in their API and want to help, you would be more than welcome.<br/>
If you see a mistake in my formulas, feel free to warn me.<br/>
You can also support me by making a gift if you want to :). Here are my public crypto addresses :
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
    		    </label><br/>
    		    <p className="info">{this.displayExchangeSrcInfo()}</p>
    		  </td>
    		  <td>
    		    <label>
    		      Exchange Destination:
    		      <select value={this.state.pageState.exchangeDest} onChange={this.handleChange_ExchangeDest}>
    			{this.allExchanges.map(this.getExchangeDestChoices)}
    		      </select>
    		    </label><br/>
    		    <p className="info">{this.displayExchangeDestInfo()}</p>
    		  </td>
    		</tr>

    		<tr>
    		  <td>
    		    <label>
    		      Main crypto:
    		      <select value={this.state.pageState.mainCrypto} onChange={this.handleChange_MainCrypto}>
    			{this.allCoins.map(this.getCoinSrcChoices)}
    		      </select>
    		    </label>
    		  </td>
    		  <td>
    		    <label>
    		      Arbitrage crypto:
    		      <select value={this.state.pageState.altcoin} onChange={this.handleChange_Altcoin}>
    			{this.allCoins.map(this.getCoinDestChoices)}
    		      </select>
    		    </label>
    		  </td>
    		</tr>

    		<tr>
    		  <td className="toFill">
    		    <label>
    		      How much {this.state.pageState.mainCrypto} available:
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.availableMainCrypto} onChange={this.handleChange_AvailableMainCrypto} />
    		    </label>{this.state.pageState.mainCrypto}
    		  </td>
    		  <td></td>
    		</tr>

    		<tr>
    		  <td className="toFill">
    		    <label>
    		      Minimum Profit in {this.state.pageState.mainCrypto}:
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.minProfit} onChange={this.handleChange_MinProfit} />
    		    </label>{this.state.pageState.mainCrypto}
    		  </td>
    		  <td className="toFill">
    		    <label>
    		      Minimum Profit in Percent:
    		      <input type="number" step="1" min="0" value={this.state.pageState.minProfitPercent} onChange={this.handleChange_MinProfitPercent} />
    		    </label>%<br/>
    		  </td>
    		</tr>

    		<tr>
    		  <td className="toFill">
    		    <label>
    		      Price from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
    		      1{this.state.pageState.altcoin} = <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrc} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrc} />
    		    </label> {this.state.pageState.mainCrypto}
    		  </td>
    		  <td className="toFill">
    		    <label>
    		      Price from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeDest}<br/>
    		      1{this.state.pageState.altcoin} = <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDst} onChange={this.handleChange_fromMainCrypto_To_AltcoinDst} />
    		    </label> {this.state.pageState.mainCrypto}
    		  </td>
    		</tr>

    		<tr>
    		  <td>
    		    <label>
    		      Trading fees in {this.state.pageState.altcoin} : from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFees} />
    		    </label>{this.state.pageState.altcoin}<br/>
    		    <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesStatusDisplay} className="formError info">{this.displayTradingFeesSrcStatus()}</p>
    		  </td>
    		  <td>
    		    <label>
    		      Trading fees in percentage : from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin} on {this.state.pageState.exchangeSource}<br/>
    		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent} />
    		    </label>%<br/>
    		    <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay} className="formError info">{this.displayTradingFeesPercentSrcStatus()}</p>
    		  </td>
    		</tr>

    		<tr>
    		  <td>
    		    <label>
    		      Withdraw fees in {this.state.pageState.altcoin} : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFees} onChange={this.handleChange_FromExchangeSource_To_DestFees} />
    		    </label>{this.state.pageState.altcoin}<br/>
    		    <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesStatusDisplay} className="formError info">{this.displayTransferFeesSrcStatus()}</p>
    		  </td>
    		  <td>
    		    <label>
    		      Withdraw fees in percentage : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesPercent} />
    		    </label>%<br/>
    		    <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesPercentStatusDisplay} className="formError info">{this.displayTransferFeesPercentSrcStatus()}</p>
    		  </td>
    		</tr>

    		<tr>
    		  <td>
    		    <label>
    		      Deposit fees in {this.state.pageState.altcoin} : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesDepo} onChange={this.handleChange_FromExchangeSource_To_DestFeesDepo} />
    		    </label>{this.state.pageState.altcoin}<br/>
    		    <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesDepoStatusDisplay} className="formError info">{this.displayTransferFeesDstStatus()}</p>
    		  </td>
    		  <td>
    		    <label>
    		      Deposit fees in percentage : from {this.state.pageState.exchangeSource} to {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesDepoPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesDepoPercent} />
    		    </label>%<br/>
    		    <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesDepoPercentStatusDisplay} className="formError info">{this.displayTransferFeesPercentDstStatus()}</p>
    		  </td>
    		</tr>

    		<tr>
    		  <td>
    		    <label>
    		      Trading fees in {this.state.pageState.mainCrypto}: from {this.state.pageState.altcoin} to {this.state.pageState.mainCrypto} on {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFees} />
    		    </label>{this.state.pageState.mainCrypto}<br/>
    		    <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinDstFeesStatusDisplay} className="formError info">{this.displayTradingFeesDestStatus()}</p>
    		  </td>
    		  <td>
    		    <label>
    		      Trading fees : percentage: from {this.state.pageState.altcoin} to {this.state.pageState.mainCrypto} on {this.state.pageState.exchangeDest}<br/>
    		      <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent} />
    		    </label>%<br/>
    		    <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay} className="formError info">{this.displayTradingFeesPercentDestStatus()}</p>
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



	  <Row className="show-grid">
	    <Col xs={10} sm={10} md={10} lg={10} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>

	      <div className="newForm">
	      <table>
		<tr>
		  <td colspan="2">
		    <h1>Cryptocurrencies</h1> <hr/>
		  </td>
		</tr>
		<tr>
		  <td colspan="2">
		    If your arbitrage concerns the pair BTC/LTC, then the main is BTC and the arbitrage currency is LTC.
		  </td>
		</tr>
	      <tr>
		  <td className="small">
		    Choose the main cryptocurrency
		  </td>
		  <td>
		    <input />
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Choose the arbitrage cryptocurrency
		  </td>
		  <td>
		    <input />
		  </td>
		</tr>

		<tr>
		  <td colspan="2">
		    <h1>Exchange Source Platform</h1> <hr/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Choose the exchange source
		  </td>
		  <td>
		    <input />
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Trading fees from BTC to LTC:
		  </td>
		  <td>
		    <input />BTC<br/>
		    <input />%<br/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Withdraw fees from BTC to LTC:
		  </td>
		  <td>
		    <input />BTC<br/>
		    <input />%<br/>
		  </td>
		</tr>

		<tr>
		  <td colspan="2">
		    <h1>Exchange Destination Platform</h1> <hr/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Choose the exchange destination
		  </td>
		  <td>
		    <input />
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Trading fees from LTC to BTC:
		  </td>
		  <td>
		    <input />LTC<br/>
		    <input />%<br/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Deposit fees:
		  </td>
		  <td>
		    <input />LTC<br/>
		    <input />%<br/>
		  </td>
		</tr>

		<tr>
		  <td colspan="2">
		    <h1>Currencies Price</h1> <hr/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    On Binance
		  </td>
		  <td>
		    <input /> BTC = 1 LTC
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    On Yobit
		  </td>
		  <td>
		    <input /> BTC = 1 LTC
		  </td>
		</tr>
		<tr>
		  <td colspan="2">
		    <h1>Arbitrage Profit</h1> <hr/>
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Available on Binance :
		  </td>
		  <td>
		    <input /> BTC
		  </td>
		</tr>
		<tr>
		  <td className="small">
		    Minimum profit wanted :
		  </td>
		  <td>
		    <input />BTC<br/>
		    <input />%<br/>
		  </td>
		</tr>
		<tr>
		  <td className="small"></td>
		  <td style={{textAlign: "left"}}>
		    <button onClick={this.handleSubmit}>Make Profit</button>
		  </td>
		</tr>
	      </table>














        	      <table>
        		<tr>
        		  <td colspan="2">
        		    <h1>Cryptocurrencies</h1> <hr/>
        		  </td>
        		</tr>
        		<tr>
        		  <td colspan="2">
        		    If your arbitrage concerns the pair BTC/LTC, then the main is BTC and the arbitrage currency is LTC.
        		  </td>
        		</tr>
        	      <tr>
        		  <td className="small">
        		    Choose the main cryptocurrency
        		  </td>
        		  <td>
                <select value={this.state.pageState.mainCrypto} onChange={this.handleChange_MainCrypto}>
                  {this.allCoins.map(this.getCoinSrcChoices)}
                </select>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Choose the arbitrage cryptocurrency
        		  </td>
        		  <td>
                <select value={this.state.pageState.altcoin} onChange={this.handleChange_Altcoin}>
                  {this.allCoins.map(this.getCoinDestChoices)}
                </select>
        		  </td>
        		</tr>

        		<tr>
        		  <td colspan="2">
        		    <h1>Exchange Source Platform</h1> <hr/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Choose the exchange source
        		  </td>
        		  <td>
                <select value={this.state.pageState.exchangeSource} onChange={this.handleChange_ExchangeSource}>
                  {this.allExchanges.map(this.getExchangeSourceChoices)}
                </select>
                <p className="info">{this.displayExchangeSrcInfo()}</p>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Trading fees from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin}:
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFees} />{this.state.pageState.mainCrypto}
                <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesStatusDisplay} className="formError info">{this.displayTradingFeesSrcStatus()}</p><br/>
        		    <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent} />%
                <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinSrcFeesPercentStatusDisplay} className="formError info">{this.displayTradingFeesPercentSrcStatus()}</p><br/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Withdraw fees from {this.state.pageState.mainCrypto} to {this.state.pageState.altcoin}:
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFees} onChange={this.handleChange_FromExchangeSource_To_DestFees} />{this.state.pageState.altcoin}
                <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesStatusDisplay} className="formError info">{this.displayTransferFeesSrcStatus()}</p><br/>
        		    <input type="number" step="0.001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesPercent} />%
                <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesPercentStatusDisplay} className="formError info">{this.displayTransferFeesPercentSrcStatus()}</p><br/>
        		  </td>
        		</tr>

        		<tr>
        		  <td colspan="2">
        		    <h1>Exchange Destination Platform</h1> <hr/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Choose the exchange destination
        		  </td>
        		  <td>
                <select value={this.state.pageState.exchangeDest} onChange={this.handleChange_ExchangeDest}>
                  {this.allExchanges.map(this.getExchangeDestChoices)}
                </select>
                <p className="info">{this.displayExchangeDestInfo()}</p>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Trading fees from {this.state.pageState.altcoin} to {this.state.pageState.mainCrypto}:
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFees} />{this.state.pageState.altcoin}
                <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinDstFeesStatusDisplay} className="formError info">{this.displayTradingFeesDestStatus()}</p><br/>
        		    <input type="number" step="0.001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent} />%
                <p hidden={!this.state.pageState.fromMainCrypto_To_AltcoinDstFeesPercentStatusDisplay} className="formError info">{this.displayTradingFeesPercentDestStatus()}</p><br/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Deposit fees:
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesDepo} onChange={this.handleChange_FromExchangeSource_To_DestFeesDepo} />{this.state.pageState.altcoin}
                <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesDepoStatusDisplay} className="formError info">{this.displayTransferFeesDstStatus()}</p><br/>
        		    <input type="number" step="0.001" min="0" value={this.state.pageState.fromExchangeSource_To_DestFeesDepoPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesDepoPercent} />%
                <p hidden={!this.state.pageState.fromExchangeSource_To_DestFeesDepoPercentStatusDisplay} className="formError info">{this.displayTransferFeesPercentDstStatus()}</p><br/>
        		  </td>
        		</tr>

        		<tr>
        		  <td colspan="2">
        		    <h1>Currencies Price</h1> <hr/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    On {this.state.pageState.exchangeSource}
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinSrc} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrc} /> {this.state.pageState.mainCrypto} = 1 {this.state.pageState.altcoin}
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    On {this.state.pageState.exchangeDest}
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.fromMainCrypto_To_AltcoinDst} onChange={this.handleChange_fromMainCrypto_To_AltcoinDst} /> {this.state.pageState.mainCrypto} = 1 {this.state.pageState.altcoin}
        		  </td>
        		</tr>
        		<tr>
        		  <td colspan="2">
        		    <h1>Arbitrage Profit</h1> <hr/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Available on {this.state.pageState.exchangeSource} :
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.availableMainCrypto} onChange={this.handleChange_AvailableMainCrypto} /> {this.state.pageState.mainCrypto}
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small">
        		    Minimum profit wanted :
        		  </td>
        		  <td>
        		    <input type="number" step="0.00001" min="0" value={this.state.pageState.minProfit} onChange={this.handleChange_MinProfit} />{this.state.pageState.mainCrypto}<br/>
        		    <input type="number" step="1" min="0" value={this.state.pageState.minProfitPercent} onChange={this.handleChange_MinProfitPercent} />%<br/>
        		  </td>
        		</tr>
        		<tr>
        		  <td className="small"></td>
        		  <td style={{textAlign: "left"}}>
        		    <button onClick={this.handleSubmit}>Make Profit</button>
        		  </td>
        		</tr>
        	      </table>











	    </div>

	    </Col>
	  </Row>

	  </Grid>


      </div>
    );
  }
}

export default App;
