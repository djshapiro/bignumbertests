const timeit = require('timeit');
const web3 = require('web3');
const bignumber = require('bignumber.js');
const ethers = require('ethers');

const iterations = 5000;

const myweb3 = new web3(web3.currentProvider);

const web3Fn = (done) => {
  let result;
  result = new myweb3.BigNumber(1);
  done();
}

const BigNumberFn = (done) => {
  let result;
  result = new bignumber(1);
  done();
}

const ethersBigNumberFn = (done) => {
  let result;
  result = new ethers.utils.BigNumber(1);
  done();
}

const ethersBigNumberifyFn = (done) => {
  let result;
  result = new ethers.utils.bigNumberify(1);
  done();
}

timeit.howlong(iterations, [web3Fn, BigNumberFn, ethersBigNumberFn, ethersBigNumberifyFn], (err, results) => {
  console.log('Baseline', results[0].average_step_runtime);
  console.log('from web3', results[1].average_step_runtime);
  console.log('from raw big number', results[2].average_step_runtime);
  console.log('from ethers bignumber constructor', results[3].average_step_runtime);
  console.log('from ethers bignumberify', results[3].average_step_runtime);
});
