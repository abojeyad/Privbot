// عند تحميل الصفحة، تظهر نافذة إدخال البريد أو الهاتف فقط
window.onload = function() {
    document.body.classList.add('popup-active');
    document.getElementById('popup').style.display = 'flex'; // إظهار النافذة الأولى
    document.getElementById('popupVerify').style.display = 'none'; // إخفاء النافذة الثانية
};

// الانتقال إلى النافذة الثانية بعد إدخال البريد أو الهاتف
function sendCode() {
    document.getElementById('popup').style.display = 'none'; // إخفاء النافذة الأولى
    document.getElementById('popupVerify').style.display = 'flex'; // إظهار النافذة الثانية
}

// عند الضغط على "دخول"، يتم إغلاق النوافذ وإظهار الصفحة
function verifyCode() {
    document.getElementById('popupVerify').style.display = 'none'; // إخفاء النافذة الثانية
    document.body.classList.remove('popup-active');
    document.body.classList.add('popup-closed'); // إظهار المحتوى
}

// فتح نافذة إضافة فرع جديد
function openAddBranchPopup() {
    document.getElementById('addBranchPopup').style.display = 'flex';
}

// إغلاق نافذة إضافة فرع جديد
function closeAddBranchPopup() {
    document.getElementById('addBranchPopup').style.display = 'none';
}

// إضافة الفرع إلى البطاقة
function addBranch() {
    const branchName = document.getElementById('branchName').value;
    const branchCountry = document.getElementById('branchCountry').value;
    const branchCity = document.getElementById('branchCity').value;

    if (branchName && branchCountry && branchCity) {
        const newBranchCard = document.createElement('div');
        newBranchCard.classList.add('branchCard');
        newBranchCard.innerHTML = `
            <p>${branchName} <span class="status disabled">معطل</span></p>
            <p>انتهاء الاشتراك: غير معروف</p>
            <button onclick="openAddBranchPopup()">تعديل</button>
            <button onclick="openPaymentPage()">تجديد اشتراك</button>
        `;

        document.getElementById('branchesContainer').appendChild(newBranchCard);
        closeAddBranchPopup(); // إغلاق النافذة بعد الإضافة
    }
}

function openPaymentPage() {
    // فتح صفحة الدفع (افتراضيًا صفحة الدفع يجب أن تكون صفحة منفصلة)
    window.location.href = 'payment.html';
}
