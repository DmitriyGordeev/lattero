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

    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-fab'));
}

jQuery(document).ready(function() {
    material_setup();

    /* Dialog: */
    var dialog = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-with-list'));
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







});