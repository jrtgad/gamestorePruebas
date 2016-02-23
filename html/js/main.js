/*jslint
    node: true,
    browser: true,
*/
/* globals */
/*var archivos = ["img/Fotos/autopromo/nba16.jpg", "img/Logo.png"];*/
"use strict";

function posicionarMenu() {
    var header_height = $('.cabecera').outerHeight(true);

    if ($(window).scrollTop() >= header_height + 20) {
        $('.menu').addClass('navbar-fixed-top');
    } else {
        $('.menu').removeClass('navbar-fixed-top');
    }
}

function events() {
    /*$("play").addEventListener("click", playVideo, false);
    $("pause").addEventListener("click", pauseVideo, false);
    $("volup").addEventListener("click", volUpVideo, false);
    $("voldown").addEventListener("click", volDownVideo, false);
    $("video").addEventListener("timeupdate", updateProgressBar, false);
    $("video").onended = changeBanner;
    $("bar").addEventListener("change", changeCurrentTime, false);*/
    $(window).scroll(function () {
        posicionarMenu();
    });
}

window.onload = events;

/*

function changeCurrentTime() {
    var momentum = $("video").duration * ($("bar").value / 100);
    $("bar").value = momentum;
    $("video").currentTime = momentum;
}

function changeBanner() {
    if(cont === archivos.length) {
        cont = 0;
    }
    $("fotopromo").src = archivos[cont];
    cont++;
}

function playVideo() {
    if ($("video").paused) {
$("video").play();
}
else {
    $("video").pause();
}

}

function pauseVideo() {
    $("video").pause();
}

function volUpVideo() {
    $("video").volume += 0.1;
}

function volDownVideo() {
    $("video").volume -= 0.1;
}

function updateProgressBar() {
    var percent = Math.floor((100 / video.duration) * video.currentTime);
    $("bar").value = percent;
} */