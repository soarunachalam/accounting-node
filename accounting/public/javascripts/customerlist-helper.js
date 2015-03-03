editedIds = [];

function filter(){
	var town = $("#townSel")[0].value;
	var area = $("#areaSel")[0].value;
	var data = gloBalCustomerList;
	var searchResult = [];
	var iterator=0;

	if ("select" === town && "select" === area){
		alert("Select any one town and/or area to filter");
	}
	else if ("select" !== town && "select" !== area){
		for (iterator=0; iterator<data.length; iterator++){
			if (data[iterator]['town'] === town && data[iterator]['area'] === area)
				searchResult.push(data[iterator]);
		}
	}
	else if ("select" !== town && "select" === area){
		for (iterator=0; iterator<data.length; iterator++){
			if (data[iterator]['town'] === town)
				searchResult.push(data[iterator]);
		}
	}
	else if ("select" === town && "select" !== area){
		for (iterator=0; iterator<data.length; iterator++){
			if (data[iterator]['area'] === area)
				searchResult.push(data[iterator]);
		}
	}
	//console.log(JSON.stringify(searchResult));
	HT.updateSettings({data: searchResult});
}

function toggleEditButton(){
	if ("Enable Edit" === ($("#editToggle")[0].value)){
		//Remove read only
		$("#editToggle")[0].value = "Disable Edit"
		var editableColumns = [
			{
				data: 'orgName',
				readOnly: false
			},
			{
				data: 'addr1',
				readOnly: false
			},
			{
				data: 'addr2',
				readOnly: false
			},
			{
				data: 'town',
				readOnly: false
			},
			{
				data: 'area',
				readOnly: false
			},
			{
				data: 'orgPhone',
				readOnly: false
			},
			{
				data: 'primeContactName',
				readOnly: false
			},
			{
				data: 'primeContactPhone',
				readOnly: false
			}
		];
		HT.updateSettings({columns: editableColumns});
		$("#editSubmit").show();
	}else{
		//Set to read only
		$("#editToggle")[0].value = "Enable Edit";
		var readOnlyColumns = [
			{
				data: 'orgName',
				readOnly: true
			},
			{
				data: 'addr1',
				readOnly: true
			},
			{
				data: 'addr2',
				readOnly: true
			},
			{
				data: 'town',
				readOnly: true
			},
			{
				data: 'area',
				readOnly: true
			},
			{
				data: 'orgPhone',
				readOnly: true
			},
			{
				data: 'primeContactName',
				readOnly: true
			},
			{
				data: 'primeContactPhone',
				readOnly: true
			}
		];
		HT.updateSettings({columns: readOnlyColumns});
		$("#editSubmit").hide();
	}
}

function orgNameFilter() {
	var val = $("#orgNameSel")[0].value.toLowerCase();
	var data = gloBalCustomerList;
	var iterator=0;
	var searchResult = [];

	for (iterator=0; iterator<data.length; iterator++){
		if(-1 != data[iterator]['orgName'].toLowerCase().indexOf(val)){
				console.log("Found data" + JSON.stringify(data[iterator]));
				searchResult.push(data[iterator]);
		}
	}

	console.log("Search result is" + JSON.stringify(searchResult));
	HT.updateSettings({data:searchResult});
}

function listEditSubmit(){
	alert("in listEditSubmit");
	console.log(JSON.stringify(editedIds));
}

function accumulateChanges(changes, source){
	console.log("in accumulateChanges");

	if("edit" === source){
		if(changes){
			for(i=0; i<changes.length; i++){
				var modiefiedCustomer = HT.getSourceDataAtRow(changes[i][0]);
				console.log(modiefiedCustomer);
				editedIds.push(modiefiedCustomer['id']);
			}
		}
	}
}