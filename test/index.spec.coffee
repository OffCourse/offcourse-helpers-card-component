require './helpers'
CardHelpers = require("../src/index.js")

describe "Card Helpers", ->
  Given ->
    @helper = new CardHelpers()
    @schema = [ "bar", "baz", { meta: ["qux"] }, "plix", "hix" ]
    @model = { bar: "bar", qux: "flux", plix: "plox", hix: "hox" }
    @components = { plix: "plax", hix: "plax" }
    @handlers = { hix: "hax" }
  When -> @partitions = @helper.partition(@schema, @model, @components, @handlers)
  Then ->
    props = { type: "bar", data: "bar", component: undefined, handlers: undefined }
    expect(@partitions[0]).to.deep.equal(props)
  And ->
    props = { type: "baz", data: undefined, component: undefined, handlers: undefined }
    expect(@partitions[1]).to.deep.equal(props)
  And ->
    data = [{type: "qux", data: "flux"}]
    props = { type: "meta", data, component: undefined, handlers: undefined }
    expect(@partitions[2]).to.deep.equal(props)
  And ->
    props = { type: "plix", data: "plox", component: "plax", handlers: undefined }
    expect(@partitions[3]).to.deep.equal(props)
  And ->
    props = { type: "hix", data: "hox", component: "plax", handlers: "hax" }
    expect(@partitions[4]).to.deep.equal(props)
