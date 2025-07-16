# 🌊 NOAA Tides & Currents MCP Server

<div align="center">

[![npm version](https://img.shields.io/npm/v/@ryancardin/noaa-tides-currents-mcp-server?style=for-the-badge&logo=npm&color=blue)](https://www.npmjs.com/package/@ryancardin/noaa-tides-currents-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Model_Context_Protocol-green?style=for-the-badge)](https://modelcontextprotocol.io/)

[![smithery badge](https://smithery.ai/badge/@RyanCardin15/noaa-tidesandcurrents-mcp)](https://smithery.ai/server/@RyanCardin15/noaa-tidesandcurrents-mcp)

**🚀 Lightning-fast access to NOAA's oceanic and atmospheric data through MCP**

*Your one-stop solution for tides, currents, weather, astronomy, and climate data*

[📦 Quick Start](#-quick-start) • [🛠️ Tools](#️-available-tools) • [📖 Examples](#-usage-examples) • [🏗️ Advanced](#️-advanced-usage)

</div>

---

## ✨ What Makes This Awesome

🌊 **25+ Specialized Tools** - From basic tide data to advanced climate projections  
⚡ **Lightning Fast** - Built on FastMCP for optimal performance  
🎯 **Zero Config** - Works out of the box with Claude Desktop  
🌍 **Comprehensive Data** - Water levels, currents, weather, moon phases, sun data  
📊 **Climate Research Ready** - Sea level trends, flooding projections, extreme events  
🚀 **NPX Ready** - Install and run with a single command  

---

## 🚀 Quick Start

### ⚡ NPX Installation (Recommended)

```bash
# Install and run immediately - no setup required!
npx @ryancardin/noaa-tides-currents-mcp-server

# Or use the shorter alias
npx noaa-mcp
```

#### 🔌 Transport Modes

**STDIO Mode (Default - MCP Protocol)**
```bash
# Standard MCP server for Claude Desktop integration
npx @ryancardin/noaa-tides-currents-mcp-server

# Or use the shorter alias
npx noaa-mcp
```

**HTTP Streamable Mode (Web Integration)**
```bash
# Start HTTP server on default port 3000
npx @ryancardin/noaa-tides-currents-mcp-server --http

# Specify custom port
npx @ryancardin/noaa-tides-currents-mcp-server --http --port 8080

# Using shorter alias
npx noaa-mcp --http --port 8080

# Access via Server-Sent Events
curl http://localhost:3000/sse
```

### 🎯 Claude Desktop Integration

Install directly to Claude Desktop via [Smithery](https://smithery.ai/server/@RyanCardin15/tidesandcurrents):

```bash
npx -y @smithery/cli install @RyanCardin15/tidesandcurrents --client claude
```

### 🔧 Manual Development Setup

```bash
# Clone and build
git clone https://github.com/RyanCardin15/NOAA-Tides-And-Currents-MCP.git
cd NOAA-Tides-And-Currents-MCP
npm install && npm run build

# Start the server
npm start

# Test with FastMCP
npx fastmcp dev dist/index.js
```

---

## 🛠️ Available Tools

<details>
<summary><strong>🌊 Water Data Tools (6 tools)</strong></summary>

### Water Levels & Tides
- **`get_water_levels`** - Real-time and historical water level data
- **`get_tide_predictions`** - High/low tide predictions and continuous data
- **`get_currents`** - Real-time and historical current measurements  
- **`get_current_predictions`** - Current speed and direction forecasts
- **`get_meteorological_data`** - Wind, air temp, water temp, pressure, etc.

### Station Information
- **`get_stations`** - Search and list monitoring stations
- **`get_station_details`** - Detailed station metadata and capabilities

</details>

<details>
<summary><strong>🔬 Climate & Research Tools (9 tools)</strong></summary>

### Sea Level Analysis
- **`get_sea_level_trends`** - Long-term sea level rise trends and rates
- **`get_extreme_water_levels`** - Statistical analysis of extreme events

### High Tide Flooding Analysis
- **`get_high_tide_flooding_daily`** - Daily flood event counts
- **`get_high_tide_flooding_monthly`** - Monthly flooding patterns
- **`get_high_tide_flooding_seasonal`** - Seasonal flood analysis
- **`get_high_tide_flooding_annual`** - Yearly flooding trends
- **`get_high_tide_flooding_projections`** - Future flood risk scenarios
- **`get_high_tide_flooding_likelihoods`** - Daily flood probability

### Historical Extremes
- **`get_top_ten_water_levels`** - Highest/lowest water levels on record

</details>

<details>
<summary><strong>🌙 Astronomy Tools (7 tools)</strong></summary>

### Moon Phase Calculations
- **`get_moon_phase`** - Current moon phase and illumination
- **`get_moon_phases_range`** - Moon phases over date ranges
- **`get_next_moon_phase`** - Find next new/full/quarter moons

### Solar Calculations  
- **`get_sun_times`** - Sunrise, sunset, dawn, dusk times
- **`get_sun_times_range`** - Solar times over date ranges
- **`get_sun_position`** - Real-time sun azimuth and elevation
- **`get_next_sun_event`** - Next sunrise, sunset, or solar noon

</details>

<details>
<summary><strong>⚙️ Configuration Tools (1 tool)</strong></summary>

### API Parameters
- **`get_parameter_definitions`** - Valid values for all API parameters

</details>

---

## 📖 Usage Examples

### 🌊 Get Current Tide Conditions

```bash
# Get latest water levels for Boston Harbor
get_water_levels station="8443970" date="latest"

# Get today's tide predictions for Miami
get_tide_predictions station="8723214" begin_date="today" end_date="today" interval="hilo"
```

### 🌀 Hurricane Preparedness 

```bash
# Get extreme water level statistics for storm planning
get_extreme_water_levels station="8518750" units="english"

# Check flooding likelihood for tomorrow
get_high_tide_flooding_likelihoods station="8518750" date="2024-12-16" threshold="minor"
```

### 🔬 Climate Research

```bash
# Analyze 30-year sea level trends
get_sea_level_trends station="8518750" affiliation="US"

# Get high tide flooding projections for 2050s under intermediate sea level rise
get_high_tide_flooding_projections station="8518750" scenario="intermediate" decade="2050s"
```

### 🌙 Astronomy & Navigation

```bash
# Get tonight's moon phase for navigation
get_moon_phase date="2024-12-15" latitude="42.3601" longitude="-71.0589"

# Calculate sunrise/sunset for sailing
get_sun_times date="2024-12-15" latitude="25.7617" longitude="-80.1918" timezone="America/New_York"
```

### 🎣 Fishing & Recreation

```bash
# Best fishing times with current predictions
get_current_predictions station="ACT0446" date="today" interval="MAX_SLACK"

# Wind and weather conditions
get_meteorological_data station="8443970" product="wind" date="today"
```

---

## 🏗️ Advanced Usage

### 🔧 Development & Testing

```bash
# Run in development mode (stdio)
npm run dev

# Development with HTTP transport
npm run dev:http

# Production builds with different transports
npm start                    # STDIO mode (default)
npm run start:http          # HTTP on port 3000
npm run start:http:3001     # HTTP on port 3001
npm run start:http:8080     # HTTP on port 8080

# Inspect server capabilities
npx fastmcp inspect dist/index.js
```

### 🌐 HTTP Stream Integration

When running in HTTP mode, the server provides Server-Sent Events (SSE) at `/sse`:

```bash
# Start HTTP server
npx @ryancardin/noaa-tides-currents-mcp-server --http --port 3000

# Test the endpoint
curl -N http://localhost:3000/sse

# Or integrate with web applications
fetch('http://localhost:3000/sse')
  .then(response => response.body.getReader())
  .then(reader => {
    // Handle streaming MCP responses
  });
```

**Use Cases for HTTP Mode:**
- 🌐 **Web Applications** - Integrate with React, Vue, Angular apps
- 📱 **Mobile Apps** - REST-like access from mobile applications  
- 🔗 **API Gateways** - Proxy through load balancers or API gateways
- 🧪 **Testing** - Easy curl-based testing and debugging

### 📊 Data Formats & Export

All tools support multiple output formats:
- **JSON** (default) - Perfect for programmatic use
- **XML** - Legacy system integration  
- **CSV** - Direct spreadsheet import

### 🌍 Global Station Coverage

- **13,000+ stations** worldwide
- **Real-time data** from NOAA's CO-OPS network
- **Historical records** dating back decades
- **Global tide predictions** and current forecasts

---

## 🚦 API Endpoints

This server integrates with three NOAA APIs:

| API | Purpose | Base URL |
|-----|---------|----------|
| **Data API** | Real-time observations & predictions | `api.tidesandcurrents.noaa.gov/api/prod/` |
| **Metadata API** | Station information & capabilities | `api.tidesandcurrents.noaa.gov/mdapi/prod/` |
| **Derived Products API** | Climate analysis & research data | `api.tidesandcurrents.noaa.gov/dpapi/prod/` |

---

## 🛠️ Technical Details

### Architecture
- **🚀 FastMCP Framework** - High-performance MCP server
- **📝 TypeScript** - Full type safety and IntelliSense
- **🔧 Zod Validation** - Runtime parameter validation
- **⚡ Axios HTTP Client** - Reliable API communication
- **🌙 SunCalc Integration** - Precise astronomical calculations

### Transport Options
- **📡 STDIO Transport** - Standard MCP protocol for desktop clients
- **🌐 HTTP Stream Transport** - Server-Sent Events for web integration
- **🔄 Dual Mode Support** - Switch between transports via command-line flags

### System Requirements
- **Node.js** 18+ 
- **NPM** 8+
- **MCP Client** (Claude Desktop, etc.)

### Package Size
- **📦 Bundled**: 43.9 KB
- **📂 Installed**: 286.2 KB
- **⚡ Load Time**: <100ms

---

## 🐛 Troubleshooting

<details>
<summary><strong>Common Issues & Solutions</strong></summary>

### Server Won't Start
```bash
# Check Node.js version
node --version  # Should be 18+

# Rebuild TypeScript
npm run build
```

### API Errors
- **Invalid Station ID**: Use `get_stations` to find valid stations
- **Date Format Issues**: Use YYYYMMDD or MM/DD/YYYY formats
- **Rate Limiting**: NOAA APIs have usage limits - space out requests

### MCP Connection Issues
- Ensure Claude Desktop MCP settings are configured correctly
- Check that the server binary has execute permissions: `chmod +x dist/index.js`

</details>

---

## 📈 Roadmap

- [ ] 🌊 **Real-time Alerts** - Webhook support for tide/weather alerts
- [ ] 📱 **Mobile SDK** - React Native integration
- [ ] 🗺️ **GIS Integration** - Shapefile and KML export
- [ ] 🤖 **AI Insights** - Automated pattern recognition
- [ ] ⚡ **GraphQL API** - Modern query interface
- [ ] 🌐 **Multi-language** - I18n support

---

## 🤝 Contributing

We love contributions! Here's how to get started:

1. **🍴 Fork** the repository
2. **🌿 Branch** for your feature (`git checkout -b amazing-feature`)
3. **💻 Code** your improvements
4. **✅ Test** with `npm test`
5. **📤 Submit** a pull request

### Development Commands
```bash
npm run build    # Build TypeScript
npm run dev      # Development mode  
npm run test     # Run test suite
npm run format   # Format with Prettier
```

---

## 📄 License

**MIT License** - see [LICENSE](LICENSE) file for details.

Built with ❤️ by [Ryan Cardin](https://github.com/RyanCardin15)

---

## 🔗 Links & Resources

- **📦 NPM Package**: [@ryancardin/noaa-tides-currents-mcp-server](https://www.npmjs.com/package/@ryancardin/noaa-tides-currents-mcp-server)
- **🏪 Smithery**: [Auto-install for Claude Desktop](https://smithery.ai/server/@RyanCardin15/noaa-tidesandcurrents-mcp)  
- **🌊 NOAA CO-OPS**: [Official NOAA Data Portal](https://tidesandcurrents.noaa.gov/)
- **🤖 MCP Protocol**: [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- **⚡ FastMCP**: [FastMCP Framework](https://github.com/jlowin/fastmcp)

<div align="center">

**⭐ Star this repo if it helped you!**

Made possible by NOAA's commitment to open oceanic data 🌊

</div>