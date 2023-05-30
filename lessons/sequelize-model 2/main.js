const { Person } = require('./models')

const findPeople = async () => {
    try {
        const people = await Person.findAll() //SELECT * FROM people;
        people.forEach(person => console.log(person))
    }
    catch(error) {
        console.error(error)
    }
    finally {
        process.exit()
    }
}

findPeople()