/** @format */

const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";

async function getCountriesData(url) {
  try {
    let countriesResponse = await axios.get(url);
    if (countriesResponse.data == null) {
      console.error("No response was returned for the requested url!");
    } else {
      return countriesResponse.data;
    }
  } catch (error) {
    console.error("There is some error with the get operation: ", error);
  }
}
let countriesData = getCountriesData(url);

app.get("/", (req, res) => {
  // render pug template for the index.html file

  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", (req, res) => {
  let countriesAndCapital = [];

  // Sorting the data alphabetically by country names
  countriesData.then((cData) => {
    let sortedCountryCapitalData = cData.sort(function (countryName1, countryName2) {
      return countryName1.name.common.localeCompare(countryName2.name.common);
    });

    // Generating a list of country name and its capital
    sortedCountryCapitalData.forEach((element) => {
      const countryName = element.name.common;
      let countryCapital = element.capital;
      if (countryCapital === undefined) {
        countryCapital = "no data";
      }

      countriesAndCapital.push(`${countryName} - ${countryCapital}`);
    });

    res.render("page", {
      heading: "Countries and Capitals",
      results: countriesAndCapital,
    });
  });
});

app.get("/populous", (req, res) => {
  let countriesAndPop = [];

  // Filtering the countries having population more than 50 million and sorting them in an increasing order of population
  countriesData.then((countryData) => {
    let filteredCountryPopData = countryData.filter(function (countryPopulatn) {
      return countryPopulatn.population > 50000000;
    });
    let sortedCountryPopData = filteredCountryPopData.sort(function (countryPop1, countryPop2) {
      if (countryPop1.population > countryPop2.population) {
        return -1;
      } else if (countryPop1.population < countryPop2.population) {
        return 1;
      } else {
        return 0;
      }
    });

    // Generating a list of filtered country name and its population
    sortedCountryPopData.forEach((element) => {
      const countryName = element.name.common;
      const countryPop = element.population.toLocaleString();

      countriesAndPop.push(`${countryName} - ${countryPop}`);
    });

    res.render("page", {
      heading: "Most Populous Countries",
      results: countriesAndPop,
    });
  });
});

app.get("/regions", (req, res) => {
  // Sorting the countries based on their region
  countriesData.then((cData) => {
    let sortedCountryRegionData = cData.sort(function (countryName1, countryName2) {
      return countryName1.region.localeCompare(countryName2.region);
    });

    //Creating unique region lists and their counts
    let regionNames = [];
    let regionCount = [];
    let countPerRegion = 0;
    sortedCountryRegionData.forEach((element) => {
      if (!regionNames.includes(element.region)) {
        if (countPerRegion > 0) {
          regionCount.push(countPerRegion);
          countPerRegion = 0;
        }

        regionNames.push(element.region);
        countPerRegion = countPerRegion + 1;
      } else {
        countPerRegion = countPerRegion + 1;
      }
    });
    regionCount.push(countPerRegion);

    // Generating a list of region name and the count of countries in each region
    let countriesAndRegions = [];
    for (regionIndex in regionNames) {
      countriesAndRegions.push(`${regionNames[regionIndex]} - ${regionCount[regionIndex]}`);
    }

    res.render("page", {
      heading: "Regions of the World",
      results: countriesAndRegions,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
