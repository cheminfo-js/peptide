'use strict';

var aa = require('./aminoAcids');

function getAA(code) {
    if (code.length===1) {
        for (var i = 0; i < aa.length; i++) {
            if (aa[i].aa1 === code) {
                return aa[i];
            }
        }
    }
    if (code.length===3) {
        for (var i = 0; i < aa.length; i++) {
            if (aa[i].aa3 === code) {
                return aa[i];
            }
        }
    }
}


module.exports = getAA;

