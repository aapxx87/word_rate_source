import { word_stat_base } from "../word_freq_base";
import { btn_save_script } from "./save";
export const search_scripts = 2;

// Main box
const result_box = document.querySelector('.result_box')

// Search
const input = document.querySelector('.input')
const btn_search = document.querySelector('.btn_search')

// Result box
const tableBox = document.querySelector('.table_box')

// const input_translate = document.querySelector('.input_translate')




export const normalize_word_query = (word_income) => word_income.toLowerCase().trim()



export const create_result_arr = function (search_word) {

  const resultArr = word_stat_base.filter(function (el) {
    return el.Column2 === search_word
  })

  // console.log(resultArr);

  return resultArr

}


const createHTML = function (arr) {

  let markup = ''

  arr.forEach(function (el) {

    markup = markup + `
      <tr>
        <td class="td_long">${el.Column2}</td>
        <td class="td_medium">${el["word-freq-top5000"]}</td>
        <td class="td_pos">${el.Column3}</td>
      </tr>
    `

  })


  const tbody = `
    <tbody class="tbody">
      ${markup}
    </tbody>
  `

  const thead = `
  <div class="subheading">
    <p class="subheading_text">Result</p>
  </div>

  <div class="table_box">
    <table class="table">
      <thead>
      <th>Word</th>
      <th>Rank</th>
      <th>PoS</th>
      </thead>
      ${tbody}
    </table>
  </div>

  <div>
    <input type="text" class="input input_translate" placeholder="Enter translation">
  </div>

  <div>
    <button class="btn btn-long btn-save js-btn-save">Save</button>
  </div>
  `

  result_box.insertAdjacentHTML('afterbegin', thead)


}


const render = function (word_income) {

  createHTML(create_result_arr(normalize_word_query(word_income)))

  // функция для сохранения резузльтатов, см в файле save.js
  btn_save_script(create_result_arr(normalize_word_query(word_income)))

}




btn_search.addEventListener('click', function () {

  const btn_save = document.querySelector('.js-btn-save')
  btn_save.disabled = false

  btn_save.classList.remove('deactive')

  btn_search.classList.remove('active')

  result_box.innerHTML = ''

  const word_income = input.value

  render(word_income)

  input.value = ''

  // const input_translate = document.querySelector('.input_translate')

  // input_translate.focus()

})


document.addEventListener('keydown', function (e) {

  if (e.key === 'Enter' && input.value) {

    btn_search.classList.remove('active')

    result_box.innerHTML = ''

    const word_income = input.value

    render(word_income)

    input.value = ''

    const input_translate = document.querySelector('.input_translate')

    input_translate.focus()

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