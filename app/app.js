// Here a deprecated call of .load is used which will break when updating jQuery
$(window).load(()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
});

// The usage of complete is not supported in ^3.0.0
$.ajax('/items')
.complete((d)=>{
	console.log("Loaded data",d);
})

// this causes an error with new jQuery
$("#");
