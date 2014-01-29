(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
module.exports = function (parser, contents) {

    console.log("In for parser");

    var bits = contents.split(/\s+/)  // ["for", "item", "in", "items"]
      , contextTarget = bits[1]
      , lookupContextVariable = parser.lookup(bits[3])
      , forBody
      , emptyBody

    parser.parse({
        'endfor': endfor
      , 'empty': empty
    })

    console.log( lookupContextVariable);


    return function (context) {

        console.log("<><><>WHats my context " + context);

        var target = lookupContextVariable(context)
          , output = []
          , loopContext

        if (!target || !target.length) {
            return emptyBody ? emptyBody(context) : ''
        }

        for (var i = 0, len = target.length; i < len; ++i) {
            loopContext = Object.create(context)
            loopContext[contextTarget] = target[i]
            loopContext.forloop = {
                parent: loopContext.forloop
              , index: i
              , isfirst: i === 0
              , islast: i === len - 1
              , length: len
            }
            output.push(forBody(loopContext))

            console.log("push to output");
        }

        return output.join('')
    }

    function empty(tpl) {
        console.log("empty()");
        forBody = tpl
        parser.parse({ 'endfor': endfor })
    }

    function endfor(tpl) {

        console.log("endfor()");

        if (forBody) {
            emptyBody = tpl
        } else {
            forBody = tpl
        }
    }
}
},{}],3:[function(require,module,exports){
var templateString = "<ul>{% for item in items %}<li>{% if item.okay %}it's okay{% else %}it's not okay{% endif %}</li>{% endfor %}</ul>{{ message }}"


var language = require('./languageModule')
  //, if_tag = require('./tagIf')
  , for_tag = require('./tagFor')
  , compile
  , template

compile = language({
    //'if': if_tag
   'for': for_tag
})


template = compile(templateString)

template({
    items: [{ okay: true }, { okay: false }]
  , message: "hello world"
}) // should render the above template
},{"./languageModule":1,"./tagFor":2}]},{},[3])