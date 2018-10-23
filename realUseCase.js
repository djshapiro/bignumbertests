const timeit = require('timeit');
const web3 = require('web3');
const bignumber = require('bignumber.js');
const ethers = require('ethers');

const iterations = 20000;

const myweb3 = new web3(web3.currentProvider);

const web3Fn = (done) => {
  let tok = new myweb3.BigNumber("10000000000");
  let wei = new myweb3.BigNumber("300000000000");
  let tot = new myweb3.BigNumber("4000000000000");
  tot.mul(wei).div(tok).toString();
  done();
}

const BigNumberFn = (done) => {
  let tok = new bignumber("10000000000");
  let wei = new bignumber("300000000000");
  let tot = new bignumber("4000000000000");
  tot.mul(wei).div(tok).toString();
  done();
}

const ethersBigNumberFn = (done) => {
  let tok = new ethers.utils.BigNumber("10000000000");
  let wei = new ethers.utils.BigNumber("300000000000");
  let tot = new ethers.utils.BigNumber("4000000000000");
  tot.mul(wei).div(tok).toString();
  done();
}

const ethersBigNumberifyFn = (done) => {
  let tok = new ethers.utils.bigNumberify("10000000000");
  let wei = new ethers.utils.bigNumberify("300000000000");
  let tot = new ethers.utils.bigNumberify("4000000000000");
  tot.mul(wei).div(tok).toString();
  done();
}

const normalFn = (done) => {
  let tok = 10000000000;
  let wei = 300000000000;
  let tot = 4000000000000;
  (tot * wei / tok).toString();
  done();
}

timeit.howlong(iterations, [web3Fn, BigNumberFn, ethersBigNumberFn, ethersBigNumberifyFn, normalFn], (err, results) => {
  console.log('Baseline: ', results[0].average_step_runtime * 1000);
  console.log('from web3: ', results[1].average_step_runtime * 1000);
  console.log('from raw big number: ', results[2].average_step_runtime * 1000);
  console.log('from ethers bignumber constructor: ', results[3].average_step_runtime * 1000);
  console.log('from ethers bignumberify: ', results[4].average_step_runtime * 1000);
  console.log('not even using big numbers: ', results[5].average_step_runtime * 1000);
});
