(function ($) {
  $(document).ready(function(){

  	function homepageTwitterFeed(){
	  	//Homepage single tweet feed
	  	var configProfile = {
  		  "profile": {"screenName": 'mdbrcSA'},
  		  "domId": 'single-tweet-feed',
  		  "maxTweets": 1,
  		  "enableLinks": true,
  		  "showUser": true,
  		  "showTime": true,
  		  "showImages": true,
  		  "lang": 'en'
		  };
		  twitterFetcher.fetch(configProfile);
	  }
	//Add button back to twitter
  	function addButton(){
  		$(window).load(function(){
  			var $href = $("#single-tweet-feed").find(".user a").attr("href");
  			$('#single-tweet-feed ul').append('<a href="'+$href+'" class="twitter-link button">View more on twitter</a>');
  			$('#single-tweet-feed').find("a").attr("target","_blank");
  		});
  	}
  	homepageTwitterFeed();
  	addButton();

  });
}(jQuery));
