// إظهار النافذة
function createAccount() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
}

// إغلاق النافذة
function closePopup(id) {
    const popup = document.getElementById(id);
    popup.classList.add('hidden');
}

// الانتقال إلى نافذة إدخال رمز التحقق
function submitForm() {
    closePopup('popup');
    const verificationPopup = document.getElementById('verification-popup');
    verificationPopup.classList.remove('hidden');
}

// إتمام التحقق وإظهار رسالة النجاح
function completeVerification() {
    closePopup('verification-popup');
    const successPopup = document.getElementById('success-popup');
    successPopup.classList.remove('hidden');
}

// زر "الدخول إلى حسابي"
function goToAccount() {
    alert('تم الانتقال إلى صفحة إدارة الحساب (ديمو فقط)');
    closePopup('success-popup');
}
