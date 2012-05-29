function getCarrousselTotalWidth()
{
	var o = this;
	var totalWidth = 99999;
	
	// for (var i = 0; i < jQuery("#"+o.carrousselID+" > .mask > ul").children().length; i++)
	// 	{
	// 		var currentTab = jQuery("#"+o.carrousselID+" > .mask > ul > li").get(i);
	// 		
	// 		totalWidth += jQuery(currentTab).width();
	// 	}
	// uipack_log("Longueur totale : "+totalWidth);
	jQuery("#"+o.carrousselID+" > .mask > ul.tabs").css("width", totalWidth+"px");
}
function createNavigation()
{
	var o = this;
	/* -------------------------------------------------
	 Crée la navigation (points pour le carroussel simple)
	--------------------------------------------------*/
	/* Crée la liste de navigation a partir des titres de chaque Slide */
	jQuery("#"+o.carrousselID+" ul").addClass("tabs");
	
	jQuery("<ul class='navigation'></ul>").insertBefore(jQuery("#"+o.carrousselID+" .mask"));
	
	// uipack_log( "Slides count : "+o.length );
	
	var html = "";
	
	for (var i = 0; i < o.length; i++)
	{
		var li = jQuery("#"+o.carrousselID+" > .mask > .tabs > li").get(i);
		jQuery(li).attr("id",o.carrousselID+"_"+i);
		
		var liTitle = jQuery(jQuery("#"+o.carrousselID+" .title").get(i)).html();
		
		// uipack_log(liTitle);
		
		if (i === 0)
		{
			if (jQuery(li).hasClass("current") == false) {
				jQuery(li).addClass("current");
			};
			html += "<li><a class='current' href='javascript:void(0)' title='"+liTitle+"'>"+liTitle+"</a></li>";
		}
		else
		{
			html += "<li><a href='javascript:void(0)' title='"+liTitle+"'>"+liTitle+"</a></li>";
		}
	}
	
	jQuery("#"+o.carrousselID+" > .navigation").html(html);
	jQuery("#"+o.carrousselID+" .title").remove();
	
	/* Ajoute les evenement click sur la navigation */
	// uipack_log("Events --");
	
	for (var j = 0; j < o.length; j++)
	{
		var link = jQuery("#"+o.carrousselID+" > .navigation li a").get(j);
		
		var idTo = o.carrousselID+"_"+j;
		
		jQuery(link).click( function(event) {
			
			for (var k = 0; k < o.length; k++)
			{
				var id;
				
				if (jQuery("#"+o.carrousselID+" > .navigation li a").get(k) === this)
				{
					id = k;
					o.slideTo(o.carrousselID+"_"+id);
					jQuery("#"+o.carrousselID+" > .navigation li a").blur();
				}
				
			}
		});
	}
	
	o.actualizeNavigation();
	
	/* -------------------------------------------------
	Maximise les images/video pour les adapter à la taille du carroussel
	--------------------------------------------------*/
	jQuery("#"+o.carrousselID+ " > .mask > .tabs > li > img, #"+o.carrousselID+ " > .mask > .tabs > li > video").css("max-height", jQuery("#"+o.carrousselID+ " > .mask").height());
	jQuery("#"+o.carrousselID+ " > .mask > .tabs > li > img, #"+o.carrousselID+ " > .mask > .tabs > li > video").css("max-width", jQuery("#"+o.carrousselID+ " > .mask").width());
}
function actualizeNavigation()
{
	var o = this;
	
	var currentElement = jQuery("#"+o.carrousselID+" > .mask > .tabs > .current").get(0);
	
	// Hide the next button of we are at the last element
	if (jQuery(currentElement).next().length <= 0) 
	{
		jQuery("#"+o.carrousselID+" > p > .next").addClass("off");
		jQuery("#"+o.carrousselID+ " > p > .next").unbind();
	}
	else
	{
		jQuery("#"+o.carrousselID+"> p > .next").removeClass("off");
		jQuery("#"+o.carrousselID+ " > p > .next").click( function(){
			o.slideNext();
			jQuery("#"+o.carrousselID+ " > p > .next").blur();
		});
	}
	
	// Hide the previous button of we are at the first element
	if (jQuery(currentElement).prev().length <= 0) {

		jQuery("#"+o.carrousselID+" > p > .previous").addClass("off");
		jQuery("#"+o.carrousselID+ " > p > .previous").unbind();
	}
	else
	{	
		jQuery("#"+o.carrousselID+" > p > .previous").removeClass("off");
		jQuery("#"+o.carrousselID+ " > p > .previous").click( function(){
			o.slidePrevious();
			jQuery("#"+o.carrousselID+ " > p > .previous").blur();
		});
	}

	
	/* -------------------------------------------------
	Retrouve l'indice courant pour mettre à jour la navigation
	--------------------------------------------------*/
	for (var k = 0; k < o.length; k++)
	{
		var id;					
		/* -------------------------------------------------
		Actualise la navigation
		--------------------------------------------------*/
		if (jQuery("#"+o.carrousselID+" > .mask > ul > li").get(k) === jQuery("#"+o.carrousselID+" > .mask > ul > .current").get(0))
		{
			jQuery("#"+o.carrousselID+" > .navigation .current").removeClass("current");

			jQuery(jQuery("#"+o.carrousselID+" > .navigation li a").get(k)).addClass("current");
		}

	}
}

