/*
    Name: Francisco Fuentes
    File: hw2.js
    Date Created: 2025-10-15
    Date Updated:
    Purpose: MIS 3371 Homework 2... Updating the patient intake form to show and validate data inputs.
*/

// Function(s) to get user data from the form and display it
function getdata() 
{
    var formContents = document.getElementById("intakeForm");
    var formOutput;
    var dataType;
    var i;
    formOutput = "<table class=dataReview><th>Data Name</th><th>Data Type</th><th>Value</th>";
    for (i = 0; i < formContents.length; i++) 
    {
        // Exclude or rewrite
        console.log("item: " + i + " name: " + formContents.elements[i].name + " type: " + formContents.elements[i].type + " value: " + formContents.elements[i].value);
        if (formContents.elements[i].value !== "") 
        {
            dataType = formContents.elements[i].type;
            switch (dataType) {
                case "checkbox":
                    if (formContents.elements[i].checked) 
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "radio":
                    if (formContents.elements[i].checked)
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "text":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "email":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "date":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case"password":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "select-one":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "textarea":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "range":
                    if (formContents.elements[i].value !== "")
                    {
                        formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                        formOutput += "<td align='right'>" + dataType + "</td>";
                        formOutput += "<td class = 'outputValue'>" + formContents.elements[i].value + "</td></tr>";
                    }
                    break;
                default:
                    formOutput += "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
                    formOutput += "<td align='right'>" + dataType + "</td>";
                    formOutput += "<td class = 'outputValue'>"+ formContents.elements[i].value+"</td></tr>";
            }
        }
    }

    if (formOutput.length > 0) 
    {
        formOutput += "</table>";
        document.getElementById("dataReview").innerHTML = formOutput;
    }
}
