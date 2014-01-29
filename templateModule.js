
//note i used templateModule instead of index for clarity (I know its against the project spec)
var templateModule = function () {
    
    if (typeof arguments[0] === 'string') {

            originalString = arguments[0]

            return function (obj) {

                if (originalString != null) {

                    var tempString
                    modifiedString = originalString

                    //bracket-bracket-space-word (if we want to do sub-props look for dots with \.) space-bracket-bracket
                    var subStrings = originalString.match(/\{\{\s*[\w]+\s*\}\}/g);
                    console.log(subStrings)

                    for (var i = 0; i < subStrings.length; i++) {
                        var foundKey = subStrings[i].match(/[\w\.]+/)[0];
                        // loop on params
                        for (var prop in obj) {
                            if (prop.valueOf().trim() == foundKey.trim()) {
                                // ah, now replace the whole shabang including braces
                                modifiedString = modifiedString.replace(subStrings[i], obj[prop]);
                            }
                        }

                    }

                    return modifiedString;

                } else throw new Error("templateModule needs to be initialized with a string")
            }
    }
}


// do the export so node is happy
module.exports = templateModule

