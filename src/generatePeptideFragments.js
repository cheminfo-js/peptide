'use strict';

module.exports = function(mf, options) {
    if (options === undefined) {
        options = {
            a: false,
            b: true,
            c: false,
            x: false,
            y: true,
            z: false,
            i: false,
            yb: false,
            ya: false
        };
    }
    options.maxInternal = options.maxInternal || Number.MAX_VALUE;
    options.minInternal = options.minInternal || 0;

    var mfs = [];
    var mfparts=mf.replace(/([a-z\)])([A-Z][a-z](?=[a-z]))/g,"$1 $2").split(/ /);

    var nTerm="";
    var cTerm="";

    for (var i=1; i<mfparts.length; i++) {
        nTerm+=mfparts[i-1];
        cTerm=mfparts[mfparts.length-i]+cTerm;
        addNTerm(mfs, nTerm, i, options);
        addCTerm(mfs, cTerm, i, options);
        if (options.i) mfs.push(mfparts[i]+"HC-1O-1(+1)$i:"+mfparts[i]);

        if (options.ya || options.yb) { // we have double fragmentations
            for (var j=i+1; j<Math.min(mfparts.length,options.maxInternal+i+1);j++) {
                var iTerm='';
                if ((j-i)>=options.minInternal){
                    for (var k = i; k < j; k++) {
                        iTerm += mfparts[k];
                    }
                    addITerm(mfs, iTerm, mfparts.length - i, j, options);
                }
            }
        }
    }


    if (mfs.length === 0) {
        mfs = mfs.concat([mf]);
    }

    return mfs;

};

function addNTerm(mfs, nTerm, i, options) {
    if (options.a) mfs.push(nTerm+"C-1O-1(+1)$a"+i);
    if (options.b) mfs.push(nTerm+"(+1)$b"+i);
    if (options.c) mfs.push(nTerm+"NH3(+1)$c"+i);
}

function addITerm(mfs, iTerm, i, j, options) {
    if (options.ya) mfs.push("H"+iTerm+"C-1O-1(+1)$a"+j+"y"+i);
    if (options.yb) mfs.push("H"+iTerm+"(+1)$b"+j+"y"+i);
}

function addCTerm(mfs, cTerm, i, options) {
    if (options.x) mfs.push("CO(+1)"+cTerm+"$x"+i);
    if (options.y) mfs.push("H2(+1)"+cTerm+"$y"+i);
    if (options.z) mfs.push("N-1H-1(+1)"+cTerm+"$z"+i);
}