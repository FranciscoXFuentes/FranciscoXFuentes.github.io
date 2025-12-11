/*
    Name: Francisco Fuentes
    File: extracredit.js
    Date Created: 2025-12-08
    Date Updated: 2025-12-08
    Purpose: MIS 3371 Extra Credit JS... Updating JS code to create Fetch APi functions, Cookie storage, and Local Storage for the patient intake form.
*/

// Function(s) for getting user data and displaying it
function reviewData() {
    const form = document.getElementById('intakeForm');
    const outputDiv = document.getElementById('dataReview');
    let outputHTML = '<span class="dataTable"><table><tr><th>Field</th><th>Value</th></tr>';

    // Loop through all elements checking for existing data
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        
        // Input type filtering
        if (element.type === "checkbox") {
            if (element.checked) {
                outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
            }
            continue;
        }
        if (element.type === "radio") {
            if (element.checked) {
                outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
            }
            continue;
        }
        if (element.name && element.value && element.type !== "button") {
            outputHTML += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`;
        }
    }

    // Close the table
    outputDiv.innerHTML = outputHTML + '</table></span>';
}

// All Form Validation Functions
    // validation function for first name
    function checkfirstname() {
        x = document.getElementById("firstname").value;
        if (x.length<2) {
            document.getElementById("fname_message").innerHTML = '<li>Invalid First Name... Must be at least 2 characters.</li>';
            return 1;
        }
        else {
            if (x.match(/^[A-Za-z\s'-]+$/)) {
                document.getElementById("fname_message").innerHTML = "";
                return 0;
            }
            else {
                document.getElementById("fname_message").innerHTML = '<li>Invalid First Name... Must contain only letters.</li>';
                return 1;
            }
        }
    }

    // validation function for middle initial
    function checkminitial() {
        x = document.getElementById("minitial").value;
        if (x.length>0) {
            if (x.match(/[a-zA-Z ]/)) {
                document.getElementById("minitial_message").innerHTML = "";
                return 0;
            }
            else {
                document.getElementById("minitial_message").innerHTML = '<li>Invalid Middle Initial... Must contain only letters.</li>';
                return 1;
            }
        }
    }

    //validation function for last name
    function checklastname() {
        x = document.getElementById("lastname").value;
        if (x.length<2) {
            document.getElementById("lname_message").innerHTML = '<li>Invalid Last Name... Must be at least 2 characters.</li>';
            return 1;
        }
        else {
            if (x.match(/^[A-Za-z\s'-]+$/)) {
                document.getElementById("lname_message").innerHTML = "";
                return 0;
            }
            else {
                document.getElementById("lname_message").innerHTML = '<li>Invalid Last Name... Must contain only letters.</li>';
                return 1;
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
            dobMessage.innerHTML = '<li>Date of Birth cannot be empty.</li>';
            return 1;
        }
        else {
            if (dobTime > todayTime) {
            dobMessage.innerHTML = '<li>Invalid Date of Birth... Cannot be in the future.</li>';
            return 1;
            }
            else if (dobTime < minTime) {
                dobMessage.innerHTML = '<li>Invalid Date of Birth... Age cannot exceed 120 years.</li>';
                return 1;
            }
            else {
                dobMessage.innerHTML = "";
                return 0;
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
                return 0;
            }
            else {
                document.getElementById("ssn_message").innerHTML = '<li>Invalid SSN... Must be in the format XXX-XX-XXXX or XXXXXXXXX and contain only numbers.</li>';
                return 1; 
            }
        }
        else {
            document.getElementById("ssn_message").innerHTML = '<li>Invalid SSN... Must be between 9 and 11 digits long.</li>';
            return 1;
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
            return 0;
        }
        else {
            genderMessage.innerHTML = '<li>A gender option must be selected.</li>';
            return 1;
        }
    }

    //validation function for address line 1
    function checkaddress1() {
        x = document.getElementById("addr1").value;
        if (x.length<5) {
            document.getElementById("addr1_message").innerHTML = '<li>Invalid Address Line... Must be at least 5 characters.</li>';
            return 1;
        }
        else {
            document.getElementById("addr1_message").innerHTML = "";
            return 0;
        }
    }

    //validation function for address line 2
    function checkaddress2() {
        x = document.getElementById("addr2").value;
        y = document.getElementById("addr1").value;

        if (x.length>0 && y.length==0) {
            document.getElementById("addr2_message").innerHTML = '<li>Address Line 1 must be filled out if Address Line 2 is used.</li>';
            return 1;
        }
        else if (x.length>0 && x.length<5) {
            document.getElementById("addr2_message").innerHTML = '<li>Invalid Address Line... Must be at least 5 characters.</li>';
            return 1;
        }
        else {
            document.getElementById("addr2_message").innerHTML = "";
            return 0;
        }
    }

    //validation function for city
    function checkcity() {
        x = document.getElementById("city").value;
        const cityPattern = /^[A-Za-z0-9\s-]{2,}[A-Za-z0-9\s]*$/;
        if (x.length>=2) {
            if (cityPattern.test(x)) {
                document.getElementById("city_message").innerHTML = "";
                return 0;
            }
            else {
                document.getElementById("city_message").innerHTML = "<li>Invalid City name... Must NOT contain special characters.</li>";
                return 1;
            }
        }
        else {
            document.getElementById("city_message").innerHTML = "<li>Invalid City... Must be at least 2 characters.</li>";
            return 1;
        }
    }

    //validation function for zip code
    function checkzip() {
        x = document.getElementById("zip").value;
        const zipPattern = /^\d{5}(-\d{4})?$/;

        // validate zip code if true or false when matched to pattern
        if (zipPattern.test(x)) {
            document.getElementById("zip_message").innerHTML = "";
            return 0;
        }
        else {
            document.getElementById("zip_message").innerHTML = "<li>Invalid Zip Code... Must be in the format XXXXX or XXXXX-XXXX and contain only numbers.</li>";
            return 1; 
        }
    }

    //validation function for phone number
    function checkphone() {
        x = document.getElementById("phone").value;
        const phonePattern = /^\d{10}$/;

        // validate phone number matches to pattern
        if (phonePattern.test(x)) {
            document.getElementById("phone_message").innerHTML = "";
            return 0;
        }
        else {
            document.getElementById("phone_message").innerHTML = "<li>Invalid Phone Number... Must be 10 digits long and contain only numbers.</li>";
            return 1; 
        }
    }

    //validation function for email
    function checkemail() {
        x = document.getElementById("email").value;
        const emailPattern = /^(?=.{5,50}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (x.length<5) {
            document.getElementById("email_message").innerHTML = "<li>Email cannot be less than 5 character long.</li>";
            return 1;
        }
        else {
            if (emailPattern.test(x)) {
                document.getElementById("email_message").innerHTML = "";
                return 0;
            }
            else {
                document.getElementById("email_message").innerHTML = "<li>Invalid Email Format.</li>";
                return 1;
            }
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
            return 0;
        }
        else {
            insuranceMessage.innerHTML = "<li>An inurance option must be selected.</li>";
            return 1;
        }
    }


    //validation function for the text aresa input
    function checktextarea() {
        x = document.getElementById("visit_reason").value;

        if (x.length<2) {
            document.getElementById("visit_reason_message").innerHTML = "<li>Invalid Description... Must be at least 2 characters.</li>";
            return 1;
        }
        else {
            document.getElementById("visit_reason_message").innerHTML = "";
            return 0;
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
            return 0;
        }
        else {
            diagnosisMessage.innerHTML = "<li>A diagnosis option must be selected.</li>";
            return 1;
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
            return 0;
        }
        else {
            vaccinationMessage.innerHTML = "<li>A vaccination option must be selected.</li>";
            return 1;
        }
    }

    //validation function for user id
    function checkuserid() {
        x = document.getElementById("username").value;
        const useridPattern = /^[A-Za-z][A-Za-z0-9]{5,16}$/;

        // check userid length and pattern
        if (useridPattern.test(x)) {
            document.getElementById("username_message").innerHTML = "";
            return 0;
        }
        else {
            document.getElementById("username_message").innerHTML = "<li>Invalid User ID... Must be 6-15 characters long , start with a letter character, and contain only letters and numbers.</li>";
            return 1; 
        }
    }

    // validation for password ensuring strength
    function passwordStrengthCheck() {
        // return error flag after all checks
        let password_error = 0;
        // get password input value
        let passwordoutput;
        const passwordinput = document.getElementById("password").value;

        // check for lowercase letter
        if (passwordinput.search(/[a-z]/) < 0) {
            passwordoutput = "<li>Password must contain at least 1 lowercase letter.</li>";
            password_error = 1;
        }
        else {
            passwordoutput = "";
        }
        document.getElementById("password_message1").innerHTML = passwordoutput;
        
        // check for uppercase letter
        if (passwordinput.search(/[A-Z]/) < 0) {
            passwordoutput = "<li>Password must contain at least 1 uppercase letter.</li>";
            password_error = 1;
        }
        else {
            passwordoutput = "";
        }
        document.getElementById("password_message2").innerHTML = passwordoutput;

        // check for number
        if (passwordinput.search(/[0-9]/) < 0) {
            passwordoutput = "<li>Password must contain at least 1 number.</li>";
            password_error = 1;
        }
        else {
            passwordoutput = "";
        }
        document.getElementById("password_message3").innerHTML = passwordoutput;

        // check for special character
        if (passwordinput.search(/[@#$%]/) < 0) {
            passwordoutput = "<li>Password must contain at least 1 special character (@, #, $, %)</li>";
            password_error = 1;
        }
        else {
            passwordoutput = "";
        }
        document.getElementById("password_message4").innerHTML = passwordoutput;

        // check for length
        if (passwordinput.length < 8 || passwordinput.length > 20) {
            passwordoutput = "<li>Password must be between 8 and 20 characters long.</li>";
            password_error = 1;
        }
        else {
            passwordoutput = "";
        }
        document.getElementById("password_message5").innerHTML = passwordoutput;

        return password_error;
    }

    // Check confirm password matches password
    function checkconfirm_password() {
        x = document.getElementById("password").value;
        y = document.getElementById("confirm_password").value;
        let password2_error = 0;

        if (y.length < 1) {
            document.getElementById("confirm_password_message").innerHTML = "<li>Confirm Password cannot be empty.</li>";
            password2_error = 1;
        }
        else {
            if (y !== x) {
                document.getElementById("confirm_password_message").innerHTML = "<li>Passwords do not match.</li>";
                password2_error = 1;
            }
            else {
                document.getElementById("confirm_password_message").innerHTML = "";
                password2_error = 0;
            }
        }

        return password2_error;
    }

    // validation function to check all form fields
    function validateData() {

        // declare error flag
        let error_flag = 0;

        // call and accumulate error flags
        error_flag |= checkfirstname();
        error_flag |= checkminitial();
        error_flag |= checklastname();
        error_flag |= checkdob();
        error_flag |= checkssn();
        error_flag |= checkgender();
        error_flag |= checkaddress1();
        error_flag |= checkaddress2();
        error_flag |= checkcity();
        error_flag |= checkzip();
        error_flag |= checkphone();
        error_flag |= checkemail();
        error_flag |= checkinsurance();
        error_flag |= checktextarea();
        error_flag |= checkdiagnosis();
        error_flag |= checkvaccination();
        error_flag |= checkuserid();
        error_flag |= passwordStrengthCheck();
        error_flag |= checkconfirm_password();

        console.log('Error Flag: ' + error_flag);
        if (error_flag === 1) {
            alert("Form contains errors. Please correct them before submitting.");
        }
        else {
            document.getElementById("submitFormButton").disabled = false;
        }
    }
// End of Form Validation Functions

// Range slider value display
const slider = document.getElementById("pain_level");
const display = document.getElementById("valueDisplay");
display.innerHTML = slider.value;
slider.addEventListener("input", function() {
    const newValue = this.value;
    display.innerHTML = newValue;
});

// Fetch API function to take state abbreviation and grab the full state name from local json file to display next to the field
// JSON code sourced from: https://gist.github.com/mshafrir/2646763#file-states_titlecase-json
    document.getElementById("stateAbbreviation").addEventListener("change", getState);
    async function getState() {
        const input = document.getElementById("stateAbbreviation").value;
        const field = document.getElementById("stateName");
        // Fetch Data
        try {
            let stObject = await fetch('states_titlecase.json');
            const data = await stObject.json();
            let stateName;
            //Loop through the object til desired data and change the "stateName" field's value.
            for (i = 0; i < data.length; i++) {
                if (data[i].abbreviation.toUpperCase() === input.toUpperCase()) {
                    stateName = data[i].name;
                    break;
                }
            }
            field.textContent = stateName;
        }
        catch {
            field.textContent = "Error";
        }
    }

// Function for DOM manipulation to show and hide sections
    function showSection(sectionId) {
        document.querySelectorAll('.main-content').forEach(section => {section.style.display = 'none';});
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'flex';
        }
    }

// Function to reveal the navigation bar
    function revealNavBar() {
        const navBar = document.getElementById('navbar');
        if (navBar) {
            navBar.style.display = 'flex';
        }

        showSection('form-section');
    }

// On page load and set today's date
    const d = new Date();
                let text = d.toLocaleDateString();
                document.getElementById("today").innerHTML = text;
    
// Cookie Implementation Functions
// Set cookie function
    function setCookie(name, value, expiration) {
        const date = new Date();
        date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
// Delete cookie function
    function deleteCookie() {
        setCookie("firstname", "", 0);
        setCookie("lastname", "", 0);
        clearLocalStorage();
    }
// Get a cookie
    function getCookie(name) {
        const cDecoded = decodeURIComponent(document.cookie);
        const cArray = cDecoded.split("; ");
        let result = null;

        cArray.forEach(element => {
            if(element.indexOf(name) == 0){
                result = element.substring(name.length + 1)
            }
        })
        return result;
    }
// Check for cookies
    function checkCookies() {
        const welcomeDisplay = document.getElementById("cookieMessage");
        const verifyDisplay = document.getElementById("cookieVerify");
        const displayBtn = document.getElementById("verification-buttons");
        let userfname = getCookie("firstname");
        let userlname = getCookie("lastname");
        if (userfname != "" && userfname != null) {
            // call inner html on load welcome page
            welcomeDisplay.innerHTML = "back " + userfname;
            verifyDisplay.innerHTML = "Please verify this information and select an option to continue. <br> Is this your full name "+ userfname+ " " + userlname + "?";
            displayBtn.innerHTML = '<button id="returningUser" class="welcomeBtn" onclick="showSection(\'form-section\'); revealNavBar(); return false;">Yes</button> <button id="newUser" class="welcomeBtn" onclick="showSection(\'form-section\'); revealNavBar(); deleteCookie(); clearLocalStorage(); resetForm(); return false;">No</button>';
        } else {
            verifyDisplay.innerHTML = "Our records indicate that you are a first time user.";
            displayBtn.innerHTML = '<button id="newUser" class="welcomeBtn" onclick="showSection(\'form-section\'); revealNavBar(); return false;">Create account</button>';

        }
    }
// Option to save or delete cookies/local storage with checkbox
    function saveCookie() {
        const rememberBox = document.querySelector("#rememberUser");
        if (rememberBox.checked) {
            setCookie("firstname", document.getElementById("firstname").value, 2);
            setCookie("lastname", document.getElementById("lastname").value, 2);
        }
        else {
            deleteCookie();
        }
    }
// Set Local Storage
    function saveLocalStorage() {
        localStorage.setItem('firstname', document.getElementById("firstname").value);
        localStorage.setItem('miname', document.getElementById("minitial").value);
        localStorage.setItem('lastname', document.getElementById("lastname").value);
        localStorage.setItem('dob', document.getElementById("dob").value);
        localStorage.setItem('address1', document.getElementById("addr1").value);
        localStorage.setItem('address2', document.getElementById("addr2").value);
        localStorage.setItem('zip', document.getElementById("zip").value);
        localStorage.setItem('city', document.getElementById("city").value);
        localStorage.setItem('state', document.getElementById("stateAbbreviation").value);
        localStorage.setItem('phone', document.getElementById("phone").value);
        localStorage.setItem('email', document.getElementById("email").value);
    }
// Clear Local Storage
    function clearLocalStorage() {
        localStorage.clear();
    }
// Get and fill local Storage
    function localFill() {
        let userfname = getCookie("firstname");
        let userlname = getCookie("lastname");
        if (userfname != "" && userfname != null) {
            document.getElementById("firstname").value = localStorage.getItem('firstname');
            document.getElementById("minitial").value = localStorage.getItem('miname');
            document.getElementById("lastname").value = localStorage.getItem('lastname');
            document.getElementById("dob").value = localStorage.getItem('dob');
            document.getElementById("addr1").value = localStorage.getItem('address1');
            document.getElementById("addr2").value = localStorage.getItem('address2');
            document.getElementById("zip").value = localStorage.getItem('zip');
            document.getElementById("city").value = localStorage.getItem('city');
            document.getElementById("stateAbbreviation").value = localStorage.getItem('state');
            document.getElementById("phone").value = localStorage.getItem('phone');
            document.getElementById("email").value = localStorage.getItem('email');
        }
        else {
            clearLocalStorage();
        }
    }
// Reset Form Function
 function resetForm() {
    document.getElementById("intakeForm").reset();
 }

//(Extra Credit) Modal Popup
document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.querySelector("#submitModal");
    const openModal = document.querySelector("modalBtn");
    const closeModal = document.querySelector("#goBack");

    openModal.addEventListener('click', () => {
        modal.showModal();
    })

    closeModal.addEventListener('click', () => {
        modal.close();
    })
});
    


document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("locationModal");
    const modalBtn = document.getElementById("modalBtn");
    const modalSpan = document.getElementsByClassName("close")[0];
    modalBtn.onclick = function() {
        reviewData();
        modal.style.display = "block";
    }
    modalSpan.onclick = function() {
        modal.style.display = "none"
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
    const modal = document.getElementById("locationModal");
    const modalBtn = document.getElementById("modalBtn");
    const modalSpan = document.getElementsByClassName("close")[0];
    modalBtn.onclick = function() {
        reviewData();
        modal.style.display = "block";
    }
    modalSpan.onclick = function() {
        modal.style.display = "none"
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

    }

// (Extra Credit) Zip Code API From third party Smarty
// Fetch API to input city and state based on zip code
    document.getElementById("zip").addEventListener("blur", getZipcode);
        async function getZipcode() {
            try{
                const zip = document.getElementById("zip").value;
                // API Fetch call with zip value
                const response = await fetch("https://us-zipcode.api.smarty.com/lookup?key=254252966418726078&city=&state=&zipcode=" + zip);
                // Error handling
                if (!response.ok) {
                    throw new Error("Could not fetch zip code data.");
                }
                // Store API data
                const data = await response.json();
                console.log(data);
                // Fill city and state fields
                const city = data[0].city_states?.[0]?.city;
                const stateAbbreviation = data[0].city_states?.[0]?.state_abbreviation;

                document.getElementById("city").value = city;
                document.getElementById("stateAbbreviation").value = stateAbbreviation;
            }
            catch (error) {
                console.error("Error fetching zip code data: ", error);
            }
        }
