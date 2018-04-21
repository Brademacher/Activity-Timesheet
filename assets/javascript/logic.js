// Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDjyTP5wldptHTwINEtTITjhqad6tRG5zE",
    authDomain: "timestamp-activity.firebaseapp.com",
    databaseURL: "https://timestamp-activity.firebaseio.com",
    projectId: "timestamp-activity",
    storageBucket: "timestamp-activity.appspot.com",
    messagingSenderId: "322784635803"
  };

  firebase.initializeApp(config);

var database = firebase.database();

//Initial Values
var name = "";
var role = "";
var startDate = "";
var rate = 0;

//Function to push values to firebase database
$(".btn").on("click", function (event) {
    name = $("#employee").val().trim();
    role = $("#role").val().trim();
    startDate = $("#hire-date").val().trim();
    rate = $("#pay").val().trim();

    // Grabbed values from text boxes
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

 // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
 database.ref().on("child_added", function(childSnapshot) {
      
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().rate);
    
    // full list of items to the well
    $("#all-employees").append("<div class='well border-bottom'><span class='employee-name'> " + childSnapshot.val().name +
      " </span><span class='employee-role'> " + childSnapshot.val().role +
        " </span><span class='employee-hire-date'> " + childSnapshot.val().startDate +
          " </span><span class='employee-pay'> " + childSnapshot.val().comment + " </span></div>");
          
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });