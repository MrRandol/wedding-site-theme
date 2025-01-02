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

const canv = document.getElementById("canvas"),
      ctx = canv.getContext("2d"),
      imgSelector = document.querySelectorAll(".our-portrait figure img"),
      imgMask = new Image();
      
imgMask.src = "https://res.cloudinary.com/dkcygpizo/image/upload/v1505176017/codepen/cloud-texture.png";
const img = (imgSelector != null && imgSelector.length > 0) ? imgSelector[0] : null;

let speed = 0;
function draw() {
  speed += 7;

  const maskX = (canv.width - (70 + speed)) / 2,
        maskY = (canv.height - (40 + speed)) / 2;

  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.globalCompositeOperation = "source-over";

  ctx.drawImage(imgMask, maskX, maskY, 70 + speed, 40 + speed);

  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  requestId = window.requestAnimationFrame(draw);
}

const ourStory=document.getElementById("our-story");
const observer = new window.IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
        setTimeout(() => {
            canv.width = img.naturalWidth;
            canv.height = img.naturalHeight;
            canv.classList.remove("hidden");
            draw();
          }, 500);
    return
  }
}, {
  root: null,
  threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
})
observer.observe(ourStory);
