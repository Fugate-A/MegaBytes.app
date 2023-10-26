
const app_name = 'https://www.megabytes.app/'
exports.buildPath =
	function buildPath(route) {
		if (process.env.NODE_ENV === 'production') {
			return app_name + route;
		}
		else {
			return 'http://localhost:5000/' + route;
		}
	}
