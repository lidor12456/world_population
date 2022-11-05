const continents = ["Africa", "America", "Asia", "Europe", "Oceania"]
const RegionsAndCountries = {}
// const countryListObj = {}
const africaBtn = document.querySelector(".Africa")
const americaBtn = document.querySelector(".America")
const asiaBtn = document.querySelector(".Asia")
const europeBtn = document.querySelector(".Europe")
const oceaniaBtn = document.querySelector(".Oceania")
const chartContainer = document.querySelector(".chart-js-container")
const countriesOfRegionDiv = document.querySelector(".countries-of-region")
// const myChart = document.querySelector("#myChart")





// fetch data
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getContinents = async () => {
    for (let i=0;i<continents.length;i++){
      const continentName = continents[i];
      const currentRegion = await fetchData(`https://restcountries.com/v3.1/region/${continents[i]}`)
      Object.assign(RegionsAndCountries,{[continentName]: {}})
    //   Object.assign(countryListObj,{[continentName]: {}})
      for (let j = 0; j < currentRegion.length; j++) {
        Object.assign(RegionsAndCountries[continentName], {
            [currentRegion[j].name.common] : {
                population : currentRegion[j].population,
                area : currentRegion[j].area,
            }
        }
            )
        
      }

    }
    
    console.log(RegionsAndCountries);
    return RegionsAndCountries
// console.log(countryListObj);
}

getContinents()

const getFirstTenCountries = async (obj,region) => {
    firstTenKeysArr = []
    obj = await obj;
    const keys = Object.keys(obj[region]);
    for(let i =0; i<10; i++) {
        // console.log(keys[i]);
        firstTenKeysArr.push(keys[i])
    }
    console.log(firstTenKeysArr);
    return(firstTenKeysArr);
}


 const getFirstTenPopulations = async (obj,string) => {
obj = await obj;
let arr =[]
let arr2 = []
let obj2 = obj[string]
for (const key in obj2) {
arr.push(obj2[key].population);
}
for (let index = 0; index < 10; index++) {
arr2.push(arr[index])

}
console.log(arr2);
return arr2


 }


const drawChart = async (firstTenCountriesArr,populationsArr) => {
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
 

  data: {
    labels :  await firstTenCountriesArr,
    datasets: [
      {
        label: "# of Population",
        data: await populationsArr,
        // data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        maintainAspectRatio: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        precision:0,
      },
      x: {
        beginAtZero: false,
        precision:0,
      }
    },
  },
});
}





const drawByClick = (string) => {
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    drawChart(getFirstTenCountries(getContinents(),string)
    .then((e)=> {
       return(e);
    })
    .catch()
    ,getFirstTenPopulations(getContinents(),string)
    .then((e)=> {
        return(e);
     })
     .catch()
    ) 
}

const createCountriesOfRegion = async (obj,region) => {
    obj =  await obj
    let obj2 = obj[region];
    countriesOfRegionDiv.innerHTML="";
    for (let key in obj2) {
        key=key.replaceAll(' ', '')
        let div = document.createElement("div");
        div.classList.add(key);
        div.classList.add("country-of-region");
        div.textContent = key
        countriesOfRegionDiv.appendChild(div);
    }

}





asiaBtn.addEventListener('click',()=> {
    drawByClick("Asia")
    createCountriesOfRegion(getContinents(),"Asia")

})
africaBtn.addEventListener('click',()=> {
    drawByClick("Africa")
    createCountriesOfRegion(getContinents(),"Africa")

})
americaBtn.addEventListener('click',()=> {
    drawByClick("America")
    createCountriesOfRegion(getContinents(),"America")
 
})

europeBtn.addEventListener('click',()=> {
    drawByClick("Europe")
    createCountriesOfRegion(getContinents(),"Europe")

})

oceaniaBtn.addEventListener('click',()=> {
    drawByClick("Oceania")
    createCountriesOfRegion(getContinents(),"Oceania")

})
