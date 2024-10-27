$(document).ready(function () {
    // Cargar la lista de símbolos desde la API
    $.get('http://localhost:9090/api/symbols', function (data) {
        data.forEach(function (symbol) {
            $('#symbols-list').append(`<li class="list-group-item symbol-item" data-symbol="${symbol.symbol}">${symbol.symbol}</li>`);
        });
    });

    // Evento al hacer clic en un símbolo
    $('#symbols-list').on('click', '.symbol-item', function () {
        const symbol = $(this).data('symbol');

        // Limpiar la tabla y gráfico
        $('#price-table').empty();
        clearChart();

        // Cargar precios del símbolo seleccionado
        $.get(`http://localhost:9090/api/historical/${symbol}`, function (data) {
            data.forEach(function (entry) {
                $('#price-table').append(`<tr><td>${entry.date}</td><td>${entry.price}</td></tr>`);
            });

            // Actualizar gráfico
            updateChart(data);
        });
    });

    // Crear gráfico
    let ctx = document.getElementById('price-chart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Precio',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {}
    });

    // Función para actualizar el gráfico
    function updateChart(data) {
        let labels = data.map(entry => entry.date);
        let prices = data.map(entry => entry.price);

        chart.data.labels = labels;
        chart.data.datasets[0].data = prices;
        chart.update();
    }

    // Función para limpiar el gráfico
    function clearChart() {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.update();
    }
});
