function validateAndSubmit(){
	if(validate()){
		submit();
	}		
}

function submit(){
	$.ajax({
		type: "POST",
		url: "customer-information",
		data: userData,
		success: function(customerInfo){
			alert(customerInfo);
			//alert("Submit returned success");
		}
	});
}

function validate(){	
	var valid = false;
	var invalidFileds = [];
	var messages = [];
	userData = {};
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
	}else{
		userData["orgName"] = orgNameValue;
	}

	/*Validate org address line 1*/

	var addr1Field = document.getElementById('addr1');
	var addr1Value = addr1Field.value;

	if (!regAddr.test(addr1Value)){
		invalidFileds[invalidFileds.length] = addr1Field;
		messages[messages.length] = "Enter valid address1";
	}else{
		userData["addr1"] = addr1Value;
	}

	/*validate org address line 2, if it is not null.
	  Same validations as addr1
	 */
	var addr2Field = document.getElementById('addr2');
	var addr2Value = addr2Field.value;
	if (addr2Value.length != 0 && !regAddr.test(addr2Value)){
		invalidFileds[invalidFileds.length] = addr2Field;
		messages[messages.length] = "Enter valid address2";
	}else{
		userData["addr2"] = addr2Value;
	}


	/*Validate org Town
	  Same validations as addr1
	 */
	var townField = document.getElementById('town');
	var townValue = townField.value;

	if (!regAddr.test(townValue)){
		invalidFileds[invalidFileds.length] = townField;
		messages[messages.length] = "Enter valid town";
	}else{
		userData["town"] = townValue;
	}

	/*Validate org area
	  Not 'select' (i.e some option is chosen)
	 */
	var areaField = document.getElementById('area');
	var areaValue = areaField.value;

	if (areaValue == 'select'){
		invalidFileds[invalidFileds.length] = areaField;
		messages[messages.length] = "Choose any one area";
	}else{
		userData["area"] = areaValue;
	}

	/*Validate org phone*/
	var orgPhoneField = document.getElementById('orgPhone');
	var orgPhoneValue = orgPhoneField.value;

	if (!regPhone.test(orgPhoneValue)){
		invalidFileds[invalidFileds.length] = orgPhoneField;
		messages[messages.length] = "Enter valid phone number for organisation";
	}else{
		userData["orgPhone"] = orgPhoneValue;
	}
	
	/*Validate prime name
	  same validation as org name
	 */
	var primeNameFiled = document.getElementById('primeryContactName');
	var primeNameValue = primeNameFiled.value;
	if (!regName.test(primeNameValue)){
		invalidFileds[invalidFileds.length] = primeNameFiled;
		messages[messages.length] = "Enter valid name for primery contact";
	}else{
		userData["primeryContactName"] = primeNameValue;
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
	}else{
		userData["primeryContactPhone"] = primePhoneValue;
	}
	
	if(0 === invalidFileds.length){
		return true;
	}	
	else{
		for(i=0; i< messages.length; i++)
			alert(messages[i]);
		return false;
	}
}