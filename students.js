const students = [];

class Student {
  constructor(name,weight,height,gpa,hair,alive) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gpa = gpa;
    this.hair = hair;
    this.alive = alive;
  }
}
/*
var student1 = new Student("Fred Flinstone",635,272,1,"DarkOrange","DECEASED");
var student2 = new Student("Dead Velma", 100, 100, 0, "Brown","DECEASED");

students.push(student1);
//students.push(student2);

for (let i = 0; i < 19; i++) {
  students.push(student1);
}*/
drawGrid();

function drawGrid() {
  for (let i = 0; i < students.length; i++) {
    var boxID = "box" + i;
    var boxTextID = "text" + i;

    var currentBox = document.getElementById(boxID);

    if ((students[i].hair == "Black")||(students[i].hair == "Blue")||
        (students[i].hair == "Brown")||(students[i].hair == "Purple")||
        (students[i].hair == "Red")){
      currentBox.style.color = "White";
    }
    else {
      currentBox.style.color = "Black";
    }
    currentBox.style.backgroundColor = students[i].hair;
    currentBox.style.height = students[i].height/2 + "%";
    currentBox.style.width = students[i].weight/2 + "%";
    currentBox.style.borderStyle = "groove";

    document.getElementById(boxTextID).innerHTML = students[i].name + "<br><br>" + students[i].gpa + "<br>" + students[i].alive;
  }
  document.getElementById("notify").innerHTML = "Use the visualizer interface below.";
  prepDropList();
  prepModForm();
}

function prepDropList() {
  var dropList = document.getElementById("modChoice");

  for (let i = students.length; i >= 0; i--) {
    dropList.remove(i);
  }
  for (let i = 0; i < students.length; i++) {
    var newOption = document.createElement("option");
    newOption.text = students[i].name;
    dropList.add(newOption);
  }
  dropList.value = students[0].name;
}

function prepModForm() {
  var modSelect = document.getElementById("modChoice").value;

  for (let i = 0; i < students.length; i++) {
    if (modSelect == students[i].name) {
      document.getElementById("modName").value = students[i].name;
      document.getElementById("modWeight").value = students[i].weight;
      document.getElementById("modHeight").value = students[i].height;
      document.getElementById("modGPA").value = students[i].gpa;
      document.getElementById("modHair").value = students[i].hair;
      document.getElementById("modAlive").value = students[i].alive;
      break;
    }
  }
}

function addStudent(){
  var notifyText = "Student added to visualizer.";

  var newName= document.getElementById("addName").value;
  var newWeight= document.getElementById("addWeight").value;
  var newHeight= document.getElementById("addHeight").value;
  var newGPA= document.getElementById("addGPA").value;
  var newHair= document.getElementById("addHair").value;
  var newAlive= document.getElementById("addAlive").value;

  if ((newName.length > 0) && (newWeight.length > 0) &&
    (newHeight.length > 0) && (newGPA.length > 0)) {

    if ((newWeight >=0) && (newWeight <= 635) &&
      (newHeight >=0)&&(newHeight <= 272) &&
      (newGPA >=0) && (newGPA <= 4)){
      var dupeIndex = -1;

      for (let i = 0; i < students.length; i++) {
        if (newName == students[i].name) {
          dupeIndex = i;
          break;
        }
      }
      if (dupeIndex === -1) {
        
        if (students.length < 20) {
          var newStudent = new Student(newName,newWeight,newHeight,newGPA,newHair,newAlive);
        
          students.push(newStudent);
          drawGrid();
          
          document.getElementById("addName").value = "";
          document.getElementById("addWeight").value = "";
          document.getElementById("addHeight").value = "";
          document.getElementById("addGPA").value = "";

          notifyText = "Added student to visualizer.";
        }
        else {
          notifyText = "Cannot add student. Visualizer capacity reached (20/20).";
        }
      }
      else {
        notifyText = "Cannot add student. Names in visualizer must be unique.";
      }
    }
    else{
      notifyText =
        "Cannot add student. One or more fields has humanely unobtainable values.";
    }  
  }
  else {
    notifyText = "Cannot add student. One or more fields left empty.";
  }
  document.getElementById("notify").innerHTML=notifyText;
}

function modStudent(){
  var notifyText = "Modified student in visualizer.";
  var selectForMod = document.getElementById("modChoice").value;

  var studentToModIndex = -1;
  for (let i = 0; i < students.length; i++) {
    if (selectForMod === students[i].name) {
      studentToModIndex = i;
      break;
    }
  }
  var newName= document.getElementById("modName").value;
  var newWeight= document.getElementById("modWeight").value;
  var newHeight= document.getElementById("modHeight").value;
  var newGPA= document.getElementById("modGPA").value;
  var newHair= document.getElementById("modHair").value;
  var newAlive= document.getElementById("modAlive").value;

  if ((newName.length > 0) && (newWeight.length > 0) &&
    (newHeight.length > 0) && (newGPA.length > 0)) {

    if ((newWeight >=0) && (newWeight <= 635) &&
      (newHeight >=0)&&(newHeight <= 272) &&
      (newGPA >=0) && (newGPA <= 4)){
      var dupeIndex = -1;

      for (let i = 0; i < students.length; i++) {
        if (newName == students[i].name) {
          dupeIndex = i;
          break;
        }
      }
      if ((dupeIndex === -1)||(dupeIndex === studentToModIndex)) {
        students[studentToModIndex].name = newName;
        students[studentToModIndex].weight = newWeight;
        students[studentToModIndex].height = newHeight;
        students[studentToModIndex].gpa = newGPA;
        students[studentToModIndex].hair = newHair;
        students[studentToModIndex].alive = newAlive;
        drawGrid();
      }
      else {
        notifyText = "Cannot modify student. Names in visualizer must be unique.";
      }
    }
    else{
      notifyText =
        "Cannot modify student. One or more fields has humanely unobtainable values.";
    }  
  }
  else {
    notifyText = "Cannot modify student. One or more fields left empty.";
  }
  document.getElementById("notify").innerHTML=notifyText;
}

function deleteStudent() {
  var notifyText = "Cannot delete from empty visualizer."
  var selectForDelete = document.getElementById("modChoice").value;

  for (let i = 0; i < students.length; i++) {
    if (selectForDelete === students[i].name) {
      clearGridEndBox();
      students.splice(i,1);
      drawGrid();
      notifyText = "Student deleted from visualizer."
      break;
    }
  }
  document.getElementById("notify").innerHTML=notifyText
  prepDropList();
  prepModForm();
}

function clearGridEndBox() {
  var deleteIndex = students.length -1;
  var boxToClear = document.getElementById("box" + deleteIndex);
  var textToClear = document.getElementById("text" + deleteIndex);

  textToClear.innerHTML = "";
  boxToClear.style.backgroundColor = "LightGrey";
  boxToClear.style.borderStyle = "none";
}
