// export const save_scripts = 2;
import { create_result_arr } from "./search";
import { normalize_word_query } from "./search"

const save_box = document.querySelector('.save_box')




let saved_list = []

let word = ''




const deleteBtnClass = function () {

  let btnDelete = document.querySelectorAll('.delete_item_btn')

  btnDelete.forEach(function (el) {

    el.addEventListener('click', function () {

      word = el.classList[1];

      search_item(word)

      return word
    })
  })


}



const search_item = function (word) {

  saved_list.forEach(function (el, idx) {

    if (el.eng_words[0].Column2 === word) {

      saved_list.splice(idx, 1)

      localStorage.setItem('list', JSON.stringify(saved_list))

      createHTML(saved_list)

    }

  })

}




export const btn_save_script = function (result_arr) {


  const btn_save = document.querySelector('.js-btn-save')

  const input_translate = document.querySelector('.input_translate')

  const input_sentence = document.querySelector('.textarea')

  btn_save.addEventListener('click', function () {

    const obj_item = {
      eng_words: result_arr,
      rus_translate: input_translate.value,
      origin_sentence: input_sentence.value
    }

    saved_list.push(obj_item)
    console.log(saved_list);

    localStorage.setItem('list', JSON.stringify(saved_list))

    createHTML(saved_list)

    btn_save.disabled = true
    btn_save.classList.add('deactive')
    input_translate.value = ''
    input_sentence.value = ''

    input_sentence.style.height = '40px'



    const btnDelete = document.querySelector('.delete_item_btn')

    btnDelete.addEventListener('click', function (e) {

      const classBtn = btnDelete.classList[1]
      search_item(classBtn)

    })


  })

}






const createHTML = function (array) {

  const arr = array.reverse()

  let markup = ''

  let rus = ''

  let btn_delete = ''

  let div_markup = ''

  let div_grid = ''

  arr.forEach(function (el) {

    div_markup = ''

    el.eng_words.forEach(function (item) {

      console.log(item);


      div_markup = div_markup + `
      <div class="grid_cell cell_content">${item.Column2}</div>
      <div class="grid_cell cell_content">${item["word-freq-top5000"]}</div>
      <div class="grid_cell grid_cell-right cell_content">${item.Column3}</div>
    `

      console.log(div_markup);


      markup = markup + `
        <div class="grid_cell cell_content">${item.Column2}</div>
        <div class="grid_cell cell_content">${item["word-freq-top5000"]}</div>
        <div class="grid_cell grid_cell-right cell_content">${item.Column3}</div>
      `

      btn_delete = `
        <div class="delete_item_btn ${item.Column2}">del</div>
      `
      // console.log(markup);
    })




    rus = `
    <div class="grid_3_of_3 tr_translate tr-sentence">
      <span class="full_sentence">${el.origin_sentence}</span>
    </div>

    <div class="grid_3_of_3 tr_translate">
      <div class="delete_item_box">
        <div class="rus_text">${el.rus_translate}</div>
        ${btn_delete}
      </div>
    </div>
    `

    div_grid = div_grid + `
    <div class="table_box_grid">
        ${div_markup}

      <div class="grid_3_of_3 tr_translate tr-sentence">
        <span class="full_sentence">${el.origin_sentence}</span>
      </div>

      <div class="grid_3_of_3 tr_translate">
        <div class="delete_item_box">
          <div class="rus_text">${el.rus_translate}</div>
          ${btn_delete}
        </div>
      </div>

    </div>
    `

    markup = markup + rus

  })

  // console.log(div_grid);


  const tbody = `
   <div class=" save">
      ${div_grid}
    </div>
  `

  const final_markup = `
    <div class="subheading">
      <p class="subheading_text">Saved list</p>
    </div>


    <div class="save_container">

      <div class="table_box_grid" id="header">
        <div class="grid_cell cell_head">Word</div>
        <div class="grid_cell cell_head">Rank</div>
        <div class="grid_cell grid_cell-right cell_head">PoS</div>
      </div>

      ${tbody}

    </div>

    <div>
     <button class="btn btn-long btn-clear">Clear list</button>
    </div>
  `

  save_box.innerHTML = ''

  save_box.insertAdjacentHTML('afterbegin', final_markup)

  const btn_clear = document.querySelector('.btn-clear')

  btn_clear.addEventListener('click', function () {

    localStorage.removeItem('list')

    // перезагружаем страницу
    location.reload()

    saved_list = []

    save_box.innerHTML = ''

  })

  deleteBtnClass()



}


const getLocalStorage = function () {

  const data = JSON.parse(localStorage.getItem('list'))

  // console.log(data);

  if (!data) return

  saved_list = data

  createHTML(data)

}

getLocalStorage()








