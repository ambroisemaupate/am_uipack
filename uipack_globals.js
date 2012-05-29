/**
 * Enable use of jQuery with other javascript libraries
 */
//jQuery.noConflict();

/* -------------------------------------------------
CONSOLE ISSUE - define if console exists
--------------------------------------------------*/

if (!!console === true) {
	function uipack_log( message )
	{
		console.log( message );
	}
}
else
{
	function uipack_log( message )
	{
		;
	}
};

function traceObject()
{
	uipack_log("--------------------");
	for (p in this)
	{
		uipack_log(p);
	}
}

function removeWhiteSpace()
{
   	var ul = document.getElementsByTagName('ul')[0];
	ul.innerHTML = ul.innerHTML.replace(/<\/li>\s+</gi, '</li><');
}