const form = document.getElementById('registerForm');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const termsInput = document.getElementById('terms');
const successMessage = document.getElementById('successMessage');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');
const charCounter = document.getElementById('charCounter');

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    if (/[A-Z]/.test(password)) strength++;
    
    if (/[a-z]/.test(password)) strength++;
    
    if (/[0-9]/.test(password)) strength++;
    
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrength() {
    const password = passwordInput.value;
    
    if (!password) {
        strengthIndicator.className = 'strength-indicator';
        strengthText.textContent = '';
        strengthText.className = 'strength-text';
        return;
    }
    
    const strength = calculatePasswordStrength(password);
    
    strengthIndicator.className = 'strength-indicator';
    strengthText.className = 'strength-text';
    
    if (strength <= 2) {
        strengthIndicator.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Yếu';
    } else if (strength <= 4) {
        strengthIndicator.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Trung bình';
    } else {
        strengthIndicator.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Mạnh';
    }
}

function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
}

function updateCharCounter() {
    const length = fullnameInput.value.length;
    charCounter.textContent = `${length}/50`;
    
    if (length > 40) {
        charCounter.style.color = '#e74c3c';
    } else if (length > 30) {
        charCounter.style.color = '#f39c12';
    } else {
        charCounter.style.color = '#999';
    }
}

function validateFullname() {
    const fullname = fullnameInput.value.trim();
    
    if (!fullname) {
        showError('fullnameError', 'Họ và tên không được để trống');
        return false;
    }
    
    if (fullname.length < 3) {
        showError('fullnameError', 'Họ và tên phải có ít nhất 3 ký tự');
        return false;
    }
    
    if (fullname[0] === ' ') {
        showError('fullnameError', 'Họ và tên không được bắt đầu bằng khoảng trắng');
        return false;
    }
    
    if (fullname.split(' ').filter(word => word).length > 3) {
        showError('fullnameError', 'Họ và tên không được chứa quá 1 khoảng trắng');
        return false;
    }
    
    clearError('fullnameError');
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('emailError', 'Email không được để trống');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('emailError', 'Email phải đúng định dạng (name@domain.com)');
        return false;
    }
    
    clearError('emailError');
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showError('phoneError', 'Số điện thoại không được để trống');
        return false;
    }
    
    if (!/^\d{10}$/.test(phone)) {
        showError('phoneError', 'Số điện thoại phải có đúng 10 chữ số');
        return false;
    }
    
    if (phone[0] === '0') {
        showError('phoneError', 'Số điện thoại không được bắt đầu bằng 0');
        return false;
    }
    
    clearError('phoneError');
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        showError('passwordError', 'Mật khẩu không được để trống');
        return false;
    }
    
    if (password.length < 8) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 8 ký tự');
        return false;
    }
    
    if (!/[A-Z]/.test(password)) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 1 chữ hoa');
        return false;
    }
    
    if (!/[a-z]/.test(password)) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 1 chữ thường');
        return false;
    }
    
    if (!/[0-9]/.test(password)) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 1 chữ số');
        return false;
    }
    
    clearError('passwordError');
    return true;
}

function validateConfirmPassword() {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;
    
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Xác nhận mật khẩu không được để trống');
        return false;
    }
    
    if (confirmPassword !== password) {
        showError('confirmPasswordError', 'Xác nhận mật khẩu phải trùng với mật khẩu');
        return false;
    }
    
    clearError('confirmPasswordError');
    return true;
}

function validateGender() {
    const selectedGender = Array.from(genderInputs).some(radio => radio.checked);
    
    if (!selectedGender) {
        showError('genderError', 'Vui lòng chọn giới tính');
        return false;
    }
    
    clearError('genderError');
    return true;
}

function validateTerms() {
    if (!termsInput.checked) {
        showError('termsError', 'Vui lòng đồng ý với điều khoản sử dụng');
        return false;
    }
    
    clearError('termsError');
    return true;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    const inputId = fieldId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    const inputId = fieldId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

function handleSubmit(e) {
    e.preventDefault();
    
    successMessage.classList.remove('show');
    
    clearError('fullnameError');
    clearError('emailError');
    clearError('phoneError');
    clearError('passwordError');
    clearError('confirmPasswordError');
    clearError('genderError');
    clearError('termsError');
    
    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();
    
    if (isFullnameValid && isEmailValid && isPhoneValid && isPasswordValid && 
        isConfirmPasswordValid && isGenderValid && isTermsValid) {
        successMessage.classList.add('show');
    }
}

fullnameInput.addEventListener('blur', validateFullname);
fullnameInput.addEventListener('input', () => {
    updateCharCounter();
    if (fullnameInput.classList.contains('error')) {
        clearError('fullnameError');
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        clearError('emailError');
    }
});

phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('input', () => {
    if (phoneInput.classList.contains('error')) {
        clearError('phoneError');
    }
});

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', () => {
    updatePasswordStrength();
    if (passwordInput.classList.contains('error')) {
        clearError('passwordError');
    }
});

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('error')) {
        clearError('confirmPasswordError');
    }
});

genderInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (document.getElementById('genderError').classList.contains('show')) {
            clearError('genderError');
        }
    });
});

termsInput.addEventListener('change', () => {
    if (document.getElementById('termsError').classList.contains('show')) {
        clearError('termsError');
    }
});

form.addEventListener('submit', handleSubmit);

togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    togglePasswordVisibility();
});

updateCharCounter();
