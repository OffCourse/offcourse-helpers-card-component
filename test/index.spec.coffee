require './helpers'
CardHelpers = require("../src/index.js")

describe "Card Helpers", ->
  Given -> @helper = new CardHelpers()

  describe "simple mapping", ->
    Given ->
      @schema =
        bar: {}
        baz: {}
      @model = { bar: "bar" }
    When -> @partitions = @helper.partition(@schema, @model)
    Then ->
      props = { type: "bar", data: "bar", component: undefined, handlers: undefined }
      expect(@partitions[0]).to.deep.equal(props)
    Then ->
      props = { type: "baz", data: undefined, component: undefined, handlers: undefined }
      expect(@partitions[1]).to.deep.equal(props)

  describe "multiple fields", ->
    Given ->
      @schema =
        foo: { fields: ["bar", "flux"] }
      @model = { bar: "bar" }
    When -> @partitions = @helper.partition(@schema, @model)
    And ->
        data = [{type: "bar", data: "bar"}, {type: "flux", data: undefined}]
        props = { type: "foo", data, component: undefined, handlers: undefined }
        expect(@partitions[0]).to.deep.equal(props)

  describe "aliased field", ->
    Given ->
      @schema =
        foo: { fields: "bar", component: "FOO" }
      @model = { bar: "bar" }
    When -> @partitions = @helper.partition(@schema, @model)
    And ->
      props = { type: "foo", data: "bar", component: "FOO", handlers: undefined }
      expect(@partitions[0]).to.deep.equal(props)

  describe "with component", ->
    Given ->
      @schema =
        foo: { fields: { bar: "blah" } }
      @model = { bar: "bar" }
    When -> @partitions = @helper.partition(@schema, @model)
    And ->
      data = { blah: "bar" };
      props = { type: "foo", data, component: undefined, handlers: undefined }
      expect(@partitions[0]).to.deep.equal(props)

  describe "with component and handlers", ->
    Given ->
      @schema =
        foo: { fields: { hix: "blah", qux: "" }, component: "FOO", handlers: "QUX" }
      @model = { bar: "bar", qux: "flux", foobar: "plox", hix: "bar" }
    When -> @partitions = @helper.partition(@schema, @model)
    And ->
      data = { blah: "bar", qux: "flux" };
      props = { type: "foo", data, component: "FOO", handlers: "QUX" }
      expect(@partitions[0]).to.deep.equal(props)
