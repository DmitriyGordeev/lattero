
function material_setup() {
    var drawerEl = document.querySelector('.mdc-persistent-drawer');
    var MDCPersistentDrawer = mdc.drawer.MDCPersistentDrawer;
    var drawer = new MDCPersistentDrawer(drawerEl);
    document.querySelector('.demo-menu').addEventListener('click', function() {
        drawer.open = !drawer.open;
    });
    drawerEl.addEventListener('MDCPersistentDrawer:open', function() {
        console.log('Received MDCPersistentDrawer:open');
    });
    drawerEl.addEventListener('MDCPersistentDrawer:close', function() {
        console.log('Received MDCPersistentDrawer:close');
    });


    var mdcFabsElements = document.querySelectorAll('.mdc-fab');
    for(var i = 0; i < mdcFabsElements.length; i++) {
        mdc.ripple.MDCRipple.attachTo(mdcFabsElements[i]);
    }

    var mdcTextFields = document.querySelectorAll('.mdc-textfield');
    for(i = 0; i < mdcTextFields.length; i++) {
        mdc.textfield.MDCTextfield.attachTo(mdcTextFields[i]);
    }

}


jQuery(document).ready(function() {

    material_setup();
    jQuery(".question-content-expanded").toggle();
    jQuery("#dialog-question-fabs").toggle();

    /* Dialog: */
    var dialog = new mdc.dialog.MDCDialog(document.querySelector('#question-dialog'));
    dialog.listen('MDCDialog:accept', function() {
        console.log('accepted');
    });
    dialog.listen('MDCDialog:cancel', function() {
        console.log('canceled');
    });


    jQuery(".dissasemble").click(function(event) {
        dialog.lastFocusedTarget = event.target;
        dialog.show();
    });


    jQuery('div.question-quad:not(".question-quad-expanded")').hover(function() {
        jQuery(this).toggleClass("mdc-elevation--z0");
        jQuery(this).toggleClass("mdc-elevation--z3");
    }, function() {
        jQuery(this).toggleClass("mdc-elevation--z0");
        jQuery(this).toggleClass("mdc-elevation--z3");
    });


    /* Expands question-card: */
    jQuery(".question-quad").click(function() {

        // TODO: refactor this via css (no js)
        var t = jQuery(this);
        if(t.hasClass("question-quad-expanded")) {
            return;
        }

        jQuery(".question-quad").not(t).toggleClass("question-quad-minimized");
        t.toggleClass("question-quad-expanded");

        // swap content:
        t.find("div.question-content").toggle();
        t.find("div.question-content-expanded").toggle();

        jQuery("#dialog-buttons").toggle();
        jQuery("#dialog-question-fabs").toggle();
    });


    /* Press Back button on expanded card to collapse: */
    jQuery("button.question-button-back").click(function(event) {

        var card = jQuery(this).closest(".question-quad");
        card.removeClass("question-quad-expanded");
        event.stopPropagation();

        // swap content:
        card.find("div.question-content").toggle();
        card.find("div.question-content-expanded").toggle();

        jQuery(".question-quad").removeClass("question-quad-minimized");

        jQuery("#button-dialog-accept").toggle();
        jQuery("#button-dialog-decline").toggle();
    });

});
