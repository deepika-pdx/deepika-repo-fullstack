/**
 * Exercise 03 - Form *
 *
 * @format
 */

function displayFormDetails(event) {
  event.preventDefault();
  console.log("============Form Submission============");

  // Gettings values of form elements
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#contactEmail").value;
  const feedback = document.querySelector("#contactTextArea").value;
  const newsletter = document.querySelector("#newsletterCheck");

  //Logging the values of form elements to the console
  console.log(`   Name: ${name}`);
  console.log(`   Email: ${email}`);

  // Checking if feedback was submitted
  if (feedback !== null) {
    console.log(`   Feedback: ${feedback}`);
  } else {
    console.log("   Feedback: No feedback was submitted.");
  }

  // Checking if user signed up for newsletter
  if (newsletter !== null && newsletter.checked == true) {
    console.log("   Newsletter: Yes, I would like to join the newsletter.");
  } else {
    console.log("   Newsletter: No, thank you.");
  }
}
