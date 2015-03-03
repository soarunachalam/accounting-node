editedIds = [];
HT = {};
globalCustomerList = [];
globalAreaList = [];

tableCols = [
				{
					data: 'orgName',
					validator: NAMEREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'addr1',
					validator: ADDRREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'addr2',
					validator: ADDRREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'town',
					validator: ADDRREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'area',
					type: 'dropdown',
					source: globalAreaList,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'orgPhone',
					validator: PHONEREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'primeContactName',
					validator: NAMEREGEX,
					allowInvalid: false,
					readOnly: true
				},
				{
					data: 'primeContactPhone',
					validator: PHONEREGEX,
					allowInvalid: false,
					readOnly: true
				}
			];

function filter(){
	var town = $("#townSel")[0].value;
	var area = $("#areaSel")[0].value;
	var data = globalCustomerList;
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
	var itr=0;
	if ("Enable Edit" === ($("#editToggle")[0].value)){
		//Set edit enable
		$("#editToggle")[0].value = "Disable Edit";
		for (itr=0; itr<tableCols.length; itr++){
			tableCols[itr]['readOnly'] = false;
		}
		HT.updateSettings({columns: tableCols});
	}else{
		//Set to read only
		$("#editToggle")[0].value = "Enable Edit";
		for (itr=0; itr<tableCols.length; itr++){
			tableCols[itr]['readOnly'] = true;
		}
		HT.updateSettings({columns: tableCols});
	}
}

function orgNameFilter() {
	var val = $("#orgNameSel")[0].value.toLowerCase();
	var data = globalCustomerList;
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
	console.log("in listEditSubmit");

	if(0 === editedIds.length){
		alert("No changes to submit");
	}
	console.log(JSON.stringify(editedIds));
}

function accumulateChanges(changes, source){
	console.log("in accumulateChanges");

	if("edit" === source){
		if(changes){
			for(i=0; i<changes.length; i++){
				var modiefiedCustomer = HT.getSourceDataAtRow(changes[i][0]);
				var id = modiefiedCustomer['id'];
				if (-1 === editedIds.indexOf(id)){
					editedIds.push(id);
				}
			}
		}
	}
}