# Building the Website for Production

## Prerequisites

Install dependencies:
```bash
npm install
```

## Building Tailwind CSS

The website uses Tailwind CSS, which must be built from source to generate a production-optimized CSS file with only the classes actually used in the HTML.

To build the Tailwind CSS:
```bash
npm run build:css
```

This will:
1. Scan `index.html` and other HTML files for Tailwind classes
2. Generate a minified `tailwind.css` file with only the classes you're using
3. Significantly reduce CSS size (from 124KB CDN to ~10-20KB optimized)

## Full Build

To run all build steps:
```bash
npm run build
```

This runs:
1. Tailwind CSS build
2. Syntax highlighting pre-rendering

## Performance Optimizations Applied

1. **Self-hosted Tailwind CSS** - Replaced 124KB CDN with optimized production build
2. **Inline SVG icons** - Replaced Font Awesome CDN (15.5KB CSS + fonts) with inline SVGs
3. **Preconnect hints** - Added for Google Fonts to reduce connection time
4. **Deferred CSS** - Prism theme CSS is loaded asynchronously since code blocks are below the fold
5. **Font display swap** - Already configured in Google Fonts URL

## Expected Performance Improvements

- **Reduced render-blocking CSS**: ~140KB removed (Tailwind CDN + Font Awesome)
- **Faster initial render**: Preconnect hints reduce font loading time
- **Smaller CSS bundle**: Tailwind production build only includes used classes
- **No external font dependencies**: Inline SVGs eliminate Font Awesome font loading
