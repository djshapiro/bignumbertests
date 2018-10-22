const timeit = require('timeit');
const web3 = require('web3');
const bignumber = require('bignumber.js');

const iterations = 500000;

const myweb3 = new web3(web3.currentProvider);

const mainGuy = {
  a: 'yes'
};

//This guy doesn't call a function
const nofunc = (done) => {
  let result;
  result = new myweb3.BigNumber(1);
  done();
}

//This guy calls a function
const func = (done) => {
  let result;
  result = new bignumber(1);
  done();
}

timeit.howlong(iterations, [func, nofunc], (err, results) => {
  console.log('Baseline', results[0].average_step_runtime);
  console.log('with function invokation', results[1].average_step_runtime);
  console.log('without function invokation', results[2].average_step_runtime);
});
