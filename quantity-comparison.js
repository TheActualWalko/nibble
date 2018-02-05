var units = require("./units.js");
module.exports = (function(){
  "use strict";
  var quantityComparison = {

    getRatio : function( quantityA, quantityB ){
      var ratio = quantityA.count / quantityB.count;
      if( quantityA.unit === quantityB.unit ){
        return ratio;
      }else{
        return units.getConversionFactor( quantityB.unit, quantityA.unit ) * ( ratio );
      }
    }
  
  };
  return quantityComparison;
})();