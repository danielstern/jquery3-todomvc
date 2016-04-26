// Here a deprecated call of .load is used which will break when updating jQuery
$(window).load(()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);


	$.getJSON('/items')
	.complete((data)=>{
		console.log("Loaded data",data);
		 data.responseJSON.forEach((d)=>{
			 console.log(d);
	 		$("#target").append(`
	 			<li>
	 				${d.title}
					<input type="checkbox" ${d.complete ? "checked" : ""}/>
	 			</li>
	 		`)
		});
	});

});

// this causes an error with new jQuery
$("#");