function slideTo( destination )
{
	var o = this;
	
	if (o.canAnimate === true)
	{
		// uipack_log("CALL - "+o.carrousselID+".slideTo ----"+destination+"--------");
		o.canAnimate = false;
		var destinationElement = jQuery("#"+destination).get(0);
		if (destinationElement != null) {
			var newX = jQuery("#"+o.carrousselID+" > .mask > ul.tabs").offset().left - jQuery(destinationElement).offset().left;

			// uipack_log("UL Offset-left : "+jQuery("#"+o.carrousselID+" ul").offset().left+"\nDestination Offset-left : "+jQuery(destinationElement).offset().left+"\nSlide to : "+newX+"px");

			jQuery("#"+o.carrousselID+" > .mask > .tabs").animate(
				{
					left: newX+'px'
				},
				{
					duration:700 ,
					easing:"easeOutCubic", 
					complete : function() {
						jQuery("#"+o.carrousselID+" > .mask > .tabs > .current").removeClass("current");
						jQuery("#"+destination).addClass("current");
                    	
						o.actualizeNavigation();
                    	
						o.canAnimate = true;
					}
				});
		}
		else{
			// alert("ERROR - #"+destination+" is null.");
		}
		
	};
}
function slideNext()
{	
	var o = this;
	var currentElement = jQuery("#"+o.carrousselID+" > .mask > .tabs > .current").get(0);
	o.slideTo(jQuery(currentElement).next("li").attr("id"));

}
function slidePrevious()
{
	var o = this;
	var currentElement = jQuery("#"+o.carrousselID+" > .mask > .tabs > .current").get(0);
	o.slideTo(jQuery(currentElement).prev("li").attr("id"));
}

/**
 * get nearest slide with direction : 1 forward, -1 backward
 */
function getNearestSlide( direction ) {
	var o = this;
	
	var carrouselXPos = jQuery("#"+o.carrousselID+" > .mask > ul").offset().left;
	
	carrouselXPos -= jQuery("#"+o.carrousselID).offset().left;
	
	var firstSlideVisible = jQuery("#"+o.carrousselID+" > .mask > .tabs > li").filter(function(){
		
		var relCurrentX = (jQuery(this).offset().left - jQuery("#"+o.carrousselID).offset().left);
		
		
		// Running forward in slides
		if(direction == 1 && relCurrentX > 0 && relCurrentX < jQuery(this).width()/4){
			return true;
		}
		else if(direction == 1 && relCurrentX > -(jQuery(this).width()/4) && relCurrentX < jQuery(this).width()){
			return true;
		}
		// Running backward while in first slide
		else if(direction == -1 && carrouselXPos > -jQuery(this).width()){
			return true;
		}
		// Running backward
		else if(direction == -1 && 
			jQuery(this).prev("li").get(0) != undefined && 
			(jQuery(this).prev("li").offset().left - jQuery("#"+o.carrousselID).offset().left) > -(jQuery(this).prev("li").width())*1.8)
		{
			return true;
		}
		else {
			return false;
		}
	}).get(0);
	
	console.log("Nearest slide : "+jQuery(firstSlideVisible).attr("id"));
	
	return firstSlideVisible;
	
}
function slideToNearestSlide( direction ) {
	var o = this;
	var nearest = o.getNearestSlide( direction );
	
	if(nearest != null){
		o.slideTo(jQuery(nearest).attr("id"));
	}
	
}

/**
 * UIPack Carroussel
 * A carroussel is simple carroussel with left and right links to switch between views
 * To create a carroussel you have to follow a strict HTML hierarchy :
 * 
 * DIV .uipack_carroussel #elementID ------------------------------------
 * 		DIV .mask -------------------------------------------------------
 * 			UL ----------------------------------------------------------
 * 				LI ------------------------------------------------------
 *					P .title --------------------------------------------
 * 					P (other contents) ----------------------------------
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 */
UIPack_Carroussel.prototype.carrousselID = 0;
UIPack_Carroussel.prototype.canAnimate = true;
UIPack_Carroussel.prototype.slideNext = slideNext;
UIPack_Carroussel.prototype.slidePrevious = slidePrevious;
UIPack_Carroussel.prototype.slideTo = slideTo;
UIPack_Carroussel.prototype.trace = traceObject;
UIPack_Carroussel.prototype.actualizeNavigation = actualizeNavigation;
UIPack_Carroussel.prototype.createNavigation = createNavigation;
UIPack_Carroussel.prototype.getCarrousselTotalWidth = getCarrousselTotalWidth;
UIPack_Carroussel.prototype.getNearestSlide = getNearestSlide;
UIPack_Carroussel.prototype.slideToNearestSlide = slideToNearestSlide;
UIPack_Carroussel.prototype.length = 0;

