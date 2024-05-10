'use strict';

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



// Send FORM
const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_ugidqqw';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        window.location.href = "https://omarmkt.com/thankyou.html"
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });



document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.getElementById("about");
  const nums = document.querySelectorAll(".nums");

  const options = {
    threshold: .1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nums.forEach(num => {
          const targetNumber = +num.innerText.replace(/\D/g, "");
          let count = 0;
          const countInterval = setInterval(() => {
            if (count < targetNumber) {
              count += Math.ceil(targetNumber / 220);
              num.textContent = "+" + count;
            } else {
              num.textContent = "+" + targetNumber;
              clearInterval(countInterval);
            }
          }, 20);
        });
        observer.unobserve(aboutSection);
      }
    });
  }, options);

  if (aboutSection) {
    observer.observe(aboutSection);
  } else {
    console.error("Element not found.");
  }
});

// Get all card texts
const cardTexts = document.querySelectorAll('.card-text');
cardTexts.forEach(cardText => {
  if (cardText.textContent.length > 25) {

    cardText.innerHTML = cardText.textContent.slice(0, 90) + '... <span class="read-more">اقراء المزيد</span>';
  }

  const readMoreLink = cardText.querySelector('.read-more');
  if (readMoreLink) {
    readMoreLink.addEventListener('click', () => {
      const modal = document.getElementById('myModal');
      const modalText = document.getElementById('modal-text');
      modalText.textContent = cardText.dataset.fullText || cardText.textContent;
      modal.style.display = 'block';
      const closeButton = document.querySelector('.modal .close');
      closeButton.onclick = function () {
        modal.style.display = 'none';
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    });
  }
});



AOS.init();

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    250: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 4
    },
    991: {
      slidesPerView: 7
    }
  }
});