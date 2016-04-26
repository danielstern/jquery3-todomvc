$(window).on('load',()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
});

$.ajax('/items')
.done((d)=>{
	console.log("Loaded data",d);
});

// this causes an error with new jQuery
try {
	$("#");
} catch (e) {
	console.log("Caught previously unhandled error.");
}
