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
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("renewForm").style.display = "none";  // إخفاء نموذج تجديد الاشتراك

    // تفعيل زر "تسجيل جديد" و تعطيل زر "تجديد الاشتراك"
    this.classList.add("active");
    document.getElementById("renewSubscriptionBtn").classList.remove("active");
});

// تعامل مع زر "تجديد الاشتراك" لإظهار النموذج
document.getElementById("renewSubscriptionBtn").addEventListener("click", function() {
    document.getElementById("renewForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";  // إخفاء نموذج التسجيل الجديد

    // تفعيل زر "تجديد الاشتراك" و تعطيل زر "تسجيل جديد"
    this.classList.add("active");
    document.getElementById("newRegistrationBtn").classList.remove("active");
});

// عند إرسال نموذج "تجديد الاشتراك"
document.getElementById("renewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailOrPhone = document.getElementById("renewEmailOrPhone").value;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    const packageSelected = document.querySelector('input[name="package"]:checked');

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        alert("يرجى إدخال بريد إلكتروني صالح أو رقم جوال صالح.");
        return;
    }

    if (!packageSelected) {
        alert("يرجى اختيار الباقة المناسبة.");
        return;
    }

    openPaymentPopup();
});

// عند إرسال نموذج "تسجيل جديد"
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const packageSelected = document.querySelector('input[name="package"]:checked');

    if (!phoneRegex.test(phone)) {
        alert("يرجى إدخال رقم جوال صالح يتكون من 10 أرقام.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("يرجى إدخال بريد إلكتروني صالح.");
        return;
    }

    if (!packageSelected) {
        alert("يرجى اختيار الباقة المناسبة.");
        return;
    }

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
                <input type="text" id="cardHolderName" name="cardHolderName" placeholder="أدخل اسم حامل البطاقة" value="أحمد محمد">
            </div>
            <div class="form-group">
                <label for="creditCard">رقم البطاقة الائتمانية:</label>
                <input type="text" id="creditCard" name="creditCard" placeholder="أدخل رقم البطاقة الائتمانية" value="4111 1111 1111 1111">
            </div>
            <div class="form-group">
                <label for="expiryDate">تاريخ الانتهاء:</label>
                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" value="12/25">
            </div>
            <div class="form-group">
                <label for="cvv">رمز التحقق (CVV):</label>
                <input type="text" id="cvv" name="cvv" placeholder="أدخل رمز التحقق" value="123">
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
            // إزالة نافذة الدفع
            document.body.removeChild(popup);
            
            // فتح صفحة جديدة تحتوي على رسالة شكر
            openThankYouPage();
        } else {
            alert("يرجى تعبئة جميع الحقول.");
        }
    });
}



// فتح نافذة الدفع بعد التحقق من البيانات
function openPaymentPopup() {
    const popup = document.createElement("div");
    popup.className = "payment-popup-overlay";
    popup.innerHTML = `
        <div class="payment-popup">
            <h2>إتمام الدفع</h2>
            <div class="form-group">
                <label for="cardHolderName">اسم حامل البطاقة:</label>
                <input type="text" id="cardHolderName" name="cardHolderName" placeholder="أدخل اسم حامل البطاقة" value="أحمد محمد">
            </div>
            <div class="form-group">
                <label for="creditCard">رقم البطاقة الائتمانية:</label>
                <input type="text" id="creditCard" name="creditCard" placeholder="أدخل رقم البطاقة الائتمانية" value="4111 1111 1111 1111">
            </div>
            <div class="form-group">
                <label for="expiryDate">تاريخ الانتهاء:</label>
                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" value="12/25">
            </div>
            <div class="form-group">
                <label for="cvv">رمز التحقق (CVV):</label>
                <input type="text" id="cvv" name="cvv" placeholder="أدخل رمز التحقق" value="123">
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
            // إغلاق نافذة الدفع
            document.body.removeChild(popup);

            // فتح صفحة الشكر بعد تأكيد الدفع
            openThankYouPopup();
        } else {
            alert("يرجى تعبئة جميع الحقول.");
        }
    });
}





// فتح صفحة الشكر بعد الدفع
function openThankYouPopup() {
    const thankYouPopup = document.createElement("div");
    thankYouPopup.className = "thank-you-page-overlay";
    thankYouPopup.innerHTML = `
        <div class="thank-you-page">
            <h2>شكرا لإشتراكك معنا</h2>
            <div class="link-container">
				<p>
					تم إنشاء صفحة التقييم الخاصة بك بنجاح!<br>
					يمكنك الآن مشاركة هذا الرابط مع عملائك الكرام لتمكينهم من تقييم خدماتك ومشاركة آرائهم حول تجربتهم في محلك.<br>
					رباط صفحة التقييم الخاصة بك<br>
					<a href="mylink.html" target="_blank">mylink.com</a>
				</p>
                <span class="copy-link-icon" id="copyLinkIcon"/span>
            </div>
            <div class="form-group">
				<button id="copyLinkButton">نسخ الرابط</button> <!-- زر نسخ الرابط -->
                <button id="downloadQRCode">تنزيل صورة QR</button>
            </div>
            <div class="mystore-bot-container">
			     <p>يمكنك متابعة جميع التقييمات وقراءة ملاحظات وآراء عملائك من خلال الدخول إلى البوت التالي: mystore.bot@ على تليجرام أو واتساب</p>
                <span class="copy-link-icon" id="copyLinkIcon2"/span>
            </div>
            <div class="form-group">
                <button id="closeThankYouPopup">إغلاق</button> <!-- زر إغلاق -->
            </div>
        </div>
    `;
    document.body.appendChild(thankYouPopup);

    // إغلاق نافذة الشكر عند الضغط على "إغلاق"
    document.getElementById("closeThankYouPopup").addEventListener("click", function() {
        document.body.removeChild(thankYouPopup);
    });

    // نسخ الرابط الأول عند النقر على أيقونة "نسخ الرابط"
    document.getElementById("copyLinkIcon").addEventListener("click", function() {
        const link = "https://demo-link.com"; // رابط ديمو
        navigator.clipboard.writeText(link).then(() => {
            alert("تم نسخ الرابط!");
        });
    });

    // تنزيل صورة كود QR عند النقر على "تنزيل الصورة"
    document.getElementById("downloadQRCode").addEventListener("click", function() {
        const qrImage = document.querySelector(".qr-code");
        const link = document.createElement("a");
        link.href = qrImage.src;
        link.download = "qr_code.png";
        link.click();
    });
}
