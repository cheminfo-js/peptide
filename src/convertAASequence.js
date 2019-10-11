'use strict';

const aa = require('./aminoAcids');

function convertAASequence(mf) {
  // this function will check if it is a sequence of aa in 1 letter or 3 letters and convert them if it is the case
  // it could be a multiline mf !
  // if it is a multiline we could make some "tricks" ...
  let newMF = mf;
  // SEQRES   1 B  256  MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
  // SEQRES   2 B  256  GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
  // or
  // MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
  // GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
  if (mf.search(/[A-Z]{3} [A-Z]{3} [A-Z]{3}/) > -1) {
    // this is a PDB !
    let tmpmf = mf.replace(/[\r\n]+/g, ' ');
    tmpmf = tmpmf.replace(/(SEQRES|[0-9]+| [A-Z] | [0-9A-Z]{4-50})/g, '');
    // we need to correct the uppercase / lowercase
    let parts = tmpmf.split(' ');
    newMF = 'H';
    for (let i = 0; i < parts.length; i++) {
      newMF += parts[i].substr(0, 1) + parts[i].substr(1).toLowerCase();
    }
    newMF += 'OH';
  } else if (mf.includes('(')) {
    // we expect one letter code with modification
    newMF = '';
    let nTerminal = 'H';
    let cTerminal = 'OH';
    let parenthesisCounter = 0;
    for (let i = 0; i < mf.length; i++) {
      let currentSymbol = mf[i];
      if (
        currentSymbol === '(' ||
        currentSymbol === ')' ||
        parenthesisCounter > 0
      ) {
        if (currentSymbol === '(') {
          parenthesisCounter++;
          if (i === 0) nTerminal = '';
        }
        if (currentSymbol === ')') {
          parenthesisCounter--;
          if (i === mf.length - 1) cTerminal = '';
        }
        newMF += currentSymbol;
        continue;
      }
      newMF += convertAA1To3(currentSymbol);
    }
    newMF = nTerminal + newMF + cTerminal;
  } else if (
    mf.search(/[A-Z]{3}/) > -1 &&
    mf.search(/[a-zA-Z][a-z0-9]/) === -1
  ) {
    // UNIPROT
    //   370        380        390        400        410        420
    //GFKPNLRKTF VSGLFRESCG AHFYRGVDVK PFYIKKPVDN LFALMLILNR LRGWGVVGGM
    //
    //    430        440        450        460        470        480
    //SDPRLYKVWV RLSSQVPSMF FGGTDLAADY YVVSPPTAVS VYTKTPYGRL LADTRTSGFR
    // We remove all the number, all the spaces, etc
    newMF = `H${convertAA1To3(newMF.replace(/[^A-Z]/g, ''))}OH`;
  }

  return newMF;
}

function convertAA1To3(mf) {
  let newmf = '';
  for (let i = 0; i < mf.length; i++) {
    newmf += aa1To3(mf.charAt(i));
  }
  return newmf;
}

function aa1To3(code) {
  for (let i = 0; i < aa.length; i++) {
    if (aa[i].aa1 === code) {
      return aa[i].aa3;
    }
  }
  throw new Error(`Invalid 1 letter code: ${code}`);
}

module.exports = convertAASequence;
