# 🌐 دليل نشر Backend على استضافة عادية

## 🎯 الخيارات المتاحة

لديك خياران للاستضافة:

### 1. Shared Hosting (استضافة عادية)
- **مثل:** Hostinger, Namecheap, GoDaddy
- **التكلفة:** $2-10/شهر
- **مناسب لـ:** مشاريع صغيرة ومتوسطة
- **السهولة:** ⭐⭐⭐⭐⭐

### 2. VPS (خادم افتراضي)
- **مثل:** DigitalOcean, Linode, Contabo
- **التكلفة:** $5-20/شهر
- **مناسب لـ:** مشاريع كبيرة
- **السهولة:** ⭐⭐⭐

---

## 📦 الخيار 1: Shared Hosting (الأسهل)

### الخطوة 1: اختيار استضافة

أفضل الخيارات:

#### Hostinger (موصى به)
- **السعر:** $2.99/شهر
- **الرابط:** https://www.hostinger.com
- **المميزات:**
  - ✅ Node.js مدعوم
  - ✅ لوحة تحكم سهلة
  - ✅ SSL مجاني
  - ✅ دعم عربي

#### Namecheap
- **السعر:** $3.88/شهر
- **الرابط:** https://www.namecheap.com
- **المميزات:**
  - ✅ Node.js مدعوم
  - ✅ Domain مجاني
  - ✅ SSL مجاني

---

### الخطوة 2: شراء الاستضافة

1. **اذهب إلى Hostinger**
2. **اختر خطة:** Shared Hosting
3. **اختر المدة:** سنة (أرخص)
4. **أدخل معلوماتك**
5. **ادفع** (بطاقة أو PayPal)
6. **تم!** ستصلك رسالة بالتفاصيل

---

### الخطوة 3: إعداد الاستضافة

#### 1. تسجيل الدخول لـ cPanel
- افتح الرابط من البريد
- أدخل username و password

#### 2. تفعيل Node.js
- في cPanel، ابحث عن **"Setup Node.js App"**
- اضغط **Create Application**
- املأ:
  - **Node.js version:** 18.x أو أحدث
  - **Application mode:** Production
  - **Application root:** `backend`
  - **Application URL:** `api.yourdomain.com` أو `/api`
  - **Application startup file:** `src/server.js`
- اضغط **Create**

#### 3. رفع الملفات
- في cPanel، افتح **File Manager**
- اذهب إلى مجلد `backend` (أو المجلد الذي اخترته)
- ارفع جميع ملفات Backend:
  - `src/`
  - `data/`
  - `package.json`
  - `.htaccess`
  - `ecosystem.config.js`

#### 4. تثبيت التبعيات
- في cPanel، افتح **Terminal** أو **SSH Access**
- شغّل:
```bash
cd backend
npm install
```

#### 5. تشغيل التطبيق
- ارجع لـ **Setup Node.js App**
- اضغط على تطبيقك
- اضغط **Start App** أو **Restart**

---

### الخطوة 4: اختبار Backend

افتح المتصفح:
```
https://yourdomain.com/api/health
```

يجب أن ترى:
```json
{
  "status": "OK",
  "message": "Artisan Platform API is running"
}
```

✅ **Backend يعمل!**

---

## 🖥️ الخيار 2: VPS (للمحترفين)

### الخطوة 1: شراء VPS

#### DigitalOcean (موصى به)
- **السعر:** $6/شهر
- **الرابط:** https://www.digitalocean.com
- **المميزات:**
  - ✅ سهل الاستخدام
  - ✅ سريع جداً
  - ✅ دعم ممتاز

#### Contabo (أرخص)
- **السعر:** €4/شهر
- **الرابط:** https://contabo.com
- **المميزات:**
  - ✅ رخيص جداً
  - ✅ موارد كثيرة

---

### الخطوة 2: إعداد VPS

#### 1. إنشاء Droplet (DigitalOcean)
- اضغط **Create** > **Droplets**
- اختر:
  - **Image:** Ubuntu 22.04 LTS
  - **Plan:** Basic ($6/month)
  - **Region:** قريب من المستخدمين
  - **Authentication:** SSH Key (أفضل) أو Password
