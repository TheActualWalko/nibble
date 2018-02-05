var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
var promise = require("./promise.js");

module.exports = (function(){
  "use strict";
  var pageLoader = {
    load : function( url, callback ){
      var p = promise(url);
      var protocol;
      if( url.indexOf("https") === 0 ){
        protocol = https;
      }else{
        protocol = http;
      }
      protocol.get( 
        url,
        function( response ){
          var page = "";
          response.setEncoding("utf8");
          response.on("data", function (chunk) {
              page += chunk;
          });

          response.on("end", function () {
            var $ = cheerio.load( page );
            p.succeed( $ );
          }.bind(this));
        }.bind(this)
      );
      return p;
    }
  };
  return pageLoader;
})();