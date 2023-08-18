const userName = document.querySelector("#txt");
const phoneNum = document.querySelector("#P-number");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const confPassword = document.querySelector("#pass-c");
const loginBtn = document.querySelector("#btn");
const userMassage = document.querySelector("#massage1");
const emailMassage = document.querySelector("#massage3");
const pasMassage = document.querySelector("#massage4");
const confPasMassage = document.querySelector("#massage5");
const loginMassage = document.querySelector("#massage");
const fields = document.getElementsByClassName('fields')

loginBtn.addEventListener("click", signIn);

function signIn(event) {

    event.preventDefault();

    const userNameValue = userName.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confPasswordValue = confPassword.value;

    let sendData = true;
    let inputEmailCode = false;

    const nameRegex = /^[a-zA-Z\-]+$/;
    const testN = nameRegex.test(userNameValue);

    const eRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
    const testE = eRegex.test(emailValue);

    const pRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const testP = pRegex.test(passwordValue);
    if (!testE) {
        emailMassage.innerText = "please enter a valid email!";
        sendData = false;
    }

    if (!testP) {
        pasMassage.innerText = "please enter a valid password (Minimum eight characters, at least one letter and one number)!";
        sendData = false;
    }
    if (passwordValue != confPasswordValue) {
        confPasMassage.innerText = "your password and confirm password do not match!";
        sendData = false;
    }

    if (!testN) {
        userMassage.innerText = "please a valid username!";
        sendData = false;
    }


    if (sendData) {
        this.form.submit();
    }

}