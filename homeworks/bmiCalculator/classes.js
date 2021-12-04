var addButton = document.getElementById("addButton");
var delButton = document.getElementById("delButton");
var calcButton = document.getElementById("calcButton");
var persons = [];
var showInfo = document.getElementById("showInfo");
var bmiForm = document.getElementById("bmi");

var sortButton = document.getElementById("sortButton");
var sortButtonHeight = document.getElementById("sortButtonHeight");
var saveButton = document.getElementById("saveButton");

var Person = class {
  constructor(name, gender, kg, h, bmiResult, statusBmi) {
    this.name = name;
    this.gender = gender;
    this.kg = kg;
    this.h = h;
    this.bmiResult = bmiResult; // I could add a string here "Calculate BMI i"nstead of undefined in the table
    this.statusBmi = statusBmi; // I could add a string here "Calculate BMI i"nstead of undefined in the table
  }

  BMI() {
    // this checks if someone enter in cm , ex : 180 and makes it 1.8
    if (this.h > 2.5) {
      this.h = this.h / 100;
      console.log(this.h); // just for the console to check if this works.
    }
    return Math.floor(this.kg / (this.h * this.h));
  }
  // the height value is converted to string and replace " , " with " ." in case someone enters ex: 1,9
  static addPerson() {
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let kg = document.getElementById("weight").value;
    let h = document
      .getElementById("height")
      .value.toString()
      .replace(/,/g, ".");

    return persons.push(new Person(name, gender, kg, h));
  }
  // editPerson is not static and it is used in the editButton onclick attribute , to replace only the object desired using his index
  editPerson(index) {
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let kg = document.getElementById("weight").value;
    let h = document
      .getElementById("height")
      .value.toString()
      .replace(/,/g, ".");

    persons[index] = new Person(name, gender, kg, h);
  }

  results() {
    if (this.BMI() < 18.5) {
      return "underweight";
    } else if (this.BMI() > 18.5 && this.BMI() < 25) {
      console.log("BMI e normal");
      return "normal";
    } else if (this.BMI() > 25.0 && this.BMI() < 30) {
      return "overweight";
    } else {
      return "obese";
    }
  }
  //this method removes the object from the array , we capture the index with indexOf to know which object to remove .

  remove() {
    var index = persons.indexOf(this);
    persons.splice(index, 1);
    myTableBinding.update();
  }
  // we have one parameter and the argument will be dinamically alocated by the for loop in the update method of the object
  saveButton(index) {
    var correctForm = checkForm();
    if (correctForm == true) {
      showInfo.innerHTML = "<br/>The person created successfully";
      showInfo.setAttribute("class", "alert alert-success");

      persons[index].editPerson(index);
      myTableBinding.update();
      bmiForm.reset();
    } else {
      showInfo.innerHTML =
        "<br> Please make sure you type a valid name and valid numbers for weight and height.";
      showInfo.setAttribute("class", "alert alert-danger");
    }
  }


  static calcBMI() {
    if (persons.length === 0) {
      showInfo.innerHTML = "<br> Please add at least one person first";
      showInfo.setAttribute("class", "alert alert-danger");
    }
    for (var i = 0; i < persons.length; i++) {
      persons[i].bmiResult = persons[i].BMI();
      persons[i].statusBmi = persons[i].results();
    }
  }
  // empty the array for the delete all button
  static deleteAll() {
    persons = [];
    showInfo.innerHTML = "<br/>The persons deleted successfully";
    showInfo.setAttribute("class", "alert alert-success");
  }
};

addButton.addEventListener("click", () => {
  var correctForm = checkForm();
  if (correctForm == true) {
    showInfo.innerHTML = "<br/>The person created successfully";
    showInfo.setAttribute("class", "alert alert-success");

    Person.addPerson();
    myTableBinding.update();
    bmiForm.reset();
  } else {
    showInfo.innerHTML =
      "<br> Please make sure you type a valid name and valid numbers for weight and height.";
    showInfo.setAttribute("class", "alert alert-danger");
  }
});

calcButton.addEventListener("click", () => {
  Person.calcBMI();
  myTableBinding.update();
});
delButton.addEventListener("click", () => {
  Person.deleteAll();
  myTableBinding.update();
});
sortButton.addEventListener("click", () => {
  persons.sort(function (a, b) {
    return a.kg - b.kg;
  });
  myTableBinding.update();
});
sortButtonHeight.addEventListener("click", () => {
  persons.sort(function (a, b) {
    return a.h - b.h;
  });
  myTableBinding.update();
});
// the element in the parameter will be the <tbody>
class myTableClass {
  constructor(element) {
    this.listElement = element;
  }
  static createListItem(
    name,
    gender,
    weight,
    height,
    bmi,
    status,
    editButton,
    deleteButton,
    i
  ) {
    const tr = document.createElement("tr"); // add a <tr> in the <tbody> using .appendChild in the update method.

    tr.innerHTML = `<th id="row${i}" scope="row">${name}</th>
                            <td>${gender}</td>
                            <td>${weight}</td>
                            <td>${height}</td>
                            <td>${bmi}</td>
                            <td>${status}</td>
                            <td>${editButton}</td>
                            <td>${deleteButton}</td>`;

    return tr;
  }

  update() {
    // removes child
    while (this.listElement.firstChild) {
      this.listElement.removeChild(this.listElement.firstChild);
    }
    // Add persons and update the table
    for (var i = 0; i < persons.length; i++) {
      var name = persons[i].name;
      var gender = persons[i].gender;
      var weight = persons[i].kg;
      var height = persons[i].h;
      var bmiResult = persons[i].bmiResult;
      var statusBmi = persons[i].statusBmi;
      var deleteButton = `<button type="button" id="D${i}" class="btn btn-danger" onclick="persons[${i}].remove()">Remove</button>`; //ids assigned dynamically by the foor loop
      var editButton = `<button type="button" id="E${i}" class="btn btn-success" onclick="editButton(${i})">Edit</button>`; // ids and argument dynamically
      // add to the <tr> element
      this.listElement.appendChild(
        myTableClass.createListItem(
          name,
          gender,
          weight,
          height,
          bmiResult,
          statusBmi,
          editButton,
          deleteButton,
          i
        )
      );
    }
  }
}

const myTable = document.getElementById("myTable"); // select the <tbody>
const myTableBinding = new myTableClass(myTable); // create a new object with myTableClass

function checkForm() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);
  var name = document.getElementById("name").value;
 // convert weight and height to strings so we ca use match , to allow only numbers
  if (!weight.toString().match(/^[0-9\.\,]+$/)) {
    return false;
  } else if (!height.toString().match(/^[0-9\.\,]+$/)) {
    return false;
  } else if (!name.match(/^[A-Za-z]+$/) || name.length < 2) {
    return false;
  } else {
    return true;
  }
}
// this function is used for the editButton , first it collects the element using the dinamically id created with the update method , and it changes his content and onclick atribute
function editButton(index) {
  let button = document.getElementById(`E${index}`);
  button.textContent = "Save Changes";
  button.setAttribute("onclick", `persons[${index}].saveButton(${index})`);
  showInfo.innerHTML = "<br> Fill the form from above and press Save Changes";
  showInfo.setAttribute("class", "alert alert-danger");
}
