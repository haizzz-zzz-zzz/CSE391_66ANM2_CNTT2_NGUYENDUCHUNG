

let danhSachSinhVien = [];


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
        hoTen: hoTen,
        diem: diem
    });

 
    inputHoTen.value = '';
    inputDiem.value = '';
    inputHoTen.focus();

  
    renderTable();
    capNhatThongKe();
}


function renderTable() {
    const tbody = document.getElementById('danhSachSinhVien');
    tbody.innerHTML = '';

    danhSachSinhVien.forEach((sv, index) => {
        const row = document.createElement('tr');
        const xepLoai = tinhXepLoai(sv.diem);
        
        row.innerHTML = `
            <td class="stt-column">${index + 1}</td>
            <td class="text-left">${sv.hoTen}</td>
            <td class="diem-highlight"><strong>${sv.diem}</strong></td>
            <td>${xepLoai}</td>
            <td>
                <button class="btn-delete" data-index="${index}">Xóa</button>
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
            const index = event.target.getAttribute('data-index');
            danhSachSinhVien.splice(index, 1);
            renderTable();
            capNhatThongKe();
        }
    });

    inputHoTen.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            themSinhVien();
        }
    });
    
    inputDiem.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            themSinhVien();
        }
    });
});


function tinhDiemTrungBinh() {
    if (danhSachSinhVien.length === 0) return 0;
    
    const tong = danhSachSinhVien.reduce((sum, sv) => sum + sv.diem, 0);
    return (tong / danhSachSinhVien.length).toFixed(2);
}


function capNhatThongKe() {
    document.querySelector('#tongSV').textContent = danhSachSinhVien.length;
    document.querySelector('#diemTB').textContent = tinhDiemTrungBinh();
}







