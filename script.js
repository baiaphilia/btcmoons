// Moon phase calculation
function calculateMoonPhase(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate Julian Date
    let jd;
    if (month <= 2) {
        year--;
        month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;

    // Calculate days since known new moon (Jan 6, 2000)
    const daysSinceNewMoon = jd - 2451549.5;
    const newMoons = daysSinceNewMoon / 29.53058867;
    const phase = (newMoons - Math.floor(newMoons)) * 29.53058867;

    // Calculate illumination
    const illumination = (1 - Math.cos((phase / 29.53058867) * 2 * Math.PI)) / 2;

    return {
        phase: phase,
        illumination: illumination,
        age: phase,
        phaseName: getMoonPhaseName(phase),
        phaseEmoji: getMoonPhaseEmoji(phase)
    };
}

function getMoonPhaseName(phase) {
    if (phase < 1.84566) return "New Moon";
    else if (phase < 5.53699) return "Waxing Crescent";
    else if (phase < 9.22831) return "First Quarter";
    else if (phase < 12.91963) return "Waxing Gibbous";
    else if (phase < 16.61096) return "Full Moon";
    else if (phase < 20.30228) return "Waning Gibbous";
    else if (phase < 23.99361) return "Last Quarter";
    else if (phase < 27.68493) return "Waning Crescent";
    else return "New Moon";
}

function getMoonPhaseEmoji(phase) {
    if (phase < 1.84566) return "🌑";
    else if (phase < 5.53699) return "🌒";
    else if (phase < 9.22831) return "🌓";
    else if (phase < 12.91963) return "🌔";
    else if (phase < 16.61096) return "🌕";
    else if (phase < 20.30228) return "🌖";
    else if (phase < 23.99361) return "🌗";
    else if (phase < 27.68493) return "🌘";
    else return "🌑";
}

// Get the active phase marker index
function getActivePhaseIndex(phase) {
    if (phase < 3.69) return 0; // New
    else if (phase < 7.38) return 1; // Waxing Crescent
    else if (phase < 11.07) return 2; // First Quarter
    else if (phase < 14.76) return 3; // Waxing Gibbous
    else if (phase < 18.45) return 4; // Full
    else if (phase < 22.14) return 5; // Waning Gibbous
    else if (phase < 25.83) return 6; // Last Quarter
    else if (phase < 29.53) return 7; // Waning Crescent
    else return 0; // New
}

// Get special moon names by month
const SPECIAL_MOONS = [
    { month: 0, name: "Wolf Moon", emoji: "🐺" },
    { month: 1, name: "Snow Moon", emoji: "❄️" },
    { month: 2, name: "Worm Moon", emoji: "🪱" },
    { month: 3, name: "Pink Moon", emoji: "🌸" },
    { month: 4, name: "Flower Moon", emoji: "🌺" },
    { month: 5, name: "Strawberry Moon", emoji: "🍓" },
    { month: 6, name: "Buck Moon", emoji: "🦌" },
    { month: 7, name: "Sturgeon Moon", emoji: "🐟" },
    { month: 8, name: "Corn Moon", emoji: "🌽" },
    { month: 9, name: "Hunter's Moon", emoji: "🏹" },
    { month: 10, name: "Beaver Moon", emoji: "🦫" },
    { month: 11, name: "Cold Moon", emoji: "🥶" }
];

// Find next full moon and new moon
function findNextMoonEvents() {
    const now = new Date();
    const events = [];

    // Check next 60 days for moon events
    for (let i = 0; i < 60; i++) {
        const checkDate = new Date(now);
        checkDate.setDate(now.getDate() + i);
        const moonData = calculateMoonPhase(checkDate);

        // Full moon (around day 14-16)
        if (moonData.age >= 14.5 && moonData.age <= 15.5) {
            const specialMoon = SPECIAL_MOONS[checkDate.getMonth()];
            if (!events.some(e => e.type === 'full')) {
                events.push({
                    type: 'full',
                    date: checkDate,
                    specialMoon: specialMoon
                });
            }
        }

        // New moon (around day 0-1 or 29-30)
        if (moonData.age <= 0.5 || moonData.age >= 29.0) {
            if (!events.some(e => e.type === 'new')) {
                events.push({
                    type: 'new',
                    date: checkDate
                });
            }
        }

        // Stop after we found both
        if (events.length >= 2) break;
    }

    // Sort by date
    events.sort((a, b) => a.date - b.date);

    return events;
}

// Update Moon Phase Display
function updateMoonPhase() {
    const now = new Date();
    const moonData = calculateMoonPhase(now);

    document.getElementById('moon-name').textContent = moonData.phaseName;
    document.getElementById('moon-illumination').textContent =
        `${(moonData.illumination * 100).toFixed(1)}% illuminated`;

    // Update cycle indicator
    const cycleDay = Math.floor(moonData.age);
    document.getElementById('cycle-days').textContent = `Day ${cycleDay} of 29.5`;

    // Highlight active phase
    const phaseMarkers = document.querySelectorAll('.phase-marker');
    phaseMarkers.forEach(marker => marker.classList.remove('active'));
    const activeIndex = getActivePhaseIndex(moonData.age);
    phaseMarkers[activeIndex].classList.add('active');
}

// Update Upcoming Moon Events
function updateUpcomingEvents() {
    const events = findNextMoonEvents();
    const container = document.getElementById('upcoming-events');
    container.innerHTML = '';

    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'upcoming-event';

        const icon = document.createElement('span');
        icon.className = 'event-icon';

        const info = document.createElement('div');
        info.className = 'event-info';

        const type = document.createElement('div');
        type.className = 'event-type';

        const datetime = document.createElement('div');
        datetime.className = 'event-datetime';

        if (event.type === 'full') {
            icon.textContent = '🌕';
            type.textContent = 'Full Moon (Bull)';
            datetime.textContent = event.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });

            // Add special moon if it's the same month
            if (event.specialMoon) {
                const specialDiv = document.createElement('div');
                specialDiv.className = 'upcoming-event';
                const specialIcon = document.createElement('span');
                specialIcon.className = 'event-icon';
                specialIcon.textContent = event.specialMoon.emoji;
                const specialInfo = document.createElement('div');
                specialInfo.className = 'event-info';
                const specialType = document.createElement('div');
                specialType.className = 'event-type';
                specialType.textContent = event.specialMoon.name;
                const specialDate = document.createElement('div');
                specialDate.className = 'event-datetime';
                specialDate.textContent = event.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                specialInfo.appendChild(specialType);
                specialInfo.appendChild(specialDate);
                specialDiv.appendChild(specialIcon);
                specialDiv.appendChild(specialInfo);
                container.appendChild(specialDiv);
            }
        } else {
            icon.textContent = '🌑';
            type.textContent = 'New Moon (Bear)';
            datetime.textContent = event.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        info.appendChild(type);
        info.appendChild(datetime);
        eventDiv.appendChild(icon);
        eventDiv.appendChild(info);
        container.appendChild(eventDiv);
    });
}

