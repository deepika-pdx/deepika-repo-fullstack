/**
 * Exercise 04 - API *
 *
 * @format
 */

const url = "https://restcountries.com/v3.1/all";
let ol = document.querySelector("#results");

// Get the country objects list using fetch API
let getData = (url) => {
  fetch(url)
    // Throwing error in case the response is invalid
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK.");
      }
      return response;
    })
    // Checking if empty response was returned
    .then((response) => {
      if (response.body == null) {
        console.error("No response was returned for the fetch operation!");
        return {};
      } else {
        return response.json();
      }
    })
    .then((data) => {
      // Sort the list of country objects alphabetically
      let sortedData = data.sort(function (countryName1, countryName2) {
        return countryName1.name.common.localeCompare(countryName2.name.common);
      });
      // Iterate through the sorted list and get the country name and its population
      sortedData.forEach((element) => {
        const countryName = element.name.common;
        const population = element.population.toLocaleString();

        // Create li elements and append the country details to it
        let li = document.createElement("li");
        li.style.fontWeight = "bold";
        li.appendChild(document.createTextNode(`${countryName} - ${population}`));
        ol.appendChild(li);
      });
    })
    // Handling fetch opeartion error
    .catch((error) => {
      console.error("There is some error with the fetch operation: ", error);
    });
};

getData(url);
