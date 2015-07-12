require './helpers'
CardHelpers = require("../src/index.js")

describe "Card Helpers", ->
  Given ->
    @helper = new CardHelpers()
  When ->
    @schema = ["bar", "baz", {foo: ["qux","flux"]}]
    @model =
      bar: "bar"
      qux: "qux"
    @partitions = @helper.partition(@schema, @model)
  Then ->
    @type = "bar" 
    @fields = [["bar", "bar"]]
    expect(@partitions[0]).to.deep.equal({ @type, @fields })
  Then ->
    @type = "baz" 
    @fields = [["baz", undefined]]
    expect(@partitions[1]).to.deep.equal({ @type, @fields })
  Then ->
    @type = "foo" 
    @fields = [["qux", "qux"], ["flux", undefined]]
    expect(@partitions[2]).to.deep.equal({ @type, @fields })
