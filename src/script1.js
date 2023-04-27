const links = document.querySelectorAll('#link');
links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'red';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = 'black';
  });
});



const rate = document.querySelector(".rate");
const rating = document.querySelector(".rating");
rating.onclick = function () {
    rate.style.display = "block";
}
 // -----------------------------------------------------
function saveData(event) {
  event.preventDefault();

  // Get the input values
  const rate = document.querySelector(".rate");
  const name = document.getElementById("name").value;
  const review = document.getElementById("review").value;
  const rating = document.querySelector('input[name="rg1"]:checked').value;

  // Retrieve the existing data from local storage
  let existingData = localStorage.getItem("data");

  // If there is no existing data, create an empty array
  if (!existingData) {
    existingData = [];
  } else {
    existingData = JSON.parse(existingData);
  }

  // Add the new data to the existing data array
  existingData.push({ name, review,rating});

  // Save the updated data to local storage
  localStorage.setItem("data", JSON.stringify(existingData));

  // Clear the input fields
  document.getElementById("name").value = "";
  document.getElementById("review").value = "";
  document.querySelector('input[name="rg1"]:checked').checked = false;
  rate.style.display = "none";
  // Display the saved data
  displayData();
}
var zoom = document.querySelector(".spotlightimg");
var scale = 1;

setInterval(function() {
  if (scale == 1) {
    scale = 1.2;
  } else {
    scale = 1;
  }
  zoom.style.transform = "scale(" + scale + ")";
}, 1000);



const ch=document.querySelector(".star").value;
var st=`&#9733;`;

function displayData() {
  const savedDataBody = document.querySelector("#saved-data tbody");
  savedDataBody.innerHTML = "";

  // Retrieve the saved data from local storage
  const data = JSON.parse(localStorage.getItem("data"));
  var v=0;
  // Create table rows to display the saved data
  data.forEach((item) => {
    v+=1
    const row = document.createElement("tr");

    const slnoCell = document.createElement("td");
    slnoCell.textContent = v;
    row.appendChild(slnoCell);

    const rate = document.createElement("td");
    rate.textContent = item.rating;

    row.appendChild(rate);
    const name = document.createElement("td");
    name.textContent = item.name;
    row.appendChild(name);
    const rev = document.createElement("td");
    rev.textContent = item.review;
    row.appendChild(rev);

    // Add the row to the table body
    savedDataBody.appendChild(row);
  });
}

// Display the saved data when the page loads
displayData();


function clearData() {
	// Remove the saved data from local storage
	localStorage.removeItem("data");

	// Clear the table contents
	document.getElementById("output").innerHTML = "";
}

// Call the clearData() function when the page is loaded or refreshed
window.onload = clearData;




var width=100;
		var difference=2;
		var interveralID =0;
		//document.getElementById("img1").style.width=width;

		function increase()
		{
			clearInterval(interveralID);
			interveralID=setInterval(expand,10);
		}
		function decrease()
		{
			clearInterval(interveralID);
			interveralID=setInterval(shrink,10);
		}
		function expand()
		{
			if(width<200)
			{
				width = width+difference;
				document.getElementById("img1").style.width=width;
				console.log(width);
			}
			else
			{
				clearInterval(interveralID);
			}
			
		}
		function shrink()
		{
			if(width>100)
			{
				width = width-difference;
				document.getElementById("img1").style.width=width;
				console.log(width);
			}
			else
			{
				clearInterval(interveralID);
			}
			
		}
    var countDownDate = new Date("Jun 30, 2023 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      document.querySelector("#countdown").innerHTML = (`${days} d ${hours} h ${minutes} m ${seconds}  s `);
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
      }
    }, 1000);

