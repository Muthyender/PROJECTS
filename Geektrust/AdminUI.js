let tableBody = document.getElementById('table-body');
let selectAll = document.getElementById('select-all');
let search = document.getElementById('search');

async function getInfo()
{
    let apiURL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    try
    {
        let response = await fetch(apiURL)
        let requiredData = await response.json()

        // console.log(requiredData)

        setInfo(requiredData)

        search.addEventListener('keyup', function()
        {
            tableBody.innerHTML = ''
            let val = this.value
            console.log(val)
            console.log(requiredData)

            let requiredData = searchTable(val, requiredData)
            // console.log(modifiedData)
            setInfo(requiredData)
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

function searchTable(value, data)
{
    let filteredData = []

    data.forEach(eachItem =>
        {
            value = value.toLowerCase()
            let name = eachItem.name.toLowerCase()

            // console.log(Object.values(eachItem))

            if(name.includes(value))
                filteredData.push(eachItem)
        })

    return filteredData
}

function setInfo(requiredData)
{
    tableBody.innerHTML = ''
    requiredData.forEach(eachItem =>
        {
            let newRow = document.createElement('tr');
            newRow.classList.add('row')
            tableBody.appendChild(newRow)

            let checkbox = document.createElement('td')
            // checkbox.classList.add('selection')
            checkbox.innerHTML = "<input type='checkbox' class='selection'>"
            newRow.appendChild(checkbox)

            let nameItem = document.createElement('td')
            nameItem.classList.add('name')
            nameItem.innerText = eachItem.name
            newRow.appendChild(nameItem)

            let emailItem = document.createElement('td')
            emailItem.classList.add('email')
            emailItem.innerText = eachItem.email
            newRow.appendChild(emailItem)

            let roleItem = document.createElement('td')
            roleItem.classList.add('role')
            roleItem.innerText = eachItem.role
            newRow.appendChild(roleItem)

            let actionsItem = document.createElement('td')
            // actionsItem.classList.add('actions')

            let editItem = document.createElement('i')
            editItem.classList.add('edit', 'fa-solid', 'fa-pen-to-square')
            actionsItem.appendChild(editItem)

            let deleteItem = document.createElement('i')
            deleteItem.classList.add('delete', 'fa-solid','fa-trash')
            actionsItem.appendChild(deleteItem)

            newRow.appendChild(actionsItem)

            deleteItem.addEventListener('click', () => deleteRow(newRow, requiredData))

        })
}

function deleteRow(newRow, requiredData)
{
    tableBody.removeChild(newRow)
    let tempData = requiredData
    requiredData = []
    console.log(tempData)
    tempData.map(eachItem =>
        {
            for(let i=0; i< document.getElementsByClassName('name').length; i++)
            {
                if(eachItem.name == document.getElementsByClassName('name')[i].innerHTML)
                requiredData.push(eachItem)
            }
        })
    console.log(requiredData)
    setInfo(requiredData)
}





getInfo()