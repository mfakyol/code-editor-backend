const spinner = document.querySelector("#spinner");
const counterEl = document.querySelector("#counterEl");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get("email");
const activationCode = urlParams.get("activationCode");

if (!email || !activationCode) {
  spinner.innerHTML = "Invalid email or activation code.";
} else {
  axios
    .put("http://localhost:3001/api/v1/auth", { email, activationCode })
    .then((res) => res.data)
    .then(({ status, message }) => {
      spinner.innerHTML = message;
      if (status) {
        let counter = 5;
        setInterval(() => {
          counterEl.innerHTML = " Redirect in " + counter;
          counter--;
          if (counter === 0) {
            window.location.href = "http://localhost:3000/";
          }
        }, 1000);
      }
    })
    .catch((e) => {
      spinner.innerHTML = "Server error please try later.";
    });
}
