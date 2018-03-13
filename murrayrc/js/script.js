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


$(document).ready(function() {
  var $body = $('body');
  var $w = $(window);


  var $fpProjects = $('.view-id-projects.view-display-id-block');

  if($fpProjects.length > 0) {
    $fpProjects.find('.views-row').matchHeight();
  }

  /* ===== MEGAMENU ===== */
  //$('li.sf-depth-2', $sfMenu).matchHeight();

  // DROPDOWN BACKGROUND -JUHANI
  // remove the next mouseenter and mouseleave to remove dropdown bg
  // navigation overlay fixes
  var $sfMenu = $('#superfish-1');
  var $innerModal = $('.nav-modal-inner');
  var navHideInterval;

  $('li.sf-depth-1', $sfMenu).mouseenter(function() {
        clearInterval(navHideInterval);
    var $t = $(this);
    var $ddNav = $t.children('ul');
     if($ddNav.not(':visible')) {
    navShowInterval = setInterval(function() {

    // console.log('mouseenter');
      if($ddNav.length > 0) {
        $ddNav.css('display', 'block');

        // console.log($ddNav.height());
        // calculate height for the gray modal
        $innerModal.css('height', $ddNav.outerHeight() + 60); // 60 for bottom padding

        $body.addClass('nav-dropdown-open');
        clearInterval(navShowInterval);
      }
    }, 150);
     }
  }).mouseleave(function() {
    var $t = $(this);
    var $ddNav = $t.children('ul');
    clearInterval(navShowInterval);
    if($ddNav.is(':visible')) {
      // console.log('mouseleave');
      navHideInterval = setInterval(function() {
        $body.removeClass('nav-dropdown-open');
        clearInterval(navHideInterval);
        clearInterval(navShowInterval);
      }, 600);
    } else {
      $body.removeClass('nav-dropdown-open');
    }

  });

  //Make frontpage blocks equal height
  $(".front .pane-block-31 .col-one-half h2").matchHeight();


});


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {

    /*
      ____                  _____  U _____ u      _   _       _      __  __  U _____ u
     / __"| u      ___     |_ " _| \| ___"|/     | \ |"|  U  /"\  uU|' \/ '|u\| ___"|/
    <\___ \/      |_"_|      | |    |  _|"      <|  \| |>  \/ _ \/ \| |\/| |/ |  _|"
     u___) |       | |      /| |\   | |___      U| |\  |u  / ___ \  | |  | |  | |___
     |____/>>    U/| |\u   u |_|U   |_____|      |_| \_|  /_/   \_\ |_|  |_|  |_____|
      )(  (__).-,_|___|_,-._// \\_  <<   >>      ||   \\,-.\\    >><<,-,,-.   <<   >>
     (__)      \_)-' '-(_/(__) (__)(__) (__)     (_")  (_/(__)  (__)(./  \.) (__) (__)
    */
	//Hide the "Attorney-General's Department" blue bar when user scrolls the page
	$(window).scroll(function() {

	    if ($(this).scrollTop()>0)
	    {
        $('.front .site-name').fadeOut();
	    }
	    else
	    {
        $('.front .site-name').fadeIn();
	   }
 	});


    // var $window = $(window);
    // var $stickyShare = $('#block-block-10');
    //   var shareTop = ($stickyShare.offset().top) - 60;
    // $window.scroll(function() {
    //   if($(window).scrollTop() > shareTop){
    //     $stickyShare.addClass('sticky');
    //   }else{
    //       $stickyShare.removeClass('sticky');
    //   }
    // });

 	/*
    Accordions
  */
  //Hide content
 	var accordionContainers = $('.accordion-container').hide();

  //add elements and roles for accessibility
  jQuery3('.accordion-button').each(function(i, obj) {
    var accordContent = $(this).text();
    $(this).replaceWith('<button class="accordion-button">'+ accordContent + '</button>');
  });
  jQuery3('.accordion-button').attr({role: "button", "aria-expanded": "false", });
  jQuery3('.accordion-button').wrap("<div class='accordion-button-wrapper' role='heading' aria-level='3'> </div>");
  jQuery3('.accordion-container').wrap("<div role='region' aria-level='3'> </div>");


  var buttoncounter = 0;
  jQuery3('.accordion-button').each(function() {
    $(this).addClass("accordion-button"+buttoncounter);
    $(this).attr("id", "accordion"+buttoncounter);
    buttoncounter++;
  });
   var containercounter = 0;
  jQuery3('.accordion-container').each(function() {

    $(this).addClass("accordion-container"+containercounter);
    $(this).attr("id", "accordioncontainer"+containercounter);
    containercounter++;
  });


  jQuery3('.accordion-button-wrapper').each(function() {
    var accordionID = $(this).next().find(".accordion-container:first").attr('id');
    $(this).find('.accordion-button:first').attr("aria-controls", accordionID);
    var accordionbuttonID = $(this).find('.accordion-button:first').attr("id");
    $(this).next().find(".accordion-container:first").attr("aria-labelledby", accordionbuttonID)
  });


  jQuery3('.accordion-button-wrapper').click(function() {
    // accordionContainers.slideUp();
    // $(this).parent().next().slideDown();
    // return false;
    var accordionClass = $(this).find('.accordion-button:first').attr('class').split(' ').pop();
    var nextContainer = $(this).next().find(".accordion-container:first");
    $(this).find('.accordion-button:first').toggleClass("open");
    if($(this).find('.accordion-button:first').attr("aria-expanded") == "false"){
      $(this).find('.accordion-button:first').attr("aria-expanded", "true")
    }else{
      $(this).find('.accordion-button:first').attr("aria-expanded", "false")
    }
    nextContainer.slideToggle();
  });

  /*
    __  __    U  ___ u   ____               _     U _____ u
  U|' \/ '|u   \/"_ \/U | __")u    ___     |"|    \| ___"|/
  \| |\/| |/   | | | | \|  _ \/   |_"_|  U | | u   |  _|"
   | |  | |.-,_| |_| |  | |_) |    | |    \| |/__  | |___
   |_|  |_| \_)-\___/   |____/   U/| |\u   |_____| |_____|
  <<,-,,-.       \\    _|| \\_.-,_|___|_,-.//  \\  <<   >>
   (./  \.)     (__)  (__) (__)\_)-' '-(_/(_")("_)(__) (__)
  */

  	//hide show ADG tag on mobile menu
  	$('.mobile-menu-button').click(function() {
  		$('.site-name').fadeOut();
  		// $(this).toggleClass('open-menu');
	});


  //mmenu mobile menu, see http://mmenu.frebsite.nl
    jQuery3("#mobile-menu").mmenu({
      // options
      "slidingSubmenus": true,
      "extensions": [
             // "fullscreen"
      ]
    }, {
       // configuration
       classNames: {
          fixedElements: {
             fixed: "header"
          }
       }
    });

    var API = jQuery3("#mobile-menu").data( "mmenu" );

    jQuery3(".mobile-menu-button").click(function() {
        if( !(jQuery3(this).hasClass('open-menu'))){
          API.close();
      }
      });
    /*
    U _____ u __  __    _____  U _____ u   ____     _   _       _       _            _                  _   _       _  __   ____
    \| ___"|/ \ \/"/   |_ " _| \| ___"|/U |  _"\ u | \ |"|  U  /"\  u  |"|          |"|        ___     | \ |"|     |"|/ /  / __"| u
     |  _|"   /\  /\     | |    |  _|"   \| |_) |/<|  \| |>  \/ _ \/ U | | u      U | | u     |_"_|   <|  \| |>    | ' /  <\___ \/
     | |___  U /  \ u   /| |\   | |___    |  _ <  U| |\  |u  / ___ \  \| |/__      \| |/__     | |    U| |\  |u  U/| . \\u u___) |
     |_____|  /_/\_\   u |_|U   |_____|   |_| \_\  |_| \_|  /_/   \_\  |_____|      |_____|  U/| |\u   |_| \_|     |_|\_\  |____/>>
     <<   >>,-,>> \\_  _// \\_  <<   >>   //   \\_ ||   \\,-.\\    >>  //  \\       //  \\.-,_|___|_,-.||   \\,-.,-,>> \\,-.)(  (__)
    (__) (__)\_)  (__)(__) (__)(__) (__) (__)  (__)(_")  (_/(__)  (__)(_")("_)     (_")("_)\_)-' '-(_/ (_")  (_/  \.)   (_/(__)
    */
  //Add external class to external links
  jQuery3('a').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).addClass("external");



  /*
    ____                 ____  U _____ u      _   _       _    __     __
   / __"| u      ___    |  _"\ \| ___"|/     | \ |"|  U  /"\  u\ \   /"/u
  <\___ \/      |_"_|  /| | | | |  _|"      <|  \| |>  \/ _ \/  \ \ / //
   u___) |       | |   U| |_| |\| |___      U| |\  |u  / ___ \  /\ V /_,-.
   |____/>>    U/| |\u  |____/ u|_____|      |_| \_|  /_/   \_\U  \_/-(_/
    )(  (__).-,_|___|_,-.|||_   <<   >>      ||   \\,-.\\    >>  //
   (__)      \_)-' '-(_/(__)_) (__) (__)     (_")  (_/(__)  (__)(__)
  */
  //Open current page's menu iten by default
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li .active > ul.menu").toggleClass("open");
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li.is-active").toggleClass("is-open");
  //Toggle classes on click to show children
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li").click(
    function($e){
      $e.stopPropagation();
      jQuery3(this).toggleClass("is-open");
      jQuery3(this).children("ul.menu:first").toggleClass("open");
    }
  );

  //Slick slider
    //Landing page slick slider
  jQuery3('.card-wrapper').slick({
    mobileFirst: true,
    accessibility: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    arrows: false,
    infinite: false,
    variableWidth: true,
    responsive: [
      // {
      //  breakpoint: 1,
      //  settings: {
      //    slidesToShow: 1
      //  }
      // },
      {
        breakpoint: 665,
        settings: {
          centerMode: false,
          slidesToShow: 2
        }
      },
      // {
      //  breakpoint: 815,
      //  settings: {
      //    slidesToShow: 3
      //  }
      // },
      {
        breakpoint: 1000,
        settings: "unslick"
      }
    ]
  });
  //slick slider slick/unslick workaround, see: https://github.com/kenwheeler/slick/issues/1730#issuecomment-161691797
  jQuery3(window).resize(function() {
    jQuery3('.card-wrapper').slick('resize');
  });

  jQuery3(window).on('orientationchange', function() {
    jQuery3('.card-wrapper').slick('resize');
  });

  //    //Project related news slick slider
  // jQuery3('.view-related-new-stories .view-content').slick({
  //   mobileFirst: true,
  //   centerMode: true,
  //   centerPadding: '60px',
  //   slidesToShow: 1,
  //   arrows: false,
  //   infinite: false,
  //   variableWidth: true,
  //   responsive: [
  //     // {
  //     //  breakpoint: 1,
  //     //  settings: {
  //     //    slidesToShow: 1
  //     //  }
  //     // },
  //     {
  //       breakpoint: 665,
  //       settings: {
  //         centerMode: false,
  //         slidesToShow: 2
  //       }
  //     },
  //     // {
  //     //  breakpoint: 815,
  //     //  settings: {
  //     //    slidesToShow: 3
  //     //  }
  //     // },
  //     {
  //       breakpoint: 1000,
  //       settings: "unslick"
  //     }
  //   ]
  // });


  // //slick slider slick/unslick workaround, see: https://github.com/kenwheeler/slick/issues/1730#issuecomment-161691797
  // jQuery3(window).resize(function() {
  //   jQuery3('.view-related-new-stories .view-content').slick('resize');
  // });

  // jQuery3(window).on('orientationchange', function() {
  //   jQuery3('.view-related-new-stories .view-content').slick('resize');
  // });

  //facebook share url
  var currentPage = window.location.href;
  $('.fb-share-button').attr("data-href", currentPage);

  //news articles view combined filter form input placeholder
  $viewForm = $(".form-type-textfield.form-item-combine input");
  if($viewForm.length > 0){
    $viewForm.attr("placeholder", "Enter search terms");
  }

  //News article share links
  var newsPage = window.location.href;
  var facebookLink = "https://www.facebook.com/sharer.php?u=" + newsPage;
  jQuery3('.facebook-link').attr("href", facebookLink );

  var twitterLink = "https://twitter.com/intent/tweet?url=" + newsPage;
  jQuery3('.twitter-link').attr("href", twitterLink );

  var linkedinLink = "https://www.linkedin.com/shareArticle?mini=true&url=" + newsPage;
  jQuery3('.linkedin-link').attr("href", linkedinLink );



  //  prevent footer links
  $('.menu-block-2 > ul > li > a').click(function(e) {
    // e.preventDefault();
    if (e.preventDefault) {
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
  });
  //make tables stack on mobile
  jQuery3('#content table').stacktable();

  //Hide second menu in sidebar top/first region if both are showing
  if(jQuery3('#block-menu-block-1 .active').length > 0){
    jQuery3('#block-menu-menu-footer-menu').hide();
  }

    //Add text for accessibility
  jQuery3('.mm-next').text('See pages in this section');
  jQuery3('.mm-prev').text('See the previous sections');

  //Open/close the header search bar
  var $body = jQuery3('body');
  jQuery3('#menu-1186-1 a').click(function(e) {
    e.preventDefault();
    jQuery3('body').toggleClass("search-closed search-open");
    jQuery3('#edit-keys-2').focus();
  });

  $('.view-mode-compact').matchHeight();
  $('.node-teaser').matchHeight();

  //set target="_blank" on downloads field links
  $('.node-type-project .field-name-field-file .file a').attr('target', '_blank');

  //Make footer sidenav top level item non-clickable
  jQuery3('#block-menu-menu-footer-menu .block__content > ul.menu > li.menu__item > a').click(function(e) {
  	// e.preventDefault();
  	if (e.preventDefault) {
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
   });

  //Make table of contents top elements height smaller
  jQuery('.toc-filter-top').parent().css({'height': '0px', 'margin' : '0px'});

  //Force files to open in new window
  jQuery3('.file a').attr('target', '_blank');

  //Set on page load
  $page = $("div#page");
  $header = $('header.header');
  headerHeight = $header.height();
  if (typeof headerHeight !== 'undefined') {
    $page.css('margin-top',headerHeight+'px');
  }
  //Then change page margin top if sticky header height changes
  $( window ).resize(function() {
    headerHeight = $header.height();
    if (typeof headerHeight !== 'undefined') {
      $page.css('margin-top',headerHeight+'px');
    }
  });

  // Nav dropdown prevent top level links with sub items from working
  $('#block-superfish-1 a.menuparent.sf-depth-1').click(function(e) {
    e.preventDefault();
  });




   }}
})(jQuery, Drupal, this, this.document);
