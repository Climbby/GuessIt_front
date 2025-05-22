const ApiURL = "https://guess-it-neon.vercel.app/api"

const users = await fetchUsers("TheBridge")
let newUsers = users;
const filtersButton = document.getElementById('filters-button')
const refreshButton = document.getElementById('refresh-button')
const sidebar = document.getElementById('sidebar')
const sidebarButtons = document.querySelectorAll('.sidebar-item')
const clearButtons = document.querySelectorAll('#clear-button')
const sidebarOptions = document.querySelectorAll('.sidebar-list')
const closeButton = document.getElementById('sidebar-close')
const prevButton = document.getElementById('prevPage')
const nextButton = document.getElementById('nextPage')
const bookTitle = document.getElementById('bookTitle')
const bookContent = document.getElementById('bookContent')
const book = document.getElementById('book')
let currentPage = 1
let totalPages

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++
        showPage()
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--
        showPage()
    }
}

async function fetchUsers(table) {
  const endpoint = `${ApiURL}/tableApi`
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.log("Could not fetch users:", error)
      return []
    })
}

function showPage(){
    totalPages = newUsers.length
    let user = newUsers[currentPage-1]
    let userText = ""
    bookTitle.textContent = user.username

    for (let characteristic in user) {
        if (characteristic === "id") continue;
        if (characteristic === "username") continue;

        userText += `${characteristic}: ${user[characteristic]}\n`        
    }
    bookContent.textContent = userText       
}

function openMenu(){
    closeButton.addEventListener('click', () => {
        sidebar.style.transform = 'translateX(-100%)';
    });
  
    sidebar.style.transform = 'translateX(0)';
}

function showList(id){
    sidebarOptions.forEach(sidebarOption => {
        if (sidebarOption.id !== id) return
        if (sidebarOption.style.display !== 'block') {
            sidebarOption.style.display = 'block'
        }
        else{
            sidebarOption.style.display = 'none'
        }
    });
}

function unselectOption(category){
    sidebarOptions.forEach(sidebarOption => {
        if (sidebarOption.id != category) return
        let checkedOption = sidebarOption.querySelector('input:checked')
        if (checkedOption === null) return
        checkedOption.checked = false
    });
}

function checkChecked(){
    let conditions = {}

    sidebarOptions.forEach(sidebarOption => {
       let checkedOption = sidebarOption.querySelector('input:checked')
       if (checkedOption === null) return
       conditions[checkedOption.name] = checkedOption.value
    });

    newUsers = users
    newUsers = newUsers.filter(user => {
        for (let characteristic in conditions) {
            if(user[characteristic] != conditions[characteristic]){
                return false
            }
        }
        return true
    })

    
    currentPage = 1
    showPage()
}

function buttonEvents(){
    filtersButton.addEventListener('click', () => {
        openMenu()
    })

    sidebarButtons.forEach(sidebarButton => {
        sidebarButton.addEventListener('click', () => {
            showList(sidebarButton.id)
        })
    });

    clearButtons.forEach(clearButton => {
        clearButton.addEventListener('click', () => {
            unselectOption(clearButton.name)
        })
    })

    refreshButton.addEventListener('click', () => {
        checkChecked()
    })

    prevButton.addEventListener('click', () => {
        prevPage()
    })

    nextButton.addEventListener('click', () => {
        nextPage()
    })
}

buttonEvents()
showPage()