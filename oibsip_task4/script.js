
// Function to toggle between register and login forms
function showLogin() {
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('registerPage').style.display = "none";
    document.getElementById('loginPage').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').style.display = "block";
    document.getElementById('registerPage').classList.remove('hidden');
}

// Function to register a new user
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    if (username === '' || password === '') {
        registerMessage.textContent = "Please fill in both fields!";
        registerMessage.classList.remove('hidden');
        return;
    }

    if (localStorage.getItem(username)) {
        registerMessage.textContent = "Username already exists!";
        registerMessage.classList.remove('hidden');
    } else {
        localStorage.setItem(username, password);
        registerMessage.textContent = "Registration successful! Please log in.";
        registerMessage.style.color = "green";
        registerMessage.classList.remove('hidden');
        setTimeout(showLogin, 1500);  // Redirect to login after registration
    }
}

// Function to log in an existing user
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        loginMessage.classList.remove('hidden');

        // Call the blastConfetti function
        blastConfetti();

        // Show the secured page after login
        setTimeout(() => {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('securedPage').classList.remove('hidden');
            document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
        }, 1000);

    } else {
        loginMessage.textContent = "Invalid username or password!";
        loginMessage.style.color = "red";
        loginMessage.classList.remove('hidden');
    }
}

// Function to log out the user
function logout() {
    document.getElementById('securedPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}


const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}