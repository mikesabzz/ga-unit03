const { Person } = require('./models')

const seed = async () => {
    try {
        const Mike = Person.create({
            company: 'Front-End',
            name: 'Michael Sabzevari',
            role: 'Programmer',
            sector: 'Umm....'
        })
    }
    catch(error) {
      console.error(error)
    }
    finally {
      process.exit()
    }
}

seed()

const Aiden = Person.create({
    company: 'Baby',
    name: 'Aiden Namdar',
    role: 'Play at home',
    sector: 'Waaa...'
})

module.exports = {
   Mike,
   Aiden
};
