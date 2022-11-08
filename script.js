// brak podkreslenia w ostatniej transakcji na liscie Przychod i Wydatki pozbawiamy dolnego obramowania w CSS ale mozna bylo zrobic tak:
// const lastDivIncome = document.querySelector('.income .item:last-child')
// const lastDivCosts = document.querySelector('.costs .item:last-child')
// lastDivCosts.style.borderBottom= 'none'
// lastDivIncome.style.borderBottom= 'none'

const addPanel = document.querySelector('.add-transaction-panel')
const addBtn = document.querySelector('.add-transaction')
const removeAllBtn = document.querySelector('.remove-all')
const whiteBtn = document.querySelector('.white')
const blackBtn = document.querySelector('.black')
const availableMoney = document.querySelector('.available-funds')

const income = document.querySelector('.income')
const costs = document.querySelector('.costs')
const deleteBtns = document.getElementsByClassName('delete-trans')

//panel dodawania
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const category = document.querySelector('#category')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

let cardID = 0
let selectedCategory;
let moneyArray = []
// wpisujemy do tablicy 0 żeby działał reduce - bo jesli go nie bedzie no to po usunieciu wszystkich elementow reduce nie bedzie mial czgo policzyc i wywali błąd.
let sum = 0

let categoryIcon

// zmiana kolorów:
let root = document.documentElement;

const closeAddPanel = () => {
    addPanel.style.display= 'none'
    clearAddPanel()
}

const showAddPanel = () => {
    addPanel.style.display= 'flex'
    console.log(category.value);
}

const clearAddPanel = () => {
    nameInput.value = ''
    amountInput.value = ''
    category.selectedIndex = 0;
    // wczesniej uzylem tego ponizej, ale bardziej poprawnie jest uzyc tego powyzej
    // category.value = 'none';
}

const checkForm = () => {
    console.log(category.value);

    if (nameInput.value === '' || amountInput.value === '' || category.value === 'none') {
        alert('Wypełnij wszystkie pola!')
    } else {
        saveTransaction()
        clearAddPanel()
        closeAddPanel()
    }
}

// const setCategory = () => {
//     if (category.value.includes('income')) {
//         selectedCategory = '<i class="fa-solid fa-money-bill-1-wave"></i>'
//     } else if (category.value.includes('shopping')) {
//         selectedCategory = '<i class="fa-sharp fa-solid fa-cart-shopping"></i>'
//     } else if (category.value.includes('food')) {
//         selectedCategory = '<i class="fa-solid fa-utensils"></i>'
//     } else if (category.value.includes('cinema')) {
//         selectedCategory = '<i class="fa-solid fa-film"></i>'
//     }
//     console.log(selectedCategory);
// }

// tu sprobowac rozwiazac temat SELECTa tak jak MAJEK - on po prostu chce dzialac na podstawie tego co jest w tresci SELECTA a nie na podstawie samego VALUE - bo ja dzialajac tylko na value w ogole nie musze sie odnosic do metody category.options[category.selectedIndex].text / value

//to dziala ale jeszcze tu poprawic ze jak nie zaznacze selecta to mi ustawia automatycznei starego selecta - znalezc problem 
const setCategory = () => {
    selectedCategory = category.options[category.selectedIndex].text
    setCategoryIcon(selectedCategory)
}

const setCategoryIcon = (transactionType) => {
    switch (transactionType) {
        case '[ + ] Przychód':
            categoryIcon = '<i class="fa-solid fa-money-bill-1-wave"></i>'
            break;
        case '[ - ] Zakupy':
            categoryIcon = '<i class="fa-sharp fa-solid fa-cart-shopping"></i>'
            break;
        case '[ - ] Jedzenie':
            categoryIcon = '<i class="fa-solid fa-utensils"></i>'
            break;
        case '[ - ] Kino':
            categoryIcon = '<i class="fa-solid fa-film"></i>'
            break;
    }

}

const saveTransaction = () => {
    if (amountInput.value.includes('-')) {
        const newCost = document.createElement('div')
        newCost.classList.add('item')
        newCost.setAttribute('id', cardID)
        newCost.innerHTML = `<p>${categoryIcon} ${nameInput.value}</p>
        <p class="delete-trans" style="color: red"> ${amountInput.value} zł<i class="fa-solid fa-xmark" onclick="deleteTransFromCosts(${cardID})"></i></p>`
        costs.appendChild(newCost)
        cardID++
        moneyArray.push(parseFloat(amountInput.value))
        countMoney()
    } else {
        const newIncome = document.createElement('div')
        newIncome.classList.add('item')
        newIncome.setAttribute('id', cardID)
        newIncome.innerHTML = `<p>${categoryIcon} ${nameInput.value}</p>
        <p class="delete-trans" style="color: green"> ${amountInput.value} zł<i class="fa-solid fa-xmark" onclick="deleteTransFromIncome(${cardID})"></i></p>`
        income.appendChild(newIncome)
        cardID++
        moneyArray.push(parseFloat(amountInput.value))
        // sprawdzam czy daloby sie wykonywac funkcje countMoney bez podawania argumentu
        countMoney()
    }
}

// const countMoney = () => {
//     sum = 0
//     for (i = 0; i < moneyArray.length; i++) {
//         sum = sum + moneyArray[i]
//     }
//     console.log(sum);
//     availableMoney.textContent = `${sum} zł`
//     console.log(moneyArray);
// }

const countMoney = () => { 
    const sum2 = moneyArray.reduce((a, b) => (a + b))
    console.log(moneyArray);
    console.log(sum2);
    availableMoney.textContent = `${sum2} zł`
}

const deleteTransFromCosts = (id) => {
    const transactionToDelete = document.getElementById(id)
    console.log(transactionToDelete);
    console.log(transactionToDelete.childNodes);
    costs.removeChild(transactionToDelete)
    moneyArray.splice(id, 1, 0)
    countMoney()
}

const deleteTransFromIncome = (id) => {
    const transactionToDelete = document.getElementById(id)
    console.log(transactionToDelete);
    console.log(transactionToDelete.childNodes);
    income.removeChild(transactionToDelete)
    moneyArray.splice(id, 1, 0)
    countMoney()
}

const removeAll = () => {
    income.innerHTML = '<h3>Przychód:</h3>'
    costs.innerHTML = '<h3>Wydatki:</h3>'
    moneyArray = []
    countMoney()
}

cancelBtn.addEventListener('click', closeAddPanel)
addBtn.addEventListener('click', showAddPanel)
saveBtn.addEventListener('click', checkForm)
removeAllBtn.addEventListener('click', removeAll)

// zmiana kolorów - ja zrobilem funkcje anonimowe a mozna bylo zrobic to wywolujac normalnie funkcje np changeToBlack i changeToDark
whiteBtn.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'white')
    root.style.setProperty('--second-color', 'black')
    root.style.setProperty('--border-color', 'black')
})

blackBtn.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'black')
    root.style.setProperty('--second-color', 'white')
    root.style.setProperty('--border-color', 'white')
})
