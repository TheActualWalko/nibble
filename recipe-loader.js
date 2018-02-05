var pageLoader = require("./page-loader.js");
var Recipe     = require("./recipe.js");
var Ingredient = require("./ingredient.js");
var Quantity   = require("./quantity.js");
var units      = require("./units.js");
var promise    = require("./promise.js");
var _          = require("underscore");

module.exports = (function(){
  "use strict";

  var recipeLoader = {

    meaningless : [
      "package",
      "packages",
      "container",
      "square",
      "portion"
    ],

    forURL : function( url ){
      var p = promise( url );
      pageLoader.load( url ).success(function( $ ){
        var name = this.findName( $ );
        var ingredients = this.findIngredients( $ );
        var recipe = new Recipe( name, ingredients );
        p.succeed( recipe );
      }.bind(this));
      return p;
    },

    findName : function( $ ){
      return $(".recipe-summary__h1").text();
    },

    findIngredients : function( $ ){
      var ingredientsSelection = $(".recipe-ingredients .checkList__line span");
      return Object.keys( ingredientsSelection )
        .map(function( index ){
          var ingredientSpan = ingredientsSelection[ index ];
          return this.parseIngredient( $(ingredientSpan).text() );
        }.bind(this))
        .filter( function( ingredient ){
          return ingredient !== undefined;
        });
    },

    parseIngredient : function( text ){

      if( text.length > 500 ){
        return;
      }

      var numbers = text.match( /\d+\.?\d*/g );

      if( numbers == null ){
        return;
      }

      text = text.toLowerCase();

      var unit = units.findInText( text );
      if( unit === undefined ){
        return;
      }

      var count = numbers.reduce( function( acc, cur ){ return acc * cur; }, 1 );

      var name = text;

      this.meaningless
        .concat( Object.keys( units.byAlias ) )
        .concat( numbers )
        .forEach( function( word ){
          if( name.indexOf( word + " " ) === 0 ){
            name = name.replace( word + " ", "" );
          }
          if( name.indexOf( word + "(" ) === 0 ){
            name = name.replace( word + "(", "" );
          }
          name = name.split( " " + word + " " ).join(" ");
          name = name.split( " " + word + ")" ).join(" ");
          name = name.split( "(" + word + " " ).join(" ");
          name = name.split( "(" + word + ")" ).join(" ");
        });

      while( name.indexOf("  ") >= 0 ){
        name = name.replace("  ", " ");
      }
      if( _.first( name ) === " " ){
        name = name.slice(1);
      }
      if( _.last( name ) === " " ){
        name = name.slice(0,-1);
      }

      name = name.replace(/,/g, "");

      return new Ingredient( name, new Quantity( count, unit ) );

    }

  };
  return recipeLoader;
})();