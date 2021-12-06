class Application {
  constructor(name) {
    this.name = name;
    this.tableEl = $("#todosTable tbody");
    this.todosList = [];
    this.init();
  }
  init() {
    this._addEventListeners();
    this.loadTodos();
  }
  /*
  loadTodos() {
    $.ajax({
      method: "GET",
      url: "./data/todos.json",
      success: (todos) => this.onTodosLoaded(todos),
      error: this.onError,
    });
  }

  */

  async loadTodos() {

    let response = await fetch("./data/todos.json");
  
    let todos = await response.json();

    this.onTodosLoaded(todos);
  }

  populateTable(param) {
    this.destroy();
    param.forEach(
      ({
        taskName,
        taskDescription,
        status,
        startDate,
        dueDate,
        assignedUser,
      }) => {
        let todo = new Todo(
          taskName,
          taskDescription,
          status,
          startDate,
          dueDate,
          assignedUser
        );
        this.todosList.push(todo);
        let row = todo.getRow();
        this.tableEl.append(row);
      }
    );
  }

  onTodosLoaded(todos) {
    this.populateTable(todos);
  }

  destroy() {
    this.tableEl.empty();
  }
  _addEventListeners() {
    /* 
  We use arrow functions because we don't want this to be the button with the id #filterByName
  Or we can use the "that hack" , so we can assign the THIS we wanted to the THAT and we call the function with that instead of this()
   var that = this; 
  $("#filterByName").on("click", function (){that._filterByName()}); 
  */


  let isFilteredByName = false;
  let isFiltered = false;

    $("#filterByName")
      
      .on("click", () => {
        if (isFilteredByName) {
          $("#filterByName").off();
        } else {
          this._filterBy("taskName");
          isFilteredByName = true;
        }
      });
      

    $("#filter").on("click", () => {
        if (isFiltered) {
          $("#filter").off();
        } else {
          this._filterByName();
          isFiltered = true;
        }
      });
      

  }

  _filterByName() {
    this.destroy();
    let filterValue = $("#inputFilter").val();

    const result = this.todosList.find(
      ({ taskName }) => taskName === filterValue
    );

    let todo = new Todo(
      result.taskName,
      result.taskDescription,
      result.status,
      result.startDate,
      result.dueDate,
      result.assignedUser
    );
    let row = todo.getRow();
    this.tableEl.append(row);
  }

  _filterBy(filterApplied) {
    this.destroy();
    this.todosList.sort((a, b) => {
      return a[filterApplied].localeCompare(b[filterApplied]);
    });
    this.populateTable(this.todosList);
  }

  onError(jqXhr, textStatus) {
    console.log("textStatus: ", textStatus);
  }
}
//$(document).ready(() => {
  let todosApplication = new Application("Todos List");
//});
