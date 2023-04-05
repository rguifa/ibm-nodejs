const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

function getDateFromString(strDate) {
  let [dd, mm,yyyy] = strDate.split('-');
  return new Date(yyyy+"/"+mm+"/"+dd);
}

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
  res.send(JSON.stringify({users}, null, 4));
});

//GET users with particular last name eg: Smith
router.get("/lastName/:lastName", (req,res) => {
  const lastName = req.params.lastName;
  let filtered_lastName = users.filter((user) => user.lastName === lastName);
  res.send(filtered_lastName);

});

// Sorts users by DOB Asc;
router.get("/sortAsc",(req,res)=>{
//   let sorted_users=users.sort(function(a, b) {
//       let d1 = getDateFromString(a.DOB);
//       let d2 = getDateFromString(b.DOB);
//           return d1-d2;
//         });
  let sorted_users = users.sort((a,b) => getDateFromString(a.DOB) - getDateFromString(b.DOB));
  res.send(sorted_users);
});

// Sorts users by DOB Desc;
router.get("/sortDesc",(req,res)=>{
  //   let sorted_users=users.sort(function(a, b) {
  //       let d1 = getDateFromString(a.DOB);
  //       let d2 = getDateFromString(b.DOB);
  //           return d1-d2;
  //         });
    let sorted_users = users.sort((a,b) => getDateFromString(a.DOB) - getDateFromString(b.DOB));
    sorted_users.reverse();
    res.send(sorted_users);
  });

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
  const email  = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
  users.push(
    {
      "firstName" : req.query.firstName,
      "lastName"  : req.query.lastName,
      "email"     : req.query.email,
      "DOB"       : req.query.DOB
    }
  )
  res.send("The user " + req.query.firstName + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if ( filtered_users.length >0 ) {
    let filtered_user = filtered_users[0];
    let DOB = req.query.DOB;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    if ( DOB ) {
      filtered_user.DOB = DOB
    }
    if ( firstName ) {
      filtered_user.firstName = firstName
    }
    if ( lastName ) {
      filtered_user.lastName = lastName
    }
    users = users.filter((user) => user.email != email);
    users.push( filtered_user );
    res.send( `User with email ${email} updated.` );
  }
  else {
    res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`The user with email ${email} was deleted.`)
});

module.exports=router;
