$(document).ready(function() {
    // Inisialisasi DataTable
    var table = $('#membersTable').DataTable({
        "language": { "search": "Cari:" }
    });

    // Buka Modal Tambah
    $('#openAddModal').click(function() {
        $('#modalTitle').text('Add New Member');
        $('#editRowIdx').val(''); 
        $('#m_username').val('');
        $('#memberModal').fadeIn();
    });

    // Tutup Modal
    window.closeModal = function() {
        $('#memberModal').fadeOut();
    };

    // Simpan Data
    $('#saveMemberBtn').click(function() {
        var username = $('#m_username').val();
        var role = $('#m_role').val();
        var status = $('#m_status').val();
        var today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        var editIdx = $('#editRowIdx').val();

        if(username === "") { alert("Nama tidak boleh kosong!"); return; }

        var statusHtml = `<span class="status ${status}">${status}</span>`;
        var actionHtml = `
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        `;

        if (editIdx === "") {
            table.row.add([username, today, role, statusHtml, actionHtml]).draw(false);
        } else {
            var rowData = table.row(editIdx).data();
            rowData[0] = username;
            rowData[2] = role;
            rowData[3] = statusHtml;
            table.row(editIdx).data(rowData).draw(false);
        }
        closeModal();
    });

    // Edit & Delete logic tetap sama (seperti di file HTML sebelumnya)
    $('#membersTable tbody').on('click', '.btn-edit', function() {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        $('#modalTitle').text('Edit Member');
        $('#editRowIdx').val(row.index());
        $('#m_username').val(data[0]);
        $('#m_role').val(data[2]);
        var currentStatus = $(data[3]).text().toLowerCase();
        $('#m_status').val(currentStatus);
        $('#memberModal').fadeIn();
    });

    $('#membersTable tbody').on('click', '.btn-delete', function() {
        if(confirm("Yakin ingin menghapus?")) {
            table.row($(this).parents('tr')).remove().draw();
        }
    });
});