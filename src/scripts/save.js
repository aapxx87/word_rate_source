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

  arr.forEach(function (el) {

    el.eng_words.forEach(function (item) {

      markup = markup + `
        <tr>
        <td class="td_long">${item.Column2}</td>
        <td class="td_medium">${item["word-freq-top5000"]}</td>
        <td class="td_pos">${item.Column3}</td>
        </tr>
      `

      btn_delete = `
        <span class="delete_item_btn ${item.Column2}">x</span>
      `
    })

    rus = `
    <tr>
      <td colspan="3" class="tr_translate tr-sentence">
        <span class="full_sentence">${el.origin_sentence}</span>
      </td>
    </tr>
    <tr>
     <td colspan="3" class="tr_translate tr_last_item">
      ${btn_delete}
      <span class="rus_text">${el.rus_translate}</span>
     </td>
    </tr>
    `

    markup = markup + rus



  })

  const tbody = `
    <tbody class="tbody">
      ${markup}
    </tbody>
  `

  const final_markup = `
    <div class="subheading">
      <p class="subheading_text">Saved list</p>
    </div>

    <div class="table_box">
      <table class="table table-save">
        <thead>
          <th>Word</th>
          <th>Rank</th>
          <th>PoS</th>
        </thead>
        ${tbody}
      </table>
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

  console.log(data);

  if (!data) return

  saved_list = data

  createHTML(data)

}

getLocalStorage()



