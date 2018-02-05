var units = require("./units.js");
module.exports = (function(){
  "use strict";
  var Quantity = function( count, unit ){
    this.count = parseInt( count );
    this.unit  = unit;
    if( isNaN( this.count ) ){
      throw new Error( "Invalid count: " + count );
    }
    if( units.list.indexOf( unit ) < 0 ){
      throw new Error( "Invalid unit: " + unit );
    }
  };
  Quantity.prototype = {

  };
  return Quantity;
})();