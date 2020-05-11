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
            text: '+ Barang',
            attr:  {
                title: 'Tambah Barang',
                class: 'btn btn-primary btn-sm bt',
            },
            action: function ( e, dt, button, config ) {
                window.location = 'http://127.0.0.1:5500/admin-barang-tambah.html';
            }
        },
    ]
});

$('.btn').attr({
    'data-toggle' : 'tooltip',
});

function rubah(angka){
    if(angka !== '-') {
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp. '+ ribuan;
    }else{
        return 'Rp. '+ angka;
    }
}

function bool(val){
    if (val === 0) return 'Tidak';
    if (val === 1) return 'Ya';
}

function set(val, format){
    if(val === '-' || val === null || val === ''){
        return '-';
    }else{
        return moment(val).format(format);
    }
}

$('.show-detail').click(function () {
    $('#show').modal('show');
    $('.modal-title').text('Detail Barang');
    $('.modal-body').addClass('text-center')
        .html('<div class="spinner-border text-dark m-auto" role="status"><span class="sr-only"></span></div>');
    const _target = $(this).data('target');

    $.getJSON( `http://127.0.0.1:5500/public/dist/js/pages/r1/items/${_target}.json`, function( data ) {

        const elm = function (val, text) {
            return '<tr><td>'+text+'</td><td>:</td><td>'+val+'</td></tr>';
        };
        const name = elm(data[0].name, 'Nama barang');
        const amount = elm(data[0].amount, 'Jumlah');
        const den = elm(data[0].denomination[0].name, 'Satuan');
        const jenis = elm(data[0].category[0].name, 'Kategori');
        const hb = elm(rubah(data[0].buy_price), 'Harga Beli');
        const hj = elm(rubah(data[0].sell_price), 'Harga jual');
        const exp = elm(set(data[0].experied_at, 'LL'), 'Tanggal Exp.');
        const lm = elm(set(data[0].last_maintenance_at, 'LL'), 'Terakhir Maintenance');
        const nm = elm(set(data[0].next_maintenance_at, 'LL'), 'Maintenance Selanjutnya');
        const sellable = elm(bool(data[0].sellable), 'Bisa dijual');
        const terjual = elm(data[0].sold_on, 'Terjual pada');
        const created_at = elm(set(data[0].created_at, 'LLL'), 'Dibuat pada');
        setTimeout(() => {
            $('.modal-body').removeClass('text-center').html('<table class="table table-hover"><tbody></tbody></table>');
            $('.modal-body tbody').html([name, jenis, amount, den, hb, hj, exp, lm, nm, sellable, terjual, created_at]);
        }, 500);
      });
    $('.modal-body table').html('');
})