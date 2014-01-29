﻿module.exports = function (parser, contents) {

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