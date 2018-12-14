const cors = require('cors')

module.exports = function ({ app }) {
	// Add CORS to the whole app
	app.use(cors())
}
