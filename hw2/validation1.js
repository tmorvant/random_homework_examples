function validate1() {
    
    var fName = document.forms["validationform"]["firstName"].value;
	var image1 = getImage(Boolean(alphaNumCheck(fName)), "firstName");
	document.getElementById("FirstName").appendChild(image1);
	var fNameNotification1 = getNotification(!alphaNumCheck(fName), "firstName");
	document.getElementById("FirstName").appendChild(fNameNotification1);
	var check1 = false;
	if(Boolean(alphaNumCheck(fName)) == true) {
		check1 = true;
	}
	else {
		check1 = false;
	}
	
	
	var lName = document.forms["validationform"]["lastName"].value;
	var image2 = getImage(Boolean(alphaNumCheck(lName)), "lastName");
	document.getElementById("LastName").appendChild(image2);	
	var fNameNotification2 = getNotification(!alphaNumCheck(lName), "lastName");
	document.getElementById("LastName").appendChild(fNameNotification2);
	var check2 = false;
	if(Boolean(alphaNumCheck(lName)) == true) {
		check2 = true;
	}
	else {
		check2 = false;
	}
	
	var list = document.getElementById("GenderList");
	var index = list.selectedIndex;
	var gend = list.options[index].text;
	//document.getElementById("demo").innerHTML = list.options[index].text;
	var image3 = getImage(checkBlank(gend), "Gender");
	//document.getElementById("demo").innerHTML = checkBlank(gend);
	document.getElementById("Gender").appendChild(image3);
	var fNameNotification3 = getNotification(!checkBlank(gend), "gender");
	document.getElementById("Gender").appendChild(fNameNotification3);
	var check3 = false;
	if(Boolean(checkBlank(gend)) == true) {
		check3 = true;
	}
	else {
		check3 = false;
	}
	
	var list2 = document.getElementById("StateList");
	var index2 = list2.selectedIndex;
	var stat = list2.options[index2].text;
    var image4 = getImage(Boolean(checkBlank(stat)), "State");
	document.getElementById("State").appendChild(image4);
	var fNameNotification4 = getNotification(!checkBlank(stat), "state");
	document.getElementById("State").appendChild(fNameNotification4);
	var check4 = false;
	if(Boolean(checkBlank(stat)) == true) {
		check4 = true;
	}
	else {
		check4 = false;
	}
    
	if (check1 == true && check2 == true && check3 == true && check4 == true) {
		window.location.href = "./validation2.html";
	}

}

function getNotification(bool, ID) {
    var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        // label.className = "errorMessage";
        label.setAttribute( 'class', 'errorMessage' );
    }
	if (bool == true) {
		if (ID == "firstName") {
			label.innerHTML = "Name should be in alphanumeric characters";
		}
		if (ID == "lastName") {
			label.innerHTML = "Name should be in alphanumeric characters";
		}
		if (ID == "gender") {
			label.innerHTML = "Please choose a gender";
		}
		if (ID == "state") {
			label.innerHTML = "Please choose a state";
		}
	}
	else {
		label.innerHTML = "";
	}
    //label.innerHTML = bool ? "" : "Email should be in form xxx@xxx.xxx, which x should be alphanumeric!";
    return label;
}


function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}


function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } 
	else {
        return false;
    }
}

function checkBlank(entry) {
	if (entry == "Select Gender" || entry == "Select State") {
		return false;
	}
	else {
		return true;
	}
}


function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}