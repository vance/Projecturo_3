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