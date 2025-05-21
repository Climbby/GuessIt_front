const ApiURL = "https://guess-it-neon.vercel.app/api"

const users = await fetchUsers("TheBridge")
const filtersButton = document.getElementById('filters-button')
const refreshButton = document.getElementById('refresh-button')
const filters = document.getElementById('filters')
const prevButton = document.getElementById('prevPage')
const nextButton = document.getElementById('nextPage')
const book = document.getElementById('book')

filters.style.display = 'none'
let pageNum = 1
let currentPage = 1
let totalPages = 3

function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden')
    });
    document.getElementById(`page${pageNum}`).classList.remove('hidden')
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++
        showPage(currentPage)
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--
        showPage(currentPage)
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

function makePages(){
    const userNames = users.map(user => user.username)
    userNames.forEach(username => {
        const newDiv = document.createElement('div')
        const divTitle = document.createElement('h2')
        const content = document.createElement('p')

        content.id = username
        content.style.whiteSpace = 'pre';
        divTitle.textContent = username
        newDiv.classList.add('page', 'hidden')
        newDiv.id = `page${pageNum}`
        pageNum++

        newDiv.appendChild(divTitle)
        newDiv.appendChild(content)
        book.appendChild(newDiv)
    });

    users.forEach(person => {
        let content = document.getElementById(person["username"])

        for (let characteristic in person) {
            if (characteristic === "id") continue;
            if (characteristic === "username") continue;

            content.textContent += `${characteristic}: ${person[characteristic]}\n`        
        }
    })

    totalPages = pageNum - 1
}

function refreshPages() {
    let listOfNewUsers = users
    console.log(listOfNewUsers)

    currentPage = 1
    showPage(currentPage)
}

function showFilters(){
    if (filters.style.display == 'none') {
        filters.style.display = 'block'
    }
    else{
        filters.style.display = 'none'
    }
}

function buttonEvents() {
    filtersButton.addEventListener('click', () => {
        showFilters()
    })

    refreshButton.addEventListener('click', () => {
        refreshPages()
    })

    prevButton.addEventListener('click', () => {
        prevPage()
    })

    nextButton.addEventListener('click', () => {
        nextPage()
    })
}

buttonEvents()
makePages()
showPage(currentPage)