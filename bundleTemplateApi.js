(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            
           
            var parsedKeys = stringToParse.match(/{%\s*([\w\d\s\-\.]*)\s*%}/g)

            console.log( parsedKeys )


            var words = parsedKeys[1].split(/\s+/)





            for (key in functionMapping) {

                for (word in words) {

                    if (word == key) {

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


},{}],2:[function(require,module,exports){
module.exports = function (parser, contents) {

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