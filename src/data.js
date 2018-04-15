var binance = require('./data/binance.json');
var binanceBNB = require('./data/binanceBNB.json');
var bitfinex0 = require('./data/bitfinex0.json');
var bitfinex1000 = require('./data/bitfinex1000.json');
var bitz = require('./data/bitz.json');
var yobit = require('./data/yobit.json');
var kraken = require('./data/kraken.json');
var kucoin = require('./data/kucoin.json');

var bittrex = require('./data/bittrex.json');
var cryptopia = require('./data/cryptopia.json');
var hitbtc_maker = require('./data/hitbtc_maker.json');
var hitbtc_taker = require('./data/hitbtc_taker.json');
var poloniex = require('./data/poloniex.json');

var jsonQuery = require('json-query')
 


var dataFile = [
  binance, 
  binanceBNB, 
  bitfinex0,  
  bitfinex1000, 
  bitz,
  yobit,
  kraken,
  kucoin,
  bittrex,
  cryptopia,
  hitbtc_maker,
  hitbtc_taker,
  poloniex
]

var pathRoot = "./" ;


var self = module.exports = {
  
  getData: function() { 
    var dataContent = [];
    for (let i = 0; i < dataFile.length; i++) {
      dataContent.push(dataFile[i]);
    }
    return dataContent ;
  },
  
  getAllPlaces: function(dataContent) {
    var places = [];
    for (let i = 0; i < dataContent.length; i++) {
      places.push(dataContent[i].place);
    }
    return places;
  },
  
  getAllDistinctCoinsOfAllPlaces: function(dataContent) {
    var coins = [];
    for (let i = 0; i < dataContent.length; i++) {
      if(dataContent[i].listCrypto){
	var currentPlaceCoins = dataContent[i].listCrypto ;
	
	for (let j = 0; j < currentPlaceCoins.length; j++) {
	  var currentCoin = currentPlaceCoins[j].symbol ;
	  coins.push(currentCoin);
	}
      }
    }
    coins = coins.sort();
    coins.unshift('custom2');
    coins.unshift('custom1');
    var uniqueCoins = coins.filter((v, i, a) => a.indexOf(v) === i); 
    return uniqueCoins;
  },
  
  getPlaceContentFromName: function(dataContent, placename) {
    return jsonQuery('[place=' + placename + ']', {data: dataContent}).value ;
  },
  
  getAllCrypto: function(placeContent, place) {
    var cryptoList = placeContent.listCrypto.slice();
    cryptoList.push('custom');
    return cryptoList ;
  },
  
  getTradingFees: function(placeContent, currency) {
    var ret = {};
    if(placeContent.tradingAll && (placeContent.tradingAll.Fees || placeContent.tradingAll.Fees===0 || placeContent.tradingAll.Fees==='0')){
      ret.tradingFees = placeContent.tradingAll.Fees
      if(placeContent.tradingAll.badCryptoFees && placeContent.tradingAll.badCryptoFees != ""){
	ret.status = "Trading fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.tradingAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.trading}).value ;
      if(coinInfo){
	ret.tradingFees = coinInfo.Fees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Trading fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.tradingFees = 0 ;
	ret.status = "Trading fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
      }
    }
    
    return ret ;
  },
  
  getTradingFeesPercent: function(placeContent, currency) {
    var ret = {};
    if(placeContent.tradingAll && (placeContent.tradingAll.PercentFees || placeContent.tradingAll.PercentFees==="0" || placeContent.tradingAll.PercentFees===0)){
      ret.tradingFeesPercent = placeContent.tradingAll.PercentFees
      if(placeContent.tradingAll.badCryptoFees != ""){
	ret.status = "Trading fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.tradingAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.trading}).value ;
      if(coinInfo){
	ret.tradingFeesPercent = coinInfo.PercentFees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Trading fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.tradingFeesPercent = 0 ;
	ret.status = "Trading fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getTradingFeesLink(placeContent));
      }
    }
    return ret ;
  },
  
    getDepositFees: function(placeContent, currency) {
    var ret = {};
    if(placeContent.depositAll && (placeContent.depositAll.Fees || placeContent.depositAll.Fees===0 || placeContent.depositAll.Fees==='0')){
      ret.depositFees = placeContent.depositAll.Fees
      if(placeContent.depositAll.badCryptoFees != ""){
	ret.status = "Deposit fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.depositAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.deposit}).value ;
      if(coinInfo){
      ret.depositFees = coinInfo.Fees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Deposit fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.depositFees = 0 ;
	ret.status = "Deposit fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
      }
    }
    return ret ;
  },
  
    getDepositFeesPercent: function(placeContent, currency) {
    var ret = {};
    if(placeContent.depositAll && (placeContent.depositAll.PercentFees || placeContent.depositAll.PercentFees==='0' || placeContent.depositAll.PercentFees===0)){
      ret.depositFeesPercent = placeContent.depositAll.PercentFees
      if(placeContent.depositAll.badCryptoFees != ""){
	ret.status = "Deposit fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.depositAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.deposit}).value ;
      if(coinInfo){
	ret.depositFeesPercent = coinInfo.PercentFees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Deposit fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.depositFeesPercent = 0 ;
	ret.status = "Deposit fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getDepositFeesLink(placeContent));
      }
    }
    return ret ;
  },

  
    getWithdrawFees: function(placeContent, currency) {
    var ret = {};
    if(placeContent.withdrawAll && (placeContent.withdrawAll.Fees || placeContent.withdrawAll.Fees==='0' || placeContent.withdrawAll.Fees===0)){
      ret.withdrawFees = placeContent.withdrawAll.Fees
      if(placeContent.withdrawAll.badCryptoFees != ""){
	ret.status = "Withdraw fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.withdrawAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.withdraw}).value ;
      if(coinInfo){
	ret.withdrawFees = coinInfo.Fees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Withdraw fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.withdrawFees = 0 ;
	ret.status = "Withdraw fee was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
      }
    }
    return ret ;
  },
  
    getWithdrawFeesPercent: function(placeContent, currency) {
    var ret = {};
    if(placeContent.withdrawAll && (placeContent.withdrawAll.PercentFees || placeContent.withdrawAll.PercentFees==="0" || placeContent.withdrawAll.PercentFees===0)){
      ret.withdrawFeesPercent = placeContent.withdrawAll.PercentFees
      if(placeContent.withdrawAll.badCryptoFees != ""){
	ret.status = "Withdraw fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + placeContent.withdrawAll.badCryptoFees + " " + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
      }
      else{
	ret.status = "ok"
      }
    }
    else{
      var coinInfo = jsonQuery('[symbol=' + currency + ']', {data: placeContent.withdraw}).value ;
      if(coinInfo){
	ret.withdrawFeesPercent = coinInfo.PercentFees;
	if(coinInfo.badCryptoFees != ""){
	  ret.status = "Withdraw fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want. Maybe this info could help : " + coinInfo.badCryptoFees + " " + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
	}
	else{
	  ret.status = "ok"
	}
      }
      else{
	ret.withdrawFeesPercent = 0 ;
	ret.status = "Withdraw fee% was not found in our system (coin may not exist on the exchange) or not possible to compute, but you can put what ever you want." + self.getHelpLinkIfExists(self.getWithdrawFeesLink(placeContent));
      }
    }
    return ret ;
  },
  
  getPlaceLastUpdate: function(placeContent) {
    return placeContent.updateTimestamp;
  },
  
  getHumanTimestamp: function(timestamp) {
    var d = new Date(timestamp);
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var day = d.getDate();
    return year + "/" + month + "/" + day ;
  },
  
  getDepositFeesLink: function(placeContent) {
   if(placeContent.feesDepositLink){
      return placeContent.feesDepositLink ;
   }
   else{
      return "";
   }
  },
  
  getWithdrawFeesLink: function(placeContent) {
   if(placeContent.feesWithdrawLink){
      return placeContent.feesWithdrawLink ;
   }
   else{
      return "";
   }
  },
  
  getTradingFeesLink: function(placeContent) {
   if(placeContent.feesTradingLink){
      return placeContent.feesTradingLink ;
   }
   else{
      return "";
   }
  },
  
  getHelpLinkIfExists(link){
    if(link != ""){
      return "You may find more information about fees here " + link ; 
    }
    else{
      return "";
    }
  },
  
  getExchangeInfo: function(placeContent) {
   if(placeContent.comment){
      return placeContent.comment + " Was last updated on the " +  self.getHumanTimestamp(self.getPlaceLastUpdate(placeContent))
   }
   else{
      return placeContent.place + " Was last updated on the " +  self.getHumanTimestamp(self.getPlaceLastUpdate(placeContent))
   }
  },
  
  transformCryptopiaData(dataAPI){
    var fileData = {} ;
    fileData.place = "Cryptopia";
    fileData.comment = "Cryptopia : use API to get withdraw fees";
    fileData.updateTimestamp = Date.now();
    fileData.depositAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0};
    fileData.tradingAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0.2};
    fileData.feesDepositLink = "";
    fileData.feesWithdrawLink = "https://www.cryptopia.co.nz/api/GetCurrencies";
    fileData.feesTradingLink = "https://www.cryptopia.co.nz/api/GetTradePairs";
    
    var withdraw = [] ;
    fileData.withdraw = withdraw;
    var coinsList = [];
    fileData.listCrypto = coinsList;
    
    for (let i = 0; i < dataAPI.Data.length; i++) {
      var currentData = dataAPI.Data[i];
      var currentCoin = currentData.Symbol ;
      var currentFees = currentData.WithdrawFee ;
      
      coinsList.push(currentCoin);
      
      var currentWithdraw = {};
      if(currentFees){
	currentWithdraw.Fees = Number(currentFees) ;
      }
      else{
	currentWithdraw.Fees = 0 ;
      }
      currentWithdraw.badCryptoFees = "" ;
      currentWithdraw.PercentFees = 0 ;
      currentWithdraw.symbol = currentCoin ;
      
      withdraw.push(currentWithdraw);
    }
    return fileData;
  },
  
  transformBittrexData(dataAPI){
    var fileData = {} ;
    fileData.place = "Bittrex";
    fileData.comment = "Bittrex : use API to get withdraw fees";
    fileData.updateTimestamp = Date.now();
    fileData.depositAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0};
    fileData.tradingAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0.25};
    fileData.feesDepositLink = "https://support.bittrex.com/hc/en-us/articles/115000199651-What-fees-does-Bittrex-charge-";
    fileData.feesWithdrawLink = "https://bittrex.com/api/v1.1/public/getcurrencies";
    fileData.feesTradingLink = "https://support.bittrex.com/hc/en-us/articles/115000199651-What-fees-does-Bittrex-charge-";
    
    var withdraw = [] ;
    fileData.withdraw = withdraw;
    var coinsList = [];
    
    for (let i = 0; i < dataAPI.result.length; i++) {
      var currentData = dataAPI.result[i];
      var currentCoin = currentData.Currency ;
      var currentFees = currentData.TxFee ;
      
      coinsList.push(currentCoin);
      
      var currentWithdraw = {};
      if(currentFees){
	currentWithdraw.Fees = Number(currentFees) ;
      }
      else{
	currentWithdraw.Fees = 0 ;
      }
      currentWithdraw.badCryptoFees = "" ;
      currentWithdraw.PercentFees = 0 ;
      currentWithdraw.symbol = currentCoin ;
      
      withdraw.push(currentWithdraw);
    }
    fileData.listCrypto = coinsList;
    return fileData;
  },
  
  transformHitBTCDataTaker(dataAPI){
    var fileData = {} ;
    fileData.place = "HitBTC";
    fileData.comment = "HitBTC : use API to get withdraw fees";
    fileData.updateTimestamp = Date.now();
    fileData.depositAll = {"Fees":0, "badCryptoFees":"Check it ! A fixed fee for BTC, ETH, USDT and all tokens deposits is to be charged. https://support.hitbtc.com/hc/en-us/articles/360000702025-Deposit-fees : Flat fee for BTC deposits amounts to 0.0006 BTC for each deposit of this currency disregarding the amount of deposit.", "PercentFees":0};
    fileData.tradingAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0.1};
    fileData.feesDepositLink = "https://blog.hitbtc.com/introducing-deposit-fees-for-bitcoin/";
    fileData.feesWithdrawLink = "https://api.hitbtc.com/api/2/public/currency";
    fileData.feesTradingLink = "https://hitbtc.com/fees-and-limits";
    
    var withdraw = [] ;
    fileData.withdraw = withdraw;
    var coinsList = [];
    
    for (let i = 0; i < dataAPI.length; i++) {
      var currentData = dataAPI[i];
      var currentCoin = currentData.id ;
      var currentFees = currentData.payoutFee ;
      
      coinsList.push(currentCoin);
      
      var currentWithdraw = {};
	
      if(currentFees){
	currentWithdraw.Fees = Number(currentFees) ;
      }
      else{
	currentWithdraw.Fees = 0 ;
      }
      currentWithdraw.badCryptoFees = "" ;
      currentWithdraw.PercentFees = 0 ;
      currentWithdraw.symbol = currentCoin ;
      
      withdraw.push(currentWithdraw);
    }
    fileData.listCrypto = coinsList;
    return fileData;
  },
  
  transformHitBTCDataMaker(dataAPI){
    var fileData = {} ;
    fileData.place = "HitBTC";
    fileData.comment = "HitBTC : use API to get withdraw fees";
    fileData.updateTimestamp = Date.now();
    fileData.depositAll = {"Fees":0, "badCryptoFees":"Check it ! A fixed fee for BTC, ETH, USDT and all tokens deposits is to be charged. https://support.hitbtc.com/hc/en-us/articles/360000702025-Deposit-fees : Flat fee for BTC deposits amounts to 0.0006 BTC for each deposit of this currency disregarding the amount of deposit.", "PercentFees":0};
    fileData.tradingAll = {"Fees":0, "badCryptoFees":"", "PercentFees":-0.01};
    fileData.feesDepositLink = "https://blog.hitbtc.com/introducing-deposit-fees-for-bitcoin/";
    fileData.feesWithdrawLink = "https://api.hitbtc.com/api/2/public/currency";
    fileData.feesTradingLink = "https://hitbtc.com/fees-and-limits";
    
    var withdraw = [] ;
    fileData.withdraw = withdraw;
    var coinsList = [];
    
    for (let i = 0; i < dataAPI.length; i++) {
      var currentData = dataAPI[i];
      var currentCoin = currentData.id ;
      var currentFees = currentData.payoutFee ;
      
      coinsList.push(currentCoin);
      
      var currentWithdraw = {};
      if(currentFees){
	currentWithdraw.Fees = Number(currentFees) ;
      }
      else{
	currentWithdraw.Fees = 0 ;
      }
      currentWithdraw.badCryptoFees = "" ;
      currentWithdraw.PercentFees = 0 ;
      currentWithdraw.symbol = currentCoin ;
      
      withdraw.push(currentWithdraw);
    }
    fileData.listCrypto = coinsList;
    return fileData;
  },
  
  transformPoloniexData(dataAPI){
    var fileData = {} ;
    fileData.place = "Poloniex";
    fileData.comment = "Poloniex : use API to get withdraw fees";
    fileData.updateTimestamp = Date.now();
    fileData.depositAll = {"Fees":0, "badCryptoFees":"", "PercentFees":0};
    fileData.tradingAll = {"Fees":0, "badCryptoFees":"% depends on volume and maker/taker", "PercentFees":0};
    fileData.feesDepositLink = "https://poloniex.freshdesk.com/support/solutions/articles/1000229324-are-there-fees-for-using-poloniex-";
    fileData.feesWithdrawLink = "https://poloniex.com/public?command=returnCurrencies";
    fileData.feesTradingLink = "https://poloniex.com/fees/";
    
    var withdraw = [] ;
    fileData.withdraw = withdraw;
    var coinsList = []; 
    fileData.listCrypto = coinsList;
    
    Object.keys(dataAPI).forEach(function(key) {
      var currentCoin = key
      var currentFees = dataAPI[key].txFee ;
      coinsList.push(currentCoin);
      var currentWithdraw = {};
      
      if(currentFees){
	currentWithdraw.Fees = Number(currentFees) ;
      }
      else{
	currentWithdraw.Fees = 0 ;
      }
      currentWithdraw.badCryptoFees = "" ;
      currentWithdraw.PercentFees = 0 ;
      currentWithdraw.symbol = currentCoin ;
      
      withdraw.push(currentWithdraw);
    });  
    return fileData;
  }
}