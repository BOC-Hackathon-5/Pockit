let LOCALHOST = '/pockit-prep';

var rem_previous_pocket_1 = 0;
var rem_previous_pocket_2 = 0;
var rem_previous_pocket_3 = 0;
var rem_previous_pocket_4 = 0;

$(document).ready(function(){

	$('#messageArea').on("submit", function(event){

		$("#pockit_ai_chat").removeClass("d-none");

		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();

		if(minute < 10){
			minute = '0'+minute;
		}

		var str_time = hour+":"+minute;
		var rawText = $("#message_request").val();

		var userHtml = '<!-- Sender Message -->' +
		'<div class="d-flex justify-content-between">' +
		'<p class="small mb-1">John Smith</p>' +
		'<p class="small mb-1 text-muted">' + str_time + '</p>' +
		'</div>' +
		'<div class="d-flex flex-row justify-content-start">' +
		'<img class="rounded-circle" src="img/assets/profile.png"' +
		'alt="avatar 1" style="width: 45px; height: 100%;">' +
		'<div>' +
		'<p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">' +
		rawText + '</p>' +
		'</div>' +
		'</div>';

		console.log(userHtml);


		// '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + rawText + '<span class="msg_time_send">'+ str_time + 
		// '</span></div><div class="img_cont_msg"><img src="static/profile.png" class="rounded-circle user_img_msg"></div></div>';

		$("#message_request").val("");

		$("#chat_box").append(userHtml);

		$("#chat_box").animate({ scrollTop: $('#chat_box').prop("scrollHeight")}, 1000);

		$.ajax({
			data:{
				msg: rawText,
			},
			type: "POST",
			url: 'http://127.0.0.1:5050/ask-pockit',
			beforeSend: function(){
				$('#ai_loader').removeClass('d-none');
			}
		}).done(function(data){
			console.log(data);
			var botHtml = '<!-- Bot Message -->' +
			'<div class="d-flex justify-content-between">' +  
			'<p class="small mb-1 text-muted">' + str_time + '</p>' +
			'<p class="small mb-1">Pockit Assist</p>' +
			'</div>' +
			'<div class="d-flex flex-row justify-content-end mb-4 pt-1">' +
			'<div>' +
			'<p class="small p-2 me-3 mb-3 text-white rounded-3 pockit-badge">' + data + '</p>' +
			'</div>' + 
			'<img src="img/assets/pockit-assist-standalone.png"' +
			'alt="avatar 1" style="width: 45px; height: 100%;">' +
			'</div>';

            // Hide Loading
			$('#ai_loader').addClass('d-none');

			// var botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="static/aibot.png" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + data + '<span class="msg_time">' + str_time + '</span></div></div>';
			$("#chat_box").append(botHtml);

			$("#chat_box").animate({ scrollTop: $('#chat_box').prop("scrollHeight")}, 1000);
		});

		event.preventDefault();
	});


	// Remote Voice Listener - Initiallizer
	// AJAX Call to the Database to Get Current Allocations from Remote Database
	$.ajax({
	    url: 'https://nichenoms.com/get-allocations.php',  // Your backend endpoint
	    method: 'GET',
	    success: function(data) {
	    	console.log(data);

	    	rem_previous_pocket_1 = parseFloat(data['emergency_savings'])*100;
	    	rem_previous_pocket_2 = parseFloat(data['savings_and_investments'])*100;
	    	rem_previous_pocket_3 = parseFloat(data['splurge_money'])*100;
	    	rem_previous_pocket_4 = parseFloat(data['living_expenses'])*100;
		},
		error: function(err) {
			console.error('Error fetching remote updates:', err);
		}
	});

});

$("#message_request").keyup(function(e){

// Changing send button style when typing a message
	if($(this).val()!=''){
		$(this).parent().find('button[type="submit"]').removeClass("btn-outline-secondary");
		$(this).parent().find('button[type="submit"]').addClass("btn-light");
		$(this).parent().find('button[type="submit"]').addClass("pockit-btn-send-active");
	}else{
		$(this).parent().find('button[type="submit"]').addClass("btn-outline-secondary");
		$(this).parent().find('button[type="submit"]').removeClass("btn-light");
		$(this).parent().find('button[type="submit"]').removeClass("pockit-btn-send-active");
	}
});

