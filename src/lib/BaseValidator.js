class BaseValidator {
	constructor(type, val) {
		this.type = type; //メールアドレスあるいはパスワード
		this.val = val;
	}
	_cannotEmpty() {
		return new Promise((resolve, reject) => {
			if(!!this.val) {
				resolve()
			} else {
				reject({
					success: false,
					message: `${this.type}は必須です。`
				})
			}
		})
	}
}

export default BaseValidator;