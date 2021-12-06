class Todo {
  constructor(
    taskName,
    taskDescription,
    status,
    startDate,
    dueDate,
    assignedUser
  ) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.status = status;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.assignedUser = assignedUser;
  }
  getRow() {
    return `<tr>
    // <td>${this.taskName}</td>
    // <td>${this.taskDescription}</td>
    // <td>${this.status}</td>
    // <td>${this.startDate}</td>
    // <td>${this.dueDate}</td>
    // <td>${this.assignedUser}</td></tr>`;
  }
}
