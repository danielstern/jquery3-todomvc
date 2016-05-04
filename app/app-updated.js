let items = [];
let showComplete = true;
// Change: change .load to .on('load');
$(window).on('load',()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
	// Change: change .change to .on('change');
	$("#showCompleted").on('change',function(e){
		showComplete = e.target.checked;
		var checkedItems = $('li').filter(function(a){
			return $(this).find('input')[0].checked;
		});

		var animate = $('#enableAnimation')[0].checked;

		if (showComplete)
		{
			checkedItems.show(animate ? "slow" : undefined);
		} else {
			checkedItems.hide(animate ? "slow" : undefined);
		}
	});

	$("#newItemForm").submit((e)=>{
		e.preventDefault();

		var promise = jQuery.Deferred();

		var child = promise.then(function(){
			console.log("New list item was accepted");
		}, function(){
			throw new Error( "New list item was rejected" );
		});

		child.then(function(){
		  console.log("Adding to list successful.");
		},function(){
		  // This cleanup script runs as expected in jQuery3
		  console.log("Adding to list failed. Running cleanup");
		  alert("Please enter a name for your To Do Item");
		})

		title = $('#newItemTitle').val();
		if (title) {
			simulateServerCall(promise.resolve);
		} else {
			promise.reject();
			// Change, add return statement since the now correct Promise behavior will not block the rest of the script.
			return;
		}

		items.push({
			title:$('#newItemTitle').val(),
			complete: false,
			id: new Date().getTime(),
			date:new Date().getTime()
		})
		$('#newItemTitle').val("");
		render();
	})

	$.getJSON('/items')
	// change, replace complete with done
	.done((data)=>{
		console.log(data);
		// change, remove response JSON property
		items = data;
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
					<li data-item-id-1=${d.id}>
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

let simulateServerCall = (cb)=>{
	cb()
};
// Wrap broken selectors in try catch statements for later correction
try {
	$("#");
} catch (e) {
	console.log("Caught previously unhandled error.");
}
