/**
 * setupUIPackForms
 * UIPack forms element don't have to be created explicitely, this function search special typed inputs to convert them into UIPack objects
 * Major parts of the form elements use jQuery UI - Be sure to link to this library
 * 
 */
function setupUIPackForms()
{
	/* -------------------------------------------------
	Transform SLIDERS
	--------------------------------------------------*/
	var sliders = jQuery("input[type='slider']").get();
	
	for (var i=0 ; i < sliders.length; i++)
	{
		new UIPack_Slider( jQuery(sliders[i]).attr("id") ); 
	}
	
	/* -------------------------------------------------
	Transform SLIDERS
	--------------------------------------------------*/
	var ranges = jQuery("input[type='range']").get();
	
	for (var i=0 ; i < ranges.length; i++)
	{
		new UIPack_Range( jQuery(ranges[i]).attr("id") ); 
	}
	
	/* -------------------------------------------------
	Transform PROGRESS
	--------------------------------------------------*/
	var progresses = jQuery(".uipack_progress").get();
	
	for (var i=0 ; i < progresses.length; i++)
	{
		new UIPack_Progress( jQuery(progresses[i]).attr("id") ); 
	}
}

/**
 * UIPack Slider
 *
 * Create a single value slider, its value can be taken from the input field corresponding to its ID
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 * 
 */
UIPack_Slider.prototype.uipackID = "";
UIPack_Slider.prototype.value = 0;
UIPack_Slider.prototype.min = 0;
UIPack_Slider.prototype.max = 0;

function UIPack_Slider( uipackID )
{
	var o = this;
	
	o.uipackID = uipackID;
	o.value = jQuery("#"+o.uipackID).attr("value");
	o.min = jQuery("#"+o.uipackID).attr("min");
	o.max = jQuery("#"+o.uipackID).attr("max");
	
	jQuery("#"+o.uipackID).css('display', 'none');
	jQuery("#"+o.uipackID).after("<div id='"+o.uipackID+"_sub' class='uipack_slider'></div>");
	// jQuery("#"+o.uipackID+"_sub").slider();
	jQuery("#"+o.uipackID+"_sub").slider({
		min: o.min,
		max: o.max,
		value: o.value,
		// step: 50,
		slide: function(event, ui) {
			o.value =  ui.value;
			jQuery("#"+o.uipackID).attr("value",ui.value);
			jQuery("#"+o.uipackID+"_sub a").html(ui.value);
		}
	});
	
	jQuery("#"+o.uipackID+"_sub a").html(o.value);
}

/**
 * UIPack Range
 *
 * Create a range value slider, its value is a simple array ( [1;2] ) which can be taken in the corresponding input field
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 * 
 */
UIPack_Range.prototype.uipackID = "";
UIPack_Range.prototype.value = 0;
UIPack_Range.prototype.min = 0;
UIPack_Range.prototype.max = 0;

function UIPack_Range( uipackID )
{
	var o = this;
	
	o.uipackID = uipackID;
	o.value = jQuery("#"+o.uipackID).attr("value");
	o.min = jQuery("#"+o.uipackID).attr("min");
	o.max = jQuery("#"+o.uipackID).attr("max");
	
	jQuery("#"+o.uipackID).css('display', 'none');
	jQuery("#"+o.uipackID).after("<div id='"+o.uipackID+"_sub' class='uipack_range'></div>");
	
	jQuery("#"+o.uipackID+"_sub").slider({
		min: o.min,
		max: o.max,
		value: o.value,
		range: true,
		// step: 50,
		slide: function(event, ui) {
			o.value =  ui.values;
			jQuery("#"+o.uipackID).attr("value","["+ui.values[0]+";"+ui.values[1]+"]");
			
			jQuery(jQuery("#"+o.uipackID+"_sub a").get(0)).html(ui.values[0]);
			jQuery(jQuery("#"+o.uipackID+"_sub a").get(1)).html(ui.values[1]);
		}
	});
	
	jQuery(jQuery("#"+o.uipackID+"_sub a").get(0)).html(o.value[0]);
	jQuery(jQuery("#"+o.uipackID+"_sub a").get(1)).html(o.value[1]);
}


/**
 * UIPack Progress
 * 
 * Create a progress bar which can be updated using the jQuery UI command
 * jQuery("uipackID").progressbar("value", value);
 *
 * @author Ambroise Maupate - ambroise.maupate.com
 * 
 */
UIPack_Progress.prototype.uipackID = "";
UIPack_Progress.prototype.value = 0;
UIPack_Progress.prototype.min = 0;
UIPack_Progress.prototype.max = 0;

function UIPack_Progress( uipackID )
{
	var o = this;
	
	o.uipackID = uipackID;
	o.value = jQuery("#"+o.uipackID).attr("value");
	
	jQuery("#"+o.uipackID).progressbar({ value: o.value });
	
	jQuery("#"+o.uipackID).change(function() {
		// Act on the event
		o.value = jQuery("#"+o.uipackID).progressbar("value");
		
	});
	
}
