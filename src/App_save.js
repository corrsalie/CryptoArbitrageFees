import React, { Component } from 'react';
import './App.css';
import Result from './Result.js';

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
      result:'',
      display:'no'
    };
    var resultState = {
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
      result:'',
      display:'no'
    };
    
    this.state = {
      pageState: pageState,
      resultState: resultState
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    
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
    this.setState({result: this.getSubmitText(), display:"yes"});
  }
  
    handleChange_ExchangeSource(event) {
      var exchangeSource = event.target.value ;
      var index = this.allExchanges.indexOf(exchangeSource)
      var fromMainCrypto_To_AltcoinSrcFees = this.allCoinFees[index]
      var fromMainCrypto_To_AltcoinSrcFeesPercent = this.allCoinPercentFees[index]
      var fromExchangeSource_To_DestFees = this.allTransferFees[index]
      var fromExchangeSource_To_DestFeesPercent = this.allTransferFeesPercent[index]
      
      this.setState({
	exchangeSource: exchangeSource, 
	fromMainCrypto_To_AltcoinSrcFees: fromMainCrypto_To_AltcoinSrcFees,
	fromMainCrypto_To_AltcoinSrcFeesPercent: fromMainCrypto_To_AltcoinSrcFeesPercent,
	fromExchangeSource_To_DestFees: fromExchangeSource_To_DestFees,
	fromExchangeSource_To_DestFeesPercent: fromExchangeSource_To_DestFeesPercent
      });
    }
    handleChange_ExchangeDest(event) {
      var exchangeDest = event.target.value ;
      var index = this.allExchanges.indexOf(exchangeDest)      
      var fromMainCrypto_To_AltcoinDstFees = this.allCoinFees[index]
      var fromMainCrypto_To_AltcoinDstFeesPercent = this.allCoinPercentFees[index]
      this.setState({
	exchangeDest: exchangeDest,
	fromMainCrypto_To_AltcoinDstFees: fromMainCrypto_To_AltcoinDstFees,
	fromMainCrypto_To_AltcoinDstFeesPercent: fromMainCrypto_To_AltcoinDstFeesPercent
      });
    }
    handleChange_MinProfitPercent(event) {
    this.setState({minProfitPercent: event.target.value});
  }
    handleChange_MinProfit(event) {
    this.setState({minProfit: event.target.value});
  }
    handleChange_AvailableMainCrypto(event) {
    this.setState({availableMainCrypto: event.target.value});
  }
    handleChange_MainCrypto(event) {
    this.setState({mainCrypto: event.target.value});
  }
    handleChange_Altcoin(event) {
    this.setState({altcoin: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinSrc(event) {
    this.setState({fromMainCrypto_To_AltcoinSrc: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinDst(event) {
    this.setState({fromMainCrypto_To_AltcoinDst: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinSrcFees(event) {
    this.setState({fromMainCrypto_To_AltcoinSrcFees: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent(event) {
    this.setState({fromMainCrypto_To_AltcoinSrcFeesPercent: event.target.value});
  }
    handleChange_FromExchangeSource_To_DestFees(event) {
    this.setState({fromExchangeSource_To_DestFees: event.target.value});
  }
    handleChange_FromExchangeSource_To_DestFeesPercent(event) {
    this.setState({fromExchangeSource_To_DestFeesPercent: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinDstFees(event) {
    this.setState({fromMainCrypto_To_AltcoinDstFees: event.target.value});
  }
    handleChange_fromMainCrypto_To_AltcoinDstFeesPercent(event) {
    this.setState({fromMainCrypto_To_AltcoinDstFeesPercent: event.target.value});
  }
  

  netProfitCalc(profitType, qtyMainCoin) {

    var nbAltcoin1 = 0
    nbAltcoin1 = qtyMainCoin/(this.state.fromMainCrypto_To_AltcoinSrc * (1+this.state.fromMainCrypto_To_AltcoinSrcFeesPercent))
    nbAltcoin1 = nbAltcoin1 - this.state.fromMainCrypto_To_AltcoinSrcFees
    
    // fees en maincoin
    var exchangeFromFees = qtyMainCoin - this.state.fromMainCrypto_To_AltcoinSrc * nbAltcoin1


    var nbAltcoin2 = 0
    nbAltcoin2 = nbAltcoin1/(1+this.state.fromExchangeSource_To_DestFeesPercent)
    nbAltcoin2 = nbAltcoin2 - this.state.fromExchangeSource_To_DestFees
    
    // fees en maincoin
    var transferFees = (nbAltcoin1 - nbAltcoin2) * this.state.fromMainCrypto_To_AltcoinDst

    var nbMainCrypto2 = 0
    nbMainCrypto2 = (nbAltcoin2*this.state.fromMainCrypto_To_AltcoinDst) / (1+this.state.fromMainCrypto_To_AltcoinDstFeesPercent)
    nbMainCrypto2 = nbMainCrypto2 - this.state.fromMainCrypto_To_AltcoinDstFees
    
    // fees en maincoin
    var exchangeDestFees = this.state.fromMainCrypto_To_AltcoinDst * nbAltcoin2 -  nbMainCrypto2 ;

    var netProfit = nbMainCrypto2 - qtyMainCoin ;
    var percentProfit = ((nbMainCrypto2 / qtyMainCoin ) - 1)*100


    return (
    	  <tr>
	    <td>{profitType}</td>
	    <td>{qtyMainCoin.toFixed(8)}{this.state.mainCrypto}</td>
	    <td>{this.state.mainCrypto} / {this.state.altcoin}</td>
	    <td>{this.state.exchangeSource}</td>
	    <td>{this.state.fromMainCrypto_To_AltcoinSrc}</td>
	    <td>{this.state.exchangeDest}</td>
	    <td>{this.state.fromMainCrypto_To_AltcoinDst}</td>
	    <td>{nbMainCrypto2.toFixed(8)}{this.state.mainCrypto}</td>
	    <td>{netProfit.toFixed(8)}{this.state.mainCrypto}</td>
	    <td>{Math.round(percentProfit)}%</td>
	    <td>{exchangeFromFees.toFixed(8)}{this.state.mainCrypto}</td>
	    <td>{transferFees.toFixed(8)}{this.state.mainCrypto}</td>
	    <td>{exchangeDestFees.toFixed(8)}{this.state.mainCrypto}</td>
	  </tr>
    );
  }

  
  // nbAltcoin1 = this.state.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfit() {
    var a = 1 / (this.state.fromMainCrypto_To_AltcoinSrc * (1+this.state.fromMainCrypto_To_AltcoinSrcFeesPercent)) ;
    var b = this.state.fromMainCrypto_To_AltcoinSrcFees ;
    var c = 1/(1+this.state.fromExchangeSource_To_DestFeesPercent)
    var d = this.state.fromExchangeSource_To_DestFees
    var e = this.state.fromMainCrypto_To_AltcoinDst / (1+this.state.fromMainCrypto_To_AltcoinDstFeesPercent)
    var f = this.state.fromMainCrypto_To_AltcoinDstFees ;
   
    var minimumInvestment = (this.state.minProfit + b*c*e + d*e + f)/(e*c*a-1)
    
    return minimumInvestment ;
  }


  
  // nbAltcoin1 = this.state.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfitPercent() {
    var a = 1 / (this.state.fromMainCrypto_To_AltcoinSrc * (1+this.state.fromMainCrypto_To_AltcoinSrcFeesPercent)) ;
    var b = this.state.fromMainCrypto_To_AltcoinSrcFees ;
    var c = 1/(1+this.state.fromExchangeSource_To_DestFeesPercent)
    var d = this.state.fromExchangeSource_To_DestFees
    var e = this.state.fromMainCrypto_To_AltcoinDst / (1+this.state.fromMainCrypto_To_AltcoinDstFeesPercent)
    var f = this.state.fromMainCrypto_To_AltcoinDstFees ;
   
    var minimumInvestment = (100 * (b*c*e + d*e + f)) / (-1*this.state.minProfitPercent - 100 + 100*a*c*e)
    return minimumInvestment
  }
  
  getSubmitText(){
    return (
      <div>
	<h2>Result</h2>
	<table>
	  <tr>
	    <th>Profit Type</th>
	    <th>Start Qty {this.state.mainCrypto}</th>
	    <th>Market</th>
	    <th>Exchange From</th>
	    <th>Buy Price</th>
	    <th>Exchange Dest</th>
	    <th>Sell Price</th>
	    <th>End Qty {this.state.mainCrypto}</th>
	    <th>Profit {this.state.mainCrypto}</th>
	    <th>Profit %</th>
	    <th>Exchange From Fees</th>
	    <th>Transfer Fees</th>
	    <th>Exchange Dest Fees</th>
	  </tr>
	  {this.netProfitCalc("Use available", this.state.availableMainCrypto)}
	  
	  {this.netProfitCalc("Min Profit", this.AtLeastProfit())}
	  
	  {this.netProfitCalc("Min Profit %", this.AtLeastProfitPercent())}
	</table>
      </div>
    );
  }

   getExchangeSourceChoices = (exchange, i) => {
     
     return <option id={exchange+"ex_scr"} selected={exchange == this.state.exchangeSource} value={exchange}>{exchange}</option> ;
   }

   getExchangeDestChoices = (exchange, i) => {
     return <option id={exchange+"ex_dst"} selected={exchange == this.state.exchangeDest} value={exchange}>{exchange}</option> ;
   }

   getCoinSrcChoices = (coin, i) => {
     return <option id={coin+"co_src"} selected={coin == this.state.mainCrypto} value={coin}>{coin}</option> ;
   }

   getCoinDestChoices = (coin, i) => {
     return <option id={coin+"co_dst"} selected={coin == this.state.altcoin} value={coin}>{coin}</option> ;
   }
  
  
  render() {
    return (
      <div className="App">	 
	 <table className="form">
	    <tr>
	      <td>
		<label>
		  Exchange Source:
		  <select value={this.state.exchangeSource} onChange={this.handleChange_ExchangeSource}>
		    {this.allExchanges.map(this.getExchangeSourceChoices)}
		  </select>
		</label>
	      </td>
	      <td>
		<label>
		  Exchange Destination:
		  <select value={this.state.exchangeDest} onChange={this.handleChange_ExchangeDest}>
		    {this.allExchanges.map(this.getExchangeDestChoices)}
		  </select>
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Crypto name start (ex : BTC, ETH, LTC):
		  <select value={this.state.mainCrypto} onChange={this.handleChange_MainCrypto}>
		    {this.allCoins.map(this.getCoinSrcChoices)}
		  </select>
		</label>
	      </td>
	      <td>
		<label>
		  Dest Crypto (coin of the arbitrage):
		  <select value={this.state.altcoin} onChange={this.handleChange_Altcoin}>
		    {this.allCoins.map(this.getCoinDestChoices)}
		  </select>
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td colspan="2">
		<label>
		  How much {this.state.mainCrypto} available:
		  <input type="number" step="0.00001" min="0" value={this.state.availableMainCrypto} onChange={this.handleChange_AvailableMainCrypto} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Minimum Profit Percent:
		  <input type="number" step="1" min="0" value={this.state.minProfitPercent} onChange={this.handleChange_MinProfitPercent} />
		</label>
	      </td>
	      <td>
		<label>
		  Minimum Profit {this.state.mainCrypto}:
		  <input type="number" step="0.00001" min="0" value={this.state.minProfit} onChange={this.handleChange_MinProfit} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Price from {this.state.mainCrypto} to {this.state.altcoin} on {this.state.exchangeSource}
		  <input type="number" step="0.00001" min="0" value={this.state.fromMainCrypto_To_AltcoinSrc} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrc} />
		</label>
	      </td>
	      <td>
		<label>
		  Price from {this.state.mainCrypto} to {this.state.altcoin} on {this.state.exchangeDest}
		  <input type="number" step="0.00001" min="0" value={this.state.fromMainCrypto_To_AltcoinDst} onChange={this.handleChange_fromMainCrypto_To_AltcoinDst} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Fees in {this.state.mainCrypto} : from {this.state.mainCrypto} to {this.state.altcoin} on {this.state.exchangeSource}
		  <input type="number" step="0.00001" min="0" value={this.state.fromMainCrypto_To_AltcoinSrcFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFees} />
		</label>
	      </td>
	      <td>
		<label>
		  Fees in percentage : from {this.state.mainCrypto} to {this.state.altcoin} on {this.state.exchangeSource}
		  <input type="number" step="0.001" min="0" value={this.state.fromMainCrypto_To_AltcoinSrcFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinSrcFeesPercent} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Fees in {this.state.mainCrypto} : from {this.state.exchangeSource} to {this.state.exchangeDest}
		  <input type="number" step="0.00001" min="0" value={this.state.fromExchangeSource_To_DestFees} onChange={this.handleChange_FromExchangeSource_To_DestFees} />
		</label>
	      </td>
	      <td>
		<label>
		  Fees in percentage : from {this.state.exchangeSource} to {this.state.exchangeDest}
		  <input type="number" step="0.001" min="0" value={this.state.fromExchangeSource_To_DestFeesPercent} onChange={this.handleChange_FromExchangeSource_To_DestFeesPercent} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td>
		<label>
		  Fees in {this.state.mainCrypto}: from {this.state.altcoin} to {this.state.mainCrypto} on {this.state.exchangeDest}
		  <input type="number" step="0.00001" min="0" value={this.state.fromMainCrypto_To_AltcoinDstFees} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFees} />
		</label>
	      </td>
	      <td>
		<label>
		  Fees : percentage: from {this.state.altcoin} to {this.state.mainCrypto} on {this.state.exchangeDest}
		  <input type="number" step="0.001" min="0" value={this.state.fromMainCrypto_To_AltcoinDstFeesPercent} onChange={this.handleChange_fromMainCrypto_To_AltcoinDstFeesPercent} />
		</label>
	      </td>
	    </tr>
		
	    <tr>
	      <td colspan="2" style={{textAlign: "center"}}>
		<button onClick={this.handleSubmit}>Make Profit</button>
	      </td>
	    </tr>
	  </table>
	{this.state.result}
	

      
	<Result stateApp={this.state.resultState} />
      </div>
    );
  }
}

export default App;