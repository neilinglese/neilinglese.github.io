# Portfolio Maintenance Guide

## 🚀 Quick Start

Your portfolio has been completely redesigned! Here's how to use and maintain it:

## 📁 File Structure

```
├── index-new.html          # New modern site (USE THIS!)
├── index.html              # Old site (backup)
├── data/
│   └── projects.json       # All project data - EDIT THIS TO ADD PROJECTS
├── scripts/
│   └── portfolio.js        # Modern JavaScript
├── styles/
│   └── portfolio.css       # Modern custom CSS (no frameworks!)
└── images/
    └── portfolio/          # Your project images & videos
```

## ✨ Adding a New Project

Edit `data/projects.json` and add to the projects array:

```json
{
  "id": "my-project",
  "name": "My Awesome Project",
  "description": "A detailed description of what this project does and the problems it solves.",
  "technologies": ["React", "Node.js", "MongoDB", "AWS"],
  "category": "Web App",
  "media": [
    { "type": "image", "src": "images/portfolio/my-project/screenshot1.png" },
    { "type": "image", "src": "images/portfolio/my-project/screenshot2.png" },
    {
      "type": "video",
      "src": "images/portfolio/my-project/demo.mp4",
      "poster": "images/portfolio/my-project/video-thumb.png"
    }
  ],
  "thumbnail": "images/portfolio/my-project/screenshot1.png",
  "liveUrl": "https://myproject.com",
  "githubUrl": "https://github.com/you/my-project"
}
```

## 📹 Supported Media Types

### Images

```json
{ "type": "image", "src": "path/to/image.png" }
```

### Local Videos

```json
{
  "type": "video",
  "src": "path/to/video.mp4",
  "poster": "path/to/thumbnail.png"
}
```

### YouTube Videos

```json
{ "type": "youtube", "videoId": "dQw4w9WgXcQ" }
```

## 🎨 Customizing Colors

Edit `styles/portfolio.css` at the top:

```css
:root {
  --color-primary: #6366f1; /* Main brand color */
  --color-accent: #22d3ee; /* Accent color */
  --color-accent-secondary: #a855f7; /* Secondary accent */
}
```

## 📝 Project Categories

Available categories:

- `"Web App"` - Web applications
- `"Mobile App"` - iOS/Android apps
- `"Website"` - Standard websites
- `"Game"` - Games
- `"Tool"` - Utilities/developer tools

## 🚀 Deploying

When ready to go live:

```bash
# Backup old site
mv index.html index-old.html

# Use new site
mv index-new.html index.html

# Commit and push
git add .
git commit -m "New portfolio design"
git push
```

## 💡 Tips

1. **Images:** Keep under 500KB for fast loading
2. **Thumbnails:** Use 4:3 aspect ratio images
3. **Descriptions:** 2-3 sentences work best
4. **Technologies:** List 4-6 main technologies
5. **Videos:** MP4 format works best, keep under 10MB

## 🐛 Troubleshooting

**Projects not showing?**

- Check browser console (F12) for errors
- Validate JSON at jsonlint.com
- Verify image paths are correct

**Layout looks wrong?**

- Clear browser cache (Cmd+Shift+R)
- Check for CSS conflicts
