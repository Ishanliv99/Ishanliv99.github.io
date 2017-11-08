var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.width = "80%";
mainWrapper.style.background = "black";
mainWrapper.style.height = "700px";
mainWrapper.style.margin = "auto";
mainWrapper.style.color = "white";
mainWrapper.style.fontSize = "32px";
mainWrapper.style.textAlign = "Center";

var fname = document.createElement("span");
mainWrapper.appendChild(fname);
fname.id = "name";
fname.style.display = "block";

var dob = document.createElement("span");
mainWrapper.appendChild(dob);
dob.id = "dob";
dob.style.display = "block";

var paddress = document.createElement("span");
mainWrapper.appendChild(paddress);
paddress.id = "address";
paddress.style.display = "block";

var college = document.createElement("span");
mainWrapper.appendChild(college);
college.id = "college";
college.style.display = "block";

var highschool = document.createElement("span");
mainWrapper.appendChild(highschool);
highschool.id = "highschool";
highschool.style.display = "block";

var school = document.createElement("span");
mainWrapper.appendChild(school);
school.id = "school";
school.style.display = "block";

var uname = document.createElement("span");
mainWrapper.appendChild(uname);
uname.id = "username";
uname.style.display = "block";

var state = document.createElement("span");
mainWrapper.appendChild(state);
state.id = "status";
state.style.display = "block";

var profile = {
    name: "Ishan Dhakal",
    dob: "22/04/1995",
    address: "Dhapasi, Kathmandu",
    college: "Kathmandu Engineering College",
    highschool: "Trinity International College",
    school: "Galaxy Public School",
    username: "Ishanliv99",
    status: "LF Intern",
}

fname.innerHTML = "Name : " + profile.name;
dob.innerHTML = "Date of Birth: " + profile.dob;
paddress.innerHTML = "Address : " + profile.address;
college.innerHTML = "College : " + profile.college;
highschool.innerHTML = "High School : " + profile.highschool;
school.innerHTML = "School: " + profile.school;
uname.innerHTML = "Username : " + profile.username;
state.innerHTML = "Status : " + profile.status;

var picture = document.createElement("img");
picture.src = "image.jpg"
mainWrapper.appendChild(picture);