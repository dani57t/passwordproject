// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Variables for the user's options
var lower = false;
var upper = false;
var numeric = false;
var special = false;
var length = 0;

// Array variable for the getRandom function
var passArr = [];
var chars = 0;
var randomChar = false;
var charArrs = [];

// Function to prompt user for password options
function getPasswordOptions() {
  // Get user's choice of character types
  lower = confirm("Do you want your password to contain lowercase characters?");
  upper = confirm("Do you want your password to contain uppercase characters?");
  numeric = confirm("Do you want your password to contain numeric characters?");
  special = confirm("Do you want your password to contain special characters?");

  // Make sure user has selected at least one option
  if (!lower && !upper && !numeric && !special) {
    alert("You must select at least one character type");
    getPasswordOptions(); // If player has not selected an option, recall function
  } else {
    // Push arrays of chosen character types to chatArrs array
    if (lower) {
      charArrs.push(lowerCasedCharacters);
    }
    if (upper) {
      charArrs.push(upperCasedCharacters);
    }
    if (numeric) {
      charArrs.push(numericCharacters);
    }
    if (special) {
      charArrs.push(specialCharacters);
    }
    // Prompt user to enter desired password length
    // Use a while loop to recur is user enters invalid input, otherwise, break
    while (true) {
      if (length < 8 || length > 128) {
        length = prompt("How long would you like your password? (8 - 128 characters)");
      } else {
        break;
      }
    }
    // Divide length of password by number of selected character types
    // if there's a remainder then randomChar = true, indicating we need to add one more character
    // to the password
    if (length % (charArrs.length) != 0) {
      randomChar = true; 
    }
  }
  // chars variable indicates how many characters we take from each array of character types
  chars = Math.floor(length / (charArrs.length));
}

// Function for getting a random element from an array
function getRandom(arr) {
  // for loop will take an even amount of characters from each array passed to the function
  for (var i = 0; i < chars; i++) {
    passArr.push(arr[Math.floor(Math.random() * arr.length)]); // Select random characters from given array, add to new array
  }
}

// Function to generate password with user input
function generatePassword() {
  // for loop to jumble the password array
  for (var i = 0; i < passArr.length; i++) {
    var j = Math.floor(Math.random() * (i+1)); // Set j to random index in the array
    var swap = passArr[i];  // swap is a variable to temporarily storing passArr[i]
    passArr[i] = passArr[j]; // Set passArr[i] to passArr[j]
    passArr[j] = swap; // Set passArr[j] to passArr[i] (swap)
  }
  return passArr.join(""); // Return the jumbled password as a string using .join("")
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Call getPasswordOptions to get password data from user
getPasswordOptions();
// Call getRandom to get random characters based on user's data
// use if statements to check what characters the user wants
if (lower) {
  getRandom(lowerCasedCharacters);
}
if (upper) {
  getRandom(upperCasedCharacters);
}
if (numeric) {
  getRandom(numericCharacters);
}
if (special) {
  getRandom(specialCharacters);
}
// if the we need to add another character 
if (randomChar) {
  // set chars to 1 so we only add 1
  chars = 1;
  // call getRandom on a random array of characters matching the user's preference 
  getRandom(charArrs[Math.floor(Math.random() * charArrs.length)]);
}


// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);