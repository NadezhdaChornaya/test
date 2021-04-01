const appRoot = document.getElementById('app-root');
let isSort
const negativeValue = -1

appRoot.insertAdjacentHTML('afterbegin', `
<header class='header-section'>
<h1 class='title'>Countries Search</h1>
      <form id='form'>
      <fieldset class='fieldset'>
      <legend class='legend'>Please choose the type of search</legend>
        <label class='label'>
        <input class='input' type="radio" name='type of search' value='region'/>
        By Region
        </label>
        <label class='label'>
        <input class='input' type="radio" name='type of search' value='language'/>
        By Language
        </label>
        </fieldset>
        <fieldset class='fieldset'>
          <legend class='legend'>Please choose search query:</legend>
          <select class='select' id='selectSearch' disabled>
            <option class='option'selected disabled>Select value</option>
          </select>
        </fieldset>
      </form>
      </header>
      <main id='main block'></main>
`)
const formRef = document.getElementById('form')
const selectRef = document.getElementById('selectSearch')
const mainRef = document.getElementById('main block')
const cleanMarkup = () => {
    mainRef.innerHTML = ''
}

const createOptions = (e) => {
    typeOfSearch = e.target.value
    const textSearch = document.getElementById('no items')
    if (!textSearch) {
        formRef.insertAdjacentHTML('afterend', `
        <p id='no items'>No items, please choose
search query</p>
        `)
    }
    selectRef.removeAttribute('disabled')
    if (typeOfSearch === 'region') {
        localStorage.setItem('typeOfSearch', typeOfSearch)
        externalService.getRegionsList().map(regionItem => {
            return selectRef.insertAdjacentHTML('afterbegin', `
            <option value='${regionItem}'>${regionItem}</option>
            `)
        })
    }
    if (typeOfSearch === 'language') {
        localStorage.setItem('typeOfSearch', typeOfSearch)
        externalService.getLanguagesList().map(languageItem => {
            return selectRef.insertAdjacentHTML('afterbegin', `
            <option value='${languageItem}'>${languageItem}</option>
            `)
        })
    }
}

const createTable = (array, arrowName = `&uarr;  &darr;`, arrowArea = `&uarr;  &darr;`) => {
    mainRef.insertAdjacentHTML('beforeend', `
        <table id="table" class="table-sort">
        <thead>
         <tr>
        <th data-type='country' class='head-table'>
        Country name
        <span data-type='arrowUpCountry' class='arrow'>${arrowName}</span>
        </th>
        <th data-type='capital'>Capital</th>
        <th data-type='region'>World region</th>
        <th data-type='languages'>Languages</th>
        <th data-type='area'>
        Area
        <span data-type='arrowUpArea' class='arrow'>${arrowArea}</span>
        </th>
        <th data-type='flag'>Flag</th>
      </tr>
      </thead>
   ${array.map((item) => {
        return ` <tbody>
        <tr>
        <td>${item.name}</td>
        <td>${item.capital}</td>
        <td>${item.region}</td>
        <td>${Object.values(item.languages).toString().replace(/,/g, ', ')}</td >
        <td>${item.area}</td>
        <td><img src=${item.flagURL}></td>
      </tr >
       </tbody>`

    }).join('')}
      </table >
        `)
}


const getSortTable = (e) => {
    let arr
    let arrowName
    let arrowArea
    const sortArrow = e.target.dataset.type
    const typeOfSearch = localStorage.getItem('typeOfSearch')
    const valueSearch = localStorage.getItem('valueSearch')
    if (typeOfSearch === 'region') {
        arr = externalService.getCountryListByRegion(valueSearch)
    } else {
        arr = externalService.getCountryListByLanguage(valueSearch)
    }

    const sortUpName = arr.sort(function (a, b) {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x < y) {
            return negativeValue;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
    const sortDownName = arr.sort(function (a, b) {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (y < x) {
            return negativeValue;
        }
        if (y > x) {
            return 1;
        }
        return 0;
    });
    const sortUpArea = arr.sort(function (a, b) {
        return b.area - a.area
    });
    const sortDownArea = arr.sort(function (a, b) {
        return a.area - b.area
    });

    if (sortArrow === 'arrowUpCountry') {
        isSort ? isSort = false : isSort = true
        isSort ? arrowName = '&uarr;' : arrowName = '&darr;'
        cleanMarkup()
        createTable(sortUpName, arrowName)
    } else if (sortArrow === 'arrowDownCountry') {
        isSort ? isSort = false : isSort = true
        isSort ? arrowName = '&uarr;' : arrowName = '&darr;'
        cleanMarkup()
        createTable(sortDownName, arrowName)
    } else if (sortArrow === 'arrowUpArea') {
        isSort ? isSort = false : isSort = true
        isSort ? arrowArea = '&uarr;' : arrowArea = '&darr;'
        cleanMarkup()
        createTable(sortUpArea, undefined, arrowArea)
    } else if (sortArrow === 'arrowDownArea') {
        isSort ? isSort = false : isSort = true
        isSort ? arrowArea = '&uarr;' : arrowArea = '&darr;'
        cleanMarkup()
        createTable(sortDownArea, undefined, arrowArea)
    } else {
        return
    }
}


const getTableSearch = (e) => {
    const typeOfSearch = localStorage.getItem('typeOfSearch')
    const textSearch = document.getElementById('no items')
    cleanMarkup()
    textSearch.innerHTML = ''

    let arr
    const valueSearch = e.target.value
    localStorage.setItem('valueSearch', valueSearch)
    if (typeOfSearch === 'region') {
        arr = externalService.getCountryListByRegion(valueSearch)
    } else {
        arr = externalService.getCountryListByLanguage(valueSearch)
    }
    console.log(externalService.getCountryListByRegion(valueSearch))
    console.log(externalService.getCountryListByRegion(valueSearch).sort())
    createTable(arr)
}



formRef.addEventListener('click', createOptions)
selectRef.addEventListener('change', getTableSearch)
mainRef.addEventListener('click', getSortTable)

