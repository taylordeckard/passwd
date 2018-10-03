/**
 * User Class
 */
class User {
	/**
	 * @param {any} params
	 *   - username
	 *   - password
	 */
	constructor (params) {
		if (params) {
			this.username = params.username;
			this.password = params.password;
		}
	}
}

module.exports = User;
