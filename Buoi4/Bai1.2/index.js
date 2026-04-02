
let danhSachSinhVien = [];


let filteredStudents = [];


let sortOrder = 0; 

function tinhXepLoai(diem){
    if(diem >= 8.5) return "Giỏi";
    if(diem >= 7 && diem < 8.5) return "Khá";
    if(diem >= 5 && diem < 7) return "Trung bình";
    return "Yếu";
}

function themSinhVien() {
    const inputHoTen = document.getElementById('hoTen');
    const inputDiem = document.getElementById('diem');
    
    const hoTen = inputHoTen.value.trim();
    const diem = parseFloat(inputDiem.value);

    if (hoTen === '') {
        alert('Vui lòng nhập họ tên sinh viên!');
        inputHoTen.focus();
        return;
    }

    if (isNaN(diem) || diem < 0 || diem > 10) {
        alert('Vui lòng nhập điểm hợp lệ từ 0 đến 10!');
        inputDiem.focus();
        return;
    }


    danhSachSinhVien.push({
        id: Date.now(),
        hoTen: hoTen,
        diem: diem,
        xepLoai: tinhXepLoai(diem)
    });

    inputHoTen.value = '';
    inputDiem.value = '';
    inputHoTen.focus();

    applyFilters();
}

function applyFilters() {
    const keyword = document.getElementById('timkiem').value.trim().toLowerCase();
    const filterType = document.getElementById('locXepLoai').value;

    filteredStudents = danhSachSinhVien.filter(sv => {
        const matchName = sv.hoTen.toLowerCase().includes(keyword);
        const matchType = filterType === 'All' || sv.xepLoai === filterType;
        
        return matchName && matchType;
    });

    if (sortOrder !== 0) {
        filteredStudents.sort((a, b) => {
            return sortOrder === 1 ? a.diem - b.diem : b.diem - a.diem;
        });
    }

    renderTable();
    capNhatThongKe();
}

function renderTable() {
    const tbody = document.getElementById('danhSachSinhVien');
    tbody.innerHTML = '';

    if (filteredStudents.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align: center; color: red;">Không có kết quả</td>`;
        tbody.appendChild(row);
        return;
    }

    filteredStudents.forEach((sv, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="stt-column">${index + 1}</td>
            <td class="text-left">${sv.hoTen}</td>
            <td class="diem-highlight"><strong>${sv.diem}</strong></td>
            <td>${sv.xepLoai}</td>
            <td>
                <button class="btn-delete" data-id="${sv.id}">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('danhSachSinhVien');
    const inputHoTen = document.getElementById('hoTen');
    const inputDiem = document.getElementById('diem');

    tbody.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete')) {
            const idToDel = parseInt(event.target.getAttribute('data-id'));
            danhSachSinhVien = danhSachSinhVien.filter(sv => sv.id !== idToDel);
            applyFilters();
        }
    });

    inputHoTen.addEventListener('keypress', function(e) { if(e.key === 'Enter') themSinhVien(); });
    inputDiem.addEventListener('keypress', function(e) { if(e.key === 'Enter') themSinhVien(); });

    document.getElementById('timkiem').addEventListener('input', applyFilters);
    document.getElementById('locXepLoai').addEventListener('change', applyFilters);

    const cotDiem = document.getElementById('cotDiem');
    const sortArrow = document.getElementById('sortArrow');
    
    cotDiem.addEventListener('click', () => {
        if (sortOrder === 0 || sortOrder === -1) {
            sortOrder = 1; 
            sortArrow.innerHTML = '▲';
        } else {
            sortOrder = -1;
            sortArrow.innerHTML = '▼';
        }
        applyFilters();
    });
});

function tinhDiemTrungBinh() {
    if (filteredStudents.length === 0) return 0;
    const tong = filteredStudents.reduce((sum, sv) => sum + sv.diem, 0);
    return (tong / filteredStudents.length).toFixed(2);
}

function capNhatThongKe() {
    document.querySelector('#tongSV').textContent = filteredStudents.length;
    document.querySelector('#diemTB').textContent = tinhDiemTrungBinh();
}