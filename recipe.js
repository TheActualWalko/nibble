module.exports = (function(){
  "use strict";
  var Recipe = function( name, ingredients ){
    this.name = name;
    this.ingredients = ingredients;
  };
  return Recipe;
})();