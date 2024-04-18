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
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var form = event.target;
  var data = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
      });
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
  });
}

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

    cardText.innerHTML = cardText.textContent.slice(0, 90) + '... <a class="read-more">اقراء المزيد</a>';
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
