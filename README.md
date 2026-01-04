# Control Path Website

Static website for Control Path with CSS-only syntax highlighting.

## Syntax Highlighting

This website uses **pre-rendered syntax highlighting** - code blocks are highlighted at build time, so no JavaScript is needed in the browser. Only CSS is required at runtime.

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run the highlight script to pre-render syntax highlighting:
```bash
npm run highlight
```

Or directly:
```bash
node highlight.js
```

### How It Works

1. The `highlight.js` script processes all HTML files
2. It finds all `<code class="language-xxx">` blocks
3. Uses Prism.js to highlight the code and add HTML spans with CSS classes
4. The HTML is updated with the highlighted code
5. At runtime, only the CSS file (`prism-theme.css`) is needed - no JavaScript!

### Supported Languages

- TypeScript (`language-typescript`)
- JavaScript (`language-javascript`)
- YAML (`language-yaml`)
- Bash (`language-bash`)
- Plain text (`language-plaintext`)

### Workflow

1. Edit HTML files with code blocks using `class="language-xxx"`
2. Run `npm run highlight` to pre-render highlighting
3. Deploy the static files (HTML + CSS, no JS needed)

