
/**
 * showWindow
 * Display the window object in the browser
 * --> TODO the window initial position needs to be more accurate
 */
function showWindow()
{
	jQuery("#"+this.uiPackID).css("display", "block");
	jQuery("#"+this.uiPackID).css("position", "absolute");
	jQuery("#"+this.uiPackID).css("z-index", "5555");
	jQuery("#"+this.uiPackID).css("background-color","rgb(255,255,255)");
	jQuery("#"+this.uiPackID).css("opacity","0.0");
	
	jQuery("#"+this.uiPackID).css("top", screen.height/2 - (jQuery("#"+this.uiPackID).innerHeight()/2.0) - 200);
	jQuery("#"+this.uiPackID).css("left", jQuery(document).width/2 - (jQuery("#"+this.uiPackID).innerWidth()/2.0));
	
	jQuery("#"+this.uiPackID).animate(
		{
			opacity: '1.0'
		},
		500 , 
		function() {

	});
}

/**
 * showModal
 * Display the modal window object in the browser
 * --> TODO the window initial position needs to be more accurate
 */
function showModal()
{
	jQuery("<div class='noClickLand'>&nbsp;</div>").insertBefore(jQuery("#"+this.uiPackID));
	
	var xpos = jQuery(document).width/2 - (jQuery("#"+this.uiPackID).innerWidth()/2.0);
	var ypos = screen.height/2 - (jQuery("#"+this.uiPackID).innerHeight()/2.0) - 100;
	
	// uipack_log("Position X :"+xpos+" ; Y : "+ypos);
	
	jQuery("#"+this.uiPackID).css("display", "block");
	jQuery("#"+this.uiPackID).css("position", "fixed");
	jQuery("#"+this.uiPackID).css("top", ypos+"px");
	jQuery("#"+this.uiPackID).css("left", xpos+"px");
	jQuery("#"+this.uiPackID).css("z-index", "9999");
	jQuery("#"+this.uiPackID).css("background-color","rgb(255,255,255)");
	jQuery("#"+this.uiPackID).css("opacity","0.0");
	
	jQuery(".noClickLand").css("width","100%");
	jQuery(".noClickLand").css("height","100%");
	jQuery(".noClickLand").css("display","block");
	jQuery(".noClickLand").css("position","fixed");
	jQuery(".noClickLand").css("top","0px");
	jQuery(".noClickLand").css("left","0px");
	jQuery(".noClickLand").css("background-color","rgb(0,0,0)");
	jQuery(".noClickLand").css("opacity","0.0");
	jQuery(".noClickLand").css("z-index","9998");
	
	jQuery(".noClickLand").animate(
		{
			opacity: '0.8'
		},
		250 , 
		function() {
			
	});
	jQuery("#"+this.uiPackID).animate(
		{
			opacity: '1.0'
		},
		500 , 
		function() {

	});
	
}

/**
 * hideWindow
 * Hide normal and modal windows from the browser, this doesn't remove them from HTML.
 */
function hideWindow()
{
	// uipack_log("Hiding window --- "+this.uiPackID);
	

	jQuery(".noClickLand").animate(
		{
			opacity: '0.0'
		},
		250 , 
		function() {
			
			jQuery(".noClickLand").remove();
	});
			
	
	jQuery("#"+this.uiPackID).css("display","none");
	
}

/**
 * UIPack_Window 
 * Transform a simple DIV to a draggable / resizable window
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 * 
 */
function UIPack_Window( uiPackID )
{
	var o = this;
	
	o.uiPackID = uiPackID;
	
	var nHtml = jQuery("#"+o.uiPackID).html();
	nHtml = "<div class='handle'>"+o.uiPackID+"</div><p><a class='closeWindow' href='javascript:void(0)' title='Fermer'>Fermer</a></p>" + nHtml;
	
	jQuery("#"+o.uiPackID).html(nHtml);
	
	o.hide();
	
	jQuery("#"+o.uiPackID+" > p > .closeWindow").click( function(){
		o.hide();
	});
	
	jQuery("#"+o.uiPackID).draggable({ handle: "#"+o.uiPackID+" .handle" });
	jQuery("#"+o.uiPackID).resizable();
}
UIPack_Window.prototype.uiPackID = "";
UIPack_Window.prototype.windowWidth = 0;
UIPack_Window.prototype.dragging = false;
UIPack_Window.prototype.windowHeight = 0;
UIPack_Window.prototype.show = showWindow;
UIPack_Window.prototype.hide = hideWindow;

/**
 * UIPack_Modal 
 * Transform a simple DIV to a modal window which take all the browser focus (needs to be closed to continue)
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 * 
 */
function UIPack_Modal( uiPackID )
{
	var o = this;
	
	o.uiPackID = uiPackID;
	
	var nHtml = jQuery("#"+o.uiPackID).html();
	nHtml = "<p><a class='closeWindow' href='javascript:void(0)' title='Fermer'>Fermer</a></p>" + nHtml;
	
	jQuery("#"+o.uiPackID).html(nHtml);
	
	jQuery("#"+o.uiPackID+" > p > .closeWindow").click( function(){
		o.hide();
	});
	
	jQuery("#"+o.uiPackID).css("display","none");
}
UIPack_Modal.prototype.uiPackID = "";
UIPack_Modal.prototype.windowWidth = 0;
UIPack_Modal.prototype.windowHeight = 0;
UIPack_Modal.prototype.show = showModal;
UIPack_Modal.prototype.hide = hideWindow;
