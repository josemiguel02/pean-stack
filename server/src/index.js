import app from './app.js'
import db from './lib/db.js'
// import './models/User.js'

async function init() {
  try {
    await db.authenticate()
    // await db.sync()
    console.log('⚙️ Successful connection to the database')

    app.listen(app.get('port'))
    console.log(`🌍 Server on -> http://localhost:${app.get('port')}`)
  } catch (error) {
    console.log('Wrong connection to the database', error)
  }
}

init()
