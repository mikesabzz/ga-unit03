let register = (price, paid) => {
  let change = paid - price;
  console.log(change);
  for (let i = change; i >= 0; ){
      if (i >= 100){
          console.log('hundred');
          i -= 100;           
      }else if (i >= 50){
          console.log('fifty');
          i -= 50;      
      }else if (i >= 20){
          console.log('twenty');
          i -= 20; 
      }else if (i >= 10){
          console.log('ten');
          i -= 10; 
      }else if (i >= 5){
          console.log('five');
          i -= 5; 
      }else if (i >= 1){
          console.log('one');
          i -= 1;
      }else if (i >= 0.25){
          console.log('quarter');
          i -= .25; 
      }else if (i >= 0.10){
          console.log('dime');
          i -= .10; 
      }else if (i >= 0.05){
          console.log('nickel');
          i -= 0.05; 
      }else if (i > 0.01) {
          console.log('penny');
          i -= 0.01;
      }else { 
          console.log('Thank you, come again!');
          i -= 0.01;
      }

  }
}
register(24.99, 80);

