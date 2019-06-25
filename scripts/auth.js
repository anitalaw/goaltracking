// listen for auth status changes (login or logout)
auth.onAuthStateChanged(user =>{
    if (user) {
        console.log('user logged in on line 4', user)
    } else {
        console.log('user logged out');
    }
});

// signup

const signupForm = document.querySelector('#signup');

signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signup.email.value;
    const pw = signup.pw.value;

    //asynchronous, therefore we have to wait for a promise 
    auth.createUserWithEmailAndPassword(email, pw).then(cred =>{
        console.log(cred.user);
        signupForm.reset();
    });
});



// login
const loginForm = document.querySelector('#login');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = login.email.value;
    const pw = login.pw.value;

    auth.signInWithEmailAndPassword(email, pw).then(cred => {
        console.log(cred.user.email)
    })
}) 

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut()
});