var grocerySearch = require("./grocery-search.js");
var quantityComparison = require("./quantity-comparison.js");
var promise = require("./promise.js");
module.exports = (function(){
  "use strict";
  var ingredientPrice = {
    forIngredient : function( ingredient ){
      var p = promise( "price for " + ingredient.name );
      grocerySearch.getPrice( 
        ingredient
      ).success( function( price, quantity ){
        var scaledPrice = quantityComparison.getRatio( ingredient.quantity, quantity ) * price;
        p.succeed( scaledPrice );
      } ).error( p.fail );
      return p;
    }
  };
  return ingredientPrice;
})();