UIPack_Carroussel.prototype.startTouchX = 0;
UIPack_Carroussel.prototype.startTouchY = 0;
UIPack_Carroussel.prototype.startTouchCarrouselX = 0;
UIPack_Carroussel.prototype.startTouchCarrouselY = 0;

function UIPack_Carroussel( elementID )
{
	var o = this;
	o.carrousselID = elementID;
	
	// uipack_log( "----------------" );
	// 	uipack_log( o.carrousselID );
	o.canAnimate = true;
	o.length = jQuery("#"+o.carrousselID+" > .mask > ul").children().length;
	// uipack_log( "Slides count : "+o.length );
	
	if (o.length > 1)
	{
		if (jQuery("#"+o.carrousselID+ " > p > .previous").length == 0) {
			jQuery("<p><a href=\"javascript:void(0)\" class='previous' title='Previous'>Previous</a></p>").insertBefore(jQuery("#"+o.carrousselID+" .mask"));	
		};
		if (jQuery("#"+o.carrousselID+ " > p > .next")) {
			jQuery("<p><a href=\"javascript:void(0)\" class='next' title='Next'>Next</a></p>").insertAfter(jQuery("#"+o.carrousselID+" .mask"));
		};
	}
	
	/*
	 * Init events
	 */
	jQuery("#"+o.carrousselID+" .title").css("display", "none");
	
	jQuery("#"+o.carrousselID+ " > p > .previous").click( function(){
		o.slidePrevious();
		jQuery("#"+o.carrousselID+ " > p > .previous").blur();
	});
	jQuery("#"+o.carrousselID+ " > p > .next").click( function(){
		o.slideNext();
		jQuery("#"+o.carrousselID+ " > p > .next").blur();
	});
	
	/*
	 * Enable multitouch scrolling
	 */
	jQuery("#"+o.carrousselID+" > .mask > ul").bind("touchstart", function(event){
		event.preventDefault();
		var o_event = event.originalEvent;
		
		if(o_event.targetTouches.length == 1){
			
			$(event.currentTarget).stop(false);
			o.canAnimate = true;
			
			o.startTouchCarrouselX = parseInt($(event.currentTarget).offset().left);
/* 			o.startTouchCarrouselY = parseInt($(event.currentTarget).offset().top); */
			
			
			o.startTouchX = o_event.targetTouches[0].clientX + jQuery("#"+o.carrousselID).offset().left;
/* 			o.startTouchY = o_event.targetTouches[0].clientY - o.startTouchCarrouselY; */
		}
		
	});
	jQuery("#"+o.carrousselID+" > .mask > ul").bind("touchmove", function(event){
		event.preventDefault();
		var o_event = event.originalEvent;
		
		if(o_event.targetTouches.length == 1){
						
			var realX = o.startTouchX - o_event.targetTouches[0].clientX;
/* 			var realY = o.startTouchY -o_event.targetTouches[0].clientX; */
			
			$(event.currentTarget).css("left", (o.startTouchCarrouselX - realX) +"px");
/* 			$(event.currentTarget).css("top",realY+"px"); */
		}
		
	});
	jQuery("#"+o.carrousselID+" > .mask > ul").bind("touchend", function(event){
		event.preventDefault();
		var o_event = event.originalEvent;
		
		if(o.startTouchCarrouselX > $(event.currentTarget).offset().left){
			o.slideToNearestSlide(1);
		}
		else {
			o.slideToNearestSlide(-1);
		}
		
		
	});

		
	o.createNavigation();
	o.getCarrousselTotalWidth();
}

/**
 * UIPack Tabbed Carroussel
 * A tabbed carroussel is simple carroussel with tab links to switch between views
 * To create a tabbed carroussel you have to follow a strict HTML hierarchy :
 * 
 * DIV .uipack_tabbed_carroussel #elementID -----------------------------
 * 		DIV .mask -------------------------------------------------------
 * 			UL ----------------------------------------------------------
 * 				LI ------------------------------------------------------
 *					P .title --------------------------------------------
 * 					P (other contents) ----------------------------------
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 */
UIPack_Tabbed_Carroussel.prototype.carrousselID = 0;
UIPack_Tabbed_Carroussel.prototype.canAnimate = true;
UIPack_Tabbed_Carroussel.prototype.trace = traceObject;
UIPack_Tabbed_Carroussel.prototype.slideTo = slideTo;
UIPack_Tabbed_Carroussel.prototype.actualizeNavigation = actualizeNavigation;
UIPack_Tabbed_Carroussel.prototype.createNavigation = createNavigation;
UIPack_Tabbed_Carroussel.prototype.getCarrousselTotalWidth = getCarrousselTotalWidth;
UIPack_Tabbed_Carroussel.prototype.length = 0;

function UIPack_Tabbed_Carroussel( elementID )
{
	var o = this;
	o.carrousselID = elementID;
	
	// uipack_log( "----------------" );
	// 	uipack_log( o.carrousselID );
	o.canAnimate = true;
	
	o.length = jQuery("#"+o.carrousselID+" > .mask > ul").children().length;
	
	o.createNavigation();
	o.getCarrousselTotalWidth();
}
