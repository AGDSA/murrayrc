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
  $('li.sf-depth-2', $sfMenu).matchHeight();

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


  // jQuery( document ).ready(function() {
    jQuery3('#tableau').append("<div class='tableauPlaceholder' id='viz1490664072387' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Do&#47;DomesticViolenceSA-DSD&#47;DomesticviolenceinSouthAustralia2015&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='DomesticViolenceSA-DSD&#47;DomesticviolenceinSouthAustralia2015' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Do&#47;DomesticViolenceSA-DSD&#47;DomesticviolenceinSouthAustralia2015&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1490664072387');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='950px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='100%';vizElement.style.height='1050px';} else { vizElement.style.width='100%';vizElement.style.height='1362px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
    //civil distric court
    jQuery3('#tableau-civil-district-1').append("<div class='tableauPlaceholder' id='viz1492051297697' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcivilworkload-DSD&#47;DistrictCourtCivilLodgementsandFinalisationsbyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='DistrictCourtcivilworkload-DSD&#47;DistrictCourtCivilLodgementsandFinalisationsbyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcivilworkload-DSD&#47;DistrictCourtCivilLodgementsandFinalisationsbyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051297697');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1062px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
    jQuery3('#tableau-civil-district-2').append("<div class='tableauPlaceholder' id='viz1492051364652' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcivilpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='DistrictCourtcivilpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcivilpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051364652');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='962px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
  	//civil magistrates court
  	jQuery3('#tableau-civil-magistrate-1').append("<div class='tableauPlaceholder' id='viz1492051459295' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcivilworkload-DSD&#47;MagistratesCourtCivilLodgementsandFinalisationsbyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='MagistratesCourtcivilworkload-DSD&#47;MagistratesCourtCivilLodgementsandFinalisationsbyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcivilworkload-DSD&#47;MagistratesCourtCivilLodgementsandFinalisationsbyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051459295');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='962px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
  	jQuery3('#tableau-civil-magistrate-2').append("<div class='tableauPlaceholder' id='viz1492051488121' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcivilpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='MagistratesCourtcivilpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcivilpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051488121');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='962px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");  	
  	//Criminal matters in the District Court
  	jQuery3('#tableau-criminal-district-1').append("<div class='tableauPlaceholder' id='viz1492051925961' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcriminalworkload-DSD&#47;DistrictCourtCriminalLodgementsandFinalisationsbyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='DistrictCourtcriminalworkload-DSD&#47;DistrictCourtCriminalLodgementsandFinalisationsbyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcriminalworkload-DSD&#47;DistrictCourtCriminalLodgementsandFinalisationsbyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051925961');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='962px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
  	jQuery3('#tableau-criminal-district-2').append("<div class='tableauPlaceholder' id='viz1492052394225' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcriminalpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='DistrictCourtcriminalpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictCourtcriminalpending-DSD&#47;DistrictCourtPendingBacklogandTimebyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492052394225');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='862px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
  	//Criminal matters in the Magistrates Court
  	jQuery3('#tableau-criminal-magistrate-1').append("<div class='tableauPlaceholder' id='viz1492052814966' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcriminalworkload-DSD&#47;MagistratesCourtCriminalLodgementsandFinalisationsbyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='MagistratesCourtcriminalworkload-DSD&#47;MagistratesCourtCriminalLodgementsandFinalisationsbyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcriminalworkload-DSD&#47;MagistratesCourtCriminalLodgementsandFinalisationsbyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492052814966');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1062px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-criminal-magistrate-2').append("<div class='tableauPlaceholder' id='viz1492053371610' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcriminalpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='MagistratesCourtcriminalpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MagistratesCourtcriminalpending-DSD&#47;MagistratesCourtPendingBacklogandTimebyyear&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492053371610');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='962px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	//Criminal Justice Sector Reform Council
	jQuery3('#cjsrc-community').append("<div class='tableauPlaceholder' id='viz1492050905225' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Community&#47;Offencesreportedbyvictims&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='CJSRCPerformanceMeasures-Community&#47;Offencesreportedbyvictims' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Community&#47;Offencesreportedbyvictims&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492050905225');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='862px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>")
 	jQuery3('#cjsrc-courts').append("<div class='tableauPlaceholder' id='viz1492051031944' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Courts&#47;MagistratesCourt-Criminalmatters&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='CJSRCPerformanceMeasures-Courts&#47;MagistratesCourt-Criminalmatters' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Courts&#47;MagistratesCourt-Criminalmatters&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051031944');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1362px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#cjsrc-criminal-justice').append("<div class='tableauPlaceholder' id='viz1492051092531' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-CJSprocesses&#47;DashboardODPP&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='CJSRCPerformanceMeasures-CJSprocesses&#47;DashboardODPP' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-CJSprocesses&#47;DashboardODPP&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051092531');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='863px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='863px';} else { vizElement.style.width='100%';vizElement.style.height='1236px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#cjsrc-corrections').append("<div class='tableauPlaceholder' id='viz1492051143930' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Corrections&#47;Remand&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='CJSRCPerformanceMeasures-Corrections&#47;Remand' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-Corrections&#47;Remand&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051143930');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#cjsrc-youth-justice').append("<div class='tableauPlaceholder' id='viz1492051188661' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-YouthJustice&#47;Dashboardyouthdetention&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='CJSRCPerformanceMeasures-YouthJustice&#47;Dashboardyouthdetention' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CJ&#47;CJSRCPerformanceMeasures-YouthJustice&#47;Dashboardyouthdetention&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492051188661');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='863px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='863px';} else { vizElement.style.width='100%';vizElement.style.height='1236px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	//Women in custody
 	jQuery3('#tableau-women-custody-1').append("<div class='tableauPlaceholder' id='viz1492070636159' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='FemalesinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492070636159');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1262px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-women-custody-2').append("<div class='tableauPlaceholder' id='viz1492071259075' style='position: relative'><noscript><a href='#'><img alt='What has changed in the last 3 years? ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='FemalesinCustodyoverall-DSD&#47;Overallcustodydischargefigures' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492071259075');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='1069px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='1069px';} else { vizElement.style.width='100%';vizElement.style.height='836px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-women-custody-3').append("<div class='tableauPlaceholder' id='viz1492071751429' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyRemand-DSD&#47;Timeonremanddischarged&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='FemalesinCustodyRemand-DSD&#47;Timeonremanddischarged' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyRemand-DSD&#47;Timeonremanddischarged&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492071751429');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-women-custody-4').append("<div class='tableauPlaceholder' id='viz1492073049565' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodySentenced-DSD&#47;MostSeriousOffenceincustody&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='FemalesinCustodySentenced-DSD&#47;MostSeriousOffenceincustody' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodySentenced-DSD&#47;MostSeriousOffenceincustody&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492073049565');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-women-custody-5').append("<div class='tableauPlaceholder' id='viz1492073610282' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyincrease-DSD&#47;Remand&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='FemalesinCustodyincrease-DSD&#47;Remand' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fe&#47;FemalesinCustodyincrease-DSD&#47;Remand&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492073610282');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='862px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	//Aboriginal Adults in custody
 	jQuery3('#tableau-aboriginals-custody-1').append("<div class='tableauPlaceholder' id='viz1492066108282' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AboriginaladultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492066108282');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1262px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-aboriginals-custody-2').append("<div class='tableauPlaceholder' id='viz1492066552120' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AboriginaladultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492066552120');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='1069px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='1069px';} else { vizElement.style.width='100%';vizElement.style.height='836px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-aboriginals-custody-3').append("<div class='tableauPlaceholder' id='viz1492069581991' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AboriginaladultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492069581991');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1289px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-aboriginals-custody-4').append("<div class='tableauPlaceholder' id='viz1492068904980' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodySentenced-DSD&#47;Actualtimeserveddischarged&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AboriginaladultsinCustodySentenced-DSD&#47;Actualtimeserveddischarged' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodySentenced-DSD&#47;Actualtimeserveddischarged&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492068904980');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1262px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	jQuery3('#tableau-aboriginals-custody-5').append("<div class='tableauPlaceholder' id='viz1492069937283' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyincrease-DSD&#47;Remand&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AboriginaladultsinCustodyincrease-DSD&#47;Remand' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ab&#47;AboriginaladultsinCustodyincrease-DSD&#47;Remand&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492069937283');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.minWidth='944px';vizElement.style.maxWidth='100%';vizElement.style.height='989px';} else { vizElement.style.width='100%';vizElement.style.height='989px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
 	//Adults in Custody
	jQuery3('#tableau-adult-custody-1').append("<div class='tableauPlaceholder' id='viz1492059645082' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AdultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustody1June2016-DSD&#47;RemandandSentencedbyMostSeriousOffence&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492059645082');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1262px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
	jQuery3('#tableau-adult-custody-2').append("<div class='tableauPlaceholder' id='viz1492060873806' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AdultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyoverall-DSD&#47;Overallcustodydischargefigures&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492060873806');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='822px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='822px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
	jQuery3('#tableau-adult-custody-3').append("<div class='tableauPlaceholder' id='viz1492061854205' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AdultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyRemand-DSD&#47;MostSeriousOffenceincustody&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492061854205');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
	jQuery3('#tableau-adult-custody-4').append("<div class='tableauPlaceholder' id='viz1492064225598' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodySentenced-DSD&#47;MostSeriousOffenceincustody&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AdultsinCustodySentenced-DSD&#47;MostSeriousOffenceincustody' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodySentenced-DSD&#47;MostSeriousOffenceincustody&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492064225598');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='1162px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");
	jQuery3('#tableau-adult-custody-5').append("<div class='tableauPlaceholder' id='viz1492064680729' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyincrease-DSD&#47;Remand&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='AdultsinCustodyincrease-DSD&#47;Remand' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ad&#47;AdultsinCustodyincrease-DSD&#47;Remand&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='render' value='false' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1492064680729');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='944px';vizElement.style.height='889px';} else { vizElement.style.width='100%';vizElement.style.height='862px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>");

 	
 	
  // });

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


   }}
})(jQuery, Drupal, this, this.document);
