import BaseValidator from './BaseValidator';

class MailValidator extends BaseValidator {
	constructor(val) {
		super(val, "メールアドレス");  //superクラスのコンストラクタを呼び出す。
		this._checkFormat = this._checkFormat.bind(this);
	}
	validate() {
		return super._cannotEmpty()
			.then(this._checkFormat)
			.then((res) => {
				return { success: true}; //Promise.resolve({ success: true })と同一
			})
			.catch(err => {
				return err; //Promise.resolve(err)と同一
			});
	}
	_checkFormat() {
		const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
		const match = re.test(this.val); //マッチするならtrue、しないならfalseを返す。
		if (match) {
			return Promise.resolve();
		} else {
			return Promise.reject({
				success: false,
				message: `${this.type}のフォーマットが異なります。`
			})
		}
	}
}
