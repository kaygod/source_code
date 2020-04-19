function *test(a){

  console.log(1);

  let b = yield a+1;

  console.log(2);

  yield b+3;
  
  return 4;

}

const generator = test(1);

console.log(generator.next());

console.log(generator.next(3));

