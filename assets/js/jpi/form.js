;window.jpi = window.jpi || {};
window.jpi.form = (function(jQuery, jpi) {

    "use strict";

    var global = {
        submitButton: null,
        emailInput: null,
        messageInput: null,
        subjectInput: null,
        emailFeedback: null,
        messageFeedback: null,
        formFeedback: null,
    };

    var fn = {

        // Show appropriate & relevant feedback to the user after an attempt of sending a message
        renderFeedback: function(response) {
            global.formFeedback.text(response.feedback).show("fast");

            // Check if message was sent
            if (response.ok) {
                global.formFeedback.addClass("feedback--success");
                jQuery("#email-input, #message-input, #subject-input").val("");
            }
            else {
                if (response.feedback) {
                    global.formFeedback.addClass("feedback--error");
                }

                if (response.messageFeedback) {
                    global.messageFeedback.text(response.messageFeedback).show("fast");
                }

                if (response.emailAddressFeedback) {
                    global.emailFeedback.text(response.emailAddressFeedback).show("fast");
                }
            }

            global.submitButton.prop("disabled", false).html(global.submitButton.attr("data-initial-text"));
        },

        // Render a error message whe AJAX has error
        renderErrorMessage: function() {
            global.formFeedback.text("Something went wrong, please try again later.")
                  .addClass("feedback--error")
                  .show("fast");

            global.submitButton.prop("disabled", false)
                  .html(global.submitButton.attr("data-initial-text"));
        },

        validateForm: function() {
            global.submitButton.prop("disabled", true)
                  .html(global.submitButton.attr("data-loading-text"));

            var isMessageValid = fn.validateMessage(global.messageInput.val(), true),
                isEmailValid = fn.validateEmail(global.emailInput.val(), true);

            if (isEmailValid && isMessageValid) {
                jpi.ajax.sendRequest({
                    method: "POST",
                    url: "/contact/form-submission.php",
                    params: {
                        emailAddress: global.emailInput.val(),
                        subject: global.subjectInput.val(),
                        message: global.messageInput.val(),
                    },
                    onSuccess: fn.renderFeedback,
                    onError: fn.renderErrorMessage,
                });
            }
            else {
                global.submitButton.prop("disabled", false).html(global.submitButton.attr("data-initial-text"));
            }

            return false;
        },

        validateEmail: function(email, isForm) {
            global.formFeedback.hide("fast");
            global.emailInput.removeClass("valid");

            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
                emailValidationTest = validEmailPattern.test(email);

            if (email.trim() === "" && isForm) {
                global.emailInput.addClass("invalid");
                global.emailFeedback.text("Email Address must be provided and valid.").show("fast");
            }
            else if (!emailValidationTest && isForm) {
                global.emailInput.addClass("invalid");
                global.emailFeedback.text("Email Address must be valid.").show("fast");
            }
            else if (email.trim() !== "" && emailValidationTest) {
                global.emailInput.removeClass("invalid").addClass("valid");
                global.emailFeedback.hide("fast");
                return true;
            }

            return false;
        },

        validateMessage: function(message, isForm) {
            global.formFeedback.hide("fast");
            global.messageInput.removeClass("valid");

            if (message.trim() === "" && isForm) {
                global.messageInput.addClass("invalid");
                global.messageFeedback.text("Message must be filled out.").show("fast");
            }
            else if (message.trim() !== "") {
                global.messageInput.removeClass("invalid").addClass("valid");
                global.messageFeedback.hide("fast");
                return true;
            }

            return false;
        },

        initListeners: function() {
            global.subjectInput.on("keyup", function() {
                global.formFeedback.hide("fast");
            });
            global.emailInput.on("input", function() {
                fn.validateEmail(this.value);
            });
            global.messageInput.on("input", function() {
                fn.validateMessage(this.value);
            });

            jQuery(".contact-form").on("submit", fn.validateForm);
        },

        init: function() {
            if (!jQuery(".contact-form").length) {
                return;
            }

            global.submitButton = jQuery("#submit");
            global.emailInput = jQuery("#email-input");
            global.messageInput = jQuery("#message-input");
            global.subjectInput = jQuery("#subject-input");
            global.emailFeedback = jQuery("#contact-form__email-feedback");
            global.messageFeedback = jQuery("#contact-form__message-feedback");
            global.formFeedback = jQuery("#contact-form__feedback");

            fn.initListeners();
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
