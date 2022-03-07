import { word_stat_base } from './word_freq_base'
import "./styles/style.css"

const input = document.querySelector('.input')
const btn_search = document.querySelector('.btn_search')

const tableBox = document.querySelector('.table_box')

const main_container = document.querySelector('.main_container')
const result_container = document.querySelector('.result_box')



const normalize_word_query = (word_income) => word_income.toLowerCase().trim()



const create_result_arr = function (search_word) {

  const resultArr = word_stat_base.filter(function (el) {
    return el.Column2 === search_word
  })

  console.log(resultArr);

  return resultArr

}


const createHTML = function (arr) {

  let markup = ''

  arr.forEach(function (el) {

    markup = markup + `
      <tr>
        <td>${el["word-freq-top5000"]}</td>
        <td>${el.Column3}</td>
        <td>${el.Column2}</td>
      </tr>
    `

  })


  const tbody = `
    <tbody class="tbody">
      ${markup}
    </tbody>
  `

  const thead = `
  <table class="table">
    <thead>
      <th>Rank</th>
      <th>PoS</th>
      <th>Word</th>
    </thead>
    ${tbody}
  </table>
  `

  tableBox.insertAdjacentHTML('afterbegin', thead)

}


const render = function (word_income) {

  createHTML(create_result_arr(normalize_word_query(word_income)))

}




btn_search.addEventListener('click', function () {

  btn_search.classList.remove('active')


  tableBox.innerHTML = ''

  const word_income = input.value

  render(word_income)


  input.value = ''



})


document.addEventListener('keydown', function (e) {

  if (e.key === 'Enter' && input.value) {

    btn_search.classList.remove('active')

    tableBox.innerHTML = ''

    const word_income = input.value

    render(word_income)


    input.value = ''

  }

})



input.oninput = function () {

  if (input.value.length > 1) {
    btn_search.classList.add('active')
  } else {
    btn_search.classList.remove('active')
  }

}


input.focus()







