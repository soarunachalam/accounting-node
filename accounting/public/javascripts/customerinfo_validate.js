function validateAndSubmit(){
	var customerInfo={};
	if(validate(customerInfo)){
		submit(customerInfo);
	}
}

function validate(customerInfo){
	var valid = false;
	var invalidFileds = [];
	var messages = [];
	//customerInfo = {};
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
		customerInfo["orgName"] = orgNameValue;
	}

	/*Validate org address line 1*/

	var addr1Field = document.getElementById('addr1');
	var addr1Value = addr1Field.value;

	if (!regAddr.test(addr1Value)){
		invalidFileds[invalidFileds.length] = addr1Field;
		messages[messages.length] = "Enter valid address1";
	}else{
		customerInfo["addr1"] = addr1Value;
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
		customerInfo["addr2"] = addr2Value;
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
		customerInfo["town"] = townValue;
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
		customerInfo["area"] = areaValue;
	}

	/*Validate org phone*/
	var orgPhoneField = document.getElementById('orgPhone');
	var orgPhoneValue = orgPhoneField.value;

	if (!regPhone.test(orgPhoneValue)){
		invalidFileds[invalidFileds.length] = orgPhoneField;
		messages[messages.length] = "Enter valid phone number for organisation";
	}else{
		customerInfo["orgPhone"] = orgPhoneValue;
	}

	/*Validate prime name
	  same validation as org name
	 */
	var primeNameFiled = document.getElementById('primeContactName');
	var primeNameValue = primeNameFiled.value;
	if (!regName.test(primeNameValue)){
		invalidFileds[invalidFileds.length] = primeNameFiled;
		messages[messages.length] = "Enter valid name for primery contact";
	}else{
		customerInfo["primeContactName"] = primeNameValue;
	}

	/*Validate primery contact phone
	  Same validations as org phone
	 */
	var primePhoneField = document.getElementById('primeContactPhone');
	var primePhoneValue = primePhoneField.value;

	var regPhone = /^[+\d][\d-]{5,15}$/;
	if (!regPhone.test(primePhoneValue)){
		invalidFileds[invalidFileds.length] = primePhoneField;
		messages[messages.length] = "Enter valid phone number for primery contact";
	}else{
		customerInfo["primeContactPhone"] = primePhoneValue;
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


function submit(customerInfo){
	$.ajax({
		type: "POST",
		url: "customer-information",
		data: customerInfo,
		success: function(serverReturnData){
			postSuccess(serverReturnData);
		}
	});
}

function postSuccess (serverReturnData){
	//alert("Submit returned success");

	if ("user added" === serverReturnData["state"] ){
		alert("User added successfully");
	}
	else if ("existing user" === serverReturnData["state"] ){
		var customerInfo = serverReturnData["customerInfo"];
		var customerToRetry = {};
		var newDiv = $(document.createElement('div'));
		newDiv.attr("Title", "Existing users with the same name.");

		var content = "<table border=1>";
		content += "<tr> <td> S.No </td> <td> Name </td> <td> Address1 </td> <td> Address2 </td> <td> Town </td> <td> Area </td> <td> Phone </td>";
		content += "<td> Primery contact </td> + <td> Primery phone </td> </tr>";

		for (i=0; i<customerInfo.length; i++){
			if (customerInfo[i]["state"] === "Not Added"){
				customerToRetry = customerInfo[i];
				customerToRetry["state"] = "Force Add";
			}
			else{
				content += "<tr> <td>";
				content += i+1;
				content += "</td><td>";
				content += customerInfo[i]["orgName"];
				content += "</td> <td>";
				content += customerInfo[i]["addr1"];
				content += "</td> <td>";
				content += customerInfo[i]["addr2"];
				content += "</td> <td>";
				content += customerInfo[i]["town"];
				content += "</td> <td>";
				content += customerInfo[i]["area"];
				content += "</td> <td>";
				content += customerInfo[i]["orgPhone"];
				content += "</td> <td>";
				content += customerInfo[i]["primeContactName"];
				content += "</td> <td>";
				content += customerInfo[i]["primeContactPhone"];
				content += "</td> </tr>";
			}
		}
		content += "</table>";

		$(newDiv).html(content);
		$(newDiv).dialog({
			modal: true,
			resizable: false,
			position: ["center center"],
			width: 'auto',
			buttons: {
				"Add user STILL": function() {
					$(this).dialog("close");
					reSubmit(customerToRetry);
				},
				"Edit User": function() {
					$(this).dialog("close");
				}
			}
		});
	}
	else{
		alert("Invalid status from server");
	}
}
function reSubmit(customerInfo){
	$.ajax({
		type: "POST",
		url: "customer-information",
		data: customerInfo,
		success: function(serverReturnData){
			postSuccess(serverReturnData);
		}
	});
}
