var _ = require("underscore");
var expect = require("expect.js");
var sinon = require("sinon");
var Quantity = require("../quantity.js");
var Ingredient = require("../ingredient.js");
var grocerySearch = require("../grocery-search.js");
var ingredientPrice = require("../ingredient-price.js");

(function(){
  "use strict";

  describe("ingredientPrice", function(){

    var sandbox;
    var halfKiloHam   = new Ingredient( "ham",       new Quantity( 500, "g" ) );
    var kiloHam       = new Ingredient( "ham",       new Quantity( 1, "kg" ) );
    var litreWater    = new Ingredient( "water",     new Quantity( 1, "l" ) );
    var kiloEscargots = new Ingredient( "escargots", new Quantity( 1, "kg" ) );


    beforeEach(function(){
      sandbox = sinon.sandbox.create();
      var searchStub = sandbox.stub( grocerySearch, "getPrice" );
      searchStub.withArgs( halfKiloHam, sinon.match.any )  .callsArgWith( 1, 3.75, new Quantity( 500, "g" ) );
      searchStub.withArgs( kiloHam,     sinon.match.any )  .callsArgWith( 1, 3.75, new Quantity( 500, "g" ) );
      searchStub.withArgs( kiloEscargots, sinon.match.any ).callsArgWith( 1, 1000, new Quantity( 1, "kg" ) );
      searchStub.withArgs( litreWater, sinon.match.any )   .callsArgWith( 1, 0,    new Quantity( 1, "l" ) );
    });

    afterEach(function(){
      sandbox.restore();
    });

    it( "returns a large number for expensive ingredients", function( done ){
      ingredientPrice.forIngredient( kiloEscargots, function( price ){
        expect( price ).to.equal( 1000 );
        done();
      });
    });
    
    it( "returns a small number for inexpensive ingredients", function( done ){
      ingredientPrice.forIngredient( litreWater, function( price ){
        expect( price ).to.equal( 0 );
        done();
      });
    });

    it( "scales price by ingredient quantity", function( done ){
      ingredientPrice.forIngredient( halfKiloHam, function( regHamPrice ){
        ingredientPrice.forIngredient( kiloHam, function( bigHamPrice ){
          expect( regHamPrice ).to.equal( 3.75 );
          expect( bigHamPrice ).to.equal( 7.50 );
          done();
        });
      });
    });

  });
})();
