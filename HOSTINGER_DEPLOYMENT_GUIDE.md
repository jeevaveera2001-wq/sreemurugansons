# 🚀 Hostinger Deployment Guide for SREE MURUGAN SONS

This guide walks you through deploying the **SREE MURUGAN SONS** application to **Hostinger** step-by-step.

---

## 📦 Ready-to-Upload Deployment Packages

We have already generated ready-to-upload zip archives in the `deploy-hostinger/` folder:

| File | Use Case | Target Hostinger Plan |
|---|---|---|
| **`hostinger-fullstack-app.zip`** | Full-Stack (Node.js API + React Frontend) | Hostinger Cloud Hosting, Business Web Hosting (with Node.js), or Hostinger VPS |
| **`hostinger-frontend-public_html.zip`** | Static Frontend (Instant fast loading via LiteSpeed/Apache with `.htaccess`) | Hostinger Single, Premium, or Business Web Hosting |

---

## 🌐 Method 1: Hostinger hPanel with Node.js Manager (Recommended for Full-Stack)

*Available on Hostinger Cloud Hosting and plans featuring Node.js support in hPanel.*

### Step 1: Upload the Application
1. Log in to your **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the sidebar, select **Files** → **File Manager**.
4. Navigate into your website root directory (`public_html` or create a directory like `app`).
5. Click **Upload** (top right) and choose `deploy-hostinger/hostinger-fullstack-app.zip`.
6. Right-click the uploaded `.zip` file and click **Extract**. Extract all files directly into the folder.

### Step 2: Configure Node.js in hPanel
1. In hPanel, use the search bar or left sidebar to navigate to **Node.js** (under **Advanced** or **Websites**).
2. Configure the application settings:
   - **Node.js version**: Select `20.x` (or `18.x` / `22.x`).
   - **Application root**: `public_html` (or your chosen directory).
   - **Application startup file**: `server/server.js`
   - **Application mode**: `Production`
3. Click **Save** or **Create**.

### Step 3: Install Production Dependencies
- In the Node.js settings screen, click **Run npm install** (or click **NPM Packages** and install: `express`, `cors`, `dotenv`, `mongoose`).
- *Alternatively, open SSH Terminal in hPanel and run:*
  ```bash
  cd public_html
  npm install --omit=dev
  ```

### Step 4: Configure Environment Variables
Inside File Manager, verify or edit the `.env` file in the application directory:
```env
PORT=5000
CLIENT_URL=https://yourdomain.com
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sree_murugan_sons
```
*(If MongoDB URI is omitted, the server runs smoothly in resilient disk/memory fallback mode).*

### Step 5: Start / Restart the Application
Click **Start** (or **Restart**) in the Hostinger Node.js panel.
Visit your domain `https://yourdomain.com`!

---

## ⚡ Method 2: Hostinger Static Web Hosting (`public_html`)

*Ideal for Single Web Hosting plans (`https://sremurugansons.com/`).*

### Super Simple 2-Step Update:
1. In Hostinger hPanel, go to **File Manager** → navigate into `public_html`.
2. Click **Upload** (top right) → upload `deploy-hostinger/hostinger-frontend-public_html.zip`.
3. Open `https://sremurugansons.com/fix.php` in your browser (or right-click the zip in File Manager and click **Extract**).
4. That's it! Visit `https://sremurugansons.com/` to see:
   - Full-screen cinematic intro video (`gemini_generated_video_enhanced.mp4`)
   - Exact verified **Sre Murugan Sons** Google Maps listing pin with reviews, rating, and address!

> [!NOTE]
> The included `.htaccess` file automatically configures:
> - Client-side Single Page Application (SPA) routing fallback to `index.html`
> - High-performance caching headers for images, fonts, and videos
> - GZIP/Brotli compression

---

## 🖥️ Method 3: Hostinger VPS (Ubuntu / Debian KVM VPS)

If you have a Hostinger VPS with root SSH access:

### 1. Connect to your VPS
```bash
ssh root@YOUR_SERVER_IP
```

### 2. Install Node.js & Nginx
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx git unzip

# Install PM2 process manager
npm install -g pm2
```

### 3. Deploy the Bundle
```bash
mkdir -p /var/www/sree-murugan
cd /var/www/sree-murugan

# Upload hostinger-fullstack-app.zip to this folder (via SCP or SFTP), then:
unzip hostinger-fullstack-app.zip
npm install --omit=dev
```

### 4. Start with PM2
```bash
pm2 start server/server.js --name "sree-murugan"
pm2 save
pm2 startup
```

### 5. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/sree-murugan`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/sree-murugan /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 6. Enable Free SSL with Certbot
```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔍 Verification & Health Check

After deployment, test the key URLs:
- **Homepage**: `https://yourdomain.com`
- **Health Check**: `https://yourdomain.com/api/health`
- **Construction Estimator API**: `https://yourdomain.com/api/quotes/estimate?sqft=1200`
- **Contact Details**: `https://yourdomain.com/api/contact/info`
