//Global Variables

var tableRow = $("#tableBody tr").last();
var removeButton = `<td><button type="button" class="btn btn-danger btn">Remove</button></td>`;
//Make sure the DOM is loaded
$(document).ready(function () {
  var addPerson = $("#addPerson");
  var formAddPerson = $("#addPersonForm");
//Add person button / changes his class and his functionality with each click
  addPerson.on("click", showForm);
// We listen if one from all the remove buttons in the table is clicked and remove the row
  $("table").on("click", "button", function () {
    $(this).closest("tr").remove();
  });

  function addPersonForm() {
    var characterName = `<td>${$("#characterName").val()}</td>`;
    var actorName = `<td>${$("#actorName").val()}</td>`;
    var imageActor = `<td><img src="${$("#imageActor").val()}"/></td>`;
    var yearOfBirth = `<td>${$("#yearOfBirth").val()}</td>`;
    var tr = `<tr>`;
    var trEnd = `</tr>`;
    var tableRowAdded =
      tr +
      characterName +
      actorName +
      imageActor +
      yearOfBirth +
      removeButton +
      trEnd;
    //Add the html after the row
    tableRow.after(tableRowAdded);
    //Unbind the event handler addPersonForm so the button will call the function showForm .
    addPerson.unbind("click", addPersonForm);
  }

  function showForm() {
    addPerson.toggleClass("btn btn-success btn");
    formAddPerson.toggleClass("add-form-show");
    addPerson.bind("click", addPersonForm);
  }
});


function onActorsLoaded(actors) {
  actors.forEach( ({ actorName, characterName, pictureURL, year}) => {
      var row = `<tr>
          <td>${actorName}</td>
          <td>${characterName}</td>
          <td><img src="${pictureURL}"/></td>
          <td>${year}</td>
          ${removeButton}
          </tr>`;
          tableRow.after(row);
  })
}

function onError(jqXhr, textStatus) {
  console.log('textStatus: ', textStatus);
}



$.ajax({
  method: 'GET',
  url: './actors.json',
  success: onActorsLoaded,
  error: onError
});
