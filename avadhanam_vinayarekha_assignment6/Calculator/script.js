

$(function () {
  
  const USERS = [
    { email: "student@northeastern.edu", password: "password123" }
  ];

 
  const $email = $("#email");
  const $password = $("#password");
  const $remember = $("#rememberMe");
  const $btnLogin = $("#btnLogin");
  const $emailErr = $("#emailError");
  const $passErr = $("#passwordError");
  const $msg = $("#loginMsg");

 
  const isNEU = (v) => /^[^\s@]+@northeastern\.edu$/i.test(v || "");
  const usernameFrom = (e) => (e || "").split("@")[0];

  function validateEmail() {
    const v = $email.val().trim();
    if (!isNEU(v)) {
      $emailErr.text("Please enter a valid Northeastern email");
      return false;
    }
    $emailErr.text("");
    return true;
  }

  function validatePassword() {
    const v = $password.val();
    if (!v) { $passErr.text("Password is required"); return false; }
    if (v.length < 8) { $passErr.text("Minimum 8 characters"); return false; }
    $passErr.text("");
    return true;
  }

  function refreshButton() {
    const ok = validateEmail() & validatePassword();   
    $btnLogin.prop("disabled", !ok);
  }

 
  $email.on("keyup blur", validateEmail)
        .on("focus", () => $emailErr.text(""));
  $password.on("keyup blur", validatePassword)
           .on("focus", () => $passErr.text(""));

 
  $btnLogin.prop("disabled", true);

 
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    refreshButton();
    if ($btnLogin.is(":disabled")) return;

    const email = $email.val().trim().toLowerCase();
    const pass  = $password.val();
    const match = USERS.find(u => u.email.toLowerCase() === email && u.password === pass);

    if (!match) {
      $msg.removeClass("success").addClass("error").text("Invalid email or password");
      return;
    }

    const user = {
      username: usernameFrom(email),
      email, isLoggedIn: true, loginTime: new Date().toISOString()
    };

    const blob = JSON.stringify(user);
    if ($remember.is(":checked")) localStorage.setItem("user", blob);
    else sessionStorage.setItem("user", blob);

    
    $msg.removeClass("error").addClass("success")
        .hide().text("Login successful! Redirecting…").fadeIn(150);

    setTimeout(() => window.location.href = "calculator.html", 1200);
  });

 
  $email.add($password).on("keyup blur", refreshButton);
});
