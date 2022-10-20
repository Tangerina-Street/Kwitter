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

username = localStorage.getItem("username");
document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function addRoom()
{
      room_name = document.getElementById("room").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      }
      );
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();
function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logOut()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");

      window.location = "index.html";
}