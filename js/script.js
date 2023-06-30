const containerCity = document.getElementById('containerForCity');//Список городов
const writeCity = document.getElementById('writeCity');
let city = document.getElementById("city")//Кнопка открытия смены городов
let cityValue = document.querySelector('#city');//Спан содержащий текущий город
const popup = document.querySelector('.popup')//Скрытое меню поиска


const scrollArrow = document.getElementById("scrollArrow")//Кнопка скролла влево
city.addEventListener('click', () => {//Открытие меню поиска
    popup.classList.toggle('open')
})

scrollArrow.addEventListener('click', () => {
    let secondOne = document.getElementById("secondOne")
    let secondTwo = document.getElementById("secondTwo")

    let lastLiOne = document.getElementById("lastLiOne")
    let lastLiTwo = document.getElementById("lastLiTwo")
    //Дизейбл первых двух пунктов меню
    secondOne.classList.add("disablMenu")
    secondTwo.classList.add("disablMenu")
    //Добавление последних двух пунктов меню
    lastLiOne.classList.remove("disablMenu")
    lastLiTwo.classList.remove("disablMenu")
    lastLiOne.classList.add("visible")
    lastLiTwo.classList.add("visible")
    //Дизейбл правой стрелки
    scrollArrow.classList.add("disabl")
    // Создание скролла влево
    let leftScrollArrow = document.createElement('img')
    leftScrollArrow.className = ("LeftScroll")
    leftScrollArrow.setAttribute("src", "./img/arrow left.png");
    document.body.append(leftScrollArrow)
    // Обратный скролл
    leftScrollArrow.addEventListener('click', () => {
        // Скрытие 2х последних пунктов меню
        lastLiOne.classList.remove("visible")
        lastLiTwo.classList.remove("visible")
        lastLiOne.classList.add("disablMenu")
        lastLiTwo.classList.add("disablMenu")
        // Возврат первых двух пунктов меню
        secondOne.classList.remove("disablMenu")
        secondTwo.classList.remove("disablMenu")
        secondOne.classList.add("visible")
        secondTwo.classList.add("visible")
        // Возврат кнопки 'вправо'
        scrollArrow.classList.add("visible")
        scrollArrow.classList.remove("disabl")
        // Cкрытие кнопки 'влево'
        leftScrollArrow.remove()
    })
})
function addSelector(string, pos, len) { //Выделение текста
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len)
}
fetch('https://proverili.ru/api/areas', { method: 'POST' }) //Получение города url (name:)
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
        for (const key in data) {
            for (const keys in data[key].cities) {
                const createCityBlock = document.createElement('div')
                createCityBlock.className = 'cityBlock'
                createCityBlock.innerText = data[key].cities[keys].name

                containerCity.append(createCityBlock)

                createCityBlock.addEventListener('click', () => {
                    cityValue.innerHTML = createCityBlock.innerText
                })
            }
        }
    })
    .catch(error => {//Ошибка в случае ошибки
        console.log(error)
    })

writeCity.oninput = function () { //Поиск
    let val = this.value.trim();
    const cityBlock = document.querySelectorAll('.cityBlock')
    if (val != '') {

        cityBlock.forEach(function (elem) {
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
        cityBlock.forEach(function (elem) {
            elem.classList.remove('hide')
            elem.innerHTML = elem.innerText
        })
    }
}