/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.lists_create_empty = function() {
  // Create an empty list.
  return ['[]', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_create_with = function() {
  // Create a list with any number of elements of any type.
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n, Blockly.JavaScript.ORDER_COMMA) ||
    'null';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_repeat = function() {
  // Create a list with one element repeated.
  if (!Blockly.JavaScript.definitions_['lists_repeat']) {
    // Function copied from Closure's goog.array.repeat.
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('lists_repeat', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.lists_repeat.repeat = functionName;
    var func = [];
    func.push('function ' + functionName + '(value, n) {');
    func.push('  var array = [];');
    func.push('  for (var i = 0; i < n; i++) {');
    func.push('    array[i] = value;');
    func.push('  }');
    func.push('  return array;');
    func.push('}');
    Blockly.JavaScript.definitions_['lists_repeat'] = func.join('\n');
  }
  var argument0 = Blockly.JavaScript.valueToCode(this, 'ITEM', Blockly.JavaScript.ORDER_COMMA) ||
  'null';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'NUM', Blockly.JavaScript.ORDER_COMMA) ||
  '0';
  var code = Blockly.JavaScript.lists_repeat.repeat +
  '(' +
  argument0 +
  ', ' +
  argument1 +
  ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.lists_length = function() {
  var argument0 = this.getTitleValue('VALUE');
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.lists_indexOf = function() {
  var operator = this.getTitleValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FIND', Blockly.JavaScript.ORDER_NONE) ||
  '\'\'';
  var argument1 = this.getTitleValue('VALUE');
  var code = argument1 + '.' + operator + '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.lists_getIndex = function() {
  // Get letter at index.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT', Blockly.JavaScript.ORDER_NONE) ||
  '0';
  var argument1 = this.getTitleValue('VALUE');
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10);
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += '';
  }
  var code = argument1 + '[' + argument0 + ']';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.lists_setIndex = function() {
  // Set element at index.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT', Blockly.JavaScript.ORDER_NONE) ||
  '0';
  var argument1 = this.getTitleValue('VALUE');
  var argument2 = Blockly.JavaScript.valueToCode(this, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) ||
  'null';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10);
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += '';
  }
  return argument1 + '[' + argument0 + '] = ' + argument2 + ';\n';
};
