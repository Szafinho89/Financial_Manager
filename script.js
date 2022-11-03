const cancelBtn = document.querySelector('.cancel')
const addPanel = document.querySelector('.add-transaction-panel')
const addBtn = document.querySelector('.add-transaction')
const whiteBtn = document.querySelector('.white')
const blackBtn = document.querySelector('.black')

// zmiana kolorów:
let root = document.documentElement;


const closeAddPanel = () => {
    addPanel.style.display= 'none'
}

const showAddPanel = () => {
    addPanel.style.display= 'flex'
}




cancelBtn.addEventListener('click', closeAddPanel)
addBtn.addEventListener('click', showAddPanel)

// zmiana kolorów
whiteBtn.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'white')
    root.style.setProperty('--second-color', 'black')
})

blackBtn.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'black')
    root.style.setProperty('--second-color', 'white')
})

