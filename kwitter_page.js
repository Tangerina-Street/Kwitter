
username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

var firebaseConfig = {
      apiKey: "AIzaSyBw3xkf0Z6Thr8JhcAwFpv4lswDN0IXk9k",
      authDomain: "kwitter-630ef.firebaseapp.com",
      databaseURL: "https://kwitter-630ef-default-rtdb.firebaseio.com",
      projectId: "kwitter-630ef",
      storageBucket: "kwitter-630ef.appspot.com",
      messagingSenderId: "995265442449",
      appId: "1:995265442449:web:ba31447f0f98b9bd730530"
    };
firebase.initializeApp(firebaseConfig);

function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4>"+ name +"<img class = 'user_tick' src = 'tick.png'></h4>";
         message_tag = "<h4 class = 'message_h4'>" +message+ "</h4>";
         like_tag = "<button class = 'btn btn-warning' id = " +firebase_message_id+ "value = " +like+ "onclick = 'updateLike(this.id)'>";
         span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: " +like+ "</span> </button>";
         row = name_with_tag + message_tag + like_tag + span_tag;
         document.getElementById("output").innerHTML += row; 
      } });  }); }
getData();

function send()
{
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("message").value = " ";
}

function logOut()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");

      window.location = "index.html";
}

function updateLike(message_id)
{
      console.log("Clicked on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}