$(document).ready(function () {

    $('#Button-Diciembre').click(function (e) { 
        e.preventDefault();
        $.getJSON("../datos/agenda.json",
            function (data) {
                console.log(data);
                $('#diciembre').html('');
                $.each(data.Diciembre, function (indexInArray, value) { 
                    $('#diciembre').html($('#diciembre').html()+`
                    <div class="card text-center p-5 ">
                    <div class="card-body">
                    <strong> Nombre y apellido:</strong> ${value.nombre} <br>
                    <strong> Edad:</strong> ${value.edad} <br>
                    <strong> Dirección:</strong> ${value.direccion}<br>
                    <strong> Fecha:</strong> ${value.fecha} <br>
                    </div>
                    </div>
                    `);  
                });
            }
        );
        
    });

    $('#Button-Noviembre').click(function (e) { 
        e.preventDefault();
        $.getJSON("../datos/agenda.json",
            function (data) {
                console.log(data);
                $('#noviembre').html('');
                $.each(data.Noviembre, function (indexInArray, value) { 
                    $('#noviembre').html($('#noviembre').html()+`
                    <div class="card text-center p-5 ">
                    <div class="card-body">
                    <strong> Nombre y apellido:</strong> ${value.nombre} <br>
                    <strong> Edad:</strong> ${value.edad} <br>
                    <strong> Dirección:</strong> ${value.direccion}<br>
                    <strong> Fecha:</strong> ${value.fecha} <br>
                    </div>
                    </div>
                    `);  
                });
            }
        );
        
    });



});
