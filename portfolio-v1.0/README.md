# Mobile App-Like Portfolio (v1.0)

A clean, responsive HTML/CSS portfolio with a mobile app-like user interface.

## Features

- Mobile app-like UI with status bar and bottom navigation
- Fully responsive design
- Smooth page transitions
- Mobile-first approach
- Touch-friendly interface
- Sections for: About, Projects, Skills, and Contact

## File Structure

```
portfolio-v1.0/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # Documentation
```

## Customization

To customize this portfolio:

1. Replace the profile image and project images with your own
2. Update the personal information in the HTML file
3. Modify the skills and project details
4. Update contact information
5. Adjust colors by changing CSS variables in `:root` section

## Hosting on cPanel

### Step 1: Prepare your files

Make sure all files are properly organized in the portfolio-v1.0 folder with the correct structure.

### Step 2: Access cPanel

1. Log in to your cPanel account (typically at yourdomain.com/cpanel)
2. Look for the "File Manager" icon in the cPanel dashboard and click on it

### Step 3: Navigate to public_html

1. In the File Manager, navigate to the "public_html" directory (or "www" or "htdocs" depending on your host)
2. This is the root directory where your website files should be placed

### Step 4: Upload your files

1. Click on the "Upload" button in the File Manager
2. Select all files from your portfolio-v1.0 folder
3. Upload them to the desired directory:
   - To host at yourdomain.com: upload to public_html
   - To host at yourdomain.com/portfolio: create a "portfolio" folder and upload there

### Step 5: Set permissions

1. After uploading, select all files and folders
2. Click on "Permissions" or "Change Permissions"
3. Set permissions:
   - Files: 644
   - Folders: 755
4. Apply permissions recursively to all files and folders

### Step 6: Test your website

1. Open your browser and navigate to your domain (yourdomain.com or yourdomain.com/portfolio)
2. Test all links and features to ensure everything works properly

### Step 7: Add domain or subdomain (optional)

If you want to host on a subdomain (e.g., portfolio.yourdomain.com):

1. Go back to cPanel dashboard
2. Find "Subdomains" and create a new subdomain
3. Point it to the folder containing your portfolio files
4. Wait for DNS propagation (may take up to 24 hours)

## Note

This portfolio is designed to give the look and feel of a mobile app while being a standard responsive website. The mobile app design elements are purely aesthetic.
