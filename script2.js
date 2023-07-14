const firstNameError = document.getElementById("fname");
const lastNameError = document.getElementById("lname");
const birthYearError = document.getElementById("byear");
const phoneNumberError = document.getElementById("pnumber");
const skypeError = document.getElementById("slogin");
const currentUserInfo = document.getElementById("currentuserinfo");
const endSessionButton = document.getElementById("endsessionbutton");
const form = document.forms.biography;

const gender = form.elements.gender;
const lastName = form.elements.lastname;
const firstName = form.elements.firstname;
const birthYear = form.elements.birthyear;
const skypeLogin = form.elements.skype;
const phoneNumber = form.elements.phone;

const checkNameExpression = /^[a-zA-Z]{1,20}$/;
const checkPhoneExpression = /^[\d()\s-]{10,12}$/;
const checkSkypeExpression = /^[a-zA-Z\d-\.]+$/;

const currentDate = new Date(Date.now() + 3600000);
const expirationDate = new Date(currentDate.setUTCMinutes(currentDate.getUTCMinutes() - currentDate.getTimezoneOffset())).toUTCString();

const showCurrentUser = () =>
{
    const currentUser = JSON.parse(localStorage.getItem("user"));
    currentUserInfo.innerHTML = `Hello, ${JSON.parse(localStorage.getItem("email"))}!`;

    if(localStorage.user != null)
    {
        firstName.value = currentUser.firstname;
        lastName.value = currentUser.lastname;
        birthYear.value = currentUser.birthyear;
        gender.value = currentUser.gender;
        phoneNumber.value = currentUser.phonenumber;
        skypeLogin.value = currentUser.skype;
    }
}
const endSession = (event) =>
{
    event.preventDefault();

    localStorage.removeItem("email");
    window.location.replace("/index1.html");
}
const savePressed = (event) =>
{
    event.preventDefault();

    const isNameCorrect = firstName.value.match(checkNameExpression);
    const isLastNameCorrect = lastName.value.match(checkNameExpression);
    const isBirthYearCorrect = 1900 < birthYear.value && birthYear.value < new Date().getFullYear();
    const isPhoneCorrect = phoneNumber.value.match(checkPhoneExpression) || phoneNumber.value === "";
    const isSkypeCorrect = skypeLogin.value.match(checkSkypeExpression) || skypeLogin.value === "";

    !isNameCorrect ? firstNameError.classList.add("firstnamerror") : firstNameError.classList.remove("firstnamerror");
    !isLastNameCorrect ? lastNameError.classList.add("lastnamerror") : lastNameError.classList.remove("lastnamerror");
    !isBirthYearCorrect ? birthYearError.classList.add("birthyearerror") : birthYearError.classList.remove("birthyearerror");
    !isPhoneCorrect ? phoneNumberError.classList.add("phonerror") : phoneNumberError.classList.remove("phonerror");
    !isSkypeCorrect ? skypeError.classList.add("skyperror") : skypeError.classList.remove("skyperror");

    if(isNameCorrect && isLastNameCorrect && isBirthYearCorrect && isPhoneCorrect && isSkypeCorrect)
    {
        const user = 
        {
            "firstname": firstName.value,
            "lastname": lastName.value,
            "birthyear": birthYear.value,
            "gender": gender.value,
            "phonenumber": phoneNumber.value,
            "skype": skypeLogin.value
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Information about user was recorded!");
    }
}

window.addEventListener("load", showCurrentUser);
endSessionButton.addEventListener("click", endSession);
form.addEventListener("submit", savePressed);