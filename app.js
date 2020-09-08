const input = document.getElementById('input');
const div = document.getElementById('container');
const output = document.getElementById('output');

input.addEventListener('click', function () {
  div.style.display = 'none';
  output.innerHTML = `
  <form>
  <div class="form-row ">
        <div id="from-group" class="form-group col-md-6">
            <label for="inputEmail4">FirstName</label>
            <input type="text" class="form-control firstname" id="inputEmail4" placeholder="Enter First Name">
        </div>
        <div class="form-group col-md-6">
            <label for="inputEmail4">LastName</label>
            <input type="text" class="form-control lastname" id="inputEmail4" placeholder="Enter Last Name">
        </div>
  </div>
        <div class="form-group col-md-12">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control email" id="inputEmail4" placeholder="Enter Email">
        </div>
  
        <div class="form-group col-md-12">
            <label for="inputState">Designation</label>
            <select id="inputState" class="form-control department">
                <option selected>Select Department</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>FullStack</option>
            </select>
        </div>

     
        <button id ="save" type="submit"  class="btn btn-primary" data-dismiss="modal">Save</button>
        <button type="button" id="close" class="btn btn-secondary"data-dismiss="modal">Close</button>
  </form>
  `;
  //   Creat a table
  const firstname = document.querySelector('.firstname');
  const lastname = document.querySelector('.lastname');
  const email = document.querySelector('.email');
  const department = document.querySelector('.department');
  const save = document.getElementById('save');
  const table = document.getElementById('table');

  document.getElementById('close').addEventListener('click', function () {
    div.style.display = 'block';
  });
  document.getElementById('x').addEventListener('click', function () {
    div.style.display = 'block';
  });

  // Save Employee data
  save.addEventListener('click', function (e) {
    div.style.display = 'block';

    table.innerHTML = `
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Designation</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody class = "list">
    
      </tbody>
    </table>
    `;
    //  error alert
    if (firstname.value === '' || lastname.value === '' || email.value === '') {
      // error message
      showAlert('Please fill in all field', 'alert-danger');
    } else {
      // Get local storage

      let empArr;
      let cnt;
      if (localStorage.getItem('employeeData') === null) {
        empArr = [];
        cnt = 1;
      } else {
        empArr = JSON.parse(localStorage.getItem('employeeData'));
        cnt = empArr[empArr.length - 1].empId + 1;
      }

      const empObj = {
        empId: cnt,
        fName: firstname.value,
        lName: lastname.value,
        email: email.value,
        department: department.value,
      };
      empArr.push(empObj);
      localStorage.setItem('employeeData', JSON.stringify(empArr));

      showData();

      e.preventDefault();
    }
  });
});

// Show Employee Deaitals

function showData() {
  table.innerHTML = `
  <table class="table table-dark">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Email</th>
    <th scope="col">Designation</th>
    <th scope="col">Delete</th>
    <th scope="col">Edit</th>
  </tr>
</thead>
<tbody class = "list">
  
</tbody>
</table>
  `;
  const empArr = JSON.parse(localStorage.getItem('employeeData'));
  let output = '';
  const list = document.querySelector('.list');
  for (let i = 0; i < empArr.length; i++) {
    const row = document.createElement('tr');
    //   creat a coll
    row.innerHTML = `
     <td>${empArr[i].empId}</td>
     <td>${empArr[i].fName}</td>
     <td>${empArr[i].lName}</td>
     <td>${empArr[i].email}</td>
     <td>${empArr[i].department}</td>
     <td><a data-id='${empArr[i].empId}' href ='#' onclick='removeEmpData()' class ='delete'>X</a></td>
     <td><button type="button"
     class="btn btn-primary"
     data-toggle="modal"
     data-target="#staticBackdrop" onclick='editEmpData()' >*</button></td>
     `;
    list.appendChild(row);
  }
}
// Delete from LS

function removeEmpData() {
  const id = event.target.getAttribute('data-id');
  const remArr = JSON.parse(localStorage.getItem('employeeData'));
  for (let j = 0; j < remArr.length; j++) {
    if (remArr[j].empId == id) {
      remArr.splice(j, 1);
    }
  }
  localStorage.setItem('employeeData', JSON.stringify(remArr));
  showData();
  if (remArr.length == 0) {
    localStorage.clear('employeeData');
  }
}

// Edit employee Details

function editEmpData() {
  div.style.display = 'none';
  output.innerHTML = `
  <form>
  <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputEmail4">FirstName</label>
            <input type="text" class="form-control firstname" id="inputEmail4" placeholder="Enter First Name">
        </div>
        <div class="form-group col-md-6">
            <label for="inputEmail4">LastName</label>
            <input type="text" class="form-control lastname" id="inputEmail4" placeholder="Enter Last Name">
        </div>
  </div>
        <div class="form-group col-md-12">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control email" id="inputEmail4" placeholder="Enter Email">
        </div>
  
        <div class="form-group col-md-12">
            <label for="inputState">Designation</label>
            <select id="inputState" class="form-control department">
                <option selected>Select Department</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>FullStack</option>
            </select>
        </div>

     
        <button id='edit-save' type="submit" class="btn btn-primary " data-dismiss="modal">Save</button>
        <button type="button" id="close"  class="btn btn-secondary"data-dismiss="modal">Close</button>
</form>
  `;
  const firstname = document.querySelector('.firstname');
  const lastname = document.querySelector('.lastname');
  const email = document.querySelector('.email');
  const department = document.querySelector('.department');
  const editEmp = event.target.parentElement.parentElement;
  let id = editEmp.firstChild.nextElementSibling.innerHTML;
  let fName =
    editEmp.firstChild.nextElementSibling.nextElementSibling.innerHTML;
  let lName =
    editEmp.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      .innerHTML;
  let email_ =
    editEmp.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling.innerHTML;
  let dep =
    editEmp.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling.nextElementSibling.innerHTML;
  console.log(fName, lName, email_, dep, id);
  firstname.value = fName;
  lastname.value = lName;
  email.value = email_;
  department.value = dep;

  // addEventListener on Edit
  document.getElementById('edit-save').addEventListener('click', function () {
    const editArr = JSON.parse(localStorage.getItem('employeeData'));
    for (let k = 0; k < editArr.length; k++) {
      if (editArr[k].empId == id) {
        editArr[k].fName = firstname.value;
        editArr[k].lName = lastname.value;
        editArr[k].email = email.value;
        editArr[k].department = department.value;
      }
    }
    localStorage.setItem('employeeData', JSON.stringify(editArr));
    showData();
  });
}

// show employee
document.getElementById('show').addEventListener('click', function () {
  showData();
});

// Alert

function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert text-white ${className}`;
  div.appendChild(document.createTextNode(message));
  //   get parent
  const form = document.querySelector('.showalert');
  // get form
  const container = document.querySelector('#container');
  // set before
  container.insertBefore(div, form);
  //   set time out
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}
