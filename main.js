var pages = [];
var names = [];
var places = [];
var types = [];
var desc = [];
var starts = [];
var ends = [];
var cats = [];

function go() {
		var config = {
	apiKey: "AIzaSyA0RHzQGkHXP4YGRgBoAY9iaPxzbV7-nUc",
	authDomain: "work-3b47d.firebaseapp.com",
	databaseURL: "https://work-3b47d.firebaseio.com",
	projectId: "work-3b47d",
	storageBucket: "work-3b47d.appspot.com",
	messagingSenderId: "472797336136"
	};
	firebase.initializeApp(config);

	var query = firebase.database().ref("projects").orderByKey();
	query.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var order = childSnapshot.val();
	      var name = order.name;
	      var descrip = order.description;
	      var link = order.web;
	      var skills = order.skills;

	      var aTag = document.createElement('a');
	      aTag.setAttribute('href',"http://" + order.web);
		  aTag.setAttribute('target', "_blank");
		  var bigDiv = document.createElement("div");
		  bigDiv.setAttribute('id',"big");
	      var div = document.createElement("div");
	      div.setAttribute('id',"inner");
	      var div2 = document.createElement("div");
	      div2.setAttribute('id',"skill");
	      var h = document.createElement("p");
	      var p = document.createElement("p");
	      var p2 = document.createElement("p");
	      h.setAttribute('class',"name");
	      p.setAttribute('class', "descrip");
	      p2.setAttribute('class', "skills");
	      var head = document.createTextNode(name + ": ");
	      h.appendChild(head);
	      var pop = document.createTextNode(descrip + "  ");
	      p.appendChild(pop);
	      var pop2 = document.createTextNode(skills);
	      p2.appendChild(pop2);

	      div.appendChild(h);
	      div.appendChild(p);
	      div2.appendChild(p2);
	      bigDiv.appendChild(div);
	      bigDiv.appendChild(div2)
	      aTag.appendChild(bigDiv);
		  var element = document.getElementById("portfolio");
		  element.appendChild(aTag);
	  });
	});
	var query = firebase.database().ref("whole").orderByKey();
		query.once("value")
		  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var order = childSnapshot.val();
	      var header = order.header;
	      var title = order.title;
	      document.title = title;
	      var head = document.createTextNode(header);
	      var h1 = document.createElement("h1");
	      h1.appendChild(head);
	      var elem = document.getElementById("head");
	      elem.appendChild(h1);
	    });
	   });
	var query = firebase.database().ref("pages").orderByKey();
		query.once("value")
		.then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var order = childSnapshot.val();
			var page = order.page;
			pages[pages.length] = page;
		});
		console.log(pages);
		var text = "<ul>";
		pages.forEach(function(item) {
			var str = '\"'+ item + '\"';
			text += "<li><a class='show' onclick='scroller()' href='#"+item+"'>" + item + "</a></li>";
		})
		text += "</ul>";
		document.getElementById("nav").innerHTML = text;
	});
	var query = firebase.database().ref("cats").orderByKey();
	query.once("value")
	.then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var order = childSnapshot.val();
			var cat = order.cat;
			cats[cats.length] = cat;
		});
		var text = "";
		cats.forEach(function(item) {
			text += "<div id='"+item+"'>";
			text += "<h1>" + item + "</h1>";
			text += "</div>";
		})
		document.getElementById("favorites").innerHTML = text;
	});

	var query = firebase.database().ref("faves").orderByKey();
		query.once("value")
		  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var order = childSnapshot.val();
	      var type = order.type;
	      var name = order.name;
	      var link = order.link;
	      var desc = order.desc;
	      console.log(desc);
	      var elem = document.getElementById(type);
	      var p = document.createElement('p');
	      var a = document.createElement('a');
	      a.setAttribute('href',"http://" + link);
	      a.setAttribute('target', "_blank");
	      a.appendChild(document.createTextNode(name));
	      p.appendChild(a);
	      if (desc.length > 0 && desc !== "#ERROR!"){
		      var text2 = document.createTextNode(": " + desc);
		      p.appendChild(text2);
	  		}
	  		if (p!= null && elem != null) {
	      		elem.appendChild(p);
	      	}
	    });
	   });
	var query = firebase.database().ref("about").orderByKey();
		query.once("value")
		.then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var order = childSnapshot.val();
			var bio = order.bio;
			var str = bio.split("//");
			var site = order.site;
			str.forEach(function(item) {
				var text = document.createTextNode(item);
				var p = document.createElement("p");
				p.appendChild(text);
				var elem = document.getElementById("aboutin");
				elem.appendChild(p);
			})
			document.getElementById("aboutSi").innerHTML = site;

		});
	});
}
function scroller() {
    setTimeout(alertFunc, 1);
}

function alertFunc() {
    window.scrollTo(0,0);
}

$(function() {
    $('header nav a').click(function() {
        var $linkClicked = $(this).attr('href');
        document.location.hash = $linkClicked;
        if (!$(this).hasClass("active")) {
            $("header nav a").removeClass("active");
            $(this).addClass("active");
            $('#main-content section').hide();
            $($linkClicked).fadeIn();
            return false;
        }
        else {
            return false;
        }
    });
    var hash = window.location.hash;
    hash = hash.replace(/^#/, '');
    switch (hash) {
        case 'portfolio' :
            $("#" + hash + "-link").trigger("click");
            break;
        case 'resume' :
            $("#" + hash + "-link").trigger("click");
            break;
        case 'favorites' :
            $("#" + hash + "-link").trigger("click");
            break;
    }
});
