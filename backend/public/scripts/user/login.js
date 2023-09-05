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

loginBtn.addEventListener("click", signIn);

function signIn(event) {

    event.preventDefault();
    emailMassage.innerText = "";
    pasMassage.innerText = "";


    const emailValue = email.value;
    const passwordValue = password.value;

    let sendData = true;

    const eRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
    const testE = eRegex.test(emailValue);

    const pRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const testP = pRegex.test(passwordValue);

    // const phRegex = /^\+[1-9]{1}[0-9]{3,14}$/;
    // phRegex.test(phonNumValue);

    if (!testE) {
        emailMassage.innerText = "please enter a valid email!";
        sendData = false;
    }

    if (!testP) {
        pasMassage.innerText = "please enter a valid password (Minimum eight characters, at least one letter and one number)!";
        sendData = false;
    }
    if (sendData) {
        this.form.submit();
    }
      

}