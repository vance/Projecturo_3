//var dotPath = require('vance-dot-path-search')
//var templateModule = require('./templateModule') // i know, sucks to be local

var languageModule = function (functionMapping) {


    return function (stringToParse) {

        var parsedKeys
          , parser
          , output
          , contentObject


        var result = "";

        var Parser = function () {
          
           
        }
        Parser.prototype.parse = function (objMapping ) {
            
            console.log(objMapping );

            var pk = stringToParse.match( /{%\s*([\w\d\s\-\.]*)\s*%}/ )
           
            console.log("pk " + pk);

            var w = pk[1].split( /\s+/)

            for (key in objMapping) {

                if (w[0] == key) {

                   var foundParserFunc = objMapping[key];

                   foundParserFunc( "endif" );

                }
            }


        }
        Parser.prototype.lookup = function (str) {
            return this.contentObject[str] 
        }
        Parser.prototype.contentObject;

        var parser = new Parser()
        



        return function ( p_contentObject ) {

            contentObject = p_contentObject

            parser.contentObject = contentObject;
            
           
            var lexicalPhrases = stringToParse.match(/{%\s*([\w\d\s\-\.]*)\s*%}/g)

            console.log( parsedKeys )


            for (phrase in lexicalPhrase) {

                var potentialOperator = phrase.replace('{%', '').replace('%}', '');


                var words = potentialOperator.split('/\s+/')

                if( words[0] == functionMapping[ words

                        var foundParserFunc = functionMapping[key];

                        result += foundParserFunc(parser, parsedKeys[1]);

                        console.log("a key");

                    }
                }
            }





         //   parser.parse(contentObject);

            console.log(result);


        }




    }

}


// do the export so node is happy
module.exports = languageModule