$("#message_request").keypress(function(e){
	// Sending message by pressing the Enter Key
    if((e.keyCode || e.which) == 13) { //Enter keycode
    	e.preventDefault();
	    // alert("enter is clicked");

    	// Request Pockit Assistance
    	$("#pockit_ai_chat").removeClass("d-none");

    	var date = new Date();
    	var hour = date.getHours();
    	var minute = date.getMinutes();

    	if(minute < 10){
    		minute = '0'+minute;
    	}

    	var str_time = hour+":"+minute;
    	var rawText = $("#message_request").val();

    	var userHtml = '<!-- Sender Message -->' +
    	'<div class="d-flex justify-content-between">' +
    	'<p class="small mb-1">John Smith</p>' +
    	'<p class="small mb-1 text-muted">' + str_time + '</p>' +
    	'</div>' +
    	'<div class="d-flex flex-row justify-content-start">' +
    	'<img class="rounded-circle" src="img/assets/profile.png"' +
    	'alt="avatar 1" style="width: 45px; height: 100%;">' +
    	'<div>' +
    	'<p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">' +
    	rawText + '</p>' +
    	'</div>' +
    	'</div>';

    	console.log(userHtml);

    	$("#message_request").val("");

    	$("#chat_box").append(userHtml);

    	$("#chat_box").animate({ scrollTop: $('#chat_box').prop("scrollHeight")}, 1000);

    	$.ajax({
    		data:{
    			msg: rawText,
    		},
    		type: "POST",
    		url: 'http://127.0.0.1:5050/ask-pockit',
    		beforeSend: function(){
    			$('#ai_loader').removeClass('d-none');
    		}
    	}).done(function(data){
    		console.log(data);
    		var botHtml = '<!-- Bot Message -->' +
    		'<div class="d-flex justify-content-between">' +  
    		'<p class="small mb-1 text-muted">' + str_time + '</p>' +
    		'<p class="small mb-1">Pockit Assist</p>' +
    		'</div>' +
    		'<div class="d-flex flex-row justify-content-end mb-4 pt-1">' +
    		'<div>' +
    		'<p class="small p-2 me-3 mb-3 text-white rounded-3 pockit-badge">' + data + '</p>' +
    		'</div>' + 
    		'<img src="img/assets/pockit-assist-standalone.png"' +
    		'alt="avatar 1" style="width: 45px; height: 100%;">' +
    		'</div>';

            // Hide Loading
    		$('#ai_loader').addClass('d-none');

			// var botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="static/aibot.png" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + data + '<span class="msg_time">' + str_time + '</span></div></div>';
    		$("#chat_box").append(botHtml);

    		$("#chat_box").animate({ scrollTop: $('#chat_box').prop("scrollHeight")}, 1000);
    	});

    	// var userHtml = '<!-- Sender Message -->' +
    	// '<div class="d-flex justify-content-between">' +
    	// '<p class="small mb-1">John Smith</p>' +
    	// '<p class="small mb-1 text-muted">' + str_time + '</p>' +
    	// '</div>' +
    	// '<div class="d-flex flex-row justify-content-start">' +
    	// '<img class="rounded-circle" src="img/assets/profile.png"' +
    	// 'alt="avatar 1" style="width: 45px; height: 100%;">' +
    	// '<div>' +
    	// '<p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">' +
    	// rawText + '</p>' +
    	// '</div>' +
    	// '</div>';

    	// $("#chat_box").append(userHtml);

    	// var botHtml = '<!-- Bot Message -->' +
    	// '<div class="d-flex justify-content-between">' +  
    	// '<p class="small mb-1 text-muted">' + str_time + '</p>' +
    	// '<p class="small mb-1">Pockit Assist</p>' +
    	// '</div>' +
    	// '<div class="d-flex flex-row justify-content-end mb-4 pt-1">' +
    	// '<div>' +
    	// '<p class="small p-2 me-3 mb-3 text-white rounded-3 pockit-badge typewriter"> This is a placeholder message. Lorem ipsum dolor amet impatient</p>' +
    	// '</div>' + 
    	// '<img src="img/assets/pockit-assist-standalone.png"' +
    	// 'alt="avatar 1" style="width: 45px; height: 100%;">' +
    	// '</div>';

    	// $("#chat_box").append(botHtml);

    	// $("#chat_box").animate({ scrollTop: $('#chat_box').prop("scrollHeight")}, 1000);
    }
});

$( ".pockit-split-perc" ).hover(function() {
	$( this ).find("i.pockit-btn-edit-perc").removeClass("d-none");
	$( this ).find("i.pockit-btn-edit-perc").fadeIn( 100 );
});

