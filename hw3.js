/*
    Name: Francisco Fuentes
    File: hw3.js
    Date Created: 2025-11-12
    Date Updated: 2025-11-12
    Purpose: MIS 3371 Homework 3... Updating the patient intake form to validate data inputs with regex patterens on the fly and adding dynamic values for the range slider.
*/

let error_flag = 0;

// Function(s) to get user data from the form and display it
function reviewData() {
    const form = document.getElementById('intakeForm');
    const outputDiv = document.getElementById('dataReview');
    let outputHTML = '<table border = "1" align = "center"><tr><th>Field</th><th>Value</th></tr>';

    // "For loop" that goes through all the input data and checks for existing fields
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        // Checkbox Filter
        if (element.type === 'checkbox') {
            if (element.checked) {
                outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
            }
            continue;
        }

        // Radio Button Filter
        if (element.type === 'radio') {
            if (element.checked) {
                outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
            }
            continue;
        }

        // Meaningful Data Type Filter
        if (element.name && element.value && element.type !== 'button') {
            outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
        }
    }

    outputDiv.innerHTML = outputHTML + '</table>';
}

// Valdation functions for each input field begins here
// validation function for first name
function checkfirstname() {
    x = document.getElementById("firstname").value;
    if (x.length<2) {
        document.getElementById("fname_message").innerHTML = "Invalid First Name... Must be at least 2 characters.";
        error_flag = 1;
    }
    else {
        if (x.match(/^[A-Za-z\s'-]+$/)) {
            document.getElementById("fname_message").innerHTML = "";
            error_flag = 0;
        }
        else {
            document.getElementById("fname_message").innerHTML = "Invalid First Name... Must contain only letters.";
            error_flag = 1;
        }
    }
}

// validation function for middle initial
function checkminitial() {
    x = document.getElementById("minitial").value;
    if (x.length>0) {
        if (x.match(/[a-zA-Z ]/)) {
            document.getElementById("minitial_message").innerHTML = "";
        }
        else {
            document.getElementById("minitial_message").innerHTML = "Invalid Middle Initial... Must contain only letters.";
            error_flag = 1;
        }
    }
}

//validation function for last name
function checklastname() {
    x = document.getElementById("lastname").value;
    if (x.length<2) {
        document.getElementById("lname_message").innerHTML = "Invalid Last Name... Must be at least 2 characters.";
        error_flag = 1;
    }
    else {
        if (x.match(/^[A-Za-z\s'-]+$/)) {
            document.getElementById("lname_message").innerHTML = "";
            error_flag = 0;
        }
        else {
            document.getElementById("lname_message").innerHTML = "Invalid Last Name... Must contain only letters.";
            error_flag = 1;
        }
    }
}

//validation functio for dob
function checkdob() {
    const dobInput = document.getElementById("dob");
    const dobValue = new Date(dobInput.value);
    const dobMessage = document.getElementById("dob_message");

    // get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // set min and max date for dob
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    const dobTime = dobValue.getTime();
    const todayTime = today.getTime();
    const minTime = minDate.getTime();

    // validate dob
    if (dobInput.value === "") {
        dobMessage.innerHTML = "Date of Birth cannot be empty.";
        error_flag = 1;
    }
    else {
        if (dobTime > todayTime) {
        dobMessage.innerHTML = "Invalid Date of Birth... Cannot be in the future.";
        error_flag = 1;
        }
        else if (dobTime < minTime) {
            dobMessage.innerHTML = "Invalid Date of Birth... Age cannot exceed 120 years.";
            error_flag = 1;
        }
        else {
            dobMessage.innerHTML = "";
            error_flag = 0;
        }
    }
}

//validation function for social security number
function checkssn() {
    x = document.getElementById("ssn").value;
    const ssnPattern = /^\d{3}-?\d{2}-?\d{4}$/;

    // validate ssn if ssn matches pattern and is 9-11 digits long
    if (x.length >= 9 && x.length <= 11) {
        if (ssnPattern.test(x)) {
            document.getElementById("ssn_message").innerHTML = "";
            error_flag = 0;
        }
        else {
            document.getElementById("ssn_message").innerHTML = "Invalid SSN... Must be in the format XXX-XX-XXXX or XXXXXXXXX and contain only numbers.";
            error_flag = 1; 
        }
    }
    else {
        document.getElementById("ssn_message").innerHTML = "Invalid SSN... Must be between 9 and 11 digits long.";
        error_flag = 1;
    }
}

//validation function for gender selection
function checkgender() {
    const genderInputs = document.getElementsByName("patient_gender");
    let genderMessage = document.getElementById("gender_message");
    let isChecked = false;

    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (isChecked) {
        genderMessage.innerHTML = "";
        error_flag = 0;
    }
    else {
        genderMessage.innerHTML = "A gender option must be selected.";
        error_flag = 1;
    }
}

//validation function for address line 1
function checkaddress1() {
    x = document.getElementById("addr1").value;
    if (x.length<5) {
        document.getElementById("addr1_message").innerHTML = "Invalid Address Line... Must be at least 5 characters.";
        error_flag = 1;
    }
    else {
        document.getElementById("addr1_message").innerHTML = "";
        error_flag = 0;
    }
}

//validation function for address line 2
function checkaddress2() {
    x = document.getElementById("addr2").value;
    y = document.getElementById("addr1").value;

    if (x.length>0 && y.length==0) {
        document.getElementById("addr2_message").innerHTML = "Address Line 1 must be filled out if Address Line 2 is used.";
        error_flag = 1;
    }
    else if (x.length>0 && x.length<5) {
        document.getElementById("addr2_message").innerHTML = "Invalid Address Line... Must be at least 5 characters.";
        error_flag = 1;
    }
    else {
        document.getElementById("addr2_message").innerHTML = "";
        error_flag = 0;
    }
}

//validation function for city
function checkcity() {
    x = document.getElementById("city").value;
    const cityPattern = /^[A-Za-z0-9\s-]{2,}[A-Za-z0-9\s]*$/;
    if (x.length>=2) {
        if (cityPattern.test(x)) {
            document.getElementById("city_message").innerHTML = "";
            error_flag = 0;
        }
        else {
            document.getElementById("city_message").innerHTML = "Invalid City name... Must NOT contain special characters.";
            error_flag = 1;
        }
    }
    else {
        document.getElementById("city_message").innerHTML = "Invalid City... Must be at least 2 characters.";
        error_flag = 1;
    }
}

//validation function for zip code
function checkzip() {
    x = document.getElementById("zip").value;
    const zipPattern = /^\d{5}(-\d{4})?$/;

    // validate zip code if true or false when matched to pattern
    if (zipPattern.test(x)) {
        document.getElementById("zip_message").innerHTML = "";
        error_flag = 0;
    }
    else {
        document.getElementById("zip_message").innerHTML = "Invalid Zip Code... Must be in the format XXXXX or XXXXX-XXXX and contain only numbers.";
        error_flag = 1; 
    }
}

//validation function for phone number
function checkphone() {
    x = document.getElementById("phone").value;
    const phonePattern = /^\d{10}$/;

    // validate phone number matches to pattern
    if (phonePattern.test(x)) {
        document.getElementById("phone_message").innerHTML = "";
        error_flag = 0;
    }
    else {
        document.getElementById("phone_message").innerHTML = "Invalid Phone Number... Must be 10 digits long and contain only numbers.";
        error_flag = 1; 
    }
}

//validation function for email
function checkemail() {
    x = document.getElementById("email").value;
    const emailPattern = /^(?=.{5,50}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (x.length>=5) {
        if (emailPattern.test(x)) {
            document.getElementById("email_message").innerHTML = "";
            error_flag = 0;
        }
        else {
            innerHTML = "Invalid Email Format.";
            error_flag = 1;
        }
        /*document.getElementById("email_message").innerHTML = "Invalid Email... Must be at least 5 characters.";
        error_flag = 1;*/
    }
    else {
        innerHTML = "Invalid Email... Must be at least 5 characters.";
        error_flag = 1;
    }
}

//validation functio for insurance selection
function checkinsurance() {
    const insuranceInputs = document.getElementsByName("insurance_status");
    let insuranceMessage = document.getElementById("insurance_message");
    let isChecked = false;

    for (let i = 0; i < insuranceInputs.length; i++) {
        if (insuranceInputs[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (isChecked) {
        insuranceMessage.innerHTML = "";
        error_flag = 0;
    }
    else {
        insuranceMessage.innerHTML = "An inurance option must be selected.";
        error_flag = 1;
    }
}


//validation function for the text aresa input
function checktextarea() {
    x = document.getElementById("visit_reason").value;

    if (x.length<2) {
        document.getElementById("visit_reason_message").innerHTML = "Invalid Description... Must be at least 2 characters.";
        error_flag = 1;
    }
    else {
        document.getElementById("visit_reason_message").innerHTML = "";
        error_flag = 0;
    }
}

//validation function for diagnosis checkboxes
function checkdiagnosis() {
    const diagnosisInputs = document.getElementsByName("diagnosis");
    let diagnosisMessage = document.getElementById("diagnosis_message");
    let isChecked = false;

    for (let i = 0; i < diagnosisInputs.length; i++) {
        if (diagnosisInputs[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (isChecked) {
        diagnosisMessage.innerHTML = "";
        error_flag = 0;
    }
    else {
        diagnosisMessage.innerHTML = "A diagnosis option must be selected.";
        error_flag = 1;
    }
}

//validation function for vaccination satus
function checkvaccination() {
    const vaccinationInputs = document.getElementsByName("isVaccinated");
    let vaccinationMessage = document.getElementById("vaccination_message");
    let isChecked = false;

    for (let i = 0; i < vaccinationInputs.length; i++) {
        if (vaccinationInputs[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (isChecked) {
        vaccinationMessage.innerHTML = "";
        error_flag = 0;
    }
    else {
        vaccinationMessage.innerHTML = "A vaccination option must be selected.";
        error_flag = 1;
    }
}

//validation function for user id
function checkuserid() {
    x = document.getElementById("username").value;
    const useridPattern = /^[A-Za-z][A-Za-z0-9]{5,16}$/;

    // check userid length and pattern
    if (useridPattern.test(x)) {
        document.getElementById("username_message").innerHTML = "";
        error_flag = 0;
    }
    else {
        document.getElementById("username_message").innerHTML = "Invalid User ID... Must be 6-15 characters long , start with a letter character, and contain only letters and numbers.";
        error_flag = 1; 
    }
}

// validation for password ensuring strength
function passwordStrengthCheck() {
    var passwordoutput;
    const passwordinput = document.getElementById("password").value;
    console.log(passwordinput);

    // check for lowercase letter
    if (passwordinput.search(/[a-z]/) < 0) {
        passwordoutput = "Password must contain at least 1 lowercase letter.";
        error_flag = 1;
    }
    else {
        passwordoutput = "";
    }
    document.getElementById("password_message1").innerHTML = passwordoutput;
    
    // check for uppercase letter
    if (passwordinput.search(/[A-Z]/) < 0) {
        passwordoutput = "Password must contain at least 1 uppercase letter.";
        error_flag = 1;
    }
    else {
        passwordoutput = "";
    }
    document.getElementById("password_message2").innerHTML = passwordoutput;

    // check for number
    if (passwordinput.search(/[0-9]/) < 0) {
        passwordoutput = "Password must contain at least 1 number.";
        error_flag = 1;
    }
    else {
        passwordoutput = "";
    }
    document.getElementById("password_message3").innerHTML = passwordoutput;

    // check for special character
    if (passwordinput.search(/[@#$%]/) < 0) {
        passwordoutput = "Password must contain at least 1 special character (@, #, $, %).";
        error_flag = 1;
    }
    else {
        passwordoutput = "";
    }
    document.getElementById("password_message4").innerHTML = passwordoutput;

    // check for length
    if (passwordinput.length < 8 || passwordinput.length > 20) {
        passwordoutput = "Password must be between 8 and 20 characters long.";
        error_flag = 1;
    }
    else {
        passwordoutput = "";
    }
    document.getElementById("password_message5").innerHTML = passwordoutput;

}

// Check confirm password matches password
function checkconfirm_password() {
    x = document.getElementById("password").value;
    y = document.getElementById("confirm_password").value;

    if (x !== y) {
        document.getElementById("confirm_password_message").innerHTML = "Passwords do not match.";
        error_flag = 1;
    }
    else {
        document.getElementById("confirm_password_message").innerHTML = "";
        error_flag = 0;
    }
}

// validation function to check all form fields
function validateData() {
    error_flag = 0;
    checkfirstname();
    checkminitial();
    checklastname();
    checkdob();
    checkssn();
    checkgender();
    checkaddress1();
    checkaddress2();
    checkcity();
    checkzip();
    checkphone();
    checkemail();
    checkinsurance();
    checktextarea();
    checkdiagnosis();
    checkvaccination();
    checkuserid();
    passwordStrengthCheck();
    checkconfirm_password();

    console.log('Error Flag: ' + error_flag);
    if (error_flag == "1") {
        alert("Form contains errors. Please correct them before submitting.");
    }
    else {
        document.getElementById("submitFormButton").disabled = false;
    }
}

// Dynamic range slider
    const slider = document.getElementById('pain_level');
    const display = document.getElementById('valueDisplay');
    display.textContent = slider.value;

    slider.addEventListener('input', function() {
        const newValue = this.value;

        display.textContent = newValue;
    });