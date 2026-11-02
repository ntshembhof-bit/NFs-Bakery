// ======================================================
// NF's BAKERY
// ======================================================


// This message appears in the browser's developer console.
// It is useful for checking that the HTML linked to this file.
console.log("NF's Bakery script.js is linked and running.");

// ------------------------------------------------------
// querySelector finds the first HTML element that matches
// the selector. The # symbol means "find by ID".
const specialMessage = document.querySelector("#special-message");
const specialButton = document.querySelector("#special-button");
const specialImage = document.querySelector("#special-image");


// This lets the same script.js file be linked from other pages
// without causing an error when those pages do not have these elements.
if (specialMessage && specialButton && specialImage) {

    // addEventListener waits for a particular event.
    // Here, the event is a click on the button.
    specialButton.addEventListener("click", function () {

        // textContent changes the words inside the paragraph.
        // Update the message to show the bakery's special.
        specialMessage.textContent =
             "Today’s special: freshly baked cupcakes. Visit us to see today’s flavours!";

        // Remove the hidden attribute so the image becomes visible.
        specialImage.hidden = false;

        // Change the button label to show that it has been clicked.
        specialButton.textContent = "Special viewed";
        specialButton.disabled = true;
    });
}

//------------------------------------------------------
//  PRODUCT SEARCH
// ------------------------------------------------------

// Find the search input and the message area.
const productSearch = document.querySelector("#product-search");
const searchMessage = document.querySelector("#search-message");

// Find every product section. All three need the "sevices-card" class.
const productCards = document.querySelectorAll(".products-card");

// Only set up the search if the search field and product cards exist.
if (productSearch && searchMessage && productCards.length > 0) {

    // The "input" event runs whenever the visitor types or edits the search.
    productSearch.addEventListener("input", function () {

        // Read the search text, remove extra spaces, and make it lowercase.
        // Lowercase text means "Cake" and "cake" will both find matches.
        const searchText = productSearch.value.toLowerCase().trim();

        // Keep count of the product cards that match.
        let numberOfMatches = 0;

        // Check each product card one at a time.
        productCards.forEach(function (card) {

            // Get all the text inside this product card.
            const cardText = card.textContent.toLowerCase();

            // Check whether the card's text contains what the visitor typed.
            const cardMatches = cardText.includes(searchText);

            // Hide the card if it does not match; otherwise show it.
            card.hidden = !cardMatches;

            // Increase the match count when this card matches.
            if (cardMatches) {
                numberOfMatches = numberOfMatches + 1;
            }
        });

        // Show a message if no product cards match the search.
        if (numberOfMatches === 0) {
            searchMessage.textContent = "No products match your search.";
        } else {
            searchMessage.textContent = "";
        }
    });
}


// IMAGE LIGHBOX
// ------------------------------------------------------

// Find the dialog and the image that will be shown inside it.
const imageLightbox = document.querySelector("#image-lightbox");
const enlargedImage = document.querySelector("#lightbox-image");
const closeLightboxButton = document.querySelector("#close-lightbox");

// Find all product images that should open in the lightbox.
const productImages = document.querySelectorAll(".lightbox-image");

// Set up the lightbox only if its HTML elements exist.
if (imageLightbox && enlargedImage && closeLightboxButton) {

    // Give every product image a click event.
    productImages.forEach(function (productImage) {

        productImage.addEventListener("click", function () {

            // Copy the clicked image's file path into the larger image.
            enlargedImage.src = productImage.src;

            // Copy its description so the enlarged image has useful alt text.
            enlargedImage.alt = productImage.alt;

            // Open the dialog as a modal window.
            imageLightbox.showModal();
        });
    });

    // Close the dialog when the visitor clicks the close button.
    closeLightboxButton.addEventListener("click", function () {
        imageLightbox.close();
    });

    // Remove the image source after closing the dialog.
    imageLightbox.addEventListener("close", function () {
        enlargedImage.src = "";
    });
}


//   PRODUCT DETAILS ACCORDION
// ------------------------------------------------------


// Find all the accordion buttons on the page.
const accordionButtons = document.querySelectorAll(".accordion-button");