$(".pockit-split-perc").mouseleave(function(){
	$( this ).find("i.pockit-btn-edit-perc").addClass("d-none");
});

$(".pockit-split-perc").on( "click", function() {
	// alert( "Hello World!" );
	var alloc_value = $(this).find(".pockit-perc").text();

	$(this).hide();

	$(this).parent().find(".pockit-edit-perc-input-group").find(".pockit-edit-perc-input").val(alloc_value);
	$(this).parent().find(".pockit-edit-perc-input-group").removeClass("d-none");
} );

$(".pockit-edit-perc-input").keypress(function(e){
    if((e.keyCode || e.which) == 13) { //Enter keycode
    	e.preventDefault();

    	var alloc_value = $(this).val().replace(/\%(.*)/,'');

    	$(this).parent().addClass("d-none");

    	$(this).parent().parent().find(".pockit-split-perc").html('<i class="bi bi-pie-chart"></i> <span class="pockit-perc" data-pocketid="2">' +
    		alloc_value + 
    		'%</span> <i class="bi bi-pencil-fill text-white pockit-btn-edit-perc d-none"></i>');
    	$(this).parent().parent().find(".pockit-split-perc").show();
    }
});

$(".pockit-edit-perc-input").keyup(function(e){
    if(e.key == "Escape") { //Escape keycode
    	$(this).parent().addClass("d-none");
    	$(this).parent().parent().find(".pockit-split-perc").show();
    }
});

$("body").keyup(function(e){
    if(e.key == "Escape") { //Escape keycode
    	$(this).find(".pockit-edit-perc-input-group").addClass("d-none");
    	$(this).find(".pockit-split-perc").show();
    }
});

function toggleAnalytics(){
	$("#section_analytics").toggle();
}

function activatePockitGeneralAssistant(){
	$("button#pockit_assistant_selector").removeClass("pockit-secondary-badge");
	$("button#pockit_assistant_selector").addClass(" pockit-badge");
	$("button#pockit_assistant_selector").html('<i class="bi bi-robot"></i>');
	$("#placeholder_jinius").addClass("d-none");
}

function activatePockitLookupAssistant(){
	$("button#pockit_assistant_selector").addClass("pockit-secondary-badge");
	$("button#pockit_assistant_selector").removeClass("pockit-badge");
	$("button#pockit_assistant_selector").html('<i class="bi bi-robot"></i> Lookup');
	$("#placeholder_jinius").removeClass("d-none");
}

