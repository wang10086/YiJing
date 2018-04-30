// Initialize your app
var myApp = new Framework7({
	tapHold:true,
	scroll:true,
	cancelable:true
});

// Export selectors engine
var $$ = Dom7;

$$(".comment").css({'display': 'block','height': 'auto'});

$$(".chose").click(function(){
    $$(".modal-overlay").addClass('modal-overlay-visible');
});

$$(".delete").click(function(){
    $$(".modal-overlay").removeClass('modal-overlay-visible');
});




	
