# Corn Moon Cycles - Bitcoin & Lunar Correlations

A fun and informative website that tracks Bitcoin price action against moon cycles and other crypto seasonal patterns.

## Features

### Real-Time Data
- **Live Bitcoin Price**: Fetches current BTC price from CoinGecko API
- **24h Price Change**: Shows percentage change with color-coded indicators
- **Auto-refresh**: Updates every 60 seconds

### Moon Phase Tracking
- **Current Moon Phase**: Real-time calculation of lunar phase with emoji visualization
- **Illumination Percentage**: Shows exact moon illumination
- **Phase Predictions**: Displays historical correlations (New Moon vs Full Moon theories)
- **Cycle Position**: Visual indicator showing current position in 29.5-day lunar cycle

### Special Moon Names
- Monthly moon names (Wolf Moon, Beaver Moon, Corn Moon, etc.)
- Next special moon countdown
- Crypto-relevant descriptions for each moon

### Historical Analysis
- **30-Day Price Chart**: Interactive chart showing BTC price history
- **Moon Phase Overlay**: Chart background colors indicate moon phases
- **Tooltip Information**: Hover to see price + moon phase details

### Crypto Seasonal Patterns
- **Rektember**: September statistics (-4.78% avg, worst month)
- **Uptober**: October rally patterns (+22.90% avg)
- **November Bull**: Best month historically (+46.81% avg)
- **Q4 Rally**: Post-halving cycle information

### Educational Content
- Origin of "Corn" meme (Professor Bitcorn story)
- Moon phase trading theory explanation
- 4-year halving cycle breakdown
- Seasonal pattern analysis
- Disclaimers about correlation vs causation

## Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern, responsive design with dark theme
- **Vanilla JavaScript**: No framework dependencies
- **Chart.js**: Interactive price visualizations
- **CoinGecko API**: Free Bitcoin price data (no API key required)

## Design Philosophy

The site balances:
- **Genuine Information**: Real data, academic research citations
- **Meme Culture**: Fun references, crypto insider jokes
- **Minimalism**: Clean, modern UI
- **Accessibility**: Responsive design, clear typography

## APIs Used

### CoinGecko API
- Current Price: `https://api.coingecko.com/api/v3/simple/price`
- Historical Data: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`

**Note**: Free tier, no API key required, but rate-limited

### Moon Phase Calculation
- Uses astronomical formulas (Julian Date method)
- Client-side calculation (no external API needed)
- Accurate to ~99% for casual observation

## How to Run

Simply open [index.html](index.html) in any modern web browser. No build process or server required!

```bash
# Option 1: Direct file open
open index.html

# Option 2: Simple HTTP server (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Simple HTTP server (Node.js)
npx http-server
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Disclaimer

This website is for **entertainment and educational purposes only**.

- Not financial advice
- Past performance doesn't guarantee future results
- Moon phase correlations are controversial and not scientifically proven
- Always do your own research (DYOR)
- Only invest what you can afford to lose

## Fun Facts Included

- Why Bitcoin is called "Corn"
- Traditional Native American moon names
- "Uptober" phenomenon
- "Rektember" pattern
- Beaver Moon = Best historical returns
- Harvest Moon correlation with autumn rallies
- 4-year halving cycle patterns

## Credits

- Moon phase algorithm based on astronomical calculations
- Bitcoin price data from CoinGecko
- Historical seasonal data compiled from multiple sources
- Built with memes and data ❤️

## Future Enhancements

Possible additions:
- More years of historical data
- Halving countdown timer
- Fear & Greed Index integration
- Social sentiment tracking
- More detailed cycle analysis
- Export chart data
- Custom date range selection

---

🌽🌕 "Don't short the corn during a full moon" - Ancient crypto proverb
