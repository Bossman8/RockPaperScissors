var firebaseConfig = {
    apiKey: "AIzaSyBLMCVUOqJJKLoDB4-KXsodz_6UsfTE7zA",
    authDomain: "rockpaperscissors-3bb3a.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-3bb3a.firebaseio.com",
    projectId: "rockpaperscissors-3bb3a",
    storageBucket: "rockpaperscissors-3bb3a.appspot.com",
    messagingSenderId: "352487381913",
    appId: "1:352487381913:web:26df983973e6f95a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('signInBtn');
const btnSignUp = document.getElementById('signUpBtn');


btnLogin.addEventListener('click', e => {
    const email = $("#txtEmail").val();
    const pass = txtPassword.value;
    
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(email, pass);
    
    console.log("Logged in")


})

btnSignUp.addEventListener('click', e => {
    const email = $("#txtEmail").val();
    const pass = txtPassword.value;
    console.log(email)
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    console.log("Logged in")
    


})
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        
        console.log("logged In");
        window.location.href = "index.html";
    }
    else {
        console.log("Not Logged In");
        
        
    }
})

