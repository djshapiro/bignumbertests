const timeit = require('timeit');
const web3 = require('web3');
const bignumber = require('bignumber.js');
const ethers = require('ethers');

const iterations = 10000;

const myweb3 = new web3(web3.currentProvider);

const web3Fn = (done) => {
  let bn;
  bn = new myweb3.BigNumber(1);
  let other = new myweb3.BigNumber(5);
  bn.add(other);
  done();
}

const BigNumberFn = (done) => {
  let bn;
  bn = new bignumber(1);
  let other = new bignumber(5);
  bn.add(other);
  done();
}

const ethersBigNumberFn = (done) => {
  let bn;
  bn = new ethers.utils.BigNumber(1);
  let other = new ethers.utils.BigNumber(5);
  bn.add(other);
  done();
}

const ethersBigNumberifyFn = (done) => {
  let bn;
  bn = new ethers.utils.bigNumberify(1);
  let other = new ethers.utils.BigNumber(5);
  bn.add(other);
  done();
}

timeit.howlong(iterations, [web3Fn, BigNumberFn, ethersBigNumberFn, ethersBigNumberifyFn], (err, results) => {
  console.log('Baseline: ', results[0].average_step_runtime * 1000);
  console.log('from web3: ', results[1].average_step_runtime * 1000);
  console.log('from raw big number: ', results[2].average_step_runtime * 1000);
  console.log('from ethers bignumber constructor: ', results[3].average_step_runtime * 1000);
  console.log('from ethers bignumberify: ', results[4].average_step_runtime * 1000);
});
