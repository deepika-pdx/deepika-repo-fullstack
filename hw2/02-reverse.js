/**
 * Exercise 02 - Reverse *
 *
 * @format
 */

const reverseInput = () => {
  let inputValue = document.querySelector("#input").value;
  let mainElement = document.querySelector("main");

  // Removing the div if added in the current session
  const previousDiv = document.querySelector(".textDiv");
  if (previousDiv !== null) {
    document.querySelector(".textDiv").remove();
  }

  // Creating the div and p elements
  let divElement = document.createElement("div");
  divElement.className = "textDiv";
  const pElement = document.createElement("p");

  // Setting the content of p element in case of error
  if (inputValue.length !== 8) {
    pElement.textContent = "";
    pElement.textContent = "Error: Please input an 8-digit number";
    pElement.style.color = "red";
    pElement.style.marginTop = "20px";
    pElement.style.marginBottom = "-1px";
  } else {
    // Reversing the input number
    reverseValue = inputValue.toString().split("").reverse().join("");
    pElement.textContent = "";
    pElement.textContent = `${inputValue} --> ${reverseValue}`;
    pElement.style.color = "green";
    pElement.style.marginTop = "20px";
    pElement.style.marginBottom = "-1px";
  }

  // Appending the created div and p elements to the main element
  divElement.append(pElement);
  mainElement.appendChild(divElement);
  return;
};
