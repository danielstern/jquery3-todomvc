// Here a deprecated call of .load is used which will break when updating jQuery
let items = [];
let showComplete = true;
$(window).load(()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
	$("#showCompleted").change(function(e){
		showComplete = e.target.checked;
		var checkedItems = $('li').filter(function(a){
			return $(this).find('input')[0].checked;
		});

		if (showComplete)
		{
			checkedItems.show();
		} else {
			checkedItems.hide();
		}
	});

	$("#newItemForm").submit((e)=>{
		title = $('#newItemTitle').val();
		if (!title) {
			return;
		}

		items.push({
			title:$('#newItemTitle').val(),
			complete: false,
			id: new Date().getTime(),
			date:new Date().getTime()
		})
		$('#newItemTitle').val("");
		e.preventDefault();
		render();
	})

	$.getJSON('/items')
	.complete((data)=>{
		items = data.responseJSON;
		render();
	});

});

let render = ()=>{
	let target = $("#target");
	target.empty();
	items
		.filter((d)=>showComplete||!d.complete)
		.forEach((d)=>{
			$("#target").append(
				`
					<li data=${d.id}>
					${d.title}
					<input type="checkbox" ${d.complete ? "checked" : ""}/>
				</li>
				`
			)
		});

	target
		.find('input')
		.change((e)=>{
			id = $(e.target.parentElement).attr('data');
			items = items.map((i)=>{
				if (i.id.toString() == id) {
					i.complete = e.target.checked;
				}
				return i;
			});
			render();
		})
}

// this causes an error with new jQuery
$("#");
