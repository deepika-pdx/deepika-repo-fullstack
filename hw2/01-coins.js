/**
 * Exercise 01 - Coins *
 *
 * @format
 */

const calculateChange = (input) => {
  if (typeof input !== "number") {
    return `"${input}" is not a numerical value!`;
  }

  let amount = input;
  let result = "";
  if (input <= 10.0) {
    let no_of_dollar = 0;
    let no_of_quarter = 0;
    let no_of_dime = 0;
    let no_of_nickel = 0;
    let no_of_penny = 0;

    // Finding the number of dollars
    no_of_dollar = Math.floor(input / 1);

    // Finding the number of quarters
    if (no_of_dollar > 0) {
      input = input - no_of_dollar * 1;
      no_of_quarter = Math.floor(input / 0.25);
    } else {
      no_of_quarter = Math.floor(input / 0.25);
    }

    // Finding the number of dimes
    if (no_of_quarter > 0) {
      input = input - no_of_quarter * 0.25;
      no_of_dime = Math.floor(input / 0.1);
    } else {
      no_of_dime = Math.floor(input / 0.1);
    }

    // Finding the number of nickels
    if (no_of_dime > 0) {
      input = input - no_of_dime * 0.1;
      no_of_nickel = Math.floor(input / 0.05);
    } else {
      no_of_nickel = Math.floor(input / 0.05);
    }

    // Finding the number of pennies
    if (no_of_nickel > 0) {
      input = input - no_of_nickel * 0.05;
      // Adding condition to handle node issue of not rounding values below 0.01
      if (input < 0.01) {
        no_of_penny = Math.round(input / 0.01);
      } else {
        no_of_penny = Math.floor(input / 0.01);
      }
    } else {
      if (input < 0.01) {
        no_of_penny = Math.round(input / 0.01);
      } else {
        no_of_penny = Math.floor(input / 0.01);
      }
    }

    // Preparing the output string based on number of each change value
    let dollar_string = no_of_dollar > 1 ? "dollars" : "dollar";
    let quarter_string = no_of_quarter > 1 ? "quarters" : "quarter";
    let dime_string = no_of_dime > 1 ? "dimes" : "dime";
    let nickel_string = no_of_nickel > 1 ? "nickles" : "nickel";
    let penny_string = no_of_penny > 1 ? "pennies" : "penny";

    result = `$${amount} ==> `;
    dollar_temp = no_of_dollar > 0 ? `${no_of_dollar} ${dollar_string}` : "";
    result = result.concat(dollar_temp);
    quarter_temp = no_of_quarter > 0 ? `, ${no_of_quarter} ${quarter_string}` : "";
    result = result.concat(quarter_temp);
    dime_temp = no_of_dime > 0 ? `, ${no_of_dime} ${dime_string}` : "";
    result = result.concat(dime_temp);
    nickel_temp = no_of_nickel > 0 ? `, ${no_of_nickel} ${nickel_string}` : "";
    result = result.concat(nickel_temp);
    penny_temp = no_of_penny > 0 ? `, ${no_of_penny} ${penny_string}` : "";
    result = result.concat(penny_temp);

    return result;
  } else {
    return `${amount} ==> Error: the number is too large`;
  }
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
console.log(calculateChange(6));
// $6 ==> 6 dollars
console.log(calculateChange("test"));
// "test" is not a numerical value!
