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
      <div class="grid_cell cell_content">${el.Column2}</div>
      <div class="grid_cell cell_content">${el["word-freq-top5000"]}</div>
      <div class="grid_cell grid_cell-right cell_content">${el.Column3}</div>
    `

  })


  const result_html = `
    <div class="subheading">
      <p class="subheading_text">Result</p>
    </div>

    <div class="table_box_grid">

      <div class="grid_cell cell_head">Word</div>
      <div class="grid_cell cell_head">Rank</div>
      <div class="grid_cell grid_cell-right cell_head">PoS</div>

      ${markup}
    
    </div>

    <div>
      <textarea name="" id="" cols="30" rows="1" class="textarea" placeholder="Enter origin sentence"></textarea>
    </div>
    
    <div>
      <input type="text" class="input input_translate" placeholder="Enter translation">
    </div>

    <div>
      <button class="btn btn-long btn-save js-btn-save">Save</button>
    </div>
  `

  result_box.insertAdjacentHTML('afterbegin', result_html)


}


const render = function (word_income) {

  createHTML(create_result_arr(normalize_word_query(word_income)))

  var textarea = document.getElementsByTagName('textarea')[0];

  textarea.addEventListener('paste', resize);

  function resize() {
    var el = this;
    setTimeout(function () {
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 1);
  }

  // функция для сохранения резузльтатов, см в файле save.js
  btn_save_script(create_result_arr(normalize_word_query(word_income)))


  active_color_btn_save()


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


const active_color_btn_save = function () {


  const input_translate = document.querySelector('.input_translate')
  const input_sentence = document.querySelector('.textarea')
  const btn_save = document.querySelector('.js-btn-save')



  input_translate.oninput = function () {

    if (input_translate.value.length > 3 && input_sentence.value.length > 3) {
      btn_save.classList.add('active')
    } else {
      btn_save.classList.remove('active')
    }

  }


  input_sentence.oninput = function () {

    if (input_translate.value.length > 3 && input_sentence.value.length > 3) {
      btn_save.classList.add('active')
    } else {
      btn_save.classList.remove('active')
    }

  }

}





