// calculate.js - Submitted by Timothy Chua; 301283980;

// Lower bounds array (initialized based on assignment demo).
const barMinimum = [95,90,85,80,75,70,65,60,55,50,0];

// Individual grade storage array.
const grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

// Letter grade histogram counter array.
const barTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Maximum grade tracker/accumulator.
let max = 100;

// Displayed text strings.
let txt = "";
let notifyTxt = "";
let invalidText = "Unable to display histogram. Invalid lower bound order.";
let outOfRangeText = "<br> Cannot add grade outside of marking range.";

// Application start-up, call print once.
printHistogram();

// Helper JavaScript Methods

// Print method.
function printHistogram(){
 	refreshHistogram(); // In case of bound change, re-count histogram totals.
	txt = "";
	for (let i = 0; i < barTotals.length; i++){
   		for (let j = 0; j < barTotals[i]; j++) {
      			txt += "|";
    		}
    	txt += "<br>";
  	}

  if (sortedBounds() == false){ // If non-usable bounds, display error message.
	txt = invalidText;
  }
  document.getElementById("histogramText").innerHTML = txt; // Display histogram OR error message.
  document.getElementById("notifyInput").innerHTML = notifyTxt; // Potential out of range warning.
  notifyTxt = ""; // Clear out of range warning for future print iterations.
}

// Histogram data reset method. Reset all grade counters to zero.
function refreshHistogram(){
  barTotals.forEach(resetTotals); // Wipe accumulators.
  for(let i = 0; i < grades.length; i++) {
    countForBarTotal(grades[i]); // Loop recounts for accumulators.
  }
}

// Add new grade to grade array.
function addGrade() {
  let newGradeNumber = document.getElementById('grade').value;
  if ((newGradeNumber <= max) && (newGradeNumber >= barMinimum[10])){
	grades.push(newGradeNumber); // If new grade within acceptable range, push.
  }
  else{
	notifyTxt = outOfRangeText; // If out of range, no push, prepare warning.
  }
  printHistogram(); // Display histogram with updated data and any warnings.
}

// Method, setter for max, updates display immediately.
function changeMax(value) {
  max = value;
  printHistogram();
}

// Method, setter for lower bound values. Parameters specify what to update.
function changeBound(value, index) {
  barMinimum[index] = value;
  printHistogram(); // Display histogram with updated lower bounds.
}

// Method, arg value compared with lower bounds array to histogram bar counter.
function countForBarTotal(value) {
  if (value >= barMinimum[0]) { // Comparison designed for for-each loop of grades array.
    barTotals[0]++;
  }
  else if (value >= barMinimum[1]) {
    barTotals[1]++;
  }
  else if (value >= barMinimum[2]) {
    barTotals[2]++;
  }
  else if (value >= barMinimum[3]) {
    barTotals[3]++;
  }
  else if (value >= barMinimum[4]) {
    barTotals[4]++;
  }
  else if (value >= barMinimum[5]) {
    barTotals[5]++;
  }
  else if (value >= barMinimum[6]) {
    barTotals[6]++;
  }
  else if (value >= barMinimum[7]) {
    barTotals[7]++;
  }
  else if (value >= barMinimum[8]) {
    barTotals[8]++;
  }
  else if (value >= barMinimum[9]) {
    barTotals[9]++;
  }
  else if (value >= barMinimum[10]) {
    barTotals[10]++;
  }
}

// Method for setting array element to 0. Intended helper for refreshHistogram().
function resetTotals(value,index,array){
  barTotals[index] = 0;
}

// Method, returns true if lower bounds array is in descending order (usable).
function sortedBounds(){
	if (max < barMinimum[0]){
		return false;
	}
	let secondBoundIndex;
	for(let firstBoundIndex = 0; firstBoundIndex < barMinimum.length; firstBoundIndex++){
		secondBoundIndex = firstBoundIndex+1;
		if(barMinimum[secondBoundIndex]-barMinimum[firstBoundIndex] > 0){
			return false;
		}
	}
	return true;
}