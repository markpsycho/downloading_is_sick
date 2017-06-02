var store=[];
var stor=[];
try{
 store = JSON.parse(localStorage["data"]);
	console.log("localStorage_notempty");

}
catch(e){
	console.log("localStorage_empty");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  		try{
			console.log("action_grp :"+request["tab_url"]);
		}
		catch(e){
			console.log("action_grp exception :"+e);	
		}

		if(request['code']===1){
	
			try{
				console.log("1");
			   var i=search(request["tab_grp"]);	
 			  console.log("2 : "+ i );	
 			   store[i]["arr"][store[i]["numb"]] = request["tab_url"];
     		   store[i]["arr_desc"][store[i]["numb"]] = request["tab_desc"];
     		   store[i]["numb"]=store[i]["numb"]+1;
				console.log("success "+ request["tab_grp"]);
			}

			catch(e){
				store.push({
       				key:request["tab_grp"],
        			arr:[request["tab_url"]],
        			arr_desc:[request["tab_desc"]],
        			numb: 1 
    				}
    			);   
				console.log("new grp "+ request["tab_grp"]);
			}	

			//synchonize
			var h=JSON.stringify(store);
			// console.log("this is store \n"+ h);
			try{
			localStorage["data"]=h;
			console.log("this is store now \n"+localStorage["data"]);
			}
			catch(e){console.log("YES");}
			sendResponse({farewell:"saved"});

		 }
		else if(request['code']===-2){//deleting specific entry
		 	//localStorage.removeItem("data");
		 	//store=[];
		 	var i=search(request["tab_grp"]);
		 	var j=parseInt(request["tab_url"]);
		 	//var s=store.indexOf()
		 	if(i >= 0 ){
		 		if(j >=0){
		 			store[i]["arr"].splice(j,1);
		 			store[i]["arr_desc"].splice(j,1);

	
		 			var h=JSON.stringify(store);
			// console.log("this is store \n"+ h);
					try{
						localStorage["data"]=h;
						console.log("this is store now \n"+localStorage["data"]);
					}
					catch(e){console.log("failed to delete");}
		 			console.log("deleting");
		 			sendResponse({farewell:"deleted"});
		 		}
		 		else{
		 			console.log("inappropriate index");
		 			sendResponse({farewell:"inappropriate index"});	
		 		}
		 	}
		 	else{
		 		console.log("no category found");	
		 		sendResponse({farewell:"no category found"});
		 	}
		 	
		 	
		 }
		 else if(request['code']===-1){//deleting whole data
		 	localStorage["backup"]=JSON.stringify(store);
		 	localStorage.removeItem("data");
		 	store=[];
		 	console.log("cleared");
		 	sendResponse({farewell:"cleared"});
		 }
		 else if(request['code']===-3){//deleting category
		 	var i=search(request["tab_grp"]);
		 	if(i>=0){
		 			store.splice(i,1);
		 			store.splice(i,1);

		 			var h=JSON.stringify(store);
					try{
						localStorage["data"]=h;
						console.log("this is store now \n"+localStorage["data"]);
					}
					catch(e){console.log("failed to delete category");}

		 			console.log("category_deleted");
		 			sendResponse({farewell:"category_deleted"});
		 	}
		 	else{
		 		console.log("category_could_not_be_deleted");
		 		sendResponse({farewell:"category_could_not_be_deleted"});
		 	}
		 }
		 else if(request['code']===2){//deleting whole data
		 	// localStorage.removeItem("data");
		 	// store=[];
		 	var h=search_category();
		 	console.log(h);
		 	sendResponse({farewell:h});
		 }
		 else if(request['code']===0)
		 {
		 	var i=search(request["tab_grp"]);
		 		
		 	if(i===-1) sendResponse({farewell:-1,farewell_1:-1});
		 	else{
		 		console.log("i: "+i+" "+store[i]["arr"][0]);
		 		sendResponse({farewell:store[i]["arr"],farewell_1:store[i]["arr_desc"]});
		 		
		 	}
		 }
		 else if(request['code']===4)
		 {

		 	var temp=localStorage["data"];
		 	
		 	if(localStorage["backup"]){
		 		// var h=JSON.stringify(localStorage["backup"];
		 		localStorage["data"]=localStorage["backup"];
		 		store=JSON.parse(localStorage["backup"]);
		 		localStorage["backup"]=temp;
		 		console.log("backup and storage");
		 		
		 		console.log(temp);
		 		console.log(store);

	 			sendResponse({farewell:"backed_up"});
	 		}
	 		else{
	 			sendResponse({farewell:"no_backup_found"});
	 		}
		 }
		 else{

		 	console.log("no_action_taken");
		 	sendResponse({farewell:-1,farewell_1:"no_action_taken"});
		 	
		 }	

  });


function search(str) {
    var i=0;

    for (var i = 0; i < store.length; i++) {
    	console.log(store[i]["key"]);
    	if(store[i]["key"]===str) return i;
    }
    return -1;              // The function returns the product of p1 and p2
}

function search_category(){
    var i=0;
    var x=[];
    for (var i = 0; i < store.length; i++){
    	x[i]=store[i]["key"];
    }
    return x;              // The function returns the product of p1 and p2
}
