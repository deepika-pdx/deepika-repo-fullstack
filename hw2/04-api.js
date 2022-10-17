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
    .then((response) => response.json())
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
    });
};

getData(url);
