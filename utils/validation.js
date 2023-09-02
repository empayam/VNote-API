// Function to validate an email address
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  
  // Function to validate a phone number (assuming a simple format)
  function isValidPhoneNumber(phone) {
    // Regular expression for a basic phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }
  
  // Function to validate a password (minimum 8 characters)
  function isValidPassword(password) {
    return password.length >= 8;
  }
  
  module.exports = {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
  };
  