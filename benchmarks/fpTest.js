const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

const weight1 = 0.0000018405289655428483;
const weight2 = 0.000007358315406204913;

suite.add('Power of 2', function() {
    weight1 * weight2 * 34359738368;
})
.add('not power of 2', function() {
    weight1 * weight2 * 34359738369;
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({'async': true});