
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


    jQuery(".question-quad").hover(function() {
        jQuery(this).toggleClass("mdc-elevation--z0");
        jQuery(this).toggleClass("mdc-elevation--z3");
    }, function() {
        jQuery(this).toggleClass("mdc-elevation--z0");
        jQuery(this).toggleClass("mdc-elevation--z3");
    });


    jQuery(".question-quad").click(function() {

        var t = jQuery(this);
        if(t.hasClass("question-quad-expanded")) {
            return;
        }

        jQuery(".question-quad").not(t).toggleClass("question-quad-minimized");
        t.toggleClass("question-quad-expanded");

        jQuery(".question-content-minimized").toggle();
        jQuery(".question-content-expanded").toggle();
    });

});