export function verifyEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true
	}
	return false
};

export function verifyPassword(password) {

};