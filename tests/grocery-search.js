var expect = require("expect.js");
var grocerySearch = require("../grocery-search.js");
var Ingredient = require("../ingredient.js");
var Quantity = require("../quantity.js");

(function(){
  "use strict";
  return;
  describe("grocerySearch", function(){
    it("finds a price given a search term", function( done ){
      this.timeout(10000);
      grocerySearch.getPrice( new Ingredient( "ham", new Quantity( 1, "kg" ) ) )
        .success(function( price, quantity ){
          expect( price ).to.equal(6.79);
          expect( quantity.unit ).to.equal( "lbs" );
          expect( quantity.count ).to.equal( 1 );
          done();
        });
    });
  });
})();
