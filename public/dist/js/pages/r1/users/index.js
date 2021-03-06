$('table').DataTable({
    dom: "<'row'<'col-sm-6 mb-3'Br><'col-sm-6'f>><'row'<'col-12' t>><'row'<'d-flex justify-content-start w-50' i><'d-flex justify-content-end w-50'p>>",
    buttons: [{
            extend: 'copy',
            text: '<i class="fa fa-fw fa-copy"></i>',
            attr: {
                title: 'Copy',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'excel',
            text: '<i class="fa fa-fw fa-file-excel"></i>',
            attr: {
                title: 'Export as Excell',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'pdfHtml5',
            download: 'open',
            text: '<i class="fa fa-fw fa-file-pdf"></i>',
            attr: {
                title: 'Export as PDF',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            extend: 'print',
            text: '<i class="fa fa-fw fa-print"></i>',
            attr: {
                title: 'Print',
                class: 'btn btn-outline-primary btn-sm',
            }
        },
        {
            text: '+ Akun',
            attr: {
                title: 'Tambah Akun',
                class: 'btn btn-primary btn-sm bt',
            },
            action: function (e, dt, button, config) {
                window.location = 'https://indraranuh-dev.github.io/asset-app-demo/admin-settings-manage-akun-tambah.html';
            }
        },
    ]
});
$('.btn').attr({
    'data-toggle': 'tooltip',
});
$('.show-detail').click(function () {
    $('#show').modal('show');
    $('.modal-title').text('Detail Akun')
    const _target = $(this).data('target');
    $.getJSON( `https://indraranuh-dev.github.io/asset-app-demo/public/dist/js/pages/r1/users/${_target}.json`, function( data ) {
        const elm = function (val, text) {
            return '<a class="list-group-item list-group-item-action">' + val + ' <span class="badge badge-primary ml-auto badge-pill">' + text + '</span></a>';
        };
        const name = elm(data[0].name, 'Nama');
        const image = elm(data[0].image, 'Gambar');
        const email = elm(data[0].email, 'Email');
        const role = elm(data[0].role.name, 'Role');
        const created_at = elm(moment(data[0].created_at).format('LLL'), 'Bergabung pada');
        $('.modal-body .list-group').html('<div class="spinner-border text-dark m-auto" role="status"><span class="sr-only"></span></div>');
        setTimeout(function () {
            $('.modal-body .list-group').html([name, email, image, role, created_at]);
        }, 500);
    });
    $('.modal-body .list-group').html('')
})
