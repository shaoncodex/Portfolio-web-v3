# Detailed cPanel Hosting Instructions

This document provides comprehensive instructions for hosting the Portfolio v1.0 website on cPanel.

## Prerequisites

1. A hosting account with cPanel access
2. Your domain name set up with the hosting provider
3. Your cPanel login credentials
4. The portfolio-v1.0 folder with all website files

## Step-by-Step Hosting Instructions

### 1. Prepare Your Files

Before uploading, make sure:
- All files are in the correct folders (css, js)
- All links in HTML files use relative paths
- All permissions are correctly set (see below)

### 2. Accessing cPanel

1. Open your web browser and go to: `https://yourdomain.com/cpanel` or the specific URL provided by your hosting company
2. Enter your username and password
3. You'll be directed to the cPanel dashboard

### 3. Using File Manager

1. In the cPanel dashboard, find and click on the "File Manager" icon (usually in the "Files" section)
2. When prompted, select "Web Root (public_html/www)" as the directory to open and click "Go"
3. You are now in the main directory where website files should be placed

### 4. Creating Directory (Optional)

If you want to host the portfolio in a subdirectory:

1. Click the "+ Folder" button at the top
2. Name your folder (e.g., "portfolio")
3. Click "Create New Folder"

### 5. Uploading Files

#### Method 1: Upload Files Tool

1. Navigate to the directory where you want to upload files
2. Click the "Upload" button in the top menu
3. In the upload interface, either:
   - Drag and drop your files into the upload area
   - Click "Select File" to browse and select files from your computer
4. Wait for all files to upload (progress bar will show completion)
5. Once finished, click "Go Back to..." link to return to File Manager

#### Method 2: Upload Zip and Extract

1. Compress your entire portfolio-v1.0 folder into a ZIP file on your computer
2. In File Manager, navigate to your target directory
3. Click "Upload" and upload the ZIP file
4. Once uploaded, select the ZIP file in File Manager
5. Click "Extract" from the top menu
6. Specify extraction path (usually the current directory)
7. Click "Extract File(s)"

### 6. Setting Correct Permissions

1. In File Manager, select all the uploaded files and folders
2. Click "Permissions" in the top menu (or right-click and select "Change Permissions")
3. Set the following permissions:
   - For folders: 755 (drwxr-xr-x)
   - For files: 644 (rw-r--r--)
4. Check "Apply to Directories" for the 755 permission
5. Check "Apply to Files" for the 644 permission
6. Click "Change Permissions"

### 7. Testing Your Website

1. Open a new browser tab
2. Enter the URL where your site is hosted:
   - If in root directory: `https://yourdomain.com`
   - If in subdirectory: `https://yourdomain.com/portfolio`
3. Verify all pages load correctly
4. Test all links, images, and interactive elements
5. Check the site on both desktop and mobile devices

### 8. Setting Up a Subdomain (Optional)

If you want your portfolio on a subdomain (e.g., portfolio.yourdomain.com):

1. Return to cPanel dashboard
2. Find and click on "Subdomains" (usually in the "Domains" section)
3. In the "Create a Subdomain" form:
   - Enter your desired subdomain name (e.g., "portfolio")
   - Select your domain from the dropdown
   - Set the Document Root (e.g., public_html/portfolio)
4. Click "Create"
5. Wait for DNS propagation (can take 24-48 hours)
6. Test by visiting your subdomain URL

### 9. Setting Up as Main Website (Optional)

If you want the portfolio to be your main website:

1. Ensure all portfolio files are in the public_html directory
2. Rename the original index.html to something else (e.g., old-index.html)
3. Make sure your portfolio's main HTML file is named "index.html"

## Troubleshooting Common Issues

### Images Not Displaying

1. Check file permissions (should be 644)
2. Verify image paths in HTML are correct
3. Ensure image files were uploaded properly

### CSS Not Applied

1. Check if CSS files were uploaded to the correct directory
2. Verify the paths in the HTML `<link>` tags
3. Check file permissions (should be 644)

### 404 Errors

1. Check if files exist in the correct location
2. Verify file names and paths (case sensitive)
3. Check .htaccess file if using URL rewriting

### Permission Denied Errors

1. Check folder permissions (should be 755)
2. Check file permissions (should be 644)
3. Contact hosting support if issues persist

## Best Practices

1. Always keep a backup of your website files before making changes
2. Use HTTPS instead of HTTP when possible
3. Optimize your images for web before uploading
4. Regularly check your website for broken links or other issues

## Getting Help

If you encounter issues not covered in this guide:

1. Check your hosting provider's knowledge base
2. Contact your hosting provider's support team
3. Provide specific error messages when seeking help

---

These instructions should help you successfully host your Portfolio v1.0 website on cPanel. If you need additional assistance, please contact your hosting provider's support team.
