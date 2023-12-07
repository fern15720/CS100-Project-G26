// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname")
  const names = fullnameInput.value.trim().split(" ");
  const fullnamePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  const errorElement = document.getElementById("fullnameError");
  if (names.length !== 2) {
      errorElement.textContent = "Please enter both your Firstname and Lastname.";
      return false;
  } else {
      errorElement.textContent = "";
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");
  if (!emailPattern.test(emailInput.value)) {
      errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
      return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

//----------------------------------------------------------
// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateGender();
  validateEmail();
}


// Function to submit the form
async function submitForm(event) {
  event.preventDefault();
  // Validate form inputs before submission
  if(!validateName() || !validateStudentID() || !validateEmail()){
      return;
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);

//----------------------------------------------------------
// Function to validate Student ID ADD 1 JS*** 
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^[6][0-9][0-2][0-9]{7}$/; 
  const errorElement = document.getElementById("studentIDError");
      if (!studentIDPattern.test(studentIDInput.value)) {
      errorElement.textContent = "Please enter a 10-digit Student ID starting with '66'.";
      return false;
      } else { errorElement.textContent = ""; }
  return true;
  }


// Function to validation ADD 3 JS***
function validation(){
  if(!validateName() || !validateStudentID() || !validateEmail()){
      return false;
  }
  showDetaUser();
  showDetaActivity();
  showDateimage();
}

// Function to showDetaUser ADD 4 JS***
function showDetaUser(){
  document.getElementById('submittedData').style.display='block';
  var DataUser = {
      Name: document.getElementById("fullname").value,
      StudentID: document.getElementById("studentID").value,
      Email: document.getElementById("email").value,
      Faculty: document.getElementById("Faculty of").value,
  };
  var formattedData = '<h2>USER</h2><ul>';
  for (var key in DataUser) {
      formattedData += '<li><strong>' + key + ':</strong> ' + DataUser[key] + '</li>';
  }
  formattedData += '</ul>';
  document.getElementById('DataUser').innerHTML = formattedData;
}

// Function to showDetaActivity ADD 5 JS***
function showDetaActivity(){
  var DetaActivity = {
      WorkTitle: document.getElementById("workTitle").value,
      ActivityType: document.getElementById("activityType").value,
      AcademicYear: document.getElementById("academicYear").value,
      Semester: document.getElementById("semester").value,
      startDate: document.getElementById("startDate").value,
      location: document.getElementById("location").value
  };
  var formattedData = '<h2>ACTIVITY</h2><ul>';
  for (var key in DetaActivity) {
      if (DetaActivity[key] !== undefined && DetaActivity[key] !== ""){
          formattedData += '<li><strong>' + key + ':</strong> ' + DetaActivity[key] + '</li>';
      }else {
          formattedData += '';
      }
      
  }
  formattedData += '</ul>';
  document.getElementById('DateActivity').innerHTML = formattedData;
}

// Function to showDateimage ADD 6 JS***
function showDateimage(){
  var input = document.getElementById("imageInput");
  var imageContainer = document.getElementById("Dateimage");  
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          
          var imageElement = document.createElement("img");
          imageElement.src = e.target.result;
          imageElement.width = 300; 
          imageContainer.innerHTML = ""; 
          imageContainer.appendChild(imageElement);
      };
      reader.readAsDataURL(input.files[0]);
  }
}