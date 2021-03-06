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
            text: '+ Pengadaan',
            attr: {
                title: 'Tambah Pengadaan',
                class: 'btn btn-primary btn-sm bt',
            },
            action: function (e, dt, button, config) {
                window.location = 'https://indraranuh-dev.github.io/asset-app-demo/admin-pengadaan-tambah.html';
            }
        },
    ]
});

$('.btn').attr({
    'data-toggle': 'tooltip',
});

function rubah(angka) {
    if (angka !== '-') {
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp. ' + ribuan;
    } else {
        return 'Rp. ' + angka;
    }
}

function bool(val) {
    if (val === 0) return 'Tidak';
    if (val === 1) return 'Ya';
}

function set(val, format) {
    if (val === '-' || val === null || val === '') {
        return '-';
    } else {
        return moment(val).format(format);
    }
}

$('#show').addClass('bd-example-modal-lg');
$('#show :nth-child(1)').addClass('modal-lg');

$('.show-detail').click(function () {
    $('#show').modal('show');
    $('.modal-title').text('Detail Barang');
    $('.modal-body').addClass('text-center')
        .html('<div class="spinner-border text-dark m-auto" role="status"><span class="sr-only"></span></div>');
    const _target = $(this).data('target');
    $.getJSON(`https://indraranuh-dev.github.io/asset-app-demo/public/dist/js/pages/r1/procurements/${_target}.json`, function (data) {
        const elm = function (val, text) {
            return '<tr><td>' + text + '</td><td>:</td><td>' + val + '</td></tr>';
        };
        const pro = data[0];
        const name = elm(pro.name, 'Nama pengadaan');
        const brand = elm(pro.brand_name, 'Nama brand');
        const desc = elm(pro.description, 'Deskripsi');
        const ic = elm(pro.item_category.name, 'Kategori barang');
        const sup = elm(pro.supplier.name, 'Nama supplier');
        const priority = elm(pro.priority.name, 'Tingkat prioritas');
        const amount = elm(pro.amount, 'Jumlah');
        const app = elm(bool(pro.approved), 'Disetujui');
        const estimate = elm(rubah(pro.estimate_price), 'Perkiraan Harga');
        const app_at = elm(set(pro.approved_at, 'LLL'), 'Disetujui pada');
        const wb_at = elm(set(pro.will_buy_at, 'LLL'), 'Akan dibeli pada');
        const created_at = elm(set(pro.created_at, 'LLL'), 'Dibuat pada');
        const updated_at = elm(set(pro.updated_at, 'LLL'), 'Diubah pada');
        setTimeout(() => {
            $('.modal-body').removeClass('text-center').html('<table class="table table-hover"><tbody></tbody></table>');
            $('.modal-body tbody').html([name,brand,desc,ic,priority,sup,amount,estimate,app,app_at,wb_at,created_at,updated_at]);
        }, 500);
    });
    $('.modal-body table').html('');
})