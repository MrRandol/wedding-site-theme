var html = document.documentElement;
var body = document.body;
var timeout;
var st = 0;

loadingEvent();
RSVPScroll();

window.addEventListener('scroll', function () {
    'use strict';
    if (body.classList.contains('tag-home') && body.classList.contains('with-full-cover') && !document.querySelector('.cover').classList.contains('half')) {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(portalButton);
    }
});

if (document.querySelector('.cover') && document.querySelector('.cover').classList.contains('half')) {
    body.classList.add('portal-visible');
}

function portalButton() {
    'use strict';
    st = window.scrollY;

    if (st > 400) {
        body.classList.add('portal-visible');
    } else {
        body.classList.remove('portal-visible');
    }
}

function loadingEvent() {
    'use strict';
    var loadingWrappers = document.querySelectorAll('.loading-event');
    if (!loadingWrappers) return;

    imagesLoaded(loadingWrappers, function () {
        for (var node of loadingWrappers) {
            node.classList.remove('loading');
        }
    });
}

function RSVPScroll() {
    document.querySelector('#rsvp-banner').addEventListener('click', function () {
        var form = document.querySelector('iframe[title="Wedding RSVP"]')
        form.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
}
