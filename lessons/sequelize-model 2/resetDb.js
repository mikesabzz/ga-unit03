const { db } = require('./models')

const reset = async () => {
    await db.sync({ force: true })
    process.exit()
}

reset()