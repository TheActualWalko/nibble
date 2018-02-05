var recipeLoader = require("../recipe-loader.js");
var ingredientPrice = require("../ingredient-price.js");
(function(){
  "use strict";
  recipeLoader.forURL(
    "http://allrecipes.com/recipe/7757/tiramisu-cheesecake/"
  ).success( function( recipe ){
      var total = 0;
      var waiting = 0;
      recipe.ingredients.forEach( function( ingredient ){
        waiting ++;
        ingredientPrice.forIngredient( ingredient ).success( function( price ){
          total += price;
          console.log( ingredient.name + ": $" + price.toFixed(2) );
          waiting --;
          if( waiting === 0 ){
            console.log( "\nTOTAL: $" + total.toFixed(2) );
          }
        }).error( function( message ){
          console.log( message );
        });
      });
    }
  );
})();