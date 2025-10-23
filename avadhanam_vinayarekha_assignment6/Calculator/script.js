$(function () {
 
  const onLogin = $("body").hasClass("page-login");
  const onCalc  = $("body").hasClass("page-calculator");


  if (onLogin) {
    const USERS = [{ email: "student@northeastern.edu", password: "password123" }];

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
      if (!isNEU(v)) { $emailErr.text("Please enter a valid Northeastern email"); return false; }
      $emailErr.text(""); return true;
    }
    function validatePassword() {
      const v = $password.val();
      if (!v) { $passErr.text("Password is required"); return false; }
      if (v.length < 8) { $passErr.text("Minimum 8 characters"); return false; }
      $passErr.text(""); return true;
    }
    function refreshButton() {
      const ok = validateEmail() & validatePassword(); 
      $btnLogin.prop("disabled", !ok);
    }

    $email.on("keyup blur", validateEmail).on("focus", () => $emailErr.text(""));
    $password.on("keyup blur", validatePassword).on("focus", () => $passErr.text(""));
    $btnLogin.prop("disabled", true);
    $email.add($password).on("keyup blur", refreshButton);

    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      refreshButton();
      if ($btnLogin.is(":disabled")) return;

      const email = $email.val().trim().toLowerCase();
      const pass = $password.val();
      const match = USERS.find(u => u.email.toLowerCase() === email && u.password === pass);

      if (!match) {
        $msg.removeClass("success").addClass("error").text("Invalid email or password");
        return;
      }
      const user = { username: usernameFrom(email), email, isLoggedIn: true, loginTime: new Date().toISOString() };
      const blob = JSON.stringify(user);
      if ($remember.is(":checked")) localStorage.setItem("user", blob);
      else sessionStorage.setItem("user", blob);

      $msg.removeClass("error").addClass("success").hide().text("Login successful! Redirecting…").fadeIn(150);
      setTimeout(() => (window.location.href = "calculator.html"), 1200);
    });
  }

  
  if (onCalc) {
    const $num1 = $("#num1");
    const $num2 = $("#num2");
    const $num1Err = $("#num1Error");
    const $num2Err = $("#num2Error");
    const $result = $("#result");

    const calculate = (a, b, op) => {
      switch (op) {
        case "add": return a + b;
        case "subtract": return a - b;
        case "multiply": return a * b;
        case "divide": return b !== 0 ? a / b : "Error: Division by zero";
        default: return "";
      }
    };

    function getNumber($el, $err) {
      const v = $el.val().trim();
      if (v === "" || isNaN(v)) { $err.text("Please enter a valid number"); return null; }
      $err.text(""); return parseFloat(v);
    }

    $(".actions .btn").on("click", function () {
      const op = $(this).data("op");
      const n1 = getNumber($num1, $num1Err);
      const n2 = getNumber($num2, $num2Err);
      if (n1 === null || n2 === null) return;
      const res = calculate(n1, n2, op);
      $result.val(res).css("color", "#333").fadeIn(150);
    });

    $("#btnLogout").on("click", function () {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      $(this).fadeOut(200, () => (window.location.href = "login.html"));
    });

    const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
    if (!user.isLoggedIn) window.location.href = "login.html";
    else $("#welcomeName").text(user.username || "User");
  }
});
