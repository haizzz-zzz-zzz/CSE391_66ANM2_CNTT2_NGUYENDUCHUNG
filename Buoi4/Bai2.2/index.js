const prices = {
    'ao': 150000,
    'quan': 280000,
    'giay': 450000,
    'tui': 320000,
    'non': 95000
};

const form = document.getElementById('orderForm');
const productInput = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const deliveryDateInput = document.getElementById('deliveryDate');
const addressInput = document.getElementById('address');
const notesInput = document.getElementById('notes');
const paymentInputs = document.querySelectorAll('input[name="payment"]');
const totalAmountDisplay = document.getElementById('totalAmount');
const confirmationModal = document.getElementById('confirmationModal');
const btnConfirm = document.getElementById('btnConfirm');
const btnCancel = document.getElementById('btnCancel');
const successMessage = document.getElementById('successMessage');

function validateProduct() {
    if (!productInput.value) {
        showError('productError', 'Vui lòng chọn sản phẩm');
        return false;
    }
    clearError('productError');
    return true;
}

function validateQuantity() {
    const quantity = quantityInput.value.trim();
    
    if (!quantity) {
        showError('quantityError', 'Số lượng không được để trống');
        return false;
    }
    
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
        showError('quantityError', 'Số lượng phải từ 1 đến 99');
        return false;
    }
    
    if (qty > 99) {
        showError('quantityError', 'Số lượng phải từ 1 đến 99');
        return false;
    }
    
    clearError('quantityError');
    updateTotalPrice();
    return true;
}

function validateDeliveryDate() {
    const dateValue = deliveryDateInput.value;
    
    if (!dateValue) {
        showError('deliveryDateError', 'Vui lòng chọn ngày giao hàng');
        return false;
    }
    
    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError('deliveryDateError', 'Ngày giao hàng không được là ngày trong quá khứ');
        return false;
    }
    
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    
    if (selectedDate > maxDate) {
        showError('deliveryDateError', 'Ngày giao hàng không được quá 30 ngày từ hôm nay');
        return false;
    }
    
    clearError('deliveryDateError');
    return true;
}

function validateAddress() {
    const address = addressInput.value.trim();
    
    if (!address) {
        showError('addressError', 'Địa chỉ giao không được để trống');
        return false;
    }
    
    if (address.length < 10) {
        showError('addressError', 'Địa chỉ giao phải có ít nhất 10 ký tự');
        return false;
    }
    
    clearError('addressError');
    return true;
}

function validateNotes() {
    const notes = notesInput.value;
    
    if (notes && notes.length > 200) {
        showError('notesError', 'Ghi chú không được vượt quá 200 ký tự');
        return false;
    }
    
    clearError('notesError');
    return true;
}

function validatePayment() {
    const selectedPayment = Array.from(paymentInputs).some(radio => radio.checked);
    
    if (!selectedPayment) {
        showError('paymentError', 'Vui lòng chọn phương thức thanh toán');
        return false;
    }
    
    clearError('paymentError');
    return true;
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    let inputElement = null;
    
    if (fieldId === 'productError') {
        inputElement = productInput;
    } else if (fieldId === 'quantityError') {
        inputElement = quantityInput;
    } else if (fieldId === 'deliveryDateError') {
        inputElement = deliveryDateInput;
    } else if (fieldId === 'addressError') {
        inputElement = addressInput;
    } else if (fieldId === 'notesError') {
        inputElement = notesInput;
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    let inputElement = null;
    
    if (fieldId === 'productError') {
        inputElement = productInput;
    } else if (fieldId === 'quantityError') {
        inputElement = quantityInput;
    } else if (fieldId === 'deliveryDateError') {
        inputElement = deliveryDateInput;
    } else if (fieldId === 'addressError') {
        inputElement = addressInput;
    } else if (fieldId === 'notesError') {
        inputElement = notesInput;
    }
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

function updateTotalPrice() {
    const product = productInput.value;
    const quantity = parseInt(quantityInput.value) || 0;
    
    if (product && quantity > 0) {
        const total = prices[product] * quantity;
        totalAmountDisplay.textContent = total.toLocaleString('vi-VN') + 'đ';
    } else {
        totalAmountDisplay.textContent = '0đ';
    }
}

function getProductName(code) {
    const options = {
        'ao': 'Áo sơ mi',
        'quan': 'Quần tây',
        'giay': 'Giày thể thao',
        'tui': 'Túi xách',
        'non': 'Nón lưỡi trai'
    };
    return options[code] || '';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString + 'T00:00:00').toLocaleDateString('vi-VN', options);
}

function handleSubmit(e) {
    e.preventDefault();
    
    successMessage.classList.remove('show');
    
    clearError('productError');
    clearError('quantityError');
    clearError('deliveryDateError');
    clearError('addressError');
    clearError('notesError');
    clearError('paymentError');
    
    const isProductValid = validateProduct();
    const isQuantityValid = validateQuantity();
    const isDeliveryDateValid = validateDeliveryDate();
    const isAddressValid = validateAddress();
    const isNotesValid = validateNotes();
    const isPaymentValid = validatePayment();
    
    if (isProductValid && isQuantityValid && isDeliveryDateValid && 
        isAddressValid && isNotesValid && isPaymentValid) {
        
        document.getElementById('summaryProduct').textContent = getProductName(productInput.value);
        document.getElementById('summaryQuantity').textContent = quantityInput.value;
        document.getElementById('summaryDate').textContent = formatDate(deliveryDateInput.value);
        document.getElementById('summaryAddress').textContent = addressInput.value;
        document.getElementById('summaryTotal').textContent = totalAmountDisplay.textContent;
        
        confirmationModal.classList.add('show');
    }
}

btnConfirm.addEventListener('click', () => {
    confirmationModal.classList.remove('show');
    successMessage.classList.add('show');
    form.reset();
    totalAmountDisplay.textContent = '0đ';
});

btnCancel.addEventListener('click', () => {
    confirmationModal.classList.remove('show');
});

productInput.addEventListener('change', () => {
    if (productInput.classList.contains('error')) {
        validateProduct();
    }
    updateTotalPrice();
});

quantityInput.addEventListener('blur', validateQuantity);
quantityInput.addEventListener('input', () => {
    if (quantityInput.classList.contains('error')) {
        clearError('quantityError');
    }
});

deliveryDateInput.addEventListener('blur', validateDeliveryDate);
deliveryDateInput.addEventListener('change', () => {
    if (deliveryDateInput.classList.contains('error')) {
        validateDeliveryDate();
    }
});

addressInput.addEventListener('blur', validateAddress);
addressInput.addEventListener('input', () => {
    if (addressInput.classList.contains('error')) {
        clearError('addressError');
    }
});

notesInput.addEventListener('blur', validateNotes);
notesInput.addEventListener('input', () => {
    if (notesInput.classList.contains('error')) {
        clearError('notesError');
    }
});

paymentInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (document.getElementById('paymentError').classList.contains('show')) {
            clearError('paymentError');
        }
    });
});

form.addEventListener('submit', handleSubmit);}
