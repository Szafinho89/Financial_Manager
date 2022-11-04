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

let cardID = 0
let selectedCategory;

//panel dodawania
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const category = document.querySelector('#category')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')


// zmiana kolorów:
let root = document.documentElement;


const closeAddPanel = () => {
    addPanel.style.display= 'none'
}

const showAddPanel = () => {
    addPanel.style.display= 'flex'
}

const clearAddPanel = () => {
    nameInput.value = ''
    amountInput.value = ''
    category.value = ''
}

const checkForm = () => {
    if (nameInput.value === '' || amountInput.value === '' || category.value === '') {
        alert('Wypełnij wszystkie pola!')
    } else {
        setCategory()
        saveTransaction()
        clearAddPanel()
        closeAddPanel()
    }
}

const setCategory = () => {
    if (category.value.includes('income')) {
        selectedCategory = '<i class="fa-solid fa-money-bill-1-wave"></i>'
    } else if (category.value.includes('shopping')) {
        selectedCategory = '<i class="fa-sharp fa-solid fa-cart-shopping"></i>'
    } else if (category.value.includes('food')) {
        selectedCategory = '<i class="fa-solid fa-utensils"></i>'
    } else if (category.value.includes('cinema')) {
        selectedCategory = '<i class="fa-solid fa-film"></i>'
    }
}

const saveTransaction = () => {
    if (amountInput.value.includes('-')) {
        const newCost = document.createElement('div')
        newCost.classList.add('item')
        newCost.setAttribute('id', cardID)
        newCost.innerHTML = `<p>${selectedCategory} ${nameInput.value}</p>
        <p class="delete-trans" style="color: red"> ${amountInput.value} zł<i class="fa-solid fa-xmark" onclick="deleteTransFromCosts(${cardID})"></i></p>`
        costs.appendChild(newCost)
        cardID++
        moneyArray.push(parseFloat(amountInput.value))
        countMoney()
    } else {
        const newIncome = document.createElement('div')
        newIncome.classList.add('item')
        newIncome.setAttribute('id', cardID)
        newIncome.innerHTML = `<p>${selectedCategory} ${nameInput.value}</p>
        <p class="delete-trans" style="color: green"> ${amountInput.value} zł<i class="fa-solid fa-xmark" onclick="deleteTransFromIncome(${cardID})"></i></p>`
        income.appendChild(newIncome)
        cardID++
        moneyArray.push(parseFloat(amountInput.value))
        countMoney()
    }
}

let moneyArray = []
let sum = 0

const countMoney = () => {
    sum = 0
    for (i = 0; i < moneyArray.length; i++) {
        sum = sum + moneyArray[i]
    }
    console.log(sum);
    availableMoney.textContent = `${sum} zł`
    console.log(moneyArray);
}




const deleteTransFromCosts = (id) => {
    const transactionToDelete = document.getElementById(id)
    console.log(transactionToDelete);
    costs.removeChild(transactionToDelete)
    moneyArray.splice(id, 1, 0)
    countMoney()
}

const deleteTransFromIncome = (id) => {
    const transactionToDelete = document.getElementById(id)
    console.log(transactionToDelete);
    income.removeChild(transactionToDelete)
    moneyArray.splice(id, 1, 0)
    countMoney()
}

const removeAll = () => {
    income.innerHTML = '<h3>Przychód:</h3>'
    costs.innerHTML = '<h3>Wydatki:</h3>'
    moneyArray = [0]
    countMoney()


}


cancelBtn.addEventListener('click', closeAddPanel)
addBtn.addEventListener('click', showAddPanel)
saveBtn.addEventListener('click', checkForm)
removeAllBtn.addEventListener('click', removeAll)



// zmiana kolorów
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

// var arr = [1, 2, 3];
// arr.splice(0, 1);
// console.log(arr)
// [2, 3]

// var arr = [3, 4, 6];
// console.log(arr.splice(2, 1))
// [6]