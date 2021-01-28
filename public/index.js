const selectCountry = document.querySelector('#countries');
const testDiv = document.querySelector('#testing');
const countryStat = document.querySelector('#dataCountry');
const tbodyTable = document.querySelector('#coronaStat');
const formCountries = document.querySelector('#countries');
// const graphBtn = document.querySelector('#graphShow');
const showGraphCountries = document.querySelector('#showCountries');

// Data for each country
var countriesNames = [];
var totalConfirmedCountry = [];
var totalDeathsCountry = [];
var totalRecoveredCountry = [];
var newConfirmedCountry = [];
var newDeathsCountry = [];
var newRecoveredCountry = [];
var link = "https://api.covid19api.com/summary";

function showData() {
  fetch(link)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      var totalConfirmed = data.Global.TotalConfirmed;
      var totalDeaths = data.Global.TotalDeaths;
      var totalRecovered = data.Global.TotalRecovered;
      var newConfirmed = data.Global.NewConfirmed;
      var newDeaths = data.Global.NewDeaths;
      var newRecovered = data.Global.NewRecovered;

      document.getElementById("TotalConfirm").innerText = totalConfirmed;
      document.getElementById("totalDeaths").innerText = totalDeaths;
      document.getElementById("totalRecovered").innerText = totalRecovered;
      document.getElementById("newConfirmed").innerText = newConfirmed;
      document.getElementById("newDeaths").innerText = newDeaths;
      document.getElementById("newRecovered").innerText = newRecovered;

      var countries = data.Countries;
      countries.forEach((country) => {
        countriesNames.push(country.Country);
        totalConfirmedCountry.push(country.TotalConfirmed);
        totalDeathsCountry.push(country.TotalDeaths);
        totalRecoveredCountry.push(country.TotalRecovered);
        newConfirmedCountry.push(country.NewConfirmed);
        newDeathsCountry.push(country.NewDeaths);
        newRecoveredCountry.push(country.NewRecovered);
      });

      var mychart = document.getElementById("chart").getContext("2d");
      var chart = new Chart(mychart, {
        type: "line",
        data: {
          labels: countriesNames,
          datasets: [
            {
              label: "Total Confirmed",
              data: totalConfirmedCountry,
              backgroundColor: "purple",
              minBarLength: 100,
            },
            {
              label: "Total Deaths",
              data: totalDeathsCountry,
              backgroundColor: "red",
              minBarLength: 100,
            },
            {
              label: "Total Recovred",
              data: totalRecoveredCountry,
              backgroundColor: "green",
              minBarLength: 100,
            },
            {
              label: "New Confirmed",
              data: newConfirmedCountry,
              backgroundColor: "pink",
              minBarLength: 100,
            },
            {
              label: "New Deaths",
              data: newDeathsCountry,
              backgroundColor: "red",
              minBarLength: 100,
            },
            {
              label: "New Recovred",
              data: newRecoveredCountry,
              backgroundColor: "orange",
              minBarLength: 100,
            },
          ],
        },
        option: {},
      });
    });
}

showData();

//fetchData();

function fetchData() {

  // fetch global corona data :
  fetch("https://api.covid19api.com/summary").then(res => {
      return res.json()
  }).then(data => {
      //console.log(data.Global.NewConfirmed);
      const html = 
          `
          <td>${data.Global.NewConfirmed}</td>
          <td>${data.Global.NewDeaths}</td>
          <td>${data.Global.NewRecovered}</td>
          <td>${data.Global.TotalConfirmed}</td>
          <td>${data.Global.TotalDeaths}</td>
          <td>${data.Global.TotalRecovered}</td>
          `;
      tbodyTable.innerHTML = html;
  });
}

