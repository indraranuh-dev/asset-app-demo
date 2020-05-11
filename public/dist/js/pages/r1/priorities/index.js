$('table').DataTable({
    dom: "<'row'<'col-sm-6 mb-3'Br><'col-sm-6'f>><'row'<'col-12' t>><'row'<'d-flex justify-content-start w-50' i><'d-flex justify-content-end w-50'p>>",
    buttons: [
        {
            extend: 'copy',
            text: '<i class="fa fa-fw fa-copy"></i>',
            attr:  {
                title: 'Copy',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'excel',
            text: '<i class="fa fa-fw fa-file-excel"></i>',
            attr:  {
                title: 'Export as Excell',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'pdfHtml5',
            download: 'open',
            text: '<i class="fa fa-fw fa-file-pdf"></i>',
            attr:  {
                title: 'Export as PDF',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'print',
            text: '<i class="fa fa-fw fa-print"></i>',
            attr:  {
                title: 'Print',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            text: '+ Prioritas',
            attr:  {
                title: 'Tambah Prioritas',
                class: 'btn btn-primary btn-sm',
            },
            action: function ( e, dt, button, config ) {
                window.location = 'https://indraranuh-dev.github.io/asset-app-demo/admin-prioritas-tambah.html';
            }
        },
    ]
});
$('.btn').attr({
    'data-toggle' : 'tooltip',
});
