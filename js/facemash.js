 window.onload = function(){
//    	  FB.getLoginStatus(function(response) {
//        	  if (response.session) {
//        		  social_query.access_token = response.session.access_token;
//        		  prompt('isi', social_query.access_token);
//        	  } else {
//        		  str_url = "http://www.facebook.com/dialog/oauth/?"+
//        	    	  "scope=email,user_birthday,user_relationships,friends_birthday,friends_relationships&"+
//        	    	  "client_id=151952178208953&"+
//        	    	  "redirect_uri=http://dl.dropbox.com/u/16001200/backup/facemash.html?point=0&"+
//        	    	  "response_type=token";
//        		  location.replace(str_url);
//        	  }
//        	});

	    FB.init({appId: '151952178208953', status: true, cookie: true,
	        xfbml: true});

	 FB.login(function(response) {
		  if (response.session) {
		    if (response.perms) {
		      // user is logged in and granted some permissions.
		      // perms is a comma separated list of granted permissions
		    	 FB.api('/me', function(response) {
		    		  alert(response.name);
		    		});
		    } else {
		      // user is logged in, but did not grant any permissions
		    	alert('login');
		    }
		  } else {
		    // user is not logged in
   		  alert('no login');
		  }
		}, {perms:'email,user_birthday,user_relationships,friends_birthday,friends_relationships'});





//
//
//
//
//    	// First, get ten of the logged-in user's friends and the events they
//    	  // are attending. In this query, the argument is just an int value
//    	  // (the logged-in user id). Note, we are not firing the query yet.
//    	  var query = FB.Data.query(
//    	        "select uid, eid from event_member "
//    	      + "where uid in "
//    	      + "(select uid2 from friend where uid1 = {0}"
//    	      + " order by rand() limit 10)",
//    	      user_id);
//
//    	  // Now, construct two dependent queries - one each to get the
//    	  // names of the friends and the events referenced
//    	  var friends = FB.Data.query(
//    	        "select uid, name from user where uid in "
//    	      + "(select uid from {0})", query);
//    	  var events = FB.Data.query(
//    	        "select eid, name from event where eid in "
//    	      + " (select eid from {0})", query);
//
//    	  // Now, register a callback which will execute once all three
//    	  // queries return with data
//    	  FB.Data.waitOn([query, friends, events], function() {
//    	    // build a map of eid, uid to name
//    	    var eventNames = friendNames = {};
//    	    FB.Array.forEach(events.value, function(row) {
//    	      eventNames[row.eid] = row.name;
//    	    });
//    	    FB.Array.forEach(friends.value, function(row) {
//    	      friendNames[row.uid] = row.name;
//    	    });
//
//    	    // now display all the results
//    	    var html = '';
//    	    FB.Array.forEach(query.value, function(row) {
//    	      html += '<p>'
//    	        + friendNames[row.uid]
//    	        + ' is attending '
//    	        + eventNames[row.eid]
//    	        + '</p>';
//    	    });
//    	    document.getElementById('display').innerHTML = html;
      }

 var social_query = {
	access_token : "",
	select_interested: "",
 }