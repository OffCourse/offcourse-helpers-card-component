require './helpers'
CardHelpers = require("../src/index.js")

describe "Card Helpers", ->
  Given ->
    @helper = new CardHelpers()
  When ->
    @schema = [
      "bar",
      "baz",
      { meta: ["qux"] },
      "plix"
    ]
    @model =
      bar: "bar"
      qux: "flux"
      plix: "plox"
    @components =
      plix: "plax"

    @partitions = @helper.partition(@schema, @model, @components)
  Then ->
    @type = "bar" 
    @data = "bar"
    expect(@partitions[0]).to.deep.equal({ @type, @data })

  And ->
    @type = "baz" 
    @data = undefined 
    expect(@partitions[1]).to.deep.equal({ @type, @data })

  And ->
    @type = "meta" 
    @data = [
      title: "qux"
      value: "flux"
    ]
    expect(@partitions[2]).to.deep.equal({ @type, @data })

  And ->
    @type = "plix" 
    @data = "plox"
    @component = "plax"
    expect(@partitions[3]).to.deep.equal({ @type, @data, @component })
