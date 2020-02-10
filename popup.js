function clickButton(table, btn) {
    const row = btn.parentNode.parentNode
    const inputs = row.getElementsByTagName('input')
    const urlValue = inputs[0].value
    const contentTypeValue = inputs[1].value

    if (row === table.children[table.children.length - 1]) {
        if (!urlValue || !contentTypeValue) {
            return
        }

        browser.storage.local.set({ [urlValue]: contentTypeValue })
    } else {
        browser.storage.local.remove(urlValue)
    }

    table.textContent = null
    reload()
}

function addRow(table) {
    const newRow = document.createElement('tr')
    const newUrlCell = document.createElement('td')
    const newCTCell = document.createElement('td')
    const newButtonCell = document.createElement('td')
    const newUrlInput = document.createElement('input')
    const newCTInput = document.createElement('input')
    const newButton = document.createElement('button')

    newButton.textContent = 'Add / Update'
    newButton.addEventListener('click', evt => { clickButton(table, evt.target) })

    newUrlCell.appendChild(newUrlInput)
    newCTCell.appendChild(newCTInput)
    newButtonCell.appendChild(newButton)
    newRow.appendChild(newUrlCell)
    newRow.appendChild(newCTCell)
    newRow.appendChild(newButtonCell)
    table.appendChild(newRow)

    return [newUrlInput, newCTInput, newButton]
}

function reload() {
    const table = document.getElementById('overrides')

    browser.storage.local.get().then((overrides) => {
        for (const url in overrides) {
            const [newUrlInput, newCTInput, newButton] = addRow(table)

            newUrlInput.value = url
            newUrlInput.readOnly = true

            newCTInput.value = overrides[url]
            newCTInput.readOnly = true

            newButton.textContent = 'Remove'
        }

        addRow(table)
    })
}

document.addEventListener('DOMContentLoaded', reload)
