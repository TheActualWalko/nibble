var Quantity = require("./quantity.js");
var pageLoader = require("./page-loader.js");
var units = require("./units.js");
var promise = require("./promise.js");
module.exports = (function(){
  "use strict";
  var grocerySearch = {
    getPrice : function( ingredient, callback ){
      var url = "https://www.iga.net/en/search?k=" + ingredient.name;
      var p = promise( url );
      pageLoader.load( url ).success( function( $ ){
        var pricePerUnitElement = this.findPricePerUnitElement( $ );
        if( pricePerUnitElement.text() === "" ){
          p.fail( "No price found for ingredient " + ingredient.name );
          return;
        }
        var quantity = this.parseQuantity( pricePerUnitElement.text() );
        var price = this.parsePrice( pricePerUnitElement.text() );
        p.succeed( price, quantity );
      }.bind(this));
      return p;
    },
    parseQuantity : function( string ){
      var count = 1;
      var unit = units.findInText( string );
      return new Quantity( count, unit );
    },
    parsePrice : function( string ){
      return (string.replace("$","").split(" / ")[0]) * 1;
    },
    findPricePerUnitElement : function( $ ){
      var element = $( $(".item-product__content.push--top .item-product__info.push--top:not(.soft-half--bottom) .text--small")[ 0 ]);
      return element;
    }
  };
  return grocerySearch;
})();