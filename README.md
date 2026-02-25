# Web Based Calculator App

A modern, responsive web calculator with smooth animations and a clean interface.

## Features

✨ **Modern Design**
- Dark theme with gradient background
- Smooth animations and transitions
- Touch-friendly interface

🔢 **Basic Operations**
- Addition (+)
- Subtraction (−)
- Multiplication (×)
- Division (÷)

🎨 **Animations**
- Button press effects with ripple
- Hover states for all buttons
- Result display animation
- Error shake animation

📱 **Responsive**
- Mobile-friendly (320px+)
- Tablet optimized
- Desktop ready

## Installation

No installation required! This is a pure HTML/CSS/JavaScript application with no dependencies.

### Local Testing

Option 1: Open directly in browser
```bash
# Navigate to the src directory
cd src/

# Open index.html in your browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

Option 2: Using Python HTTP server
```bash
# From the project root
python3 -m http.server 8000

# Open in browser
# http://localhost:8000/src/
```

Option 3: Using Node.js HTTP server
```bash
npx http-server -p 8000

# Open in browser
# http://localhost:8000/src/
```

## Deployment

### GitHub Pages

1. Create a new GitHub repository
2. Push the project files
3. Go to Settings → Pages
4. Select `main` branch and `/docs` or `/root` folder
5. Your site will be available at `https://yourusername.github.io/calculator-app/`

### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. From the project root: `netlify deploy --prod`
3. Follow the prompts to deploy

### Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. From the project root: `vercel --prod`
3. Follow the prompts to deploy

## File Structure

```
calculator-app/
├── README.md              # This file
├── prd/
│   └── prd-v1.md         # Product requirements
├── tasks/
│   └── tasks-v1.md       # Task list
└── src/
    ├── index.html        # Main HTML file
    ├── style.css         # Styles and animations
    └── script.js         # Calculator logic
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Keyboard Support

- Numbers: `0-9`
- Decimal: `.`
- Operations: `+`, `-`, `*`, `/`
- Equals: `Enter` or `=`
- Clear: `Escape` or `C`
- Delete: `Backspace`

## Performance

- Page load: < 1 second on 3G
- Button press response: < 50ms
- No external dependencies
- Pure vanilla JavaScript

## Testing

Manual testing checklist:

- [ ] All number buttons (0-9) work
- [ ] Decimal point works
- [ ] All operations (+, −, ×, ÷) work correctly
- [ ] Clear button resets calculator
- [ ] Delete button removes last digit
- [ ] Equals button calculates result
- [ ] Division by zero shows "Error"
- [ ] Chain operations work (e.g., 5 + 3 × 2)
- [ ] Animations are smooth
- [ ] Responsive on mobile (320px+)
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Keyboard input works
- [ ] No console errors

## Error Handling

- Division by zero: Displays "Error"
- Floating point precision: Handled with 10 decimal place precision
- Large numbers: Scientific notation for numbers ≥ 1e12 or < 1e-9
- Maximum input: 12 digits
- Overflow/underflow: Displays "Error"

## License

MIT License - feel free to use for any purpose!

## Credits

Created with ❤️ using pure HTML, CSS, and JavaScript.
