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
const btnLogin = document.getElementById('signInModalBtn');
const btnSignUp = document.getElementById('signUpModalBtn');
const btnLogout = document.getElementById('logoutBtn');

btnLogin.addEventListener('click', e => {
    const email = $("#txtEmail").val().trim();
    const pass = txtPassword.value;
    console.log(email)
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(email, pass);
    


})

var database = firebase.database();
var p1name = "";
var p2name = "";
var p1wins = 0;
var p2wins = 0;
var p1losses = 0;
var p2losses = 0;
var comments = "";
var allPlayersIn = false;
var p1answer = []
var p2answer = []
var choices = ["rock", "paper", "scissors"]



database.ref().on("value", function (snapshot) {

    console.log(snapshot.val())
    if (snapshot.child("p1name").exists()  && snapshot.child("p2name").exists() && snapshot.child("p2wins").exists() && snapshot.child("p2losses").exists() && snapshot.child("p2wins").exists() && snapshot.child("p2losses").exists()) {
        p1name = snapshot.val().p1name;
        p1wins = snapshot.val().p1wins;
        p1losses = snapshot.val().p1losses;
        p2name = snapshot.val().p2name;
        p2wins = snapshot.val().p2wins;
        p2losses = snapshot.val().p2losses;
        comments = snapshot.val().comments;
        $("#p1name").html(p1name);
        $("#p2name").html(p2name);
        

    } else {
        $("#p1name").html(p1name);
        $("#p2name").html(p2name);
        
    }

})

database.ref().on("value", function (snapshot) {
    if (snapshot.child("p1name").exists() && snapshot.child("p2name").exists()) {
        if (snapshot.val().p2name.length > 0) {
            console.log("works")
            allPlayersIn = true;
            startGame(); 
        }
        
    }
})

database.ref().on("value", function (snapshot) {
    if (snapshot.child("comments").exists()) {
        comments = snapshot.val().comments;
        $("#textBox").html(comments);
    } else {
        $("#textBox").html(comments);
    }
})

$("#textBox").html(comments);


$("#addUser").on("click", function () {
    // p1name = $("#userName").val().trim();
    if (p1name.length === 0) {
        p1name = $("#userName").val().trim();
        firebase.database().ref().set({
            p1name: p1name,
            p1wins: p1wins,
            p1losses: p1losses,
            p2name: p2name,
            p2wins: p2wins,
            p2losses: p2losses,
            
        })
        $("#addPlayer").hide();
    }
    else if (p2name.length === 0) {
        p2name = $("#userName").val().trim();
        firebase.database().ref().set({
            p1name: p1name,
            p1wins: p1wins,
            p1losses: p1losses,
            p2name: p2name,
            p2wins: p2wins,
            p2losses: p2losses,
        })


    }



})

var mes = database.ref('comment');
mes.on('value', gotData, errData);

function gotData(data) {
    
    var messages = data.val();
    var keys = Object.keys(messages);
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var com = messages[k].comments;
        var p = $("<p>")
        p.attr("id", "chatting")
        p.html(com)
        $("#textBox").append(p)
    }
    
}
function errData(err) {
    console.log('error')
}

$("#addComment").on("click", function () {
    comments = $("#inputMessage").val().trim();
    firebase.database().ref("/comment").push({
        comments: comments,
    })
    var postID = firebase.database().ref("/comment").val()
    console.log(postID)


})


function goPlayerOne () {
    $("#p1rock").on("click",function() {
        p1answer += choices[0]
        $("#p1rock").prop("onclick", null).off("click");
        $("#p1paper").prop("onclick", null).off("click");
        $("#p1scissors").prop("onclick", null).off("click");
        goPlayerTwo();
        
    })
    $("#p1paper").on("click",function() {
        p1answer += choices[1]
        $("#p1rock").prop("onclick", null).off("click");
        $("#p1paper").prop("onclick", null).off("click");
        $("#p1scissors").prop("onclick", null).off("click");
        goPlayerTwo();
        
    })
    $("#p1scissors").on("click",function() {
        p1answer += choices[2]
        $("#p1rock").prop("onclick", null).off("click");
        $("#p1paper").prop("onclick", null).off("click");
        $("#p1scissors").prop("onclick", null).off("click");
        goPlayerTwo();
        
    })
    
}
function goPlayerTwo () {
    $("#p1rock").empty()
    $("#p1paper").empty()
    $("#p1scissors").empty()
    $("#turn").empty()

    $("#p2rock").text("Rock");
    $("#p2paper").text("Paper");
    $("#p2scissors").text("Scissors");
    $("#turn").text("It's " + p2name + "'s turn.")
    


    $("#p2rock").on("click",function() {
        p2answer += choices[0]
        $("#p2rock").prop("onclick", null).off("click");
        $("#p2paper").prop("onclick", null).off("click");
        $("#p2scissors").prop("onclick", null).off("click");
        finishGame();
    })
    $("#p2paper").on("click",function() {
        p2answer += choices[1]
        $("#p2rock").prop("onclick", null).off("click");
        $("#p2paper").prop("onclick", null).off("click");
        $("#p2scissors").prop("onclick", null).off("click");
        finishGame();
    })
    $("#p2scissors").on("click",function() {
        p2answer += choices[2]
        $("#p2rock").prop("onclick", null).off("click");
        $("#p2paper").prop("onclick", null).off("click");
        $("#p2scissors").prop("onclick", null).off("click");
        finishGame();
    })

    
}
function finishGame () {
    console.log(p1answer)
    console.log(p2answer)
    $("#p2rock").empty()
    $("#p2paper").empty()
    $("#p2scissors").empty()
    $("#turn").empty()

    if (p1answer === "rock" & p2answer === "paper") {
        p2score++;
        $("#turn").text(p2name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "rock") && (p2answer === "scissors")) {
        p1score++;
        $("#turn").text(p1name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "rock") && (p2answer === "rock")) {
        $("#turn").text("You Tied")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "paper") && (p2answer === "scissors")) {
        p2score++;
        $("#turn").text(p2name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "paper") && (p2answer === "rock")) {
        p1score++;
        $("#turn").text(p1name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "paper") && (p2answer === "paper")) {
        $("#turn").text("You Tied")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "scissors") && (p2answer === "rock")) {
        p2score++;
        $("#turn").text(p2name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "scissors") && (p2answer === "paper")) {
        p1score++;
        $("#turn").text(p1name + "Wins")
        setTimeout(startGame, 3000)
      }
      else if ((p1answer === "scissors") && (p2answer === "scissors")) {
        $("#turn").text("You Tied")
        setTimeout(startGame, 3000)
    }

}


function startGame() {
    if (allPlayersIn = true) {
        p1answer = []
        p2answer = []
        $("#p1score").html(p1score);
        $("#p2score").html(p2score);
        $("#p1rock").text("Rock");
        $("#p1paper").text("Paper");
        $("#p1scissors").text("Scissors");
        $("#turn").text("It's " + p1name + "'s turn.")
        goPlayerOne();
        console.log(p1answer)
        console.log(p2answer)
    }

}
