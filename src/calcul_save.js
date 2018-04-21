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
