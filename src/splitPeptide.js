'use strict';

function splitSequence(sequence) {
  var aas = sequence.replace(/([A-Z])/g, ' $1').split(/ /);
  var begin = 0;
  while (aas[begin] === '' || aas[begin] === 'H') {
    begin++;
  }
  var end = aas.length - 1;
  while (aas[end] === 'O' || aas[end] === 'H') {
    end--;
  }
  aas = aas.slice(begin, end + 1);
  return aas;
}

module.exports = splitSequence;