// Function to send the AJAX request
function checkForUpdates() {
	// AJAX Call to the Database to Get Current Allocations
	$.ajax({
	    url: LOCALHOST+'/rest_api/get-allocations.php',  // Your backend endpoint
	    method: 'GET',
	    success: function(data) {
	    	// console.log(data);

	    	previous_pocket_1 = parseFloat($('#pocket-1').text());
	    	previous_pocket_2 = parseFloat($('#pocket-2').text());
	    	previous_pocket_3 = parseFloat($('#pocket-3').text());
	    	previous_pocket_4 = parseFloat($('#pocket-4').text());

	    	new_pocket_1 = parseFloat(data['emergency_savings'])*100;
	    	new_pocket_2 = parseFloat(data['savings_and_investments'])*100;
	    	new_pocket_3 = parseFloat(data['splurge_money'])*100;
	    	new_pocket_4 = parseFloat(data['living_expenses'])*100;

	    	if(previous_pocket_1!=new_pocket_1
	    		|| previous_pocket_2!=new_pocket_2 
	    		|| previous_pocket_3!=new_pocket_3
	    		|| previous_pocket_4!=new_pocket_4){

	    		$('#spin-pocket-1').removeClass("d-none");
		    	$('#pocket-1').fadeTo( "fast", 0.50 );
		    	$('#pocket-1').text( parseFloat(data['emergency_savings'])*100+'%');
		    	$('#pocket-1').fadeTo( "slow", 1.0 );

		    	$('#spin-pocket-2').removeClass("d-none");
		    	$('#pocket-2').fadeTo( "fast", 0.50 );
		    	$('#pocket-2').text( parseFloat(data['savings_and_investments'])*100+'%');
		    	$('#pocket-2').fadeTo( "slow", 1.0 );

		    	$('#spin-pocket-3').removeClass("d-none");
		    	$('#pocket-3').fadeTo( "fast", 0.50 );
		    	$('#pocket-3').text( parseFloat(data['splurge_money'])*100+'%');
		    	$('#pocket-3').fadeTo( "slow", 1.0 );

		    	$('#spin-pocket-4').removeClass("d-none");
		    	$('#pocket-4').fadeTo( "fast", 0.50 );
		    	$('#pocket-4').text( parseFloat(data['living_expenses'])*100+'%');
		    	$('#pocket-4').fadeTo( "slow", 1.0 );
		    }

	      // Assuming your backend sends updates in a specific format
	    	// if (data.updates) {
	    	// 	$('#status').text('New update found: ' + data.updates);
	    	// } else {
	    	// 	$('#status').text('No new updates.');
	    	// }
	},
	error: function(err) {
		console.error('Error fetching updates:', err);
	},
	complete: function(err){
		setTimeout(
			function() 
			{
			    //do something special
				$('#spin-pocket-1').addClass("d-none");
				$('#spin-pocket-2').addClass("d-none");
				$('#spin-pocket-3').addClass("d-none");
				$('#spin-pocket-4').addClass("d-none");
			}, 1500);

	}
});

	

	// AJAX Call to the Database to Get Current Amounts
	$.ajax({
    url: LOCALHOST+'/rest_api/get-pocket-amounts.php',  // Your backend endpoint
    method: 'GET',
    success: function(data) {
    	// console.log(data);

    	previous_amount_1 = parseFloat($('#amount-1').text());
    	previous_amount_2 = parseFloat($('#amount-2').text());
    	previous_amount_3 = parseFloat($('#amount-3').text());
    	previous_amount_4 = parseFloat($('#amount-4').text());

    	new_amount_1 = parseFloat(data['emergency_savings_amount']);
    	new_amount_2 = parseFloat(data['savings_and_investments_amount']);
    	new_amount_3 = parseFloat(data['splurge_money_amount']);
    	new_amount_4 = parseFloat(data['living_expenses_amount']);

    	if(previous_amount_1!=new_amount_1
    		|| previous_amount_2!=new_amount_2 
    		|| previous_amount_3!=new_amount_3
    		|| previous_amount_4!=new_amount_4){

    		// console.log(previous_amount_1, previous_amount_2, previous_amount_3, previous_amount_4);
    		// console.log(new_amount_1, new_amount_2, new_amount_3, new_amount_4);

	    	$('#amount-1').fadeTo( "fast", 0.50 );
	    	$('#amount-1').text( parseFloat(data['emergency_savings_amount']));
	    	$('#amount-1').fadeTo( "slow", 1.0 );

	    	$('#amount-2').fadeTo( "fast", 0.50 );
	    	$('#amount-2').text( parseFloat(data['savings_and_investments_amount']));
	    	$('#amount-2').fadeTo( "slow", 1.0 );

	    	$('#amount-3').fadeTo( "fast", 0.50 );
	    	$('#amount-3').text( parseFloat(data['splurge_money_amount']));
	    	$('#amount-3').fadeTo( "slow", 1.0 );

	    	$('#amount-4').fadeTo( "fast", 0.50 );
	    	$('#amount-4').text( parseFloat(data['living_expenses_amount']));
	    	$('#amount-4').fadeTo( "slow", 1.0 );
	    }

      // // Assuming your backend sends updates in a specific format
    // 	if (data.updates) {
    // 		$('#status').text('New update found: ' + data.updates);
    // 	} else {
    // 		$('#status').text('No new updates.');
    // 	}
    },
    error: function(err) {
    	console.error('Error fetching updates:', err);
    }
});


	// let currentValue = parseInt($('#pocket-4').text());

    //   // Increment the value by 1
	// let newValue = currentValue + 1;

    //   // Update the element with the new value using jQuery
	// $('#pocket-4').text(newValue +"%");

	// Temporary change - Remove this when actual info received from database

	// Remote Voice Listener
	// AJAX Call to the Database to Get Current Allocations
	$.ajax({
	    url: 'https://nichenoms.com/get-allocations.php',  // Your backend endpoint
	    method: 'GET',
	    success: function(data) {
	    	// console.log(data);

	    	rem_new_pocket_1 = parseFloat(data['emergency_savings'])*100;
	    	rem_new_pocket_2 = parseFloat(data['savings_and_investments'])*100;
	    	rem_new_pocket_3 = parseFloat(data['splurge_money'])*100;
	    	rem_new_pocket_4 = parseFloat(data['living_expenses'])*100;

	    	if(rem_previous_pocket_1!=rem_new_pocket_1
	    		|| rem_previous_pocket_2!=rem_new_pocket_2 
	    		|| rem_previous_pocket_3!=rem_new_pocket_3
	    		|| rem_previous_pocket_4!=rem_new_pocket_4){


	    		rem_previous_pocket_1 = rem_new_pocket_1;
		    	rem_previous_pocket_2 = rem_new_pocket_2;
		    	rem_previous_pocket_3 = rem_new_pocket_3;
		    	rem_previous_pocket_4 = rem_new_pocket_4;

	    		// rem_new_pocket_1 = rem_new_pocket_1 / 100;
		    	// rem_new_pocket_2 = rem_new_pocket_2 / 100;
		    	// rem_new_pocket_3 = rem_new_pocket_3 / 100;
		    	// rem_new_pocket_4 = rem_new_pocket_4 / 100;

		    	// Submit new remote allocations in the local database
				$.post( LOCALHOST+'/rest_api/submit-allocations.php', {
					living_expenses: rem_new_pocket_4,
					emergency_savings: rem_new_pocket_1,
					savings_and_investments: rem_new_pocket_2,
					splurge_money: rem_new_pocket_3
				}).done(function( data ) {
				    $('#spin-pocket-1').removeClass("d-none");
			    	$('#pocket-1').fadeTo( "fast", 0.50 );
			    	$('#pocket-1').text( parseFloat(data['emergency_savings'])+'%');
			    	$('#pocket-1').fadeTo( "slow", 1.0 );

			    	$('#spin-pocket-2').removeClass("d-none");
			    	$('#pocket-2').fadeTo( "fast", 0.50 );
			    	$('#pocket-2').text( parseFloat(data['savings_and_investments'])+'%');
			    	$('#pocket-2').fadeTo( "slow", 1.0 );

			    	$('#spin-pocket-3').removeClass("d-none");
			    	$('#pocket-3').fadeTo( "fast", 0.50 );
			    	$('#pocket-3').text( parseFloat(data['splurge_money'])+'%');
			    	$('#pocket-3').fadeTo( "slow", 1.0 );

			    	$('#spin-pocket-4').removeClass("d-none");
			    	$('#pocket-4').fadeTo( "fast", 0.50 );
			    	$('#pocket-4').text( parseFloat(data['living_expenses'])+'%');
			    	$('#pocket-4').fadeTo( "slow", 1.0 );
				});

		    }

	      // Assuming your backend sends updates in a specific format
	    	// if (data.updates) {
	    	// 	$('#status').text('New update found: ' + data.updates);
	    	// } else {
	    	// 	$('#status').text('No new updates.');
	    	// }
		},
		error: function(err) {
			console.error('Error fetching updates:', err);
		},
		complete: function(err){
			setTimeout(
				function() 
				{
				    //do something special
					$('#spin-pocket-1').addClass("d-none");
					$('#spin-pocket-2').addClass("d-none");
					$('#spin-pocket-3').addClass("d-none");
					$('#spin-pocket-4').addClass("d-none");
				}, 1500);

		}
	});


}

