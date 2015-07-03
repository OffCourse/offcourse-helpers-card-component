React = require 'react/addons'
{ jsdom } = require 'jsdom'
mockery = require 'mockery'
sinon = require('sinon')
chai = require 'chai'
expect = chai.expect
sinonChai = require "sinon-chai"
chai.use(sinonChai)
TestUtils = React.addons.TestUtils
{div} = React.DOM
mockery = require 'mockery'

`function testdom(markup){
  if (typeof document !== 'undefined') return
  global.document = jsdom(markup || '')
  global.window = document.defaultView;
  global.navigator = {};
}`

renderElement = (Component, options) ->
  element = React.createElement Component, options
  container = TestUtils.renderIntoDocument element
  React.findDOMNode container

mockModule = (moduleUnderTest, mockModules) ->

  mockery.registerAllowables [
    moduleUnderTest, 
    'react', 
    './lib/React', 
    'classnames',
    'lodash',
    'ramda'
  ]

  container = MockComponent: React.createClass render: -> null
  spy = sinon.spy(container, 'MockComponent')

  mockModules.forEach (name, index) =>
    mocks = mockery.registerMock name, container.MockComponent

  mockery.enable
    warnOnReplace: false,
    warnOnUnregistered: true
  Component = require moduleUnderTest
  return { Component, spy }

disableMocks = =>
  mockery.disable()


global.sinon = sinon
global.expect = expect
global.TestUtils = TestUtils
global.testdom = testdom
global.renderElement = renderElement
global.mockModule = mockModule
global.disableMocks = disableMocks
