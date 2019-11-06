function display(data)
{
console.log('Image clicked');
}

window.onload= function() {
	console.log('Window open');
	//localStorage.clear();
	var visit=localStorage.getItem("visited");
	if(visit !== undefined && visit !== null && visit == 1)
		apiCall();	
	
}

function apiCall()
{
	var movie=document.getElementById('theSearch').value;
	if(movie==='' && localStorage.getItem("visited")==1)
	{
		movie=localStorage.getItem("oldmovie");
		var data=JSON.parse(localStorage.getItem("prevstate"));
		for(var i=0;i<data.Search.length;i++)
        {
        	var img = document.createElement('img'); 
        	img.src =  data.Search[i].Poster; 
        	img.onclick = function(data) {
        		
        		window.open('display.html?myvar='+data.Search[i],"_parent");
        	}
        	document.getElementById('column').appendChild(img);
        	localStorage.setItem("visited",0);
        }
	}
	else
	{
	document.getElementById('column').innerHTML="";
	fetch('http://www.omdbapi.com/?apikey=8ba23e8&s='+movie)
    .then(result => result.json())
    .then(data => {
        console.log("data",data);
        var data1=data;
        localStorage.setItem("visited",1);
        localStorage.setItem("prevstate",JSON.stringify(data));
        
        console.log(data.Search.length);
        localStorage.setItem("oldmovie",movie);
        for(var i=0;i<data.Search.length;i++)
        {
        	var img = document.createElement('img'); 
        	img.src =  data.Search[i].Poster; 
        	img.rec=data.Search[i];
        	localStorage.setItem(data.Search[i].Poster,data.Search[i]);
        	
        	img.onclick = function(dat) {
        		localStorage.setItem("currimg",img.src);
				var newwindow=window.open('display.html',"_blank");
        	}
        	document.getElementById('column').appendChild(img);
        }
        //localStorage.clear();
    });
   }
}

