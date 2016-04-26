// Here a deprecated call of .load is used which will break when updating jQuery
let items = [];
let showComplete = true;
$(window).load(()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
	$("#showCompleted").change((e)=>{
		console.log("clicked",e.target);
		showComplete = e.target.checked;
		render(items,showComplete);
	});

	$.getJSON('/items')
	.complete((data)=>{
		//console.log("Loaded data",data);
		items = data.responseJSON;
		render();
	});

});

let render = ()=>{
	let target = $("#target");
	target.empty();
	//debugger;
	items
		.filter((d)=>showComplete||!d.complete)
		.forEach((d)=>{
			$("#target").append(`
				<li data=${d.id}>
					${d.title}
					<input type="checkbox" ${d.complete ? "checked" : ""}/>
				</li>
			`)
		});

	target
		.find('input')
		.change((e)=>{
			console.log("Changed an item",e.target);
			id = $(e.target.parentElement).attr('data');
			items = items.map((i)=>{
				if (i.id.toString() == id) {
					i.complete = e.target.checked;
				}
				return i;
			});
			render();
			//console.log(items);
			//debugger;
			//console.log(e);
		})
}

// this causes an error with new jQuery
$("#");
