const fs = require('fs/promises')

const writeToDb = async (data) => {
    return await fs.writeFile('./db/db.json', JSON.stringify(data))
}

const readFromDb = async (data) => {
    const content = await fs.readFile('./db/db.json', 'utf-8')
    return JSON.parse(content)
}

module.exports = {writeToDb, readFromDb}