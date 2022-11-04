// brak podkreslenia w ostatniej transakcji na liscie Przychod i Wydatki pozbawiamy dolnego obramowania w CSS ale mozna bylo zrobic tak:
// const lastDivIncome = document.querySelector('.income .item:last-child')
// const lastDivCosts = document.querySelector('.costs .item:last-child')
// lastDivCosts.style.borderBottom= 'none'
// lastDivIncome.style.borderBottom= 'none'

const addPanel = document.querySelector('.add-transaction-panel')
const addBtn = document.querySelector('.add-transaction')
const whiteBtn = document.querySelector('.white')
const blackBtn = document.querySelector('.black')

const income = document.querySelector('.income')
const costs = document.querySelector('.costs')
const deleteBtn = document.querySelectorAll('.fa-xmark')
console.log(deleteBtn);

let cardID = 0

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

const checkForm = () => {
    if (nameInput.value === '' || amountInput.value === '' || category.value === '') {
        alert('Wypełnij wszystkie pola!')
    } else {
        saveTransaction()
        clearAddPanel()
        closeAddPanel()
    }
}

const clearAddPanel = () => {
    nameInput.value = ''
    amountInput.value = ''
    category.value = ''
}

const saveTransaction = () => {
    if (amountInput.value.includes('-')) {
        const newCost = document.createElement('div')
        newCost.classList.add('item')
        newCost.setAttribute('id', cardID)
        newCost.innerHTML = `<p><i class="fa-sharp fa-solid fa-cart-shopping"></i> ${nameInput.value}</p>
        <p style="color: red"> ${amountInput.value} zł<i class="fa-solid fa-xmark"></i></p>`
        costs.appendChild(newCost)
        cardID++
    } else {
        const newIncome = document.createElement('div')
        newIncome.classList.add('item')
        newIncome.setAttribute('id', cardID)
        newIncome.innerHTML = `<p><i class="fa-solid fa-money-bill-1-wave"></i> ${nameInput.value}</p>
        <p style="color: green"> ${amountInput.value} zł<i class="fa-solid fa-xmark"></i></p>`
        income.appendChild(newIncome)
        cardID++
    }

    // nameInput.value
}


cancelBtn.addEventListener('click', closeAddPanel)
addBtn.addEventListener('click', showAddPanel)
saveBtn.addEventListener('click', checkForm)

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

