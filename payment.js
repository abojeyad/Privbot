document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع الإرسال الفعلي للنموذج للتأكد من المدخلات
    
    // الحصول على القيم المدخلة
    const selectedPackage = document.querySelector('input[name="package"]:checked');
    const couponCode = document.getElementById('couponCode').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!selectedPackage || !paymentMethod) {
        alert('يرجى اختيار كل الخيارات المطلوبة.');
        return;
    }

    // التعامل مع الكوبون
    let discount = 0;
    if (couponCode === 'DISCOUNT40') {
        discount = 0.4; // تطبيق خصم 40%
    }

    // حساب السعر النهائي بناءً على الباقة والخصم
    let price = selectedPackage.value === 'monthly' ? 9 : 68;
    price = price - (price * discount); // تطبيق الخصم

    // إظهار رسالة التأكيد
    alert(`تم اختيار ${selectedPackage.labels[0].innerText}.`);
    alert(`طريقة الدفع: ${paymentMethod.labels[0].innerText}`);
    alert(`السعر النهائي: ${price.toFixed(2)} ريال`);

    // إعادة توجيه إلى صفحة النجاح أو صفحة الشكر
    window.location.href = 'thank_you.html'; // استبدل بـ URL صفحة الشكر
});
