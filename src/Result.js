import React, { Component } from 'react';
import './App.css';
import {Glyphicon} from 'react-bootstrap';

class Result extends Component {
       
  netProfitCalc(profitType, qtyMainCoin) {
    qtyMainCoin = Number(qtyMainCoin);
    var fromMainCrypto_To_AltcoinSrc = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    var fromMainCrypto_To_AltcoinSrcFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFeesPercent)/100
    var fromMainCrypto_To_AltcoinSrcFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFees)
    var fromExchangeSource_To_DestFeesPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesPercent)/100
    var fromExchangeSource_To_DestFees = Number(this.props.stateApp.fromExchangeSource_To_DestFees);
    
    var fromExchangeSource_To_DestFeesDepoPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepoPercent)/100
    var fromExchangeSource_To_DestFeesDepo = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepo);
    
    var fromMainCrypto_To_AltcoinDst = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDst);
    var fromMainCrypto_To_AltcoinDstFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFees);
    var fromMainCrypto_To_AltcoinDstFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFeesPercent)/100;

    var nbAltcoin1 = 0
    nbAltcoin1 = qtyMainCoin/(fromMainCrypto_To_AltcoinSrc * (1+fromMainCrypto_To_AltcoinSrcFeesPercent))
    nbAltcoin1 = nbAltcoin1 - fromMainCrypto_To_AltcoinSrcFees
    
    // fees en maincoin
    var exchangeFromFees = qtyMainCoin - fromMainCrypto_To_AltcoinSrc * nbAltcoin1


    var nbAltcoin2 = 0
    nbAltcoin2 = nbAltcoin1/(1+fromExchangeSource_To_DestFeesPercent)
    nbAltcoin2 = nbAltcoin2 - fromExchangeSource_To_DestFees
    
    // fees en maincoin
    var transferFees = (nbAltcoin1 - nbAltcoin2) * fromMainCrypto_To_AltcoinDst


    var nbAltcoin3 = 0
    nbAltcoin3 = nbAltcoin2/(1+fromExchangeSource_To_DestFeesDepoPercent)
    nbAltcoin3 = nbAltcoin3 - fromExchangeSource_To_DestFeesDepo
    
    // fees en maincoin
    var transferFeesDepo = (nbAltcoin2 - nbAltcoin3) * fromMainCrypto_To_AltcoinDst

    var nbMainCrypto2 = 0
    nbMainCrypto2 = (nbAltcoin3*fromMainCrypto_To_AltcoinDst) / (1+fromMainCrypto_To_AltcoinDstFeesPercent)
    nbMainCrypto2 = nbMainCrypto2 - fromMainCrypto_To_AltcoinDstFees
    
    // fees en maincoin
    var exchangeDestFees = fromMainCrypto_To_AltcoinDst * nbAltcoin3 -  nbMainCrypto2 ;

    var netProfit = nbMainCrypto2 - qtyMainCoin ;
    var percentProfit = ((nbMainCrypto2 / qtyMainCoin ) - 1)*100
    
    var profitPossible = '' ;
    if( (qtyMainCoin > 0) && (percentProfit > 0) ){
      profitPossible = <Glyphicon style={{color: 'green'}} glyph="ok" /> ;
    }
    else{
      profitPossible = <Glyphicon style={{color: 'red'}} glyph="remove" /> ;
    }


    return (
    	  <tr className="Result">
	    <td>{profitType}</td>
	    <td>{profitPossible}</td>
	    <td>{qtyMainCoin.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{this.props.stateApp.mainCrypto} / {this.props.stateApp.altcoin}</td>
	    <td>{this.props.stateApp.exchangeSource}</td>
	    <td>{this.props.stateApp.fromMainCrypto_To_AltcoinSrc}</td>
	    <td>{this.props.stateApp.exchangeDest}</td>
	    <td>{this.props.stateApp.fromMainCrypto_To_AltcoinDst}</td>
	    <td>{nbMainCrypto2.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{netProfit.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{Math.round(percentProfit)}%</td>
	    <td>{exchangeFromFees.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{transferFees.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{transferFeesDepo.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	    <td>{exchangeDestFees.toFixed(8)}{this.props.stateApp.mainCrypto}</td>
	  </tr>
    );
  }

  
  // nbAltcoin1 = this.props.stateApp.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfit() {
    var fromMainCrypto_To_AltcoinSrc = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    var fromMainCrypto_To_AltcoinSrcFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFeesPercent)/100
    var fromMainCrypto_To_AltcoinSrcFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFees)
    var fromExchangeSource_To_DestFeesPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesPercent)/100
    var fromExchangeSource_To_DestFees = Number(this.props.stateApp.fromExchangeSource_To_DestFees);
    
    var fromExchangeSource_To_DestFeesDepoPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepoPercent)/100
    var fromExchangeSource_To_DestFeesDepo = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepo);
    
    var fromMainCrypto_To_AltcoinDst = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDst);
    var fromMainCrypto_To_AltcoinDstFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFees);
    var fromMainCrypto_To_AltcoinDstFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFeesPercent)/100;
    var minProfit = Number(this.props.stateApp.minProfit)
    
    var a = 1 / (fromMainCrypto_To_AltcoinSrc * (1+fromMainCrypto_To_AltcoinSrcFeesPercent)) ;
    var b = fromMainCrypto_To_AltcoinSrcFees ;
    var c = 1/(1+fromExchangeSource_To_DestFeesPercent)
    var d = fromExchangeSource_To_DestFees
    var e = fromMainCrypto_To_AltcoinDst / (1+fromMainCrypto_To_AltcoinDstFeesPercent)
    var f = fromMainCrypto_To_AltcoinDstFees ;
    var g = 1/(1+fromExchangeSource_To_DestFeesDepoPercent);
    var h = fromExchangeSource_To_DestFeesDepo ;
   
    //var minimumInvestment = (minProfit + b*c*e + d*e + f)/(e*c*a-1)
    var minimumInvestment = (minProfit + h*e + b*c*e*g + d*e*g + f)/(e*c*a*g-1)
    
    return minimumInvestment ;
  }


  
  // nbAltcoin1 = this.props.stateApp.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfitPercent() {
    var fromMainCrypto_To_AltcoinSrc = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    var fromMainCrypto_To_AltcoinSrcFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFeesPercent)/100
    var fromMainCrypto_To_AltcoinSrcFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFees)
    var fromExchangeSource_To_DestFeesPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesPercent)/100
    var fromExchangeSource_To_DestFees = Number(this.props.stateApp.fromExchangeSource_To_DestFees);
    
    var fromExchangeSource_To_DestFeesDepoPercent = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepoPercent)/100
    var fromExchangeSource_To_DestFeesDepo = Number(this.props.stateApp.fromExchangeSource_To_DestFeesDepo);
    
    var fromMainCrypto_To_AltcoinDst = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDst);
    var fromMainCrypto_To_AltcoinDstFees = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFees);
    var fromMainCrypto_To_AltcoinDstFeesPercent = Number(this.props.stateApp.fromMainCrypto_To_AltcoinDstFeesPercent)/100;
    var minProfitPercent = Number(this.props.stateApp.minProfitPercent)/100
    
    
    var a = 1 / (fromMainCrypto_To_AltcoinSrc * (1+fromMainCrypto_To_AltcoinSrcFeesPercent)) ;
    var b = fromMainCrypto_To_AltcoinSrcFees ;
    var c = 1/(1+fromExchangeSource_To_DestFeesPercent)
    var d = fromExchangeSource_To_DestFees
    var e = fromMainCrypto_To_AltcoinDst / (1+fromMainCrypto_To_AltcoinDstFeesPercent)
    var f = fromMainCrypto_To_AltcoinDstFees ;
    var g = 1/(1+fromExchangeSource_To_DestFeesDepoPercent);
    var h = fromExchangeSource_To_DestFeesDepo ;
   
    //var minimumInvestment = (100 * (b*c*e + d*e + f)) / (-1*minProfitPercent - 100 + 100*a*c*e)
    //var minimumInvestment = (100 * (b*c*e*g + d*e*g + f + h*e)) / (-1*minProfitPercent - 100 + 100*a*c*e*g)
    var minimumInvestment = (b*c*e*g + d*e*g + f + h*e) / (-1*minProfitPercent - 1 + a*c*e*g)
    
    return minimumInvestment
  }
  
  getSubmitText(){
    var ret = "" ;
    if(this.props.stateApp.display === "yes"){
      try {
	ret = (
	<div>
	  <h2>Result</h2>
	  <table>
	    <tr className="Result">
	      <th>Profit Type</th>
	      <th>Profit</th>
	      <th>Start Qty {this.props.stateApp.mainCrypto}</th>
	      <th>Market</th>
	      <th>Exch. From</th>
	      <th>Buy Price</th>
	      <th>Exch. Dest</th>
	      <th>Sell Price</th>
	      <th>End Qty {this.props.stateApp.mainCrypto}</th>
	      <th>Profit {this.props.stateApp.mainCrypto}</th>
	      <th>Profit %</th>
	      <th>Exch. From Fees</th>
	      <th>Withdraw Fees</th>
	      <th>Deposit Fees</th>
	      <th>Exch. Dest Fees</th>
	    </tr>
	    {this.netProfitCalc("Use available", this.props.stateApp.availableMainCrypto)}
	    
	    {this.netProfitCalc("Min Profit", this.AtLeastProfit())}
	    
	    {this.netProfitCalc("Min Profit %", this.AtLeastProfitPercent())}
	  </table>
	</div>
      );
      }
      catch(error) {
	ret = "" ;
      }
    }
    
    return ret ;
  }

  
  render() {
    return (
      <div>	 
	{this.getSubmitText()}
      </div>
    );
  }
}

export default Result;