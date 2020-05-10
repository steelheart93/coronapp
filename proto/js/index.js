$(function () {
    mostrar();

    fechas();
    ciudades();
    departamentos();
    atenciones();
    sexos();

    $("#inicio").click(function () {
        order = "$order=ciudad_de_ubicaci_n";

        mostrar();
    });

    $("#fecha").click(function () {
        order = "$order=fecha_de_notificaci_n DESC";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#ciudad").click(function () {
        order = "$order=ciudad_de_ubicaci_n";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#departamento").click(function () {
        order = "$order=departamento";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#atencion").click(function () {
        order = "$order=atenci_n";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#edad").click(function () {
        order = "$order=edad";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#sexo").click(function () {
        order = "$order=sexo";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#procedencia").click(function () {
        order = "$order=pa_s_de_procedencia";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });

    $("#muerte").click(function () {
        order = "$order=fecha_de_muerte DESC";

        if (category.length == 0) {
            mostrar();
        } else {
            console.log(category);
            filtrar(category[0], category[1]);
        }
    });
});

var order = "$order=fecha_de_notificaci_n DESC";
var category = [];

function mostrar() {
    category = [];
    var promesa = $.get(`https://www.datos.gov.co/resource/gt2j-8ykr.json?${order}`);

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += "<tr>";
            html += `<td>${caso.fecha_de_notificaci_n.slice(0, 10)}</td>`;
            html += `<td>${caso.fecha_de_muerte}</td>`;
            html += `<td>${caso.ciudad_de_ubicaci_n}</td>`;
            html += `<td>${caso.departamento}</td>`;
            html += `<td>${caso.atenci_n}</td>`;
            html += `<td>${caso.edad}</td>`;
            html += `<td>${caso.sexo}</td>`;
            html += `<td>${caso.pa_s_de_procedencia.slice(0, 8)}</td>`;
            html += "</tr>";
        }
        document.getElementById("tbody").innerHTML = html;
        document.getElementById("resultados").innerText = "Resultados en vivo: " +
            (json.length == 1000 ? "+1000" : json.length) + " casos";
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function fechas() {
    var promesa = $.get("https://www.datos.gov.co/resource/gt2j-8ykr.json?$select=fecha_de_notificaci_n&$group=fecha_de_notificaci_n&$order=fecha_de_notificaci_n DESC");

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += `<button class="dropdown-item"`;
            html += `onclick="filtrar('fecha_de_notificaci_n', '${caso.fecha_de_notificaci_n}')">`
            html += `${caso.fecha_de_notificaci_n.slice(0, 10)}</button>`;
        }
        document.getElementById("fechas").innerHTML = html;
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function ciudades() {
    var promesa = $.get("https://www.datos.gov.co/resource/gt2j-8ykr.json?$select=ciudad_de_ubicaci_n&$group=ciudad_de_ubicaci_n&$order=ciudad_de_ubicaci_n");

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += `<button class="dropdown-item"`;
            html += `onclick="filtrar('ciudad_de_ubicaci_n', '${caso.ciudad_de_ubicaci_n}')">`
            html += `${caso.ciudad_de_ubicaci_n}</button>`;
        }
        document.getElementById("ciudades").innerHTML = html;
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function departamentos() {
    var promesa = $.get("https://www.datos.gov.co/resource/gt2j-8ykr.json?$select=departamento&$group=departamento&$order=departamento");

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += `<button class="dropdown-item"`;
            html += `onclick="filtrar('departamento', '${caso.departamento}')">`
            html += `${caso.departamento}</button>`;
        }
        document.getElementById("departamentos").innerHTML = html;
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function atenciones() {
    var promesa = $.get("https://www.datos.gov.co/resource/gt2j-8ykr.json?$select=atenci_n&$group=atenci_n&$order=atenci_n");

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += `<button class="dropdown-item"`;
            html += `onclick="filtrar('atenci_n', '${caso.atenci_n}')">`
            html += `${caso.atenci_n}</button>`;
        }
        document.getElementById("atenciones").innerHTML = html;
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function sexos() {
    var promesa = $.get("https://www.datos.gov.co/resource/gt2j-8ykr.json?$select=sexo&$group=sexo&$order=sexo");

    promesa.done(function (json) {
        var html = "";
        for (caso of json) {
            html += `<button class="dropdown-item"`;
            html += `onclick="filtrar('sexo', '${caso.sexo}')">`
            html += `${caso.sexo}</button>`;
        }
        document.getElementById("sexos").innerHTML = html;
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}

function filtrar(categoria, valor) {
    category = [categoria, valor];
    var promesa = $.get(`https://www.datos.gov.co/resource/gt2j-8ykr.json?${categoria}=${valor}&${order}`);

    promesa.done(function (json) {

        var html = "";
        for (caso of json) {
            html += "<tr>";
            html += `<td>${caso.fecha_de_notificaci_n.slice(0, 10)}</td>`;
            html += `<td>${caso.fecha_de_muerte.slice(0, 10)}</td>`;
            html += `<td>${caso.ciudad_de_ubicaci_n}</td>`;
            html += `<td>${caso.departamento}</td>`;
            html += `<td>${caso.atenci_n}</td>`;
            html += `<td>${caso.edad}</td>`;
            html += `<td>${caso.sexo}</td>`;
            html += `<td>${caso.pa_s_de_procedencia.slice(0, 8)}</td>`;
            html += "</tr>";
        }
        document.getElementById("tbody").innerHTML = html;
        document.getElementById("resultados").innerText = "Resultados en vivo: " +
            (json.length == 1000 ? "+1000" : json.length) + " casos";
    });

    promesa.fail(function (respuesta) {
        alert("¡Consulta a la API fallida!");
        console.log(respuesta);
    });
}