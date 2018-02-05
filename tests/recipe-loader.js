var expect = require("expect.js");
var recipeLoader = require("../recipe-loader.js");
var Ingredient = require("../ingredient.js");
var Quantity = require("../quantity.js");

(function(){
  "use strict";
  describe("recipeLoader", function(){
    
    var recipe;

    before(function( done ){
      recipeLoader.forURL( "http://allrecipes.com/recipe/7757/tiramisu-cheesecake/", function( r ){
        recipe = r;
        done();
      });
    });

    describe("when creating a recipe from a url", function( done ){
      
      this.timeout(10000);
      
      it("finds the name of the recipe", function(){
        expect( recipe.name ).to.equal("Tiramisu Cheesecake");
      });
      
      it("finds a list of ingredients", function(){
        expect( 
          recipe.ingredients.filter(function( ingredient ){
            return ingredient.name === "eggs";
          })[0]
        ).not.to.be(undefined);
        console.log( recipe.ingredients );
      });

    });
  });
})();
