let datatable;
$(function () {
    loadDataTable();
});

function loadDataTable() {
    datatable = $('#table_categorias').DataTable({
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No hay registros disponibles.",
            info: "Pág. _PAGE_ de _PAGES_ - Mostrando del _START_ al _END_ de _TOTAL_ registros",
            infoEmpty: "No hay registros disponibles.",
            infoFiltered: "(filtrado de un total _MAX_ registros)",
            loadingRecords: "Cargando en curso...",
            emptyTable: "No hay registros disponibles.",
            search: "Buscar",
            paginate: {
                first: "Primero",
                last: "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        ajax: {
            url: "/Categorias/GetAll"
        },
        columns: [
            {
                data: "categoriasId",
                render: function (data) {
                    return `
                    <div class="cs-table-btns">
                        <a href="/Categorias/Edit/${data}" class="cs-table-edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="/Categorias/Details/${data}" class="cs-table-info">
                            <i class="fa-solid fa-circle-info"></i>
                        </a>
                        <a onclick=Delete("/Categorias/DeleteCategoria/${data}") class="cs-table-delete">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </div>
                        
                    `;
                }, width: "15%", orderable: false, searchable: false, className: "text-center"
            },
            { data: "ctNombre" },
            //{ data: "ctDescripcion" }
        ]
    });
}
function Delete(url) {
    swal({
        title: "¿Estás seguro de eliminar la Categoria?",
        text: "Este registro no se podrá recuperar.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((borrar) => {
            if (borrar) {
                $.ajax({
                    type: "POST",
                    url: url,
                    success: function (data) {
                        if (data.completado) {
                            toastr.success(data.mensaje);
                            datatable.ajax.reload();
                        }
                        else {
                            toastr.error(data.mensaje);
                        }
                    }
                });
            }
        });
}