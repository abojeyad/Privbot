// استمع لتغيير اختيار الباقات
document.querySelectorAll('input[name="package"]').forEach(input => {
    input.addEventListener('change', function() {
        // إزالة التأثير (الإطار الخارجي) من جميع الباقات
        document.querySelectorAll('.package').forEach(packageDiv => {
            packageDiv.classList.remove('selected');
        });
        
        // إضافة التأثير (الإطار الخارجي) للمربع الذي تم اختياره
        const selectedPackage = this.closest('.package');
        selectedPackage.classList.add('selected');
    });
});

// تعامل مع زر "تسجيل جديد" لإظهار النموذج
document.getElementById("newRegistrationBtn").addEventListener("click", function() {
    // أظهر النموذج لتسجيل جديد
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("renewForm").style.display = "none";  // إخفاء نموذج تجديد الاشتراك

    // تفعيل زر "تسجيل جديد" و تعطيل زر "تجديد الاشتراك"
    this.classList.add("active");
    document.getElementById("renewSubscriptionBtn").classList.remove("active");
});

// تعامل مع زر "تجديد الاشتراك" لإظهار النموذج
document.getElementById("renewSubscriptionBtn").addEventListener("click", function() {
    // إظهار نموذج تجديد الاشتراك
    document.getElementById("renewForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";  // إخفاء نموذج التسجيل الجديد

    // تفعيل زر "تجديد الاشتراك" و تعطيل زر "تسجيل جديد"
    this.classList.add("active");
    document.getElementById("newRegistrationBtn").classList.remove("active");
});

// عند إرسال نموذج "تجديد الاشتراك"، تحقق من صحة البيانات
document.getElementById("renewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailOrPhone = document.getElementById("renewEmailOrPhone").value;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    const packageSelected = document.querySelector('input[name="package"]:checked');
    
    // تحقق من صحة البريد الإلكتروني أو رقم الجوال
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        alert("يرجى إدخال بريد إلكتروني صالح أو رقم جوال صالح.");
        return;
    }
    
    // تحقق من اختيار الباقة
    if (!packageSelected) {
        alert("يرجى اختيار الباقة المناسبة.");
        return;
    }

    // فتح نافذة الدفع
    openPaymentPopup();
});

// عند إرسال نموذج "تسجيل جديد"، تحقق من صحة البيانات
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();  // منع الإرسال الافتراضي للنموذج

    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const packageSelected = document.querySelector('input[name="package"]:checked');
    
    // تحقق من صحة رقم الجوال
    if (!phoneRegex.test(phone)) {
        alert("يرجى إدخال رقم جوال صالح يتكون من 10 أرقام.");
        return;
    }
    
    // تحقق من صحة البريد الإلكتروني
    if (!emailRegex.test(email)) {
        alert("يرجى إدخال بريد إلكتروني صالح.");
        return;
    }
    
    // تحقق من اختيار الباقة
    if (!packageSelected) {
        alert("يرجى اختيار الباقة المناسبة.");
        return;
    }

    // إذا كانت جميع البيانات صحيحة، افتح نافذة الدفع
    openPaymentPopup();
});

// فتح نافذة الدفع بعد التحقق من البيانات
function openPaymentPopup() {
    const popup = document.createElement("div");
    popup.className = "payment-popup-overlay";
    popup.innerHTML = `
        <div class="payment-popup">
            <h2>إتمام الدفع</h2>
            <div class="form-group">
                <label for="cardHolderName">اسم حامل البطاقة:</label>
                <input type="text" id="cardHolderName" name="cardHolderName" placeholder="أدخل اسم حامل البطاقة">
            </div>
            <div class="form-group">
                <label for="creditCard">رقم البطاقة الائتمانية:</label>
                <input type="text" id="creditCard" name="creditCard" placeholder="أدخل رقم البطاقة الائتمانية">
            </div>
            <div class="form-group">
                <label for="expiryDate">تاريخ الانتهاء:</label>
                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY">
            </div>
            <div class="form-group">
                <label for="cvv">رمز التحقق (CVV):</label>
                <input type="text" id="cvv" name="cvv" placeholder="أدخل رمز التحقق">
            </div>
            <div class="form-group">
                <button id="confirmPayment">تأكيد الدفع</button>
                <button id="cancelPayment">إلغاء</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // إغلاق نافذة الدفع عند الضغط على إلغاء
    document.getElementById("cancelPayment").addEventListener("click", function() {
        document.body.removeChild(popup);
    });

    // إغلاق نافذة الدفع عند الضغط على تأكيد
    document.getElementById("confirmPayment").addEventListener("click", function() {
        // تحقق من إدخال جميع الحقول
        const cardHolderName = document.getElementById("cardHolderName").value;
        const creditCard = document.getElementById("creditCard").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;
        
        if (cardHolderName && creditCard && expiryDate && cvv) {
            alert("تم تأكيد الدفع!");
            document.body.removeChild(popup);
        } else {
            alert("يرجى تعبئة جميع الحقول.");
        }
    });
}
