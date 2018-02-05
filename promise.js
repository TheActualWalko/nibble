var _ = require("underscore");
module.exports = (function(){
  "use strict";
  return function( url ){
    
    var promise = { url : url };

    promise.successCallbacks = [
      function( response ){
        if( promise.successCallbacks.length === 1 ){
          var responseToLog = response;
          if( _.isString( response ) && response.length > 50 ){
            responseToLog = response.substr( 0, 47 ) + "...";
          }
          console.log( "C <--- S Default Success Callback:", url, responseToLog );
        }
      }
    ];
    promise.errorCallbacks = [
      function( response ){
        if( promise.errorCallbacks.length === 1 ){
          var errorMessage = response;
          if( _.isObject( errorMessage ) && errorMessage.message != null ){
            errorMessage = errorMessage.message;
          }
          console.log( "C <--- S Default Error Callback:", url, response );
          throw new Error( errorMessage );
        }
      }
    ];

    promise.succeed = function(){
      var args = [];
      for( var i = 0; i < arguments.length; i ++ ){
        args.push( arguments[i] );
      }
      promise.succeeded = true;
      promise.responseArgs = args;
      promise.successCallbacks.forEach( function( callback ){ callback.apply( this, args ); } );
    };
    
    promise.fail = function(){
      var args = [];
      for( var i = 0; i < arguments.length; i ++ ){
        args.push( arguments[i] );
      }
      promise.failed = true;
      promise.responseArgs = args;
      promise.errorCallbacks.forEach( function( callback ){ callback.apply( this, args ); } );
    };

    promise.success = function( callback ){
      promise.successCallbacks.push( callback );
      return promise;
    };
    promise.error = function( callback ){
      promise.errorCallbacks.push( callback );
      return promise;
    };

    return promise;
  };
})();