// graph data for all countries :
var countryArr = [];
var confirmedArr = [];
var deathsArr = [];
var recovredArr = [];
$("#showCountries").click(function () {
  fetch("https://api.covid19api.com/summary").then(res => {
      return res.json();
  }).then( data => {
      //console.log(data.Countries);
      data.Countries.forEach(country => {
      console.log(country.TotalConfirmed);

          // show chart by country :
          
          countryArr.push(country.Country);
          confirmedArr.push(country.TotalConfirmed);
          deathsArr.push(country.TotalDeaths);
          recovredArr.push(country.TotalRecovered);

          var mychart = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(mychart, {
              type : 'line',
              data : {
                  labels : countryArr,
                  datasets : [
                      {
                          label : "Total Confirmed",
                          data : confirmedArr,
                          backgroundColor : "gray",
                          minBarLength : 100,
                      },
                      {
                          label : "Total Deaths",
                          data : deathsArr,
                          backgroundColor : "red",
                          minBarLength : 100,
                      },
                      {
                          label : "Total Recovred",
                          data : recovredArr,
                          backgroundColor : "green",
                          minBarLength : 100,
                      }
                  ]
              },
              option : {}
          })
      })
  })
})

// recall for fetch function :
fetchData();

function fetchCountries() {
  // fetch data for all countries :
  fetch("https://api.covid19api.com/countries").then(res => {
      if(!res.ok){
          throw Error("ERROR");
      }
      return res.json();
  }).then( data => {
      data.forEach(country => {
          console.log(country.Slug);
          $("#countries").append(`<option value=${country.Slug} id="opt">${country.Slug}</option>`);
      });
  }).catch(error => {
      console.log(error);
  });
}

// Jquery for country section
$("#countries").click(function() {
  var e = document.getElementById("countries");
  const mapping = document.querySelector('#mapp');
  var country = e.value
  // var map = document.getElementById("frame");
  //  map.src=`http://maps.google.com/maps?q=%22+${country.Lat}+%22,%22+${country.Lon}+%22&z=9&output=embed`;
  //console.log(country, map)
  

  const url = "https://api.covid19api.com/dayone/country";
  // fetch data for each country :
  fetch(`${url}/${country}`).then(res => {
      return res.json();
  }).then(data => {
    console.log(data[0].Lat);
    let posLat = data[0].Lat;
    let posLon = data[0].Lon;
    var html1 = `<iframe src="http://maps.google.com/maps?q=${posLat},${posLon}&z=16&output=embed" style="width:100%;height:578px;" id="frame"></iframe>`;
    mapping.innerHTML = html1;
      var arrActive = [];
      var arrConfirmed = [];
      var arrDeaths = [];
      var arrRecovred = [];
      var arrDates = [];
      const html = data.slice(0, 100).map(country => {
          arrActive.push(country.Active);
          arrConfirmed.push(country.Confirmed);
          arrDeaths.push(country.Deaths);
          arrRecovred.push(country.Recovered);
          arrDates.push(country.Date);

          // draw a graph for each counrty :
          var mychart = document.getElementById('myChart1').getContext('2d');
          var chart = new Chart(mychart, {
              type : 'line',
              data : {
                  labels : arrDates,
                  datasets : [
                      {
                          label : "Total Confirmed",
                          data : arrConfirmed,
                          backgroundColor : "gray",
                          minBarLength : 100,
                      },
                      {
                          label : "Total Deaths",
                          data : arrDeaths,
                          backgroundColor : "red",
                          minBarLength : 100,
                      },
                      {
                          label : "Total Recovred",
                          data : arrRecovred,
                          backgroundColor : "green",
                          minBarLength : 100,
                      },
                      {
                          label : "Total Active",
                          data : arrRecovred,
                          backgroundColor : "orange",
                          minBarLength : 100,
                      }
                  ]
              },
              option : {}
          })
          
          return `
              <tbody>
                  <tr>
                      <td>${country.Country}</td>
                      <td>${country.CountryCode}</td>
                      <td>${country.Confirmed}</td>
                      <td>${country.Deaths}</td>
                      <td>${country.Recovered}</td>
                      <td>${country.Lat}, ${country.Lon}</td>
                      <td id="allDates">${country.Date}</td>
                  </tr>
              </tbody>
          `;
      }).join();
      countryStat.innerHTML = html;
  });


  
});