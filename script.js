const form = document.forms.contact
const inputPostcode = form.postcode
const inputPrefecture = form.prefecture
const inputCity = form.city
const inputTown = form.town
const searchBtn = document.querySelector('#search-button')
let inputValue = ''

inputPostcode.addEventListener('input', getInputValue)

searchBtn.addEventListener('click', searchAddressFromPostCode)

function getInputValue(e) {
  inputValue = e.target.value
  console.log(inputValue)
}

async function searchAddressFromPostCode() {
  if (!inputValue) {
    alert('郵便番号を入れてください！')
    return
  }
  if (inputValue.length !== 7) {
    alert('7桁の郵便番号を入れてください!')
    return
  }
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputValue}`)
    const data = await res.json()

    const prefecture = data.results[0].address1
    const city = data.results[0].address2 + data.results[0].address3

    inputPrefecture.value = prefecture
    inputCity.value = city
  } catch {
    alert('この郵便番号は存在しません！')
  }
}
