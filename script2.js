var args = process.argv.slice(2);

var script = function(num) {
  var sum = 1;

  num = parseInt(num);

  if (num < 1) {
    return 0;
  }

  for (i=num; i > 0; i--) {
    sum *= i;
  }

  return sum;
}
console.log(script(args[0]));
