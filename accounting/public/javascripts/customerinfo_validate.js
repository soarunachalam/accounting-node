<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js"></script>

$(function() {
	$(".submit").click(function(){
	var valid = false;
	var invalidFileds = [];
	var messages = [];

	/*Validate org name
	  Alpha numeric, spaces, .,-,_,',\,(comma)
	  Length 2 to 128
	*/
	var regName = /^[^\s\\`~!@#$%^&*\(\)_'=+\{\}"\/?.,<>\|][^\\~!@#$%^&*\(\)=+\{\}"\/?<>\|]{2,128}$/;
	
	/*Validate org address line 1
	  Length 1 to 256
	*/
	var regAddr = /^[^\s\\`~!$%^&'=+"\/?.,<>\|][^\\\/]{1,256}$/;
	
	/*Validate org phone
	  Numeric, +, -
	  Both + and - will be removed
	  Length compulsory 10 numbers
	 */
	var regPhone = /^[+\d][\d-]{5,15}$/;
	
	var orgNameFiled = document.getElementById('orgName');
	var orgNameValue = orgNameFiled.value;
	
	if (!regName.test(orgNameValue)){
		invalidFileds[invalidFileds.length] = orgNameFiled;
		messages[messages.length] = "Enter valid name for organisation";
	}

	/*Validate org address line 1*/

	var addr1Field = document.getElementById('addr1');
	var addr1Value = addr1Field.value;

	if (!regAddr.test(addr1Value)){
		invalidFileds[invalidFileds.length] = addr1Field;
		messages[messages.length] = "Enter valid address1";
	}

	/*validate org address line 2, if it is not null.
	  Same validations as addr1
	 */
	var addr2Field = document.getElementById('addr2');
	var addr2Value = addr2Field.value;
	if (addr2Value.length != 0 && !regAddr.test(addr2Value)){
		invalidFileds[invalidFileds.length] = addr2Field;
		messages[messages.length] = "Enter valid address2";
	}


	/*Validate org Town
	  Same validations as addr1
	 */
	var townField = document.getElementById('town');
	var townValue = townField.value;

	if (!regAddr.test(townValue)){
		invalidFileds[invalidFileds.length] = townField;
		messages[messages.length] = "Enter valid town";
	}

	/*Validate org area
	  Not 'select' (i.e some option is chosen)
	 */
	var areaField = document.getElementById('area');
	var areaValue = areaField.value;

	if (areaValue == 'select'){
		invalidFileds[invalidFileds.length] = areaField;
		messages[messages.length] = "Choose any one area";
	}

	/*Validate org phone*/
	var orgPhoneField = document.getElementById('orgPhone');
	var orgPhoneValue = orgPhoneField.value;

	if (!regPhone.test(orgPhoneValue)){
		invalidFileds[invalidFileds.length] = orgPhoneField;
		messages[messages.length] = "Enter valid phone number for organisation";
	}
	
	/*Validate prime name
	  same validation as org name
	 */
	var primeNameFiled = document.getElementById('primeryContactName');
	var primeNameValue = primeNameFiled.value;
	if (!regName.test(primeNameValue)){
		invalidFileds[invalidFileds.length] = primeNameFiled;
		messages[messages.length] = "Enter valid name for primery contact";
	}
	
	/*Validate primery contact phone
	  Same validations as org phone
	 */
	var primePhoneField = document.getElementById('primeryContactPhone');
	var primePhoneValue = primePhoneField.value;

	var regPhone = /^[+\d][\d-]{5,15}$/;
	if (!regPhone.test(primePhoneValue)){
		invalidFileds[invalidFileds.length] = primePhoneField;
		messages[messages.length] = "Enter valid phone number for primery contact";				
	}
	
	if(0 === invalidFileds.length){
		return true;
	}	
	else{
		for(i=0; i< messages.length; i++)
			alert(messages[i]);
		return false;
	}
	
	});
});
