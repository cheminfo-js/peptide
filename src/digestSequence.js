'use strict';

var splitSequence=require('./splitSequence');

function digestSequence(sequence, options) {
    var options=options || {};

    sequence=sequence.replace(/^H([^a-z])/,'$1').replace(/OH$/,'');

    options.enzyme = options.enzyme || 'trypsin';
    if (options.minMissed===undefined) options.minMissed=0;
    if (options.maxMissed===undefined) options.maxMissed=0;
    if (options.minResidue===undefined) options.minResidue=0;
    if (options.maxResidue===undefined) options.maxResidue=Number.MAX_VALUE;
    var regexp=getRegexp(options.enzyme);
    var fragments=sequence.replace(regexp,"$1 ").split(/ /);
    if (!fragments[fragments.length]) fragments=fragments.slice(0, fragments.length-1);

    for (var i=0; i<fragments.length; i++) {
        fragments[i]={
            sequence:fragments[i],
            nbResidue:splitSequence(fragments[i]).length
        }
    }

    var results=[];

    for (var i=0; i<fragments.length-options.minMissed; i++) {
        for (var j=options.minMissed; j<=Math.min(options.maxMissed,fragments.length-i-1); j++) {
            var fragment='';
            var nbResidue=0;
            for (var k=i; k<=(i+j); k++) {
                fragment+=fragments[k].sequence;
                nbResidue+=fragments[k].nbResidue
            }
            if (fragment && nbResidue>=options.minResidue && nbResidue<=options.maxResidue) {
                results.push("H"+fragment+"OH");
            }
        }
    }

    return results;
}


function getRegexp(enzyme) {
    switch (enzyme.toLowerCase().replace(/[^a-z0-9]/g,'')) {
        case 'chymotrypsin':
            return /(Phe|Tyr|Trp)(?!Pro)/g;
        case 'trypsin':
            return /(Lys|Arg)(?!Pro)/g;
        case 'lysc':
            return /(Lys)(?!Pro)/g;
        case 'glucph4':
            return /(Glu)(?!Pro|Glu)/g;
        case 'glucph8':
            return /(Asp|Glu)(?!Pro|Glu)/g;
        case 'thermolysin':
            return /(Leu|Ile|Met|Phe|Trp)/g;
        case 'cyanogenbromide':
            return /(Met)/g;
    }
    throw new Error('Digestion enzyme: '+enzyme+' is unknown');
}

module.exports = digestSequence;
