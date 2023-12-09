const config = {
  backendUrl: "http://localhost:80/", // Default backend URL
};
const port = 8000;
// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const fullnamePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }

  if (!fullnamePattern.test(fullnameInput.value)) {
    errorElement.textContent = "Please enter the first letter in capital letter.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }

  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^[6][0-9][0-2][0-9]{7}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
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

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
  
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    //const response = await fetch(config.backendUrl + "getActivityType");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  const FacultyName = formData.get("Faculty");
  const semester = formData.get("semester");

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    faculty: facultyName,
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: semester,
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);

// ฟังก์ชันสำหรับการ submit ฟอร์ม
async function submitForm(event) {
  event.preventDefault();

  // รับข้อมูลจากฟอร์ม
  const formData = new FormData(event.target);

  // ดึงข้อมูลที่ต้องการ
  

  const first_name = formData.get("fullname").split(" ")[0];
  const last_name = formData.get("fullname").split(" ")[1];
  const student_id = parseInt(formData.get("studentID"));
  const faculty = formData.get("faculty");
  const email = formData.get("email");
  const title = formData.get("workTitle");
  const type_of_work_id = parseInt(formData.get("activityType"));
  const academic_year = parseInt(formData.get("academicYear")) - 543;
  const semester = formData.get("semester");
  const start_date = formData.get("startDate");
  const end_date = formData.get("endDate");
  const location = formData.get("location");


  // Get the file input element and extract the selected file
  const fileInput = document.getElementById("fileInput");
  const imageFile = fileInput.files[0];

  // Check if an image file is selected and if it has a valid extension
  if (imageFile && (imageFile.type === "image/jpeg" || imageFile.type === "image/png")) {
    // Create a FileReader to read the selected image file
    const reader = new FileReader();

    // Define a callback function to be executed when the file is read
    reader.onload = function (e) {
      // Create an image element
      const imageElement = document.createElement("img");

      // Set the source of the image to the data URL obtained from reading the file
      imageElement.src = e.target.result;

      // Set any additional attributes or styles as needed
      imageElement.alt = "Uploaded Image";

      // Append the image element to the resultContainer
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = ""; // Clear existing content
      resultContainer.appendChild(imageElement);


  // แสดงผลข้อมูลที่ Element ที่มีอยู่ในหน้าเว็บ
  resultContainer.innerHTML += `

    <br>
    <h1> User </h1>
    <p><b>Firstname:</b> ${first_name}</p>
    <p><b>Lastname:</b> ${last_name}</p>
    <p><b>Student ID:</b> ${student_id}</p>
    <p><b>Faculty:</b> ${faculty}</p>
    <p><b>Email:</b> ${email}</p>

    <h1> Activity </h1>
    <p><b>Work/Activity Title:</b> ${title}</p>
    <p><b>Type of Work ID:</b> ${type_of_work_id}</p>
    <p><b>Academic Year:</b> ${academic_year}</p>
    <p><b>Semester:</b> ${semester}</p>
    <p><b>Start Date/Time:</b> ${start_date}</p>
    <p><b>End Date/Time:</b> ${end_date}</p>
    <p><b>Location:</b> ${location}</p>
    
  `;
};

// Read the image file as a data URL
reader.readAsDataURL(imageFile);
}
else {

alert("Failed to submit form data. Please try again.");
}
}