module.exports = (function(){
  "use strict";
  var Ingredient = function( name, quantity ){
    this.name = name;
    this.quantity = quantity;
  };
  Ingredient.prototype = {

  };
  return Ingredient;
})();