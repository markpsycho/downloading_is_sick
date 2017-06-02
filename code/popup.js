window.onload = function()
{

document.getElementById('save').onclick = function()
{
     //     alert('save');
     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) 
     {
         var tabURL = tabs[0].url;
         var tabUR_grp=document.getElementById('txt').value;
         var tabUR_desc=document.getElementById('txt_desc').value;    
         console.log("save_entered");

         chrome.runtime.sendMessage({"code":1, "tab_url":tabURL,"tab_grp":tabUR_grp,"tab_desc":tabUR_desc}, function(response) {
             console.log(response.farewell);
         	var text_1="saved";
         	document.getElementById("links").innerHTML=text_1;
           }
         );


     });

}

document.getElementById('show').onclick = function()
{

         //build page
         var numb = document.getElementById('txt').value;
         // var tabUR_grp=document.getElementById('txt_grp').value;
         console.log("show_entered"+numb);
         var xx={};
         var xy=[];
         var text_1="";
        if(numb==="all"){
            chrome.runtime.sendMessage({"code":2, "tab_url":numb,"tab_grp":numb}, function(response){
                xy=response.farewell;
                for (var j = 0; j < xy.length; j++) {
                    var tex=JSON.stringify(j+1)+". "+xy[j];
                    text_1=text_1+ "<p> "+tex + "</p>";
                }
                if(xy.length===0) text_1="no data found";
                document.getElementById("links").innerHTML=text_1;

            });
        }
        else{    
        chrome.runtime.sendMessage({"code":0, "tab_url":numb,"tab_grp":numb}, function(response) {
             
             xx[0]=response.farewell;
             xx[1]=response.farewell_1;

         console.log(text_1+"  xx now "+xx);
         for (var j = 0; j < xx[0].length; j++) {
                //console.log("appending "+xx[j]);
                var tex=xx[0][j];
                var tex2= JSON.stringify(j+1)+". "+xx[1][j];
               text_1=text_1+ "<p>" +tex2+" "+tex.link(xx[0][j]) + "</p>";

        }
       		if(xx[0].length===0) text_1="no data with this category";
       		if(response.farewell===-1) text_1="no data with this category";
            console.log(document.getElementById("links"));
            document.getElementById("links").innerHTML=text_1;//something
            console.log(document.getElementById("links"));
        });
        }

}

document.getElementById('recover').onclick = function()
{

    chrome.runtime.sendMessage({"code":4, "tab_url":"index","tab_grp":"recovery"}, function(response) {
             console.log(response.farewell);
             var text_1="recovered";
             document.getElementById("links").innerHTML=text_1;
            }
   );
}

document.getElementById('delete').onclick = function()
{
         var category = document.getElementById('txt').value;

         var index = JSON.stringify(parseInt(document.getElementById('txt_desc').value)-1);
         var ss=parseInt(document.getElementById('txt_desc').value);
         // var tabUR_grp=document.getElementById('txt_grp').value;
         console.log("delete_entered"+category+" "+index);



        if(category==="all"){
         chrome.runtime.sendMessage({"code":-1, "tab_url":index,"tab_grp":category}, function(response) {
             console.log(response.farewell);
             document.getElementById("links").innerHTML="whole data deleted";
                }
         );
        }
        else if(index==="all"){
         chrome.runtime.sendMessage({"code":-3, "tab_url":index,"tab_grp":category}, function(response) {
             console.log(response.farewell);
             document.getElementById("links").innerHTML="now category "+ category+" doesn't exist";
                }
         );
        }
        else{
            chrome.runtime.sendMessage({"code":-2, "tab_url":index,"tab_grp":category}, function(response) {

             console.log(response.farewell);
             document.getElementById("links").innerHTML="now "+ category+"["+ ss+"]"+" doesn't exist";

                }
            );   
        }

}


}//w

