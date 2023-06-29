const container = document.getElementById('containerForCity');
const xMark = document.querySelector('.input__block-x_mark');
const writeCity = document.getElementById('writeCity');
const openPopupBtn = document.getElementById('openPopup');
const cityNameChange = document.querySelector('.place-city');
const popup = document.querySelector('.popup')


fetch('https://proverili.ru/api/areas', { method: 'POST' }) //Получение города из api
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        else {
            console.log('error')
            throw new Error
        }
    })
    .then(data => {

        JSON.stringify(data)
        for (const key in data) { //Создание блоков с субъектами
            const createCityBlock = document.createElement('div')
            createCityBlock.className = 'city__container-block'
            createCityBlock.innerHTML = data[key].name

            container.append(createCityBlock)

            createCityBlock.addEventListener('click', () => {
                cityNameChange.innerHTML = createCityBlock.innerText
            })
        }
    })
    .catch(error => {
        console.log(error)
    })

writeCity.oninput = function () { //Реализация поиска
    let val = this.value.trim();
    const cityBlock = document.querySelectorAll('.city__container-block')
    // xMark.addEventListener('click', () => {
    //     val = ''
    // })
    if (val != '') {
       
        cityBlock.forEach(function(elem) {
            if (elem.innerText.search(val) == -1) {
                elem.classList.add('hide');
                elem.innerHTML = elem.innerText
            }
            else {
                elem.classList.remove('hide');
                let str = elem.innerText;
                elem.innerHTML = addSelector(str, elem.innerText.search(val), val.length)
            }            
        })
    } 
    else {
        cityBlock.forEach(function(elem) {
            elem.classList.remove('hide')
            elem.innerHTML = elem.innerText
        })
    }   
}

function addSelector(string, pos, len) { //Выделение текста
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos+len)
}

openPopupBtn.addEventListener('click', () => {
    popup.classList.toggle('_open')
})