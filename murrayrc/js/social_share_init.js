/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
// (function ($, Drupal, window, document, undefined) {

(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {

  //facebook share url
  var currentPage = window.location.href;
  $('.fb-share-button').attr("data-href", currentPage);





   }}    
})(jQuery, Drupal, this, this.document);

jQuery( document ).ready(function() {
  jQuery('div.linked-in-share').replaceWith('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script><script type="IN/Share"></script>');



    var $window = jQuery(window);
    var $stickyShare = jQuery('#block-block-10');
    if($stickyShare.length > 0){
      var shareTop = ($stickyShare.offset().top) - 60;
    }    
    $window.scroll(function() {
      if(jQuery(window).scrollTop() > shareTop){
        var xpos = jQuery(window).width() - (jQuery('#content').offset().left + jQuery('#content').width());
        $stickyShare.addClass('sticky');
        $stickyShare.css({"right": xpos});   
      }else{
          $stickyShare.removeClass('sticky');    
          $stickyShare.css("right", "");

      
      }
    });


});
