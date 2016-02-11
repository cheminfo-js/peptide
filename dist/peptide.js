(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Peptide"] = factory();
	else
		root["Peptide"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aa = __webpack_require__(1);
	var IEP = __webpack_require__(2);
	var chargePeptide = __webpack_require__(3);
	var splitPeptide = __webpack_require__(5);
	var digestPeptide = __webpack_require__(6);

	exports.getInfo = function () {
	    return aa;
	}

	// sequence should be in the "right" format like HAlaGlyProOH

	exports.splitPeptide=splitPeptide;
	exports.digestPeptide=digestPeptide;

	exports.calculateIEP = function (sequence) {
	    var aas=splitPeptide(sequence);
	    var result=IEP.calculateIEP(aas);
	    return result;
	}

	exports.calculateIEPChart = function (sequence) {
	    var aas=splitPeptide(sequence);
	    var result=IEP.calculateChart(aas);
	    return result;
	}


	exports.getColorForIEP = function (iep) {
	    return IEP.getColor(iep);
	}

	exports.calculateCharge = function (sequence, ph) {
	    var aas=splitPeptide(sequence);
	    return IEP.calculateCharge(aas, ph);
	}

	exports.generatePeptideFragments = function generatePeptideFragments(mf, options) {
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

	exports.chargePeptide = chargePeptide;


	function aa1To3(code) {
	    for (var i = 0; i < aa.length; i++) {
	        if (aa[i].aa1 === code) {
	            return aa[i].aa3;
	        }
	    }
	    throw new Error('Invalid 1 letter code: ' + code);
	}

	function converAA1To3(mf) {
	    var newmf = '';
	    for (var i = 0; i < mf.length; i++) {
	        newmf += aa1To3(mf.charAt(i));
	    }
	    return newmf;
	}

	function capitalizeAA3(mf) {
	    for (var i = 0; i < aa.length; i++) {
	        var regexp = new RegExp(aa[i].aa3, 'gi');
	        mf = mf.replace(regexp, aa[i].aa3);
	    }
	    return mf;
	}


	exports.convertAASequence = function convertAASequence(mf) {
	    // this function will check if it is a sequence of aa in 1 letter or 3 letters and convert them if it is the case
	    // it could be a multiline mf !
	    // if it is a multiline we could make some "tricks" ...
	    var newmf = mf;
	    // SEQRES   1 B  256  MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
	    // SEQRES   2 B  256  GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
	    // or
	    // MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
	    // GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
	    if (mf.search(/[A-Z]{3} [A-Z]{3} [A-Z]{3}/) > -1) {
	        // this is a PDB !
	        var tmpmf = mf.replace(/[\r\n]+/g, ' ');
	        tmpmf = tmpmf.replace(/(SEQRES|[0-9]+| [A-Z] | [0-9A-Z]{4-50})/g, '');
	        // we need to correct the uppercase / lowercase
	        var parts = tmpmf.split(' ');
	        newmf = 'H';
	        for (var i = 0; i < parts.length; i++) {
	            newmf += parts[i].substr(0, 1) + parts[i].substr(1).toLowerCase();
	        }
	        newmf += 'OH';
	    } else if ((mf.search(/[A-Z]{3}/) > -1) && (mf.search(/[a-zA-Z][a-z0-9]/) == -1)) {
	        // UNIPROT
	        //   370        380        390        400        410        420
	        //GFKPNLRKTF VSGLFRESCG AHFYRGVDVK PFYIKKPVDN LFALMLILNR LRGWGVVGGM
	        //
	        //    430        440        450        460        470        480
	        //SDPRLYKVWV RLSSQVPSMF FGGTDLAADY YVVSPPTAVS VYTKTPYGRL LADTRTSGFR
	        // We remove all the number, all the spaces, etc
	        newmf = 'H' + converAA1To3(newmf.replace(/[^A-Z]/g, '')) + 'OH';
	    }

	    return newmf;

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// SOURCE: https://en.wikipedia.org/wiki/Amino_acid
	module.exports = [
	    // Standard amino acids
	    {
	        name: "Alanine",
	        aa3: "Ala",
	        aa1: "A",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.33,
	        pKaN: 9.71
	    },
	    {
	        name: "Arginine",
	        aa3: "Arg",
	        aa1: "R",
	        sc: {
	            type: "positive",
	            pKa: 12.10
	        },
	        pKaC: 2.03,
	        pKaN: 9.00
	    },
	    {
	        name: "Asparagine",
	        aa3: "Asn",
	        aa1: "N",
	        sc: {
	            type: "polar"
	        },
	        pKaC: 2.13,
	        pKaN: 9.05
	    },
	    {
	        name: "Aspartic acid",
	        aa3: "Asp",
	        aa1: "D",
	        sc: {
	            type: "negative",
	            pKa: 3.71
	        },
	        pKaC: 1.95,
	        pKaN: 9.66
	    },
	    {
	        name: "Cysteine",
	        aa3: "Cys",
	        aa1: "C",
	        sc: {
	            type: "special",
	            pKa: 8.14
	        },
	        pKaC: 1.91,
	        pKaN: 10.28
	    },
	    {
	        name: "Glutamic acid",
	        aa3: "Glu",
	        aa1: "E",
	        sc: {
	            type: "negative",
	            pKa: 4.15
	        },
	        pKaC: 2.16,
	        pKaN: 9.58
	    },
	    {
	        name: "Glutamine",
	        aa3: "Gln",
	        aa1: "Q",
	        sc: {
	            type: "polar"
	        },
	        pKaC: 2.18,
	        pKaN: 9.00
	    },
	    {
	        name: "Glycine",
	        aa3: "Gly",
	        aa1: "G",
	        sc: {
	            type: "special"
	        },
	        pKaC: 2.34,
	        pKaN: 9.58
	    },
	    {
	        name: "Histidine",
	        aa3: "His",
	        aa1: "H",
	        sc: {
	            type: "positive",
	            pKa: 6.04
	        },
	        pKaC: 1.70,
	        pKaN: 9.09
	    },
	    {
	        name: "Isoleucine",
	        aa3: "Ile",
	        aa1: "I",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.26,
	        pKaN: 9.60
	    },
	    {
	        name: "Leucine",
	        aa3: "Leu",
	        aa1: "L",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.32,
	        pKaN: 9.58
	    },
	    {
	        name: "Lysine",
	        aa3: "Lys",
	        aa1: "K",
	        sc: {
	            type: "positive",
	            pKa: 10.67
	        },
	        pKaC: 2.15,
	        pKaN: 9.16
	    },
	    {
	        name: "Methionine",
	        aa3: "Met",
	        aa1: "M",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.16,
	        pKaN: 9.08
	    },
	    {
	        name: "Phenylalanine",
	        aa3: "Phe",
	        aa1: "F",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.18,
	        pKaN: 9.09
	    },
	    {
	        name: "Proline",
	        aa3: "Pro",
	        aa1: "P",
	        sc: {
	            type: "special"
	        },
	        pKaC: 1.95,
	        pKaN: 10.47
	    },
	    {
	        name: "Serine",
	        aa3: "Ser",
	        aa1: "S",
	        sc: {
	            type: "polar"
	        },
	        pKaC: 2.13,
	        pKaN: 9.05
	    },
	    {
	        name: "Threonine",
	        aa3: "Thr",
	        aa1: "T",
	        sc: {
	            type: "polar"
	        },
	        pKaC: 2.20,
	        pKaN: 8.96
	    },
	    {
	        name: "Tryptophan",
	        aa3: "Trp",
	        aa1: "W",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.38,
	        pKaN: 9.34
	    },
	    {
	        name: "Tyrosine",
	        aa3: "Tyr",
	        aa1: "Y",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.24,
	        pKaN: 9.04
	    },
	    {
	        name: "Valine",
	        aa3: "Val",
	        aa1: "V",
	        sc: {
	            type: "hydrophobic"
	        },
	        pKaC: 2.27,
	        pKaN: 9.52
	    },
	    // Additional
	    {
	        name: "Selenocysteine",
	        aa3: "Sec",
	        aa1: "U"
	    },
	    {
	        name: "Pyrrolysine",
	        aa3: "Pyl",
	        aa1: "O"
	    },
	    // Ambiguous
	    {
	        name: "Asparagine or aspartic acid",
	        aa3: "Asx",
	        aa1: "B"
	    },
	    {
	        name: "Glutamine or glutamic acid",
	        aa3: "Glx",
	        aa1: "Z"
	    },
	    {
	        name: "Leucine or isoleucine",
	        aa3: "Xle",
	        aa1: "J"
	    },
	    {
	        name: "Unspecified or unknown",
	        aa3: "Xaa",
	        aa1: "X"
	    }
	];


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var aa = __webpack_require__(1);

	// we will convert the data to an object to be much faster
	var aaObject={};
	for (var i=0; i<aa.length; i++) {
	    aaObject[aa[i].aa3]=aa[i];
	}



	function calculateCharge(aas, pH) {
	    if (! pH) pH=7.0;
	    var combined=combine(aas);
	    if (!combined) return;
	    var charge=calculateForPh(combined, pH);
	    return Math.round(charge*1000)/1000;
	}

	// this methods required an array of aas

	function calculateIEP(aas) {
	    var combined=combine(aas);
	    if (!combined) return;
	    var first=0;
	    var last=14;
	    var current=14;
	    var previous=0;
	    var currentCharge;
	    while (Math.abs(current-previous)>0.0001) {
	        previous=current;
	        current=(last + first) / 2;
	        currentCharge=calculateForPh(combined, current);
	        if (currentCharge>0) {
	            first=current;
	        } else if (currentCharge<0) {
	            last=current;
	        } else {
	            previous=current;
	        }
	    }
	    return Math.round(current*1000)/1000;
	}

	function calculateChart(aas) {
	    var combined=combine(aas);
	    if (!combined) return;
	    var y=[];
	    var yAbs=[];
	    for (var i=0; i<=14; i=i+0.01) {
	        var charge=calculateForPh(combined, i);
	        y.push(charge);
	        yAbs.push(Math.abs(charge));
	    }
	    combined.y=y;
	    combined.yAbs=yAbs;

	    return combined;
	}


	function calculateForPh(combined, pH) {
	    var total=0;
	    total+=1/(1+Math.pow(10,pH-combined.first));
	    total+=-1/(1+Math.pow(10,combined.last-pH));
	    for (var key in combined.acid) {
	        total+=-combined.acid[key]/(1+Math.pow(10,aaObject[key].sc.pKa-pH));
	    }
	    for (var key in combined.basic) {
	        total+=combined.basic[key]/(1+Math.pow(10,pH-aaObject[key].sc.pKa));
	    }
	    return total;
	}

	// we will combine the amino acids
	function combine(aas) {
	    var combined={};
	    if (aaObject[aas[0]]) {
	        combined.first=aaObject[aas[0]].pKaN;
	    } else {
	        return;
	    }
	    if (aaObject[aas[aas.length-1]]) {
	        combined.last=aaObject[aas[aas.length-1]].pKaC;
	    } else {
	        return;
	    }
	    combined.basic={};
	    combined.acid={};
	    for (var i=0; i<aas.length; i++) {
	        var aa=aas[i];
	        if (! aaObject[aa]) return;
	        if (aaObject[aa].sc && aaObject[aa].sc.type) {
	            if (aaObject[aa].sc.type=="positive") {
	                if (!combined.basic[aa]) {
	                    combined.basic[aa] = 0;
	                }
	                combined.basic[aa]++;
	            } else if (aaObject[aa].sc.type=="negative") {
	                if (!combined.acid[aa]) {
	                    combined.acid[aa] = 0;
	                }
	                combined.acid[aa]++;
	            }
	        }
	    }
	    return combined;
	}

	/*
	 We can generate a color based on iep
	 0 -> 7 means that at pH 7 it is charged negatively (blue)
	 7 -> 14 means that at pH7 it is charged positively (red)
	 */
	function getColor(iep) {
	    if (iep<7) {
	        if (iep<3) iep=3;
	        var white=Math.round(255-(7-iep)*(200/4));
	        return "rgb("+white+","+white+",255)";
	    } else if (iep>7) {
	        if (iep>11) iep=11;
	        var white=Math.round(255-(iep-7)*(200/4));
	        return "rgb(255,"+white+","+white+")";
	    }
	    return "rgb(255,255,255)";
	}

	module.exports={
	    calculateIEP: calculateIEP,
	    calculateCharge: calculateCharge,
	    calculateChart: calculateChart,
	    getColor: getColor
	}



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getAA = __webpack_require__(4);

	// SOURCE: https://en.wikipedia.org/wiki/Amino_acid

	function chargePeptide(mf, options) {
	    if (Array.isArray(mf)) {
	        for (var i=0; i<mf.length; i++) {
	            mf[i]=chargeOnePeptide(mf[i], options);
	        }
	        return mf;
	    } else {
	        return chargeOnePeptide(mf, options);
	    }
	}

	function chargeOnePeptide(mf, options) {
	    var options=options || {};
	    if (options.pH === undefined) options.pH=0;
	    var pH=options.pH;
	    // we will allow to charge the peptide at a specific pH

	    // first amino acids (N-terminal)
	    if (mf.match(/^H[A-Z][a-z]{2}/)) {
	        var firstAA=mf.replace(/^H([A-Z][a-z]{2}).*/,"$1");
	        if (getAA(firstAA) && pH<getAA(firstAA).pKaN) {
	            mf=mf.replace(/^H([^+])/, 'H+H$1');
	        }
	    }

	    // last amino acids (C-terminal)
	    if (mf.match(/[A-Z][a-z]{2}OH$/)) {
	        var lastAA=mf.replace(/.*([A-Z][a-z]{2})OH$/,"$1");
	        if (getAA(firstAA) && pH>getAA(firstAA).pKaC) {
	            mf=mf.replace(/OH$/, 'O-');
	        }
	    }

	    // basic AA
	    if (pH < getAA('Arg').sc.pKa) mf=mf.replace(/(Arg)(?!\()/g, '$1(H+)');
	    if (pH < getAA('His').sc.pKa) mf=mf.replace(/(His)(?!\()/g, '$1(H+)');
	    if (pH < getAA('Lys').sc.pKa) mf=mf.replace(/(Lys)(?!\()/g, '$1(H+)');

	    // acid AA
	    if (pH > getAA('Asp').sc.pKa) mf=mf.replace(/(Asp)(?!\()/g, '$1(H-1-)');
	    if (pH > getAA('Glu').sc.pKa) mf=mf.replace(/(Glu)(?!\()/g, '$1(H-1-)');

	    if (pH > getAA('Cys').sc.pKa) mf=mf.replace(/(Cys)(?!\()/g, '$1(H-1-)');

	    return mf;
	};

	module.exports = chargePeptide;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aa = __webpack_require__(1);

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



/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function splitSequence(sequence) {
	    var aas=sequence.replace(/([A-Z])/g," $1").split(/ /);
	    var begin=0;
	    while (aas[begin]==='' || aas[begin]==='H') {
	        begin++;
	    }
	    var end=aas.length-1;
	    while (aas[end]==='O' || aas[end]==='H') {
	        end--;
	    }
	    aas=aas.slice(begin,end+1);
	    return aas;
	}


	module.exports = splitSequence;



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var splitSequence=__webpack_require__(5);


	/*
	Iotuibs:
	* minMissed (default: 0)
	* maxMissed (default: 0)
	* minResidue: 0;
	* maxResidue: infinity
	* enzyme: chymotrypsin, trypsin, glucph4, glucph8, thermolysin, cyanogenbromide : Mandatory, no default value !
	 */

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
	    if (!fragments[fragments.length-1]) fragments=fragments.slice(0, fragments.length-1);

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



/***/ }
/******/ ])
});
;