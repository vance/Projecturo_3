//var dotPath = require('vance-dot-path-search')
//var templateModule = require('./templateModule') // i know, sucks to be local

var languageModule = function (functionMapping) {


    var parser
    


    var Parser = function () {
    }
    Parser.prototype.parse = function (objMapping) {
        console.log("Internal Parse. Now What?");

        // look for endfor

        //single word token
        match = this.stringToParse.match(/\{\%\s*[\w]+\s*\%\}/g)


        for (key in objMapping) {

            for (m in match) {

                if (m == key) {

                    console.log("LAST " + objMapping[key]);
                }
                    //arguments.callee.caller.call(objMapping[key]);

            }


        }


        // look for endif 


    }
    //////////////// lookup(str) -> function(obj) -> str
    Parser.prototype.lookup = function (str) {

        // I guess i'm not sure what to return here

        // in the tagFor context I try pumping in "items" to return the designated content object
        // but it wants to invoke like a function


        return this.contentObject[str]
    }
    Parser.prototype.mappingObject;

    parser  = new Parser()

    /////////////// instantiate Parser with the mapping object when the exported function is called
    parser.mappingObject = functionMapping;


    ///////////////// the language module returns a function representing a compiler for strings in that language
    return function (stringToParse) {
        // this is a compiler

        parser.stringToParse = stringToParse;

        var parsedKeys         
          , output
      
        


        return function ( contentObject ) {

            parser.contentObject = contentObject
            


            /////////////// match tags by specified {% %} selector
            var match = stringToParse.match(/{%\s*([\w\d\s\-\.]*)\s*%}/)
            var firstWord = match[1].split(/\s+/)[0]

            

            for (key in functionMapping) {

                console.log(key + " == " + firstWord);

                /////////////// see if there's a tag parser function defined by the first word in match[1]
                if (key == firstWord) {

                    var foundFunc = functionMapping[key];

                    ///////////call that tag parser function with itself and match[1]
                    var parserTag = foundFunc(parser, match[1]);

                    parserTag("items");
                    // where "that" = mapped function. Is "itself" also "that". This is ambiguous. IT should be "our parser" and match[1] since lookup is not defined on the example

                }

            }

        }




    }

}


// do the export so node is happy
module.exports = languageModule

