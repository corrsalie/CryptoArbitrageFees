import React, { Component } from 'react';
import './App.css';
import {Glyphicon} from 'react-bootstrap';
import bigdecimal from 'bigdecimal';
import Plot from 'react-plotly.js';

class Result extends Component {

  netProfitCalc(profitType, qtyMainCoin) {
    alert("start netProfitCalc " + profitType + " qtyMainCoin = " + qtyMainCoin + " typeof qtyMainCoin = " + typeof qtyMainCoin)

    var hundred = new bigdecimal.BigDecimal('100');
    var one = new bigdecimal.BigDecimal('1');
    var zero = new bigdecimal.BigDecimal('0');
    var fromMainCrypto_To_AltcoinSrc = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    var profitPossible = <Glyphicon style={{color: 'red'}} glyph="remove" /> ;
    var netProfit = new bigdecimal.BigDecimal('0') ;
    var percentProfit = new bigdecimal.BigDecimal('0') ;
    var exchangeFromFees = new bigdecimal.BigDecimal('0') ;
    var transferFees = new bigdecimal.BigDecimal('0') ;
    var transferFeesDepo = new bigdecimal.BigDecimal('0') ;
    var exchangeDestFees = new bigdecimal.BigDecimal('0') ;
    var nbMainCrypto2 = new bigdecimal.BigDecimal('0') ;


    if((qtyMainCoin.compareTo(zero) !== 0) && (fromMainCrypto_To_AltcoinSrc.compareTo(zero) !== 0)){

      var fromMainCrypto_To_AltcoinSrcFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFeesPercent)
      var fromMainCrypto_To_AltcoinSrcFeesPercent = fromMainCrypto_To_AltcoinSrcFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromMainCrypto_To_AltcoinSrcFeesPercentPlus1 = fromMainCrypto_To_AltcoinSrcFeesPercent.add(one)

      var fromMainCrypto_To_AltcoinSrcFees = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFees)

