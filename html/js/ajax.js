"use strict";

function getGameDescription(callback) {
    var request = new XMLHttpRequest(),
        url = "../cgi-bin/search.php?description=" + this.dataset.id,
        box = $id("categorias");
    request.open('GET', url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            callback.call(callback, request);
        }
        return undefined;
    };
    // Envío de petición sin cuerpo
    request.send(null);
}

function setGameDescription(request) {
    var box = $id("categorias").cloneNode(false),
        li = ns2.create("li", "", "", "", box),
        img = ns2.create("img", "", "", "", li);
    alert(request);
    ns2.generateItem(box, JSON.parse(request.responseText));

    li.dataset.id = request.id;

    img.src = request.img;
    ns2.create("span", "", "", request.name, li);
    ns2.create("span", "", "", request.prize + " €", li);
    box.appendChild(li);
    return box;
}

var ns2 = (function (ns2) {
    ns2.SAMPLETYPE = 'json';
    ns2.FILESDIR = 'files';

    ns2.create = function (tag, id, clase, text, parent) {
        var element = document.createElement(tag);
        element.id = id;
        element.className = clase;
        element.appendChild(document.createTextNode(text));
        parent.appendChild(element);
        return element;
    };

    ns2.generateItem = function (box, item) {
        var li = ns2.create("li", "", "", "", box),
            img = ns2.create("img", "", "", "", li);

        li.dataset.id = item.id;

        img.src = item.imgMin;
        ns2.create("span", "", "", item.name, li);
        ns2.create("span", "", "", item.prize + " €", li);
        box.appendChild(li);
        li.addEventListener("click", getGameDescription.bind(li, setGameDescription), false);
        return box;
    };

    return ns2;
}({}));

function $id(id) {
    return document.getElementById(id);
}

function getresource(callback) {
    var request = new XMLHttpRequest(),
        url = "../cgi-bin/search.php" + $id("inputSearch").value;
    request.open('GET', url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Se puede obtener el tipo de contenido con:
            // var type = request.getResponseHeader('Content-Type');
            //var fn = window["show" + ns.SAMPLETYPE];
            //fn.call(fn, request);

            callback.call(callback, request);
        }
        return undefined;
    };
    // Envío de petición sin cuerpo
    request.send(null);
}

function showjson(request) {
    alert(request);
}

function process(request) {
    var fn = showjson;
    fn.call(fn, request);
}

function goToRegister() {
    document.forms[0].submit();
}

function searchBBDD() {
    var request,
        input = $id("inputSearch").value;

    if (input === "") {
        Array.from($id("items").children).forEach(function (x) {
            x.remove();
        });
    }
    request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var box = $id("items").cloneNode(false),
            li;
        if (request.readyState === 4 && request.status === 200) {

            JSON.parse(request.responseText).reduce(function (x, y) {
                return ns2.generateItem(x, y);
            }, box);

            $id("searchLi").replaceChild(box, $id("items"));
        }
    }
    request.open("GET", "../cgi-bin/search.php?q=" + input);
    request.send(null);
}
window.addEventListener("load", function () {
    var resource = "../cgi-bin/search.php";
    var dorequest = getresource.bind(this, process);
    $id("inputSearch").addEventListener("keyup", searchBBDD, false);
    $id("lupa").onclick = dorequest;
    $id("register").addEventListener("click", goToRegister, false);
}, false);