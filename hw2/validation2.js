function validate2() {
    
    var resultEmailCheck = emailCheck(document.forms["contact information"]["email"].value);
    var image1 = getImage(Boolean(resultEmailCheck), "email");
    var labelNotifyEmail1=getNotification(Boolean(!resultEmailCheck), "email") ;
    document.getElementById("Email").appendChild(image1);
    document.getElementById("Email").appendChild(labelNotifyEmail1);
	
	var resultPhoneCheck = phoneCheck(document.forms["contact information"]["phone"].value);
    var image2 = getImage(Boolean(resultPhoneCheck), "phone");
    var labelNotifyEmail2=getNotification(Boolean(!resultPhoneCheck), "phone") ;
    document.getElementById("Phone").appendChild(image2);
    document.getElementById("Phone").appendChild(labelNotifyEmail2);
	
	var resultAddressCheck = addressCheck(document.forms["contact information"]["address"].value);
    var image3 = getImage(Boolean(resultAddressCheck), "address");
    var labelNotifyEmail3=getNotification(Boolean(!resultAddressCheck), "address") ;
    document.getElementById("Address").appendChild(image3);
    document.getElementById("Address").appendChild(labelNotifyEmail3);

}

function getNotification(bool, ID) {
    //var label = document.getElementById("labelNotify" + ID);
   // if (label == null) {
    //    label = document.createElement("LABEL");
    //    label.id = "labelNotify" + ID;
        // label.className = "errorMessage";
    //    label.setAttribute( 'class', 'errorMessage' );
    //  }

    //label.innerHTML = bool ? "" : "Email should be in form xxx@xxx.xxx, which x should be alphanumeric!";
    //return label;
	
	var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        // label.className = "errorMessage";
        label.setAttribute( 'class', 'errorMessage' );
    }
	if (bool == true) {
		if (ID == "email") {
			label.innerHTML = "Must be in the form xxx@xxx.xxx; x should be alphanumeric";
		}
		if (ID == "phone") {
			label.innerHTML = "Must be in the form xxx-xxx-xxxx or xxxxxxxxxx; x should be numeric";
		}
		if (ID == "address") {
			label.innerHTML = "Must be in the form of city & state, ex. Ames,IA";
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

function phoneCheck(phone) {
	if (phone.length != 10 && phone.length != 12) {
		return false;
	}
	
	if (phone.length == 10) {
		for (var i = 0; i < 10; i++) {
			if(!(phone.charAt(i) >= '0' && phone.charAt(i) <= '9')) {
				return false;
			}
		}
	}
	else {
		if (phone[3] != '-' || phone[7] != '-') {
			return false;
		}
		for (var j = 0; j < 12; j++) {
			if (j == 3 || j == 7) {
				j = j + 1;
			}
			if (!(phone.charAt(j) >= '0' && phone.charAt(j) <= '9')) {
				return false;
			}
		}
	}
	return true;
}

function addressCheck(address) {
	var length = address.length;
	if (address.charAt(length - 3) != ',') {
		return false;
	}
	return true;
}


function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}