var expect = require("expect.js");
var quantityComparison = require("../quantity-comparison.js");
var Quantity = require("../quantity.js");

(function(){
  "use strict";
  describe("quantityComparison", function(){
    var threeKilos = new Quantity( 3, "kg" );
    var twoThousandGrams = new Quantity( 2000, "g" );
    var oneLitre = new Quantity( 1, "l" );

    it("gives the ratio between two quantities", function(){
      expect( quantityComparison.getRatio( threeKilos, twoThousandGrams ) ).to.equal( 3/2 );
    });
  
    it("throws an error if quantities cannot be compared", function(){
      expect( function(){
        quantityComparison.getRatio( threeKilos, oneLitre );
      } ).to.throwException();
    });
  
  });
})();
