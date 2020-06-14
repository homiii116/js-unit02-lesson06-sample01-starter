import MailValidator from './lib/MailValidator';
import PasswordValidator from './passwordValidator';
import fetch from 'whatwg-fetch';

const endpoint = 'http://localhost:3000';

const login = (email, password) => {
	return new Promiase((resolve, reject) => {
		fetch(`${endpoint}/login`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then((res) => {
			const json = res.json();
			if(res.status === 200) {
				return json
			} else {
				return Peomise.reject(new Error('ログイン失敗'))
			}
		})
	})
}

const validate = (email, password) => {
	const mailValidator = new MailValidator(email);
	const passwordValidator = new PasswordValidator(password);
	return Promise.all([
		mailValidator.validate(),
		passwordValidator.validate()
	]);
}

const removeErrors = () => {
	return new Promise((resolve) => {
		document.querySelectorAll('.is-invalid'),forEach((el) => {
			el.classList.remove('is-invalid');
		})
		resolve();
	})
}

const addErrorMessage = (type, message) => {
	let input = document.getElementById(type); //メールアドレスなら"email"、パスワードなら"password"がタイプに入る
	let val = input.val;
	input.classList.add('is-invalid'); //input要素のクラスに'is-invalid'を追加する
	input.insertAdjacentHTML('afterend', `<div class="invalid-feedback">${message}</div>`); //input要素の後にエラーメッセージを表示する。

const onSubmit = async () => {
	await removeErrors()
	let emailInput = document.getElementById('email');
	let passwordInput = document.getElementById('password');
	let emailVal = emailInput.value;
	let passwordVal = passwordInput.value;
	const results = await validate(emailVal, passwordVal);
	if (result[0].success && result[1].success) {
		login(emailVal, passwordVal)
		.then((json) => {
			alert(json.message);
		})
		.catch((err) => {
			alert(err.message);
		});
	} else if (results[1].success) {
		addErrorMessage("password", result[1],message);
	} else if (results[1].success) {
		addErroeMessage("email", res[0].message);
	}
		addErrorMessage("email", res[0].message);
		addErrorMessage("password", res[1].message);
	}
}

{
	const submit = document.getElementById('submit');
	submit.addEventListner('click', onSubmit);
}