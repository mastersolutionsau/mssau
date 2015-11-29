jQuery(document).ready(function() {
    jQuery(".zerif-lite-nav-tabs a").click(function(event) {
        event.preventDefault();
        jQuery(this).parent().addClass("active");
        jQuery(this).parent().siblings().removeClass("active");
        var tab = jQuery(this).attr("href");
        jQuery(".zerif-lite-tab-pane").not(tab).css("display", "none");
        jQuery(tab).fadeIn();
    });
	
	/* If there are required actions, add an icon with the number of required actions in the About Zerif page -> Actions required tab */
    var zerif_nr_actions_required = zerifLiteWelcomeScreenObject.nr_actions_required;

    if ( (typeof zerif_nr_actions_required !== 'undefined') && (zerif_nr_actions_required != '0') ) {
        jQuery('li.zerif-lite-w-red-tab a').append('<span class="zerif-lite-actions-count">' + zerif_nr_actions_required + '</span>');
    }

    /* Dismiss required actions */
    jQuery(".zerif-dismiss-required-action").click(function(){

        var id= jQuery(this).attr('id');
        console.log(id);
        jQuery.ajax({
            type       : "GET",
            data       : { action: 'zerif_lite_dismiss_required_action',dismiss_id : id },
            dataType   : "html",
            url        : zerifLiteWelcomeScreenObject.ajaxurl,
            beforeSend : function(data,settings){
				jQuery('.zerif-lite-tab-pane#actions_required h1').append('<div id="temp_load" style="text-align:center"><img src="' + zerifLiteWelcomeScreenObject.template_directory + '/inc/admin/welcome-screen/img/ajax-loader.gif" /></div>');
            },
            success    : function(data){
				jQuery("#temp_load").remove(); /* Remove loading gif */
                jQuery('#'+ data).parent().remove(); /* Remove required action box */

                var zerif_lite_actions_count = jQuery('.zerif-lite-actions-count').text(); /* Decrease or remove the counter for required actions */
                if( typeof zerif_lite_actions_count !== 'undefined' ) {
                    if( zerif_lite_actions_count == '1' ) {
                        jQuery('.zerif-lite-actions-count').remove();
                        jQuery('.zerif-lite-tab-pane#actions_required').append('<p>' + zerifLiteWelcomeScreenObject.no_required_actions_text + '</p>');
                    }
                    else {
                        jQuery('.zerif-lite-actions-count').text(parseInt(zerif_lite_actions_count) - 1);
                    }
                }
            },
            error     : function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }
        });
    });

});