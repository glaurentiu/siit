var users = [
    {
      firstName : 'John',
      lastName : 'Doe',
      sex : 'M',
      kg : 70,
      h : 1.7
    },
    {
      firstName : 'Mary',
      lastName : 'Anne',
      sex : 'F',
      kg : 78,
      h : 1.6
    }
  ]
  
  for (var i = 0; i < users.length ; i ++) {
    calculateBmi(users[i].firstName,users[i].lastName,users[i].sex,users[i].kg,users[i].h)
  }
  
  
  function calculateBmi (fName,lName,sex,x,y){
    var bmi = Math.floor(x / (y * y));
    if (bmi < 18.5) {
      console.log(fName + ' | ' + lName + ' | ' + sex + ' | ' + 'BMI: ' + bmi + ' | ' + 'Underweight')
    } else if (bmi > 18.5 && bmi < 25) {
      console.log(fName + ' | ' + lName + ' | ' + sex + ' | ' + 'BMI: ' + bmi + ' | ' + 'Normal')
    } else if (bmi > 25.0 && bmi < 30) {
      console.log(fName + ' | ' + lName + ' | ' + sex + ' | ' + 'BMI: ' + bmi + ' | ' + 'Overweight')
    } else {
      console.log(fName + ' | ' + lName + ' | ' + sex + ' | ' + 'BMI: ' + bmi + ' | ' + 'Obese')
    }
    
  }
  
  
  
  