      var fromExchangeSource_To_DestFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesPercent)
      var fromExchangeSource_To_DestFeesPercent = fromExchangeSource_To_DestFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromExchangeSource_To_DestFeesPercentPlus1 = fromExchangeSource_To_DestFeesPercent.add(one)

      var fromExchangeSource_To_DestFees = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFees);

      var fromExchangeSource_To_DestFeesDepoPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesDepoPercent)
      var fromExchangeSource_To_DestFeesDepoPercent = fromExchangeSource_To_DestFeesDepoPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromExchangeSource_To_DestFeesDepoPercentPlus1 = fromExchangeSource_To_DestFeesDepoPercent.add(one)

      var fromExchangeSource_To_DestFeesDepo = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesDepo);

      var fromMainCrypto_To_AltcoinDst = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDst);
      var fromMainCrypto_To_AltcoinDstFees = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDstFees);

      var fromMainCrypto_To_AltcoinDstFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDstFeesPercent);
      var fromMainCrypto_To_AltcoinDstFeesPercent = fromMainCrypto_To_AltcoinDstFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromMainCrypto_To_AltcoinDstFeesPercentPlus1 = fromMainCrypto_To_AltcoinDstFeesPercent.add(one)

      var nbAltcoin1 = new bigdecimal.BigDecimal('0');

      nbAltcoin1 = qtyMainCoin.divide(fromMainCrypto_To_AltcoinSrc.multiply(fromMainCrypto_To_AltcoinSrcFeesPercentPlus1),10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      nbAltcoin1 = nbAltcoin1.subtract(fromMainCrypto_To_AltcoinSrcFees)

      // fees en maincoin
      exchangeFromFees = qtyMainCoin.subtract(fromMainCrypto_To_AltcoinSrc.multiply(nbAltcoin1))


      var nbAltcoin2 = new bigdecimal.BigDecimal('0')
      nbAltcoin2 = nbAltcoin1.divide(fromExchangeSource_To_DestFeesPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      nbAltcoin2 = nbAltcoin2.subtract(fromExchangeSource_To_DestFees)

      // fees en maincoin
      transferFees = fromMainCrypto_To_AltcoinDst.multiply(nbAltcoin1.subtract(nbAltcoin2))


      var nbAltcoin3 = new bigdecimal.BigDecimal('0')
      nbAltcoin3 = nbAltcoin2.divide(fromExchangeSource_To_DestFeesDepoPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      nbAltcoin3 = nbAltcoin3.subtract(fromExchangeSource_To_DestFeesDepo)

      // fees en maincoin
      transferFeesDepo = fromMainCrypto_To_AltcoinDst.multiply(nbAltcoin2.subtract(nbAltcoin3))

      nbMainCrypto2 = (nbAltcoin3.multiply(fromMainCrypto_To_AltcoinDst)).divide(fromMainCrypto_To_AltcoinDstFeesPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      nbMainCrypto2 = nbMainCrypto2.subtract(fromMainCrypto_To_AltcoinDstFees)

      // fees en maincoin
      exchangeDestFees = (fromMainCrypto_To_AltcoinDst.multiply(nbAltcoin3)).subtract(nbMainCrypto2) ;

      netProfit = nbMainCrypto2.subtract(qtyMainCoin) ;
      percentProfit = ((nbMainCrypto2.divide(qtyMainCoin,10,bigdecimal.BigDecimal.ROUND_HALF_UP)).subtract(one)).multiply(hundred)

      if((qtyMainCoin.compareTo(zero) === 1) && (percentProfit.compareTo(zero) === 1) ){
        profitPossible = <Glyphicon style={{color: 'green'}} glyph="ok" /> ;
      }
    }
    else { // calcul not possible
      qtyMainCoin = new bigdecimal.BigDecimal('0') ;
    }

    var disp_qtyMainCoin = this.getCoinsFormat2Number(qtyMainCoin) ;
    var disp_nbMainCrypto2 = this.getCoinsFormat2Number(nbMainCrypto2) ;
    var disp_netProfit = this.getCoinsFormat2Number(netProfit) ;
    var disp_percentProfit = this.getPercentsFormat2Number(percentProfit) ;
    var disp_exchangeFromFees = this.getCoinsFormat2Number(exchangeFromFees) ;
    var disp_transferFees = this.getCoinsFormat2Number(transferFees) ;
    var disp_transferFeesDepo = this.getCoinsFormat2Number(transferFeesDepo) ;
    var disp_exchangeDestFees = this.getCoinsFormat2Number(exchangeDestFees) ;

    var display = (
    <tr>
      <td>{profitPossible} {profitType}</td>
      <td>{disp_qtyMainCoin}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_nbMainCrypto2}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_netProfit}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_percentProfit}%</td>
      <td>{disp_exchangeFromFees}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_transferFees}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_transferFeesDepo}{this.props.stateApp.mainCrypto}</td>
      <td>{disp_exchangeDestFees}{this.props.stateApp.mainCrypto}</td>
    </tr>);
    alert("end netProfitCalc " + profitType)
    return {display: display, startAvail:qtyMainCoin, endAvail: nbMainCrypto2, profitCoins: netProfit, profitPercent: percentProfit};
  }

  getCoinsFormat(bigdecimalNumber){
    return bigdecimalNumber.setScale(7, bigdecimal.BigDecimal.ROUND_HALF_UP)
  }

  getCoinsFormat2Number(bigdecimalNumber){
    return Number(this.getCoinsFormat(bigdecimalNumber))
  }

  getPercentsFormat(bigdecimalNumber){
    return bigdecimalNumber.setScale(2, bigdecimal.BigDecimal.ROUND_HALF_UP)
  }

  getPercentsFormat2Number(bigdecimalNumber){
    return Number(this.getPercentsFormat(bigdecimalNumber))
  }


  get_abcdefgh = () => {
    var a = new bigdecimal.BigDecimal('0') ;
    var b = new bigdecimal.BigDecimal('0') ;
    var c = new bigdecimal.BigDecimal('0') ;
    var d = new bigdecimal.BigDecimal('0') ;
    var e = new bigdecimal.BigDecimal('0') ;
    var f = new bigdecimal.BigDecimal('0') ;
    var g = new bigdecimal.BigDecimal('0') ;
    var h = new bigdecimal.BigDecimal('0') ;

    var hundred = new bigdecimal.BigDecimal('100');
    var one = new bigdecimal.BigDecimal('1');
    var zero = new bigdecimal.BigDecimal('0');

    var fromMainCrypto_To_AltcoinSrc = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    if(fromMainCrypto_To_AltcoinSrc.compareTo(zero) != 0){
      var fromMainCrypto_To_AltcoinSrcFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFeesPercent)
      var fromMainCrypto_To_AltcoinSrcFeesPercent = fromMainCrypto_To_AltcoinSrcFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromMainCrypto_To_AltcoinSrcFeesPercentPlus1 = fromMainCrypto_To_AltcoinSrcFeesPercent.add(one)

      var fromMainCrypto_To_AltcoinSrcFees = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrcFees)
      var fromExchangeSource_To_DestFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesPercent)
      var fromExchangeSource_To_DestFeesPercent = fromExchangeSource_To_DestFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromExchangeSource_To_DestFeesPercentPlus1 = fromExchangeSource_To_DestFeesPercent.add(one)

      var fromExchangeSource_To_DestFees = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFees);

      var fromExchangeSource_To_DestFeesDepoPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesDepoPercent)
      var fromExchangeSource_To_DestFeesDepoPercent = fromExchangeSource_To_DestFeesDepoPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromExchangeSource_To_DestFeesDepoPercentPlus1 = fromExchangeSource_To_DestFeesDepoPercent.add(one)

      var fromExchangeSource_To_DestFeesDepo = new bigdecimal.BigDecimal(this.props.stateApp.fromExchangeSource_To_DestFeesDepo);

      var fromMainCrypto_To_AltcoinDst = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDst);
      var fromMainCrypto_To_AltcoinDstFees = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDstFees);
      var fromMainCrypto_To_AltcoinDstFeesPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDstFeesPercent);
      var fromMainCrypto_To_AltcoinDstFeesPercent = fromMainCrypto_To_AltcoinDstFeesPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      var fromMainCrypto_To_AltcoinDstFeesPercentPlus1 = fromMainCrypto_To_AltcoinDstFeesPercent.add(one)

      a = one.divide(fromMainCrypto_To_AltcoinSrc.multiply(fromMainCrypto_To_AltcoinSrcFeesPercentPlus1),10,bigdecimal.BigDecimal.ROUND_HALF_UP) ;
      b = fromMainCrypto_To_AltcoinSrcFees ;
      c = one.divide(fromExchangeSource_To_DestFeesPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      e = fromMainCrypto_To_AltcoinDst.divide(fromMainCrypto_To_AltcoinDstFeesPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
      d = fromExchangeSource_To_DestFees
      f = fromMainCrypto_To_AltcoinDstFees ;
      h = fromExchangeSource_To_DestFeesDepo ;
      g = one.divide(fromExchangeSource_To_DestFeesDepoPercentPlus1,10,bigdecimal.BigDecimal.ROUND_HALF_UP);

    }
    return {a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h}
  }

  isPercentProfitConstant = () => {
    var fromMainCrypto_To_AltcoinSrc = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinSrc)
    var fromMainCrypto_To_AltcoinDst = new bigdecimal.BigDecimal(this.props.stateApp.fromMainCrypto_To_AltcoinDst);

    var abcdefgh = this.get_abcdefgh();
    var a = abcdefgh.a ;
    var b = abcdefgh.b ;
    var c = abcdefgh.c ;
    var d = abcdefgh.d ;
    var e = abcdefgh.e ;
    var f = abcdefgh.f ;
    var g = abcdefgh.g ;
    var h = abcdefgh.h ;

    var hundred = new bigdecimal.BigDecimal('100');
    var one = new bigdecimal.BigDecimal('1');
    var zero = new bigdecimal.BigDecimal('0');
    var feesPercent = new bigdecimal.BigDecimal('0') ;
    var percentWithoutFees = new bigdecimal.BigDecimal('0');
    var percentNet = new bigdecimal.BigDecimal('0') ;
    var isPercentProfitConstant = false ;

    if( (b.compareTo(zero) === 0) && (d.compareTo(zero) === 0) && (h.compareTo(zero) === 0) && (f.compareTo(zero) === 0) ){
      feesPercent = a.multiply(c).multiply(g).multiply(e);
      percentWithoutFees = fromMainCrypto_To_AltcoinDst.divide(fromMainCrypto_To_AltcoinDst,10,bigdecimal.BigDecimal.ROUND_HALF_UP);
      percentNet = (percentWithoutFees.multiply(feesPercent).subtract(one)).multiply(hundred);
      isPercentProfitConstant = true ;
    }

    return {isPercentProfitConstant:isPercentProfitConstant, percentNet:percentNet}
  }


  // nbAltcoin1 = this.props.stateApp.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfit() {
    alert("start AtLeastProfit !!!!!!!!!!!!!")
    var minProfit = new bigdecimal.BigDecimal(this.props.stateApp.minProfit)

    var one = new bigdecimal.BigDecimal('1');
    var zero = new bigdecimal.BigDecimal('0');

    var abcdefgh = this.get_abcdefgh();
    var a = abcdefgh.a ;
    var b = abcdefgh.b ;
    var c = abcdefgh.c ;
    var d = abcdefgh.d ;
    var e = abcdefgh.e ;
    var f = abcdefgh.f ;
    var g = abcdefgh.g ;
    var h = abcdefgh.h ;
    var denom_ecag_1 = (e.multiply(c).multiply(a).multiply(g)).subtract(one);
    var minimumInvestment = new bigdecimal.BigDecimal('0');

    if(denom_ecag_1.compareTo(zero) !== 0){
      //var minimumInvestment = (minProfit + b*c*e + d*e + f)/(e*c*a-1)
      minimumInvestment = (minProfit.add(h.multiply(e)).add(b.multiply(c).multiply(e).multiply(g)).add(d.multiply(e).multiply(g)).add(f)).divide(denom_ecag_1,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
    }

    if(minimumInvestment.compareTo(zero) === -1){
      minimumInvestment = new bigdecimal.BigDecimal('0');
    }

    alert("end AtLeastProfit ; minimumInvestment1 = " + minimumInvestment)
    return minimumInvestment ;
  }



  // nbAltcoin1 = this.props.stateApp.availableMainCrypto * a - b
  // nbAltcoin2 = nbAltcoin1 * c - d
  // nbMainCrypto2 = nbAltcoin2 * e - f
  AtLeastProfitPercent() {
    alert("start AtLeastProfitPercent")
    var hundred = new bigdecimal.BigDecimal('100');
    var one = new bigdecimal.BigDecimal('1');
    var zero = new bigdecimal.BigDecimal('0');

    var minProfitPercent_100 = new bigdecimal.BigDecimal(this.props.stateApp.minProfitPercent) ;
    var minProfitPercent = minProfitPercent_100.divide(hundred,10,bigdecimal.BigDecimal.ROUND_HALF_UP)

    var abcdefgh = this.get_abcdefgh();

    var a = abcdefgh.a ;
    var b = abcdefgh.b ;
    var c = abcdefgh.c ;
    var d = abcdefgh.d ;
    var e = abcdefgh.e ;
    var f = abcdefgh.f ;
    var g = abcdefgh.g ;
    var h = abcdefgh.h ;

    var denominateur = (e.multiply(c).multiply(a).multiply(g)).subtract(one).subtract(minProfitPercent);

    var minimumInvestment = new bigdecimal.BigDecimal('0');

    if(denominateur.compareTo(zero) !== 0){
      alert("hrrr1")
      //var minimumInvestment = (100 * (b*c*e + d*e + f)) / (-1*minProfitPercent - 100 + 100*a*c*e)
      //var minimumInvestment = (100 * (b*c*e*g + d*e*g + f + h*e)) / (-1*minProfitPercent - 100 + 100*a*c*e*g)
      minimumInvestment = ((b.multiply(c).multiply(e).multiply(g)).add(d.multiply(e).multiply(g)).add(h.multiply(e)).add(f)).divide(denominateur,10,bigdecimal.BigDecimal.ROUND_HALF_UP)
    }
    if(minimumInvestment.compareTo(zero) === -1){
      alert("hrrr2")
      minimumInvestment = new bigdecimal.BigDecimal('0');
    }

    alert("end AtLeastProfitPercent ; minimumInvestment2 = " + minimumInvestment)
    return minimumInvestment
  }

  getResult(){
    var ret = "" ;
    if(this.props.stateApp.display === "yes"){
      alert("start getResult")
      try {
        var useAvail = this.netProfitCalc("Use available", new bigdecimal.BigDecimal(this.props.stateApp.availableMainCrypto)) ;
        var minProfit = this.netProfitCalc("Min Profit", this.AtLeastProfit()) ;
        var minProfitPercent = this.netProfitCalc("Min Profit %", this.AtLeastProfitPercent()) ;

        var glyphOk = <Glyphicon style={{color: 'green'}} glyph="ok" /> ;
        var glyphKO = <Glyphicon style={{color: 'red'}} glyph="remove" /> ;
        var plotData = this.getDataPlotP(useAvail.startAvail, minProfit.startAvail, minProfitPercent.startAvail, 100);

        var disp_useAvailstartAvail = this.getCoinsFormat2Number(useAvail.startAvail)
        var disp_useAvailendAvail = this.getCoinsFormat2Number(useAvail.endAvail)
        var disp_useAvailprofitPercent = this.getPercentsFormat2Number(useAvail.profitPercent)
        var disp_useAvailprofitCoins = this.getCoinsFormat2Number(useAvail.profitCoins)

        var disp_minProfitstartAvail = this.getCoinsFormat2Number(minProfit.startAvail)
        var disp_minProfitendAvail = this.getCoinsFormat2Number(minProfit.endAvail)
        var disp_minProfitprofitPercent = this.getPercentsFormat2Number(minProfit.profitPercent)
        var disp_minProfitprofitCoins = this.getCoinsFormat2Number(minProfit.profitCoins)

        var disp_minProfitPercentstartAvail = this.getCoinsFormat2Number(minProfitPercent.startAvail)
        var disp_minProfitPercentendAvail = this.getCoinsFormat2Number(minProfitPercent.endAvail)
        var disp_minProfitPercentprofitPercent = this.getPercentsFormat2Number(minProfitPercent.profitPercent)
        var disp_minProfitPercentprofitCoins = this.getCoinsFormat2Number(minProfitPercent.profitCoins)
        var profitConstant = this.isPercentProfitConstant();

        if(profitConstant.isPercentProfitConstant){
          disp_minProfitPercentstartAvail = "X";
          disp_minProfitPercentendAvail = "X" ;
          disp_minProfitPercentprofitPercent = this.getPercentsFormat2Number(profitConstant.percentNet)
          disp_minProfitPercentprofitCoins = "X"
        }

	ret = (
    <div>
      <h1 className="Result">Result for Arbitrage {this.props.stateApp.mainCrypto} / {this.props.stateApp.altcoin}</h1>
      <div className="Profit">
        <table>
          <tr>
            <td className="startAvail">{disp_useAvailstartAvail} {this.props.stateApp.mainCrypto}</td>
            <td className="emptyCol1"></td>
            <td className="price1">1 {this.props.stateApp.altcoin} = {this.props.stateApp.fromMainCrypto_To_AltcoinSrc} {this.props.stateApp.mainCrypto} on {this.props.stateApp.exchangeSource}</td>
            <td className="emptyCol2"></td>
            <td className="price2">1 {this.props.stateApp.altcoin} = {this.props.stateApp.fromMainCrypto_To_AltcoinDst} {this.props.stateApp.mainCrypto} on {this.props.stateApp.exchangeDest}</td>
            <td className="emptyCol3"></td>
            <td className="endAvail">{disp_useAvailendAvail} {this.props.stateApp.mainCrypto}<br/>{(disp_useAvailprofitPercent > 0) ? '+' : ''}{disp_useAvailprofitPercent}% <br/>{(disp_useAvailprofitCoins > 0) ? '+' : ''}{disp_useAvailprofitCoins} {this.props.stateApp.mainCrypto}{(disp_useAvailprofitCoins > 0) ? glyphOk : glyphKO}</td>
          </tr>
          <tr>
            <td className="startMinProf">{disp_minProfitstartAvail} {this.props.stateApp.mainCrypto}</td>
            <td className="emptyCol1"></td>
            <td className="arrow1" rowspan="2"><Glyphicon glyph="arrow-right" /></td>
            <td className="emptyCol2"></td>
            <td className="arrow2" rowspan="2"><Glyphicon glyph="arrow-right" /></td>
            <td className="emptyCol3"></td>
            <td className="endMinProf">{disp_minProfitendAvail} {this.props.stateApp.mainCrypto}<br/>{(disp_minProfitprofitPercent > 0) ? '+' : ''}{disp_minProfitprofitPercent}% <br/>{(disp_minProfitprofitCoins > 0) ? '+' : ''}{disp_minProfitprofitCoins} {this.props.stateApp.mainCrypto} {(disp_minProfitprofitCoins >= this.props.stateApp.minProfit) ? glyphOk : glyphKO}</td>
          </tr>
          <tr>
            <td className="startPercentProf">{disp_minProfitPercentstartAvail} {this.props.stateApp.mainCrypto}</td>
            <td className="emptyCol1"></td>
            <td className="emptyCol2"></td>
            <td className="emptyCol3"></td>
            <td className="endPercentProf">{disp_minProfitPercentendAvail} {this.props.stateApp.mainCrypto}<br/>{(disp_minProfitPercentprofitPercent > 0) ? '+' : ''}{disp_minProfitPercentprofitPercent}% <br/>{(disp_minProfitPercentprofitCoins > 0) ? '+' : ''}{disp_minProfitPercentprofitCoins} {this.props.stateApp.mainCrypto} {(disp_minProfitPercentprofitPercent >= this.props.stateApp.minProfitPercent) ? glyphOk : glyphKO}</td>
          </tr>
        </table>
      </div>

    	<div className="ResultTest">
        <table>
          <thead>
            <tr>
              <th>Profit Type</th>
              <th>Start Qty {this.props.stateApp.mainCrypto}</th>
              <th>End Qty {this.props.stateApp.mainCrypto}</th>
              <th>Profit {this.props.stateApp.mainCrypto}</th>
              <th>Profit %</th>
              <th>Trading Fees: {this.props.stateApp.exchangeSource}</th>
              <th>Withdraw Fees: {this.props.stateApp.exchangeSource}</th>
              <th>Deposit Fees: {this.props.stateApp.exchangeDest}</th>
              <th>Trading Fees: {this.props.stateApp.exchangeDest}</th>
            </tr>
          </thead>

          <tbody>
      	    {useAvail.display}

      	    {minProfit.display}

      	    {minProfitPercent.display}
          </tbody>
    	  </table>
    	</div>

        <Plot
          data={[
            {
              x: plotData.x,
              y: plotData.Pav,
              type: 'scatter',
              mode: 'lines',
              marker: {color: 'blue'},
              name:'Profit with available ' + this.props.stateApp.mainCrypto
            },
            {
              x: plotData.x,
              y: plotData.Px,
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'},
              name:this.props.stateApp.mainCrypto + ' profit / invested ' + this.props.stateApp.mainCrypto
            },
            {type: 'bar', x: plotData.Px, y: plotData.PxMin, name:'Minimum Profit ' + this.props.stateApp.mainCrypto}
          ]}
          layout={ {xaxis: {title: 'Invested ' + this.props.stateApp.mainCrypto}, yaxis: { title: 'Net profit ' + this.props.stateApp.mainCrypto }, width: 600, height: 500, title: 'Profit ' + this.props.stateApp.mainCrypto + ' / invest ' + this.props.stateApp.mainCrypto} }
        />
        <Plot
          data={[
            {
              x: plotData.x,
              y: plotData.PavPercent,
              type: 'scatter',
              mode: 'lines',
              marker: {color: 'blue'},
              name:'Profit % with available ' + this.props.stateApp.mainCrypto
            },
            {
              x: plotData.x,
              y: plotData.Ppercent,
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'},
              name:'profit % / invested ' + this.props.stateApp.mainCrypto
            },
            {type: 'bar', x: plotData.Px, y: plotData.PpercentMin, name:'Minimum % Profit'},
          ]}
          layout={ {xaxis: {title: 'Invested ' + this.props.stateApp.mainCrypto}, yaxis: { title: 'Net profit %' }, width: 600, height: 500, title: 'Profit % / Invest ' + this.props.stateApp.mainCrypto} }
        />

    </div>

      );
      }
      catch(error) {
	ret = "" ;
  alert(error)
      }
      alert("end getResult = " )
    } // end if display

    return ret ;
  }


     getDataStart = (av, av_profit, av_profitpercent) => {
       var min = 0 ;
       av = Math.max(min, av);
       av_profit = Math.max(min, av_profit);
       av_profitpercent = Math.max(min, av_profitpercent);

       var start = Math.min(av, av_profit, av_profitpercent);
       return start ;
     }

     getDataEnd = (av, av_profit, av_profitpercent) => {
       var end = Math.max(av, av_profit, av_profitpercent);
       return end ;
     }

     getDataStep = (start, end, nb_point) => {
       var step = (end - start) / nb_point
       return step ;
     }

     getDataPlotP = (av, av_profit, av_profitpercent, nb_point) => {
       alert("111")
       av = Number(av);
       av_profit = Number(av_profit);
       av_profitpercent = Number(av_profitpercent);
       var start = this.getDataStart(av, av_profit, av_profitpercent);
       var end = this.getDataEnd(av, av_profit, av_profitpercent);
       var diff = end-start ;
       if(diff === 0){
         start-- ;
         end++;
       }
       else {
         start = start - diff * 0.1 ;
         end = end + diff * 0.1 ;
       }

      alert("222")
       var step = this.getDataStep(start, end, nb_point);
       var abcdefgh = this.get_abcdefgh();

       var x = [];
       var Px = [] ;
       var Ppercent = [] ;
       var PpercentMin = [] ;
       var PxMin = [] ;
       var Pav = [] ;
       var PavPercent = [] ;

       alert("333")
       var profitXAvail = this.getDataPx(av, abcdefgh);
       var profitPercentAvail = this.getDataPpercent(av, abcdefgh);
      alert("444")

       for (var i = start; i < end; i += step) {
         x.push(i);
         Px.push(this.getDataPx(i, abcdefgh));
         Ppercent.push(this.getDataPpercent(i, abcdefgh));
         PpercentMin.push(this.props.stateApp.minProfitPercent)
         PxMin.push(this.props.stateApp.minProfit)
         Pav.push(profitXAvail);
         PavPercent.push(profitPercentAvail)
       }
       alert("getDataPlotP")
       alert(JSON.stringify({x: x, Px: Px, Ppercent: Ppercent}))
       return {x: x, Px: Px, Ppercent: Ppercent, PpercentMin:PpercentMin, PxMin:PxMin, Pav:Pav, PavPercent:PavPercent}
     }

     // x = av = available at start
     // av2 = available at end
     getDataPx = (av, abcdefgh) => {
       // y = Px = av2 - av = av(acge -1) - bcge + dge - he - f
       var a = abcdefgh.a ;
       var b = abcdefgh.b ;
       var c = abcdefgh.c ;
       var d = abcdefgh.d ;
       var e = abcdefgh.e ;
       var f = abcdefgh.f ;
       var g = abcdefgh.g ;
       var h = abcdefgh.h ;

       var one = new bigdecimal.BigDecimal('1');
       av = new bigdecimal.BigDecimal(av);

       //var Px = av*(a*c*g*e - 1) - b*c*g*e + d*g*e - h*e - f ;
       var Px = ((((av.multiply(a.multiply(c).multiply(g).multiply(e).subtract(one))).subtract(b.multiply(c).multiply(g).multiply(e))).add(d.multiply(g).multiply(e))).subtract(h.multiply(e))).subtract(f) ;

       return Number(Px) ;
     }

     // x = av = available at start
     // av2 = available at end
     getDataPpercent = (av, abcdefgh) => {
       // y = Ppercent = av2/av = acge - (bcge - dge+he+f)/av

       var a = abcdefgh.a ;
       var b = abcdefgh.b ;
       var c = abcdefgh.c ;
       var d = abcdefgh.d ;
       var e = abcdefgh.e ;
       var f = abcdefgh.f ;
       var g = abcdefgh.g ;
       var h = abcdefgh.h ;

       av = new bigdecimal.BigDecimal(av);
       var hundred = new bigdecimal.BigDecimal('100');
       var one = new bigdecimal.BigDecimal('1');

       //var Ppercent = a*c*g*e - (b*c*g*e - d*g*e + h*e + f) / av ;

       var Ppercent_Plus1 = (a.multiply(c).multiply(g).multiply(e)).subtract(((b.multiply(c).multiply(g).multiply(e).subtract(d.multiply(g).multiply(e))).add(h.multiply(e)).add(f)).divide(av,10,bigdecimal.BigDecimal.ROUND_HALF_UP))

       var Ppercent_100 = (Ppercent_Plus1.subtract(one)).multiply(hundred);

       return Number(Ppercent_100) ;
     }


  render() {
    return (<div>{this.getResult()}</div>);
  }
}

export default Result;
