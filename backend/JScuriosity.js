const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const url = "https://mars.nasa.gov/msl/mission/weather/";

fetch(url)
    .then(response => response.text())
    .then(html => {
        const dom = new JSDOM(html);
        const table = dom.window.document.querySelectorAll('table')[0];
        const marsTitles = Array.from(table.querySelectorAll('th')).slice(0, -1);
        const marsTableTitles = marsTitles.map(title => title.textContent.trim());

        // Filter out unwanted categories
        const filteredTitles = marsTableTitles.filter(category => !category.includes("Air") && category !== "");

        console.log(filteredTitles);

        // Fetch JSON data
        return fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");
    })
    .then(response => response.json())
    .then(data => {
        const chart = data.soles.slice(0, 7).map(row => ({
            terrestrial_date: row.terrestrial_date,
            sol: row.sol,
            max_temp: row.max_temp,
            min_temp: row.min_temp,
            pressure: row.pressure,
            sunrise: row.sunrise,
            sunset: row.sunset
        }));

        console.log(chart);
    })
    .catch(error => console.error("Error fetching data:", error));