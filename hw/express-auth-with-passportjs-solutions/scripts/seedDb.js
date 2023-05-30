const { User } = require('../models')
const bcrypt = require('bcrypt')

const seedDb = async () => {
    try {
        await User.destroy({
            where: {}
        })

        await User.create({
            name: 'Mike Sabzevari',
            email: 'msabz@email.com',
            password: 'encryptedPassword'
        })

        await User.create({
            name: 'Dan Sabzi',
            email: 'dansabzi@email.com',
            password: 'encryptedPassword'
        })
    }
    catch(e) {
        console.error(e)
    }
}

const run = async () => {
    try {
        await seedDb()
    }
    catch(e) {
        console.error(e)
    }
    finally {
        process.exit()
    }
}

run()