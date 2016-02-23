/*jslint
    node: true,
    browser: true,
    unparam: true,
    regexp: true
*/
"use strict";

function $(id) {
    return document.getElementById(id);
}

var ns = (function (ns) {
    ns.NAME_PATTERN = /^[a-zñáéíóú\-\'\.]+(?:\s[a-zñáéíóú\-\'\.]+)+$/i;
    ns.MAIL_PATTERN = /^[\w.]+@[\w.]+\.[\w]{2,6}$/i;
    ns.PASS_PATTERN = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_PATTERN = /^(https?:\/\/)?(www.)?([\da-z\.|\-]+)\.([a-z\.]{2,6})([\/\w \.\-]*)*\/?$/i;
    ns.POSTALCODE_PATTERN = /^([1-4][0-9]{4}|5[0-2][0-9]{3}|0[1-9][0-9]{3})$/;
    ns.ADDRESS_PATTERN = /^.*$/i;
    ns.COUNTRIES = [
        "Alemania", "Bélgica", "Dinamarca", "España",
        "Francia", "Grecia", "Holanda", "Italia", "Suecia", "Reino Unido"
    ];
    ns.REQUIRED_INPUTS = ["userName", "userMail", "pass", "passConfirmation", "checkbox"];
    ns.REST_OF_INPUTS = ["url", "address", "country", "postalCode", "comments"];
    ns.ERROR = "Rellene correctamente los campos";
    ns.RESET_CLASS = "reset";
    ns.VALID_CLASS = "valid";
    ns.INVALID_CLASS = "invalid";
    ns.HIDDEN_CLASS = "hidden";
    //ns.USER_ADDED = "Su información ha sido guardada";

    ns.destroyEmptyOption = function () {
        if ($("country").firstChild.value === "empty") {
            $("country").removeChild($("country").firstChild);
        }
    };

    ns.createEmptyOption = function () {
        var option = document.createElement("option");
        option.innerHTML = "Elija";
        option.value = "empty";
        $("country").insertBefore(option, $("country").firstChild);
    };

    ns.reset_form = function () {
        ns.REQUIRED_INPUTS.forEach(function (element) {
            $(element).value = "";
            $(element).className = "reset";
            $(element).checked = false;
        });
        ns.REST_OF_INPUTS.forEach(function (element) {
            $(element).value = "";
            if ($(element).id === "postalCode") {
                $(element).className = ns.HIDDEN_CLASS + " " + ns.RESET_CLASS;
                $("titlesForm").children[8].className = ns.HIDDEN_CLASS;
            } else {
                if (element === "country") {
                    ns.createEmptyOption();
                    $("country").selectedIndex = $("country").firstChild;
                    $("country").className = ns.VALID_CLASS;
                } else {
                    $(element).className = "reset";
                }
                if ($("error")) {
                    $("registro").removeChild($("error"));
                }
            }
        });
    };

    ns.validatePattern = function (pattern, input) {
        if (input.value.length === 0) {
            input.className = ns.RESET_CLASS;
        } else {
            if (pattern.test(input.value)) {
                input.className = ns.VALID_CLASS;
            } else {
                input.className = ns.INVALID_CLASS;
            }
        }
    };

    ns.comparePassInputs = function (pass, confirmation) {
        var finalClass;
        if (confirmation.value === "" || pass.value === "") {
            finalClass = ns.RESET_CLASS;
        } else {
            if (pass.value !== confirmation.value) {
                finalClass = ns.INVALID_CLASS;
            } else {
                finalClass = ns.VALID_CLASS;
            }
        }
        return finalClass;
    };
    ns.validate = function () {
        if (ns.REQUIRED_INPUTS.every(function (element) {
                return $(element).className.match("(\\s|^)valid(\\s|$)");
            }) && ns.REST_OF_INPUTS.every(function (input) {
                return $(input).value !== "" ?
                    $(input).className.match("(\\s|^)valid(\\s|$)") : true;
            })) {
            /*
             DE MOMENTO NADA, NO SE COMO HACER LLEGAR EL MENSAJE
             var p = document.createElement("p");
            p.id = "guardado";
            p.className = "modalWindow";
            p.innerHTML = ns.USER_ADDED;*/

            document.forms[1].submit();
            //$("login").appendChild(p);

        } else {
            if ($("error")) {
                $("registro").removeChild($("error"));
            }
            var p = document.createElement("p");
            p.id = "error";
            p.className = "modalWindow";
            p.innerHTML = ns.ERROR;
            $("registro").appendChild(p);
        }
    };
    return ns;
}({}));



function validateName() {
    ns.validatePattern(ns.NAME_PATTERN, $("userName"));
}

function validateMail() {
    ns.validatePattern(ns.MAIL_PATTERN, $("userMail"));
}

function validatePass() {
    ns.validatePattern(ns.PASS_PATTERN, $("pass"));
}

function validateURL() {
    ns.validatePattern(ns.URL_PATTERN, $("url"));
}

function confirmPass() {
    $("passConfirmation").className = ns.comparePassInputs($("pass"), $("passConfirmation"));
}

function checkCountry() {
    ns.destroyEmptyOption();
    if ($("country").value === "es") {
        $("postalCode").className = ns.RESET_CLASS;
        $("titlesForm").children[8].className = "";
    } else {
        $("postalCode").className = ns.HIDDEN_CLASS;
        $("titlesForm").children[8].className = ns.HIDDEN_CLASS;
    }
}

function getCheckState() {
    $("siteConditions").className = $("siteConditions").unchecked ?
        ns.INVALID_CLASS : ns.VALID_CLASS;
}

function validatePostalCode() {
    ns.validatePattern(ns.POSTALCODE_PATTERN, $("postalCode"));
}

function appendSelectCountry() {
    ns.COUNTRIES.forEach(function (x) {
        var option = document.createElement("option");
        option.innerHTML = x;
        option.value = x.substring(0, 2).toLowerCase();
        $("country").appendChild(option);
    });
}

function validateAddress() {
    ns.validatePattern(ns.ADDRESS_PATTERN, $("address"));
}

function checkEnabled() {
    $("checkbox").className = $("checkbox").checked ?
        ns.VALID_CLASS : ns.INVALID_CLASS;
}

function removeCookiesDiv() {
    document.body.removeChild($("modalCookies"));
}


function addEvents() {
    appendSelectCountry();
    ns.reset_form();
    $("userName").addEventListener("keyup", validateName, false);
    $("userMail").addEventListener("keyup", validateMail, false);
    $("country").addEventListener("change", checkCountry, false);
    $("pass").addEventListener("keyup", validatePass, false);
    $("url").addEventListener("keyup", validateURL, false);
    $("passConfirmation").addEventListener("keyup", confirmPass, false);
    $("checkbox").addEventListener("change", checkEnabled, false);
    $("postalCode").addEventListener("keyup", validatePostalCode, false);
    $("address").addEventListener("keyup", validateAddress, false);
    $("cookies").addEventListener("click", removeCookiesDiv, false);
    $("limpiar").addEventListener("click", ns.reset_form, false);
    $("send").addEventListener("click", ns.validate, false);
}

window.onload = addEvents;