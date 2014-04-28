
/**
 * @Author BRIAN GONZALEZ <me@briangonzalez.org>
 * @Link   http://briangonzalez.org/posts/synchronous-ajax-request-in-vanilla-javascript
 *
 * @param String url Resource to request.
 *
 * @return String Request response text.
 */
ajax = function (url) {

	var xmlHttp = null;
	xmlHttp     = new XMLHttpRequest();

	xmlHttp.open( "GET", url, false );
	xmlHttp.send( null );

	return xmlHttp.responseText;

}
