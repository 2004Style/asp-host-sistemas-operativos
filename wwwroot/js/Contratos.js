let datatable;
$(function () {
    loadDataTable();
});

function loadDataTable() {
    datatable = $('#table_docs').DataTable({
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
            url: "/Contrato/GetAll"
        },
        columns: [
            {
                data: "documentoId",
                render: function (data) {
                    let buttons = `<div class="cs-table-btns">`;
                    if (isAdmin)
                    {
                        buttons += ` <a href="/Contrato/Edit/${data}" class="cs-table-edit"> <i class="fa-solid fa-pen-to-square"></i> </a> `;
                    }
                    buttons += ` <a href="/Contrato/Details/${data}" class="cs-table-info"> <i class="fa-solid fa-circle-info"></i> </a> `;

                    if (isAdmin)
                    {
                        buttons += ` <a onclick=Delete("/Contrato/DeleteContrato/${data}") class="cs-table-delete"> <i class="fa-solid fa-trash"></i> </a> `;
                    } buttons += `</div>`; return buttons;
                }, width: "15%", orderable: false, searchable: false, className: "text-center"
            },
            { data: "dcTitulo" },
            { data: "dcDescripcion" },
            { data: "fecha" },
            { data: "estado.esEstado" },
            { data: "cliente.clNombre" },
            { data: "categoria.ctNombre" }
        ]
    });
}
function Delete(url) {
    swal({
        title: "¿Estás seguro de eliminar el Documento?",
        text: "Este registro no se podrá recuperar.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((borrar) => {
            if (borrar) {
                $.ajax({
                    type: "POST",
                    url: url, // Rooms/DeleteRoom/3
                    success: function (data) {
                        if (data.completado) {
                            toastr.success(data.mensaje); // Notificación satisfactoria
                            datatable.ajax.reload(); // Recargar el datatable
                        }
                        else {
                            toastr.error(data.mensaje); // Notificación error
                        }
                    }
                });
            }
        });
}