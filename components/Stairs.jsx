import React from 'react'
import {motion} from 'framer-motion'

// تعريف كائن يحتوي على إعدادات الرسوم المتحركة
const stairAnimation = {
    initial: {
        top: '0%', // الوضع الابتدائي للعنصر (في أعلى الشاشة)
    },
    animate: {
        top: "100%", // الوضع النهائي للعنصر (في أسفل الشاشة)
    },
    exit: {
        top: ["100%", "0%"], // الوضع عند الخروج (يبدأ من أسفل الشاشة وينتقل إلى أعلى الشاشة)
    }
}

// دالة لعكس فهرس العنصر
const reverseIndex = (index) => {
    const totalSteps = 6; // عدد الخطوات (الدرجات)
    return totalSteps - index - 1; // حساب الفهرس المعكوس
}

// مكون Stairs
const Stairs = () => {
  return (
    <>
        {/* إنشاء مصفوفة من 6 عناصر باستخدام دالة map */}
        {[...Array(6)].map((_, index) => {
            return (
                <motion.div 
                    key={index} // تعيين مفتاح فريد لكل عنصر
                    variants={stairAnimation} // تعيين إعدادات الرسوم المتحركة
                    initial="initial" // تعيين الحالة الابتدائية
                    animate="animate" // تعيين الحالة المتحركة
                    exit="exit" // تعيين حالة الخروج
                    transition={{ 
                        duration: 0.4, // مدة الرسوم المتحركة
                        ease: "easeInOut", // نوع التسهيل
                        delay: reverseIndex(index) * 0.1, // تأخير الرسوم المتحركة بناءً على الفهرس المعكوس
                    }} 
                    className='relative w-full h-full bg-accent-hover opacity-15' // تعيين الفئات CSS للعنصر
                />
            )
        })}
    </>
  )
}

export default Stairs // تصدير المكون Stairs