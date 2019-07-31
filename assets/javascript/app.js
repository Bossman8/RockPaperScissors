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


firebase.database().on("value",function(snapshot){
      console.log(snapshot.val());
  })


p1name = "";
p2name = "";
p1score = 0;
p2score = 0;

$("#p1score").text(p1score)
$("#p2score").text(p2score)

$("#addUser").on("click", function() {
    p1name = $("#userName").val().trim();
    // if (p1name.length === 0) {
    //     p1name = $("#userName").val().trim();
    // }
    // else if (p2name.length === 0) {
    //     p2name = $("#userName").val().trim();
    // }
    firebase.database().ref().set({
        p1name: p1name,
        p2name: p2name,
    })
})