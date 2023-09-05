const userName = document.querySelector("#txt");
const phoneNum = document.querySelector("#P-number");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const confPassword = document.querySelector("#pass-c");
const loginBtn = document.querySelector("#btn");

const pasMassage = document.querySelector("#massage4");
const confPasMassage = document.querySelector("#massage5");

loginBtn.addEventListener("click", signIn);

function signIn(event) {

    event.preventDefault();
    pasMassage.innerText = "";


    const emailValue = email.value;
    const passwordValue = password.value;

    let sendData = true;

    const pRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const testP = pRegex.test(passwordValue);

 

    if (!testP) {
        pasMassage.innerText = "please enter a valid password (Minimum eight characters, at least one letter and one number)!";
        sendData = false;
    }
    if (sendData) {
        this.form.submit();
    }
      

}