let currentStep = 1;
const totalSteps = 3;
const formData = {
    fullname: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const form = document.getElementById('multiStepForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const successMessage = document.getElementById('successMessage');
const fullnameInput = document.getElementById('fullname');
const dobInput = document.getElementById('dob');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');


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
    
    clearError('fullnameError');
    return true;
}

function validateDob() {
    const dob = dobInput.value;
    
    if (!dob) {
        showError('dobError', 'Ngày sinh không được để trống');
        return false;
    }
    
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        showError('dobError', 'Bạn phải từ 18 tuổi trở lên');
        return false;
    }
    
    clearError('dobError');
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

function validateConfirmCheckbox() {
    const checkbox = document.getElementById('confirmCheckbox');
    
    if (!checkbox.checked) {
        showError('confirmCheckboxError', 'Vui lòng xác nhận thông tin');
        return false;
    }
    
    clearError('confirmCheckboxError');
    return true;
}

function validateStep(step) {
    if (step === 1) {
        return validateFullname() && validateDob() && validateGender();
    } else if (step === 2) {
        return validateEmail() && validatePassword() && validateConfirmPassword();
    } else if (step === 3) {
        return validateConfirmCheckbox();
    }
    return false;
}

function saveFormData() {
    formData.fullname = fullnameInput.value.trim();
    formData.dob = dobInput.value;
    formData.gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    formData.email = emailInput.value.trim();
    formData.password = passwordInput.value;
    formData.confirmPassword = confirmPasswordInput.value;
}

function restoreFormData() {
    fullnameInput.value = formData.fullname;
    dobInput.value = formData.dob;
    emailInput.value = formData.email;
    passwordInput.value = formData.password;
    confirmPasswordInput.value = formData.confirmPassword;
    
    if (formData.gender) {
        document.querySelector(`input[name="gender"][value="${formData.gender}"]`).checked = true;
    }
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

function updateProgress() {
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `Bước ${currentStep}/${totalSteps}`;
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    
    if (step === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    } else if (step === totalSteps) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    
    updateProgress();
}

function populateReview() {
    document.getElementById('reviewFullname').textContent = formData.fullname || '-';
    document.getElementById('reviewDob').textContent = formData.dob || '-';
    
    const genderMap = { male: 'Nam', female: 'Nữ', other: 'Khác' };
    document.getElementById('reviewGender').textContent = genderMap[formData.gender] || '-';
    document.getElementById('reviewEmail').textContent = formData.email || '-';
}

function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
}

nextBtn.addEventListener('click', () => {
    const isValid = validateStep(currentStep);
    
    if (isValid) {
        saveFormData();
        
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            
            if (currentStep === totalSteps) {
                populateReview();
            }
            
            restoreFormData();
            
            if (currentStep === 2) {
                updatePasswordStrength();
            }
        }
    }
});

prevBtn.addEventListener('click', () => {
    saveFormData();
    
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        restoreFormData();
        
        if (currentStep === 2) {
            updatePasswordStrength();
        }
    }
});


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
        saveFormData();
        form.style.display = 'none';
        successMessage.classList.add('show');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

fullnameInput.addEventListener('blur', validateFullname);
fullnameInput.addEventListener('input', () => {
    if (fullnameInput.classList.contains('error')) {
    }
});

dobInput.addEventListener('blur', validateDob);
dobInput.addEventListener('input', () => {
    if (dobInput.classList.contains('error')) {
        clearError('dobError');
    }
});

genderInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (document.getElementById('genderError').classList.contains('show')) {
            clearError('genderError');
        }
    });
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        clearError('emailError');
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

togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    togglePasswordVisibility();
});

document.getElementById('confirmCheckbox').addEventListener('change', () => {
    if (document.getElementById('confirmCheckboxError').classList.contains('show')) {
        clearError('confirmCheckboxError');
    }
});

showStep(currentStep);
