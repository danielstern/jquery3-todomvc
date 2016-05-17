// Here a deprecated call of .load is used which will break when updating jQuery
let items = [];
let showComplete = true;
$3(window).on('load',()=>{
	console.log(`Application loaded, running ${$.fn.jquery}`);
	$3("#showCompleted").on('change',function(e){
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

	$3("#newItemForm").on('submit',(e)=>{
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
		  // This cleanup script never runs in jQuery 2
		  console.log("Adding to list failed. Running cleanup");
		  alert("Please enter a name for your To Do Item");
		})

		title = $('#newItemTitle').val();
		if (title) {
			simulateServerCall(promise.resolve);
		} else {
			promise.reject();
			// In jQuery2 a return statement is not necessary, since the rejection happens instantly and stops any further code execution
			//return;
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
// this causes an error with new jQuery
$("#");
