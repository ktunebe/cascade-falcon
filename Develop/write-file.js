const fs = require('fs')

const writeToDb = (data) => {
    fs.writeFile('./db/db.json', data, (err) => {
        err ? console.error(err) : console.log('Data written to db.json')
    })
}

module.exports = writeToDb