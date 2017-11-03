
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

function setup_tab(selector) {

    var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector(selector));
    var dots = document.querySelector('.dots');
    var panels = document.querySelector('.panels');

    dynamicTabBar.preventDefaultOnClick = true;

    function updateDot(index) {
        var activeDot = dots.querySelector('.dot.active');
        if (activeDot) {
            activeDot.classList.remove('active');
        }
        var newActiveDot = dots.querySelector('.dot:nth-child(' + (index + 1) + ')');
        if (newActiveDot) {
            newActiveDot.classList.add('active');
        }
    }

    function updatePanel(index) {
        var activePanel = panels.querySelector('.panel.active');
        if (activePanel) {
            activePanel.classList.remove('active');
        }
        var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
        if (newActivePanel) {
            newActivePanel.classList.add('active');
        }
    }

    dynamicTabBar.listen('MDCTabBar:change', function (t) {
        var dynamicTabBar = t.detail;
        var nthChildIndex = dynamicTabBar.activeTabIndex;

        updatePanel(nthChildIndex);
        updateDot(nthChildIndex);
    });

    dots.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('dot')) {
            return;
        }

        evt.preventDefault();

        var dotIndex = [].slice.call(dots.querySelectorAll('.dot')).indexOf(evt.target);

        if (dotIndex >= 0) {
            dynamicTabBar.activeTabIndex = dotIndex;
        }

        updatePanel(dotIndex);
        updateDot(dotIndex);
    });
}

jQuery(document).ready(function() {

    material_setup();
    setup_tab("#mainword-toolbar");


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
    jQuery("#question-button-back").click(function(event) {

        // collapse expanded card:
        var expandedCard = jQuery(".question-quad-expanded");
        expandedCard.removeClass("question-quad-expanded");

        // swap content:
        expandedCard.find("div.question-content").toggle();
        expandedCard.find("div.question-content-expanded").toggle();
        event.stopPropagation();

        // return all minimized quads:
        jQuery(".question-quad").removeClass("question-quad-minimized");

        // exchange dialog buttons:
        jQuery("#dialog-buttons").toggle();
        jQuery("#dialog-question-fabs").toggle();
    });

});