module.exports = (function(){
  "use strict";

  var aliases = {
    self : [
      "ea",
      "each"
    ],
    cup : [
      "cups"
    ],
    tbsp : [
      "tablespoons",
      "tablespoon",
    ],
    tsp : [
      "teaspoons",
      "teaspoon"
    ],
    kg : [
      "kilograms",
      "kilogram",
    ],
    g : [
      "grams",
      "gram"
    ],
    lbs : [
      "pounds",
      "pound",
      "lb"
    ],
    l : [
      "liters",
      "liter",
      "litres",
      "litre"
    ],
    ml : [
      "milliliters",
      "milliliter",
      "millilitres",
      "millilitre"
    ],
    oz : [
      "ounces",
      "ounce"
    ]
  };

  var byAlias = {};

  Object.keys( aliases ).forEach( function( unit ){
    aliases[ unit ].forEach( function( alias ){
      byAlias[ alias ] = unit;
      byAlias[ unit ] = unit;
    });
  });

  var byType = {
    self : {
      self : 1
    },
    volumeOrWeight : {
      ml   : 1,
      l    : 1000,
      oz   : 29.5735,
      cup  : 236.588,
      tbsp : 14.7868,
      tsp  : 4.92892,
      g    : 1,
      kg   : 1000,
      lbs  : 1000*0.453592
    }
  };

  var byUnit = {};

  Object.keys( byType ).forEach( function( type ){
    Object.keys( byType[ type ] ).forEach( function( unit ){
      byUnit[ unit ] = {
        type        : type,
        conversion  : byType[ type ][ unit ]
      };
    });
  });

  var units = {

    list : Object.keys( byUnit ),

    byAlias : byAlias,

    byType : byType,

    byUnit : byUnit,

    findInText : function( text ){
      var longestUnitAlias = Object.keys( this.byAlias ).reduce( function( acc, cur ){
        if( text.toLowerCase().indexOf( cur ) >= 0 ){
          if( cur.length > acc.length ){
            return cur;
          }
        }
        return acc;
      }, "");
      return this.byAlias[ longestUnitAlias ];
    },

    getConversionFactor : function( unitA, unitB ){
      
      var unitAdata = this.byUnit[ unitA ];
      var unitBdata = this.byUnit[ unitB ];

      if( unitAdata == null ){
        throw new Error( "No unit " + unitA );
      }

      if( unitBdata == null ){
        throw new Error( "No unit " + unitB );
      }
      
      if( unitAdata.type !== unitBdata.type ){
        throw new Error( "Cannot convert from " + unitA + " to " + unitB );
      }
      
      var conversionFactor = unitBdata.conversion / unitAdata.conversion;

      return conversionFactor;

    }

  };

  return units;

})();