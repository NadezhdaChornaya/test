const appRoot = document.getElementById('app-root');

appRoot.insertAdjacentHTML('afterbegin', `
<header>
<h1>Countries Search</h1>
      <form id='form'>
        <p>Please choose the type of search</p>
        <label><input type="radio" name='type of search' value='region'/>By Region</label>
        <label><input type="radio" name='type of search' value='language'/>By Language</label>
        <p>
          Please choose search query:
          <select id='selectSearch' disabled>
            <option selected disabled>Select value</option>
          </select>
        </p>
      </form>
      </header>
      <main id='main block'></main>
`)
const formRef = document.getElementById('form')
const selectRef = document.getElementById('selectSearch')
const mainRef = document.getElementById('main block')

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



const createTable = (e) => {
    const typeOfSearch = localStorage.getItem('typeOfSearch')
    const textSearch = document.getElementById('no items')
    mainRef.innerHTML = ''
    textSearch.innerHTML = ''

    let arr
    const { value } = e.target

    if (typeOfSearch === 'region') {
        arr = externalService.getCountryListByRegion(value)
    } else {
        arr = externalService.getCountryListByLanguage(value)
    }
    console.log(externalService.getCountryListByRegion(value))
    console.log(externalService.getCountryListByRegion(value).sort())
    mainRef.insertAdjacentHTML('beforeend', `
        <table id="table" class="table_sort">
        <thead>
         <tr>
        <th data-type='country'>
        Country name
        <span class='arrowUp'>&darr;</span>
        <span class='arrowDown'>&uarr;</span>
        </th>
        <th data-type='capital'>Capital</th>
        <th data-type='region'>World region</th>
        <th data-type='languages'>Languages</th>
        <th data-type='area'>
        Area
        <span class='arrowUp'>&darr;</span>
        <span class='arrowDown'>&uarr;</span>
        </th>
        <th data-type='flag'>Flag</th>
      </tr>
      </thead>
   ${arr.map((item) => {
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

    // const arrowRefUp = document.querySelector('.arrowUp')
    // const arrowRefDown = document.querySelector('.arrowDown')

    // arrowRefUp.addEventListener('click', console.log(arrowRefUp))
    // arrowRefDown.addEventListener('click', console.log(arrowRefDown))
}


formRef.addEventListener('click', createOptions)
selectRef.addEventListener('change', createTable)










// =================================================================================================

// function sortTable() {

// const getSortTable = (table, column, asc = true) => {
//     const dirModifier = asc ? 1 : -1
//     const tBody = table.tBody[0]
//     const rows = Array.from(tBody.querySelector('tr'))
//     const sortedBows = rows.sort((a, b) => {
//         console.log(a)
//         console.log(b)
//     })
//     sortedBows()
// }





//     let table, rows, switching, i, x, y, shouldSwitch;
//     table = document.getElementById('table');
//     switching = true;
/*Make a loop that will continue until
no switching has been done:*/
    // while (switching) {
    //     //start by saying: no switching is done:
    //     switching = false;
    //     rows = table.rows;
    //     /*Loop through all table rows (except the
    //     first, which contains table headers):*/
    //     for (i = 1; i < rows.length - 1; i++) {
    //         //start by saying there should be no switching:
    //         shouldSwitch = false;
    //         /*Get the two elements you want to compare,
    //         one from current row and one from the next:*/
    //         x = rows[i].getElementsByTagName('TD')[0];
    //         y = rows[i + 1].getElementsByTagName('TD')[0];
    //         //check if the two rows should switch place:
    //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    //             //if so, mark as a switch and break the loop:
    //             shouldSwitch = true;
    //             break;
    //         }
    //     }
    //     if (shouldSwitch) {
    //         /*If a switch has been marked, make the switch
    //         and mark that a switch has been done:*/
    //         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    //         switching = true;
    //     }
    // }
// }







// const getSortTable = (index, type) => {






//     // const arrowRefUp = document.querySelectorAll('.arrowUp')
//     // const arrowRefDown = document.querySelectorAll('.arrowDown')
//     // const table = document.getElementById('table')
//     // const tBody = table.querySelectorAll('tbody')
//     // console.log(table)
//     // console.log(tBody)
//     // const compare = (rowA, rowB) => {
//     //     return rowA.cells[index].innerHTML - rowB.cells[index].innerHTML
//     // }
//     // const compare = (rowA, rowB) => {
//     //     const rowDataA = rowA.cells[index].innerHTML
//     //     const rowDataB = rowB.cells[index].innerHTML
//     //     switch (type) {
//     //         case value:

//     //             break;

//     //         default:
//     //             break;
//     //     }
//     // }
//     // let rows = [].slice.call(tBody.rows)
//     // rows.sort(compare)
//     // table.removeChild(tBody)
//     // for (let i = 0; i < rows.length; i++) {
//     //     tBody.appendChild(rows[i])
//     // }
//     // table.appendChild(tBody)
// }


// mainRef.addEventListener('click', (e) => {
//     const el = e.target
//     if (el.nodeName === 'TH') {
//         return
//     }
//     const index = el.cellIndex
//     const type = el.getAttribute('data-type')
//     getSortTable(index, type)

// })









// console.log(externalService.getRegionsList())
// 0: "Europe"
// 1: "North America"
// 2: "South America"
// 3: "Africa"
// 4: "Asia"
// 5: "Oceania"

// console.log(externalService.getLanguagesList())
// ["Ukrainian", "Hungarian", "German", "Belarusian", "French", "English", "Croatian", "Spanish", "Guaraní", "Portuguese", "Aymara", "Arabic", "Turkish", "Mandarin", "Japanese", "Korean"]



/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/