// Add a click event to every accordion button.
accordionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Find the product list immediately after the button.
        const details = button.nextElementSibling;

        // Show or hide the product list.
        details.hidden = !details.hidden;

        // Check whether the list is now visible.
        const isExpanded = !details.hidden;

        // Update the accessibility attribute.
        button.setAttribute("aria-expanded", String(isExpanded));

        // Change the button text.
        if (isExpanded) {
            button.textContent = button.textContent.replace(
                "Show available", "Hide available"
            );
        } else {
            button.textContent = button.textContent.replace(
                "Hide available", "Show available"
            );
        }
    });
});
//-----------------------------
// Enquiry Form Validation
//------------------------------ 
  const enquiryForm = document.querySelector("#enquiry-form"); 
  const enquiryResponse = document.querySelector("#enquiry-response");

  // Prices for each product
  const productPrices = {
    cake: 250,
    cupcakes: 15,
    cookies: 10,
    pastries: 20,
    bread: 25
  };

  if (enquiryForm && enquiryResponse) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      let formIsValid = true; // Flag to track form validity

      const nameInput = document.querySelector("#name");
      const nameError = document.querySelector("#name-error");

      const emailInput = document.querySelector("#email");
      const emailError = document.querySelector("#email-error");

      const orderSelect = document.querySelector("#order");
      const orderError = document.querySelector("#order-error");

      const quantityInput = document.querySelector("#quantity");
      const quantityError = document.querySelector("#quantity-error");

      const messageInput = document.querySelector("#message");
      const messageError = document.querySelector("#message-error");

      nameError.textContent = "";
      emailError.textContent = "";
      orderError.textContent = "";
      quantityError.textContent = "";
      messageError.textContent = "";

      //check if the name input field is empty or not.
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        formIsValid = false;
      }

        // Check if the email input field is empty or not.
        if (emailInput.value.trim() === "") {
          emailError.textContent = "Please enter your email.";
          formIsValid = false;
        }

        // Check if the product selection is valid.
        if (orderSelect.value === "") {
          orderError.textContent = "Please select a product.";
          formIsValid = false;
        }

        // Check if the quantity input field is empty or not.
        if (quantityInput.value.trim() === "") {
           quantityError.textContent = "Please enter a quantity.";
            formIsValid = false;
        }

        // Check if the message input field is empty or not.
        if (messageInput.value.trim() === "") {
          messageError.textContent = "Please enter a message.";
          formIsValid = false;
        }

        if (formIsValid) {
            const pricePerItem = productPrices[orderSelect.value];
            const quantity = Number(quantityInput.value);
            const estimatedCost = pricePerItem * quantity;

            enquiryResponse.textContent = 
            "Thank you ," +  nameInput.value + 
            "! Your enquiry has been submitted. The estimated cost for " +
             quantity + " " + orderSelect.value + "(s) is R" + estimatedCost.toFixed(2) + 
             ". We will get back to you shortly."; 

             enquiryForm.reset(); // Reset the form after submission

        }else{
            enquiryResponse.textContent = "Please correct the errors in the form before submitting.";
        }
        });
    }

    //============================
    // Contact Form Validation
    //=============================

    const contactForm = document.querySelector("#contact-form");
    const contactResponse = document.querySelector("#contact-response");

    if (contactForm && contactResponse) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            let contactIsValid = true; // Flag to track form validity

            const contactNameInput = document.querySelector("#contact-name");
            const contactNameError = document.querySelector("#contact-name-error");

            const contactEmailInput = document.querySelector("#contact-email");
            const contactEmailError = document.querySelector("#contact-email-error");

            const contactMessageInput = document.querySelector("#contact-message");
            const contactMessageError = document.querySelector("#contact-message-error");

            contactNameError.textContent = "";
            contactEmailError.textContent = "";
            contactMessageError.textContent = "";

            if (contactNameInput.value.trim() === "") {
                contactNameError.textContent = "Please enter your name.";
                contactIsValid = false;
            }

            if (contactEmailInput.value.trim() === "") {
                contactEmailError.textContent = "Please enter your email.";
                contactIsValid = false;
            }

            if (contactMessageInput.value.trim() === "") {
                contactMessageError.textContent = "Please enter your message.";
                contactIsValid = false;
            }

     if (contactIsValid) {
       contactResponse.textContent = "Sending your message...";

    fetch("https://formspree.io/f/myeedbke", {
        method: "POST",
        body: new FormData(contactForm),
        headers: { "Accept": "application/json" }
    })
    .then(function (response) {
        if (response.ok) {
            contactResponse.textContent = "Thank you, " + contactNameInput.value + "! Your message has been sent.";
            contactForm.reset();
        } else {
            contactResponse.textContent = "Sorry, something went wrong. Please try again.";
        }
    })
    .catch(function () {
        contactResponse.textContent = "Sorry, we could not send your message. Please check your internet and try again.";
    });
   } else {
    contactResponse.textContent = "Please correct the errors in the form before submitting.";
};
    });
}