// Fetch Historical Bitcoin Data
async function fetchHistoricalData(days = 365) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`);
        const data = await response.json();

        return data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp),
            price: price
        }));
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
}

// Find moon phase events (full and new moons)
function findMoonEvents(historicalData) {
    const events = [];
    let lastPhase = null;

    historicalData.forEach((point, index) => {
        const moonData = calculateMoonPhase(point.date);

        // Detect full moon (around day 15 of cycle)
        if (moonData.age >= 13.5 && moonData.age <= 16.5) {
            if (!lastPhase || lastPhase !== 'full' || index > 0) {
                const isFullMoon = !events.some(e =>
                    e.type === 'full' &&
                    Math.abs(e.index - index) < 10
                );
                if (isFullMoon) {
                    events.push({
                        type: 'full',
                        index: index,
                        date: point.date,
                        price: point.price
                    });
                    lastPhase = 'full';
                }
            }
        }

        // Detect new moon (around day 0/29 of cycle)
        if (moonData.age <= 1.5 || moonData.age >= 28) {
            if (!lastPhase || lastPhase !== 'new' || index > 0) {
                const isNewMoon = !events.some(e =>
                    e.type === 'new' &&
                    Math.abs(e.index - index) < 10
                );
                if (isNewMoon) {
                    events.push({
                        type: 'new',
                        index: index,
                        date: point.date,
                        price: point.price
                    });
                    lastPhase = 'new';
                }
            }
        }
    });

    return events;
}

// Create Price Chart with zoom and pan
let priceChart = null;

async function createPriceChart() {
    const historicalData = await fetchHistoricalData(365);

    if (historicalData.length === 0) {
        return;
    }

    // Calculate moon phases for each data point
    const labels = [];
    const prices = [];
    const moonPhases = [];

    historicalData.forEach(point => {
        labels.push(point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        prices.push(point.price);
        const moonData = calculateMoonPhase(point.date);
        moonPhases.push(moonData);
    });

    // Find moon events
    const moonEvents = findMoonEvents(historicalData);

    // Create annotation arrays for Chart.js
    const annotations = {};

    // Add full and new moon markers
    moonEvents.forEach((event, idx) => {
        annotations[`moon_${idx}`] = {
            type: 'point',
            xValue: event.index,
            yValue: event.price,
            backgroundColor: event.type === 'full' ? 'rgba(255, 215, 0, 0.8)' : 'rgba(100, 100, 255, 0.8)',
            radius: 8,
            borderColor: '#fff',
            borderWidth: 2
        };
    });

    const ctx = document.getElementById('price-chart').getContext('2d');

    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'BTC Price (USD)',
                data: prices,
                borderColor: '#f7931a',
                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#f7931a',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1a1f3a',
                    titleColor: '#e8eaed',
                    bodyColor: '#9aa0a6',
                    borderColor: '#2a2f4a',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const price = context.parsed.y;
                            const moonData = moonPhases[context.dataIndex];

                            // Check if this point is a moon event
                            const event = moonEvents.find(e => e.index === context.dataIndex);

                            const lines = [
                                `Price: $${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                                `Moon: ${moonData.phaseEmoji} ${moonData.phaseName}`
                            ];

                            if (event) {
                                lines.push(event.type === 'full' ? '🌕 FULL MOON (Bull)' : '🌑 NEW MOON (Bear)');
                            }

                            return lines;
                        }
                    }
                },
                annotation: {
                    annotations: annotations
                },
                zoom: {
                    limits: {
                        x: {min: 'original', max: 'original'}
                    },
                    pan: {
                        enabled: true,
                        mode: 'x'
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                            speed: 0.05
                        },
                        mode: 'x'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#2a2f4a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9aa0a6',
                        maxRotation: 45,
                        minRotation: 45,
                        maxTicksLimit: 20
                    }
                },
                y: {
                    grid: {
                        color: '#2a2f4a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9aa0a6',
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            onHover: function(event, activeElements) {
                event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'grab';
            }
        }
    });

    // Add double-click to reset zoom
    const canvas = document.getElementById('price-chart');
    canvas.addEventListener('dblclick', function() {
        priceChart.resetZoom();
    });
}

// Initialize everything
async function init() {
    updateMoonPhase();
    updateUpcomingEvents();
    await createPriceChart();

    // Update moon phase every minute
    setInterval(() => {
        updateMoonPhase();
        updateUpcomingEvents();
    }, 60000);
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