// Call the checkForUpdates function every 10 seconds
setInterval(checkForUpdates, 5000); // 10000 ms = 10 seconds


// var contents = "Jake fiuwfuwb hwfb w i ";

// function typeContents(contents, iteration) {
//     // Prevent our code executing if there are no letters left
//     if (iteration === contents.length)
//         return;

//     setTimeout(function() {
//         // Set the name to the current text + the next character
//         // whilst incrementing the iteration variable
//         $('.name').text( $('.name').text() + contents[iteration++] );

//         // Re-trigger our function
//         typeContents(contents, iteration);
//     }, 50);
// }

// // Call the function to begin the typing process
// typeContents(contents, 0);

// var contents = "Jake fiuwfuwb hwfb w i ";

// function typeContents(contents, iteration) {
//     // Prevent our code executing if there are no letters left
//     if (iteration === contents.length)
//         return;

//     setTimeout(function() {
//         // Set the name to the current text + the next character
//         // whilst incrementing the iteration variable
//         $('.name').text( $('.name').text() + contents[iteration++] );

//         // Re-trigger our function
//         typeContents(contents, iteration);
//     }, 50);
// }

// // Call the function to begin the typing process
// typeContents(contents, 0);

// function typeMessage(){
// 	var contents = $(this).text();

// 	$(this).text('');

// 	typeContents(contents, 0);
// }