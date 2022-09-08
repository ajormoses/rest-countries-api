const theme_mode = document.querySelector(".theme-mode");
const dark_theme = document.querySelector(".dark-mode");
const light_theme = document.querySelector(".light-mode");
const icon_i = document.querySelector(".arrow");
const drop_down = document.querySelector(".drop-down");
const filter = document.querySelector("#filter");

theme_mode.addEventListener("click", () => {
  light_theme.classList.toggle("show");
  dark_theme.classList.toggle("show");
  document.body.classList.toggle("dark-theme");
});

filter.addEventListener("click", () => {
  drop_down.classList.toggle("show");
  icon_i.classList.toggle("show");
});

// Fetch Countries API
const getCountriesData = () => {
  fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => {
      if (response.status != 200) {
        console.log("Invalid country");
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      let output = "";
      data.forEach((data) => {
        output += `<div class="country">
      <img class="flag" src="${
        data.flags.png ? data.flags.png : `Flags Not Found`
      }" alt="flag" />
      <h1 class="name">${
        data.name.common ? data.name.common : `Country name Not Found`
      }</h1>
      <div>
        Population:
        <span class="population">${
          data.population ? data.population : `Population Not Found`
        }</span>
      </div>
      <div>
        Region:
        <span class="region">${
          data.region ? data.region : `Region Not Found`
        }</span>
      </div>
      <div>
        Capital:
        <span class="capital">${
          data.capital ? data.capital : `Capital Not Found`
        }</span>
      </div>
    </div>`;
      });
      document.querySelector(".countries-card").innerHTML = output;
      getDetails();
    });
};

document.addEventListener("DOMContentLoaded", getCountriesData);

// Input - Filter by Country Name
const search = document.querySelector(".search-filter");
search.addEventListener("input", filterInput);
function filterInput() {
  const inputValue = document.querySelector(".input").value;

  fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then((response) => {
      if (response.status != 200) {
        console.log("Invalid Country name");
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      let output = "";
      data.forEach((data) => {
        output += `<div class="country">
        <img class="flag" src="${
          data.flags.png ? data.flags.png : `Flags Not Found`
        }" alt="flag" />
        <h1 class="name">${
          data.name.common ? data.name.common : `Country name Not Found`
        }</h1>
        <div>
          Population:
          <span class="population">${
            data.population ? data.population : `Population Not Found`
          }</span>
        </div>
        <div>
          Region:
          <span class="region">${
            data.region ? data.region : `Region Not Found`
          }</span>
        </div>
        <div>
          Capital:
          <span class="capital">${
            data.capital ? data.capital : `Capital Not Found`
          }</span>
        </div>
      </div>`;
      });
      document.querySelector(".countries-card").innerHTML = output;
      filterInput();
      getDetails();
    });
}

// Filter by Region
const region = document.querySelectorAll(".drop-down li");
region.forEach((regionAccess) => {
  regionAccess.addEventListener("click", () => {
    const regionName = regionAccess.textContent;
    drop_down.classList.toggle("show");
    fetch(`https://restcountries.com/v3.1/region/${regionName}`)
      .then((response) => {
        if (response.status != 200) {
          console.log("Invalid Country name");
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let output = "";
        data.forEach((data) => {
          output += `<div class="country">
            <img class="flag" src="${
              data.flags.png ? data.flags.png : `Flags Not Found`
            }" alt="flag" />
            <h1 class="name">${
              data.name.common ? data.name.common : `Country name Not Found`
            }</h1>
            <div>
              Population:
              <span class="population">${
                data.population ? data.population : `Population Not Found`
              }</span>
            </div>
            <div>
              Region:
              <span class="region">${
                data.region ? data.region : `Region Not Found`
              }</span>
            </div>
            <div>
              Capital:
              <span class="capital">${
                data.capital ? data.capital : `Capital Not Found`
              }</span>
            </div>
          </div>`;
        });
        document.querySelector(".countries-card").innerHTML = output;
        getDetails();
      });
  });
});

const getDetails = () => {
  const country = document.querySelectorAll(".country");
  country.forEach((country) => {
    country.addEventListener("click", () => {
      const countryName = country.querySelector(".name").textContent;
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          if (response.status != 200) {
            console.log("Invalid country");
            throw Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          createDetails(data);
        });
      document.querySelector(".countries-details").style.display = "block";
      document.querySelector(".countries-card").style.display = "none";
      document.querySelector(".countries").style.display = "none";
      document.querySelector(".search-filter").style.display = "none";
      backButton();
    });
  });
};

function backButton() {
  const back = document.querySelector(".back");
  back.addEventListener("click", (e) => {
    if (e.target.className == "back-btn") {
      document.querySelector(".countries-card").style.display = "grid";
      document.querySelector(".countries-card").style.gap = "2rem";
      document.querySelector(".countries").style.display = "block";
      document.querySelector(".search-filter").style.display = "block";
      document.querySelector(".countries-details").style.display = "none";
    }
  });
}

const borderDetails = () => {
  const border = document.querySelectorAll(".border-btns button");
  border.forEach((bord) => {
    bord.addEventListener("click", () => {
      const newBorder = bord.textContent;
      fetch(`
      https://restcountries.com/v3.1/alpha/${newBorder}`)
        .then((response) => {
          if (response.status != 200) {
            console.log("Invalid country");
            throw Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          createDetails(data);
        });
      document.querySelector(".countries-details").style.display = "block";
      document.querySelector(".countries-card").style.display = "none";
      document.querySelector(".countries").style.display = "none";
      document.querySelector(".search-filter").style.display = "none";
      backButton();
    });
  });
};

function createDetails(data) {
  let output = "";

  data.forEach((data) => {
    console.log(data);
    let currency = "";
    let languages = "";
    let border = "";
    data.borders.forEach((bord) => {
      border += `<button>${bord}</button>`;
    });
    for (let key in data.currencies) {
      currency += data.currencies[key].name;
    }
    for (let key in data.languages) {
      languages += " " + data.languages[key];
    }
    output += `<button class="back-btn">
    <i class="fa-solid fa-arrow-left-long"></i> Back
  </button>
  <div class="wrap">
    <img class="country-flag" style="box-shadow: 0 0 2px hsl(209, 23%, 22%);" src="${
      data.flags.png ? data.flags.png : `Flags Not Found`
    }" alt="flag" />
    <div class="row">
      <ul class="row-one">
        <h1 class="country-name">${
          data.name.common ? data.name.common : `Country name Not Found`
        }</h1>
        <li>Native Name: <span class="nativeName">${
          data.name.official ? data.name.official : `Native name Not Found`
        }</span></li>
        <li>Population: <span class="population">${
          data.population ? data.population : `Population Not Found`
        }</span></li>
        <li>Region: <span class="region">${
          data.region ? data.region : `Region Not Found`
        }</span></li>
        <li>Sub Region: <span class="subregion">${
          data.subregion ? data.subregion : `Sub region Not Found`
        }</span></li>
        <li>Capital: <span class="capital">${
          data.capital ? data.capital : `Capital Not Found`
        }</span></li>
      </ul>
      <ul class="row-two">
        <li>Top Level Domain: <span class="tld">${
          data.tld ? data.tld : `Top level domain Not Found`
        }</span></li>
        <li>Currencies: <span class="currencies">${currency}</span></li>
        <li>Languages: <span class="language">${languages}</span></li>
      </ul>
    <div class="border">
    <h3>Border Countries:</h3>
    <div class="border-btns">
      ${border}
    </div>
    </div>
    </div>
    </div>`;
  });
  document.querySelector(".countries-details").innerHTML = output;
  borderDetails();
}
