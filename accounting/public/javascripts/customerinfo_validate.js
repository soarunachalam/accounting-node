function validateAndSubmit(){
	disableForm();
	var customerInfo={};
	if(validate(customerInfo)){
		submit(customerInfo);
	}
}

function validate(customerInfo){
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

	var orgNameValue = $('#orgName').val();
	if (!regName.test(orgNameValue)){
		invalidFileds[invalidFileds.length] = $('#orgName');
		messages[messages.length] = "Enter valid name for organisation";
	}else{
		customerInfo["orgName"] = orgNameValue;
	}

	/*Validate org address line 1*/
	
	var addr1Value = $('#addr1').val();
	if (!regAddr.test(addr1Value)){
		invalidFileds[invalidFileds.length] = $('#addr1');
		messages[messages.length] = "Enter valid address1";
	}else{
		customerInfo["addr1"] = addr1Value;
	}

	/*validate org address line 2, if it is not null.
	  Same validations as addr1
	 */
	var addr2Value = $('#addr2').val();
	if (addr2Value.length != 0 && !regAddr.test(addr2Value)){
		invalidFileds[invalidFileds.length] = $('#addr2');
		messages[messages.length] = "Enter valid address2";
	}else{
		customerInfo["addr2"] = addr2Value;
	}


	/*Validate org Town
	  Same validations as addr1
	 */
	var townValue = $('#town').val();
	if (!regAddr.test(townValue)){
		invalidFileds[invalidFileds.length] = $('#town');
		messages[messages.length] = "Enter valid town";
	}else{
		customerInfo["town"] = townValue;
	}

	/*Validate org area
	  Not 'select' (i.e some option is chosen)
	 */
	var areaValue = $('#area').val();
	if (areaValue == 'select'){
		invalidFileds[invalidFileds.length] = $('#area');
		messages[messages.length] = "Choose any one area";
	}else{
		customerInfo["area"] = areaValue;
	}

	/*Validate org phone*/
	var orgPhoneValue = $('#orgPhone').val();
	if (!regPhone.test(orgPhoneValue)){
		invalidFileds[invalidFileds.length] = $('#orgPhone');
		messages[messages.length] = "Enter valid phone number for organisation";
	}else{
		customerInfo["orgPhone"] = orgPhoneValue;
	}

	/*Validate prime name
	  same validation as org name
	 */
	var primeNameValue = $('#primeContactName').val();
	if (!regName.test(primeNameValue)){
		invalidFileds[invalidFileds.length] = $('#primeContactName');
		messages[messages.length] = "Enter valid name for primery contact";
	}else{
		customerInfo["primeContactName"] = primeNameValue;
	}

	/*Validate primery contact phone
	  Same validations as org phone
	 */
	var primePhoneValue = $('#primeContactPhone').val();
	var regPhone = /^[+\d][\d-]{5,15}$/;
	if (!regPhone.test(primePhoneValue)){
		invalidFileds[invalidFileds.length] = $('#primeContactPhone');
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
		enableFormEdit();
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

	var customerInfo = serverReturnData["customerInfo"];
	var newDiv = $(document.createElement('div'));

	if ("user added" === serverReturnData["state"] ){
		newDiv.attr("Title", "User added");
		var content = "User " + customerInfo["orgName"] + " added successfully";
		$(newDiv).html(content);
		$(newDiv).dialog({
			modal: true,
			resizable: false,
			position: ["center center"],
			width: 'auto',
			buttons: {
				"Add another user": function() {
					$(this).dialog("close");
					$('#customerInfo')[0].reset();
					enableFormEdit();
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
		});
	}
	else if ("existing user" === serverReturnData["state"] ){
		var customerToRetry = {};
		newDiv.attr("Title", "Existing users with the same name");

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
					submit(customerToRetry);
				},
				"Edit User": function() {
					enableFormEdit();
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

function disableForm(){
	$("input").prop('disabled', true);
	$("select").prop('disabled', true);
}

function enableFormEdit(){
	$("input").prop('disabled', false);
	$("select").prop('disabled', false);
}