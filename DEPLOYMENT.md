# 🚀 دليل النشر للإنتاج | Deployment Guide

## نظرة عامة

هذا الدليل يشرح كيفية نشر منصة الحرفيين على خادم إنتاج.

---

## 📋 المتطلبات

### الخادم
- **نظام التشغيل:** Linux (Ubuntu 20.04+ موصى به) أو Windows Server
- **Node.js:** 18.x أو أحدث
- **الذاكرة:** 2GB RAM على الأقل
- **المساحة:** 5GB على الأقل
- **المنافذ:** 80 (HTTP) و 443 (HTTPS)

### الخدمات الإضافية
- **Nginx** - كـ Reverse Proxy
- **PM2** - لإدارة العمليات
- **SSL Certificate** - Let's Encrypt (مجاني)

---

## 🔧 الإعداد الأولي

### 1. تثبيت Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# تحقق من التثبيت
node --version
npm --version
```

### 2. تثبيت PM2

```bash
sudo npm install -g pm2
```

### 3. تثبيت Nginx

```bash
sudo apt update
sudo apt install nginx
```

---

## 📦 نشر Backend

### 1. رفع الملفات

```bash
# على الخادم
mkdir -p /var/www/artisan-platform
cd /var/www/artisan-platform

# رفع ملفات backend
# يمكن استخدام git clone أو scp
```

### 2. تكوين البيئة

```bash
cd backend
cp .env.example .env
nano .env
```

**محتوى `.env` للإنتاج:**
```env
PORT=5000
JWT_SECRET=your-super-secure-random-string-here-change-this
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

⚠️ **مهم:** غيّر `JWT_SECRET` إلى قيمة عشوائية آمنة!

### 3. تثبيت التبعيات

```bash
npm install --production
```

### 4. تهيئة قاعدة البيانات

```bash
npm run seed
```

### 5. تشغيل Backend مع PM2

```bash
pm2 start src/server.js --name artisan-backend
pm2 save
pm2 startup
```

---

## 🎨 نشر Frontend

### 1. بناء التطبيق

```bash
cd frontend
npm install
npm run build
```

### 2. تشغيل Frontend مع PM2

```bash
pm2 start npm --name artisan-frontend -- start
pm2 save
```

---

## 🌐 إعداد Nginx

### 1. إنشاء ملف التكوين

```bash
sudo nano /etc/nginx/sites-available/artisan-platform
```

### 2. محتوى التكوين

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. تفعيل التكوين

```bash
sudo ln -s /etc/nginx/sites-available/artisan-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 إعداد SSL (HTTPS)

### 1. تثبيت Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. الحصول على شهادة SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

### 3. التجديد التلقائي

```bash
sudo certbot renew --dry-run
```

---

## 🗄️ الانتقال إلى PostgreSQL (اختياري)

### 1. تثبيت PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib
```

### 2. إنشاء قاعدة البيانات

```bash
sudo -u postgres psql
CREATE DATABASE artisan_platform;
CREATE USER artisan_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE artisan_platform TO artisan_user;
\q
```

### 3. تحديث الكود

استبدل LowDB بـ Prisma أو Sequelize للاتصال بـ PostgreSQL.

---

## 📊 المراقبة والصيانة

### مراقبة العمليات

```bash
# عرض جميع العمليات
pm2 list

# عرض السجلات
pm2 logs

# عرض سجلات عملية محددة
pm2 logs artisan-backend

# إعادة تشغيل
pm2 restart artisan-backend
pm2 restart artisan-frontend

# إيقاف
pm2 stop artisan-backend
pm2 stop artisan-frontend
```

### النسخ الاحتياطي

```bash
# نسخ احتياطي لقاعدة البيانات
cp /var/www/artisan-platform/backend/data/db.json /backup/db-$(date +%Y%m%d).json

# أتمتة النسخ الاحتياطي (cron)
crontab -e
# أضف: 0 2 * * * cp /var/www/artisan-platform/backend/data/db.json /backup/db-$(date +\%Y\%m\%d).json
```

### تحديث التطبيق

```bash
cd /var/www/artisan-platform

# Backend
cd backend
git pull  # أو رفع الملفات الجديدة
npm install --production
pm2 restart artisan-backend

# Frontend
cd ../frontend
git pull
npm install
npm run build
pm2 restart artisan-frontend
```

---

## 🔥 Firewall

```bash
# السماح بـ HTTP و HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

---

## 🎯 قائمة التحقق النهائية

- [ ] تم تثبيت Node.js و PM2
- [ ] تم رفع ملفات Backend و Frontend
- [ ] تم تكوين `.env` بقيم آمنة
- [ ] تم تشغيل Backend و Frontend مع PM2
- [ ] تم إعداد Nginx كـ Reverse Proxy
- [ ] تم الحصول على شهادة SSL
- [ ] تم إعداد Firewall
- [ ] تم اختبار التطبيق على الدومين
- [ ] تم إعداد النسخ الاحتياطي التلقائي
- [ ] تم إعداد المراقبة

---

## 🌍 خيارات النشر السحابية

### Vercel (Frontend فقط)
```bash
cd frontend
npm install -g vercel
vercel
```

### Heroku (Backend + Frontend)
```bash
# إنشاء Procfile
echo "web: npm start" > Procfile
git add .
git commit -m "Deploy to Heroku"
heroku create artisan-platform
git push heroku main
```

### DigitalOcean App Platform
- رفع الكود إلى GitHub
- ربط المستودع مع DigitalOcean
- تكوين متغيرات البيئة
- النشر التلقائي

### AWS (EC2 + RDS)
- إنشاء EC2 instance
- إنشاء RDS PostgreSQL
- اتباع خطوات النشر اليدوي أعلاه

---

## 🔧 استكشاف الأخطاء

### Backend لا يعمل
```bash
pm2 logs artisan-backend
# تحقق من المنفذ
netstat -tulpn | grep 5000
```

### Frontend لا يعمل
```bash
pm2 logs artisan-frontend
# تحقق من المنفذ
netstat -tulpn | grep 3000
```

### Nginx لا يعمل
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 📈 تحسين الأداء

### 1. تفعيل Gzip في Nginx

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. تفعيل Cache

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. زيادة موارد PM2

```bash
pm2 start src/server.js --name artisan-backend -i max
```

---

## 🎉 تهانينا!

تطبيقك الآن يعمل في الإنتاج! 🚀

للدعم والمساعدة، راجع:
- `README.md` - التوثيق الكامل
- `TESTING.md` - دليل الاختبار
- `PROJECT_STATUS.md` - حالة المشروع

---

**ملاحظة:** هذا الدليل يغطي النشر الأساسي. للبيئات الإنتاجية الكبيرة، يُنصح باستخدام:
- Load Balancer
- Database Clustering
- CDN للملفات الثابتة
- Monitoring Tools (Datadog, New Relic)
- Logging Service (ELK Stack)