- اضغط **Create Droplet**

#### 2. الاتصال بـ VPS
```bash
ssh root@your-server-ip
```

#### 3. تثبيت Node.js
```bash
# تحديث النظام
apt update && apt upgrade -y

# تثبيت Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# تحقق من التثبيت
node --version
npm --version
```

#### 4. تثبيت PM2
```bash
npm install -g pm2
```

#### 5. رفع Backend
```bash
# إنشاء مجلد
mkdir -p /var/www/artisan-backend
cd /var/www/artisan-backend

# رفع الملفات (استخدم FileZilla أو scp)
# أو استخدم git:
git clone https://github.com/YOUR-USERNAME/moroccan-artisan-platform.git .
cd backend
npm install
```

#### 6. تشغيل Backend
```bash
# باستخدام PM2
pm2 start ecosystem.config.js

# حفظ للتشغيل التلقائي
pm2 save
pm2 startup
```

#### 7. إعداد Nginx (Reverse Proxy)
```bash
# تثبيت Nginx
apt install -y nginx

# إنشاء ملف تكوين
nano /etc/nginx/sites-available/artisan-backend
```

أضف:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# تفعيل التكوين
ln -s /etc/nginx/sites-available/artisan-backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 8. إعداد SSL (HTTPS)
```bash
# تثبيت Certbot
apt install -y certbot python3-certbot-nginx

# الحصول على شهادة SSL
certbot --nginx -d yourdomain.com

# تجديد تلقائي
certbot renew --dry-run
```

---

### الخطوة 3: اختبار

```
https://yourdomain.com/api/health
```

✅ **Backend يعمل على VPS!**

---

## 🔒 الأمان (مهم جداً!)

### 1. تغيير JWT_SECRET
في `backend/.env`:
```
JWT_SECRET=your-very-secure-random-secret-key-here-2025
```

### 2. إعداد Firewall
```bash
# على VPS
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

### 3. تحديث منتظم
```bash
# كل أسبوع
apt update && apt upgrade -y
```

---

## 📊 مقارنة الخيارات

| الميزة | Shared Hosting | VPS |
|--------|----------------|-----|
| **السعر** | $3-10/شهر | $5-20/شهر |
| **السهولة** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **الأداء** | جيد | ممتاز |
| **التحكم** | محدود | كامل |
| **الصيانة** | سهلة | تحتاج خبرة |
| **مناسب لـ** | مبتدئين | محترفين |

---

## 💡 توصيتي

### للبدء (الآن):
✅ **Shared Hosting (Hostinger)**
- سهل جداً
- رخيص
- كافي للبداية

### للنمو (لاحقاً):
✅ **VPS (DigitalOcean)**
- أداء أفضل
- تحكم كامل
- للمشاريع الكبيرة

---

## 🔄 التحديثات

### على Shared Hosting:
1. ارفع الملفات الجديدة
2. في cPanel > Node.js App > Restart

### على VPS:
```bash
cd /var/www/artisan-backend/backend
git pull
npm install
pm2 restart artisan-backend
```

---

## 📞 الدعم

### مشاكل شائعة:

#### Backend لا يعمل
```bash
# تحقق من الـ logs
pm2 logs artisan-backend
```

#### Port مشغول
```bash
# غيّر PORT في .env
PORT=5001
```

#### CORS Error
تأكد من إعدادات CORS في `server.js`

---

## ✅ قائمة التحقق

قبل النشر:
- [ ] غيّرت JWT_SECRET
- [ ] رفعت جميع الملفات
- [ ] ثبّت التبعيات (npm install)
- [ ] شغّلت Backend
- [ ] اختبرت API endpoints
- [ ] إعداد SSL (HTTPS)
- [ ] Firewall مفعّل

---

**الوقت المتوقع:**
- Shared Hosting: 30 دقيقة
- VPS: 1-2 ساعة

**التكلفة:**
- Shared Hosting: $3-10/شهر
- VPS: $5-20/شهر

**النتيجة:** Backend منشور واحترافي! 🚀
