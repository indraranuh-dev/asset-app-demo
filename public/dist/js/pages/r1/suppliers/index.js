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
            text: '+ Supplier',
            attr:  {
                title: 'Tambah Supplier',
                class: 'btn btn-primary btn-sm bt',
            },
            action: function ( e, dt, button, config ) {
                window.location = 'http://127.0.0.1:5500/admin-supplier-tambah.html';
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
    $.getJSON( `http://127.0.0.1:5500/public/dist/js/pages/r1/suppliers/${_target}.json`, function( data ) {
        const sup = data[0];
        const elm = function (val, text) {
            return '<tr><td>'+text+'</td><td>:</td><td>'+val+'</td></tr>';
        };
        const name = elm(sup.name, 'Nama perusahaan');
        const p_name = elm(sup.product_name, 'Nama produk');
        const address = elm(sup.address, 'Alamat');
        const phone = elm(sup.phone, 'Telpon');
        const ls = elm(set(sup.last_supply, 'LL'), 'Terakhir supply');
        const ns = elm(set(sup.next_supply, 'LL'), 'Akan supply');
        const jenis = elm(sup.category.name, 'Kategori');
        const created_at = elm(set(sup.created_at, 'LLL'), 'Dibuat pada');
        const updated_at = elm(set(sup.updated_at, 'LLL'), 'Diubah pada');
        setTimeout(() => {
            $('.modal-body').removeClass('text-center').html('<table class="table table-hover"><tbody></tbody></table>');
            $('.modal-body tbody').html([name, p_name, jenis, address, phone, ls, ns, created_at, updated_at]);
        }, 500);
    });
    $('.modal-body table').html('');
})
