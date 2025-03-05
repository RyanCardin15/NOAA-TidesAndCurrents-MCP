# NOAA Tides and Currents MCP Server

[![smithery badge](https://smithery.ai/badge/@RyanCardin15/tidesandcurrents)](https://smithery.ai/server/@RyanCardin15/tidesandcurrents)

This is an MCP (Model Context Protocol) server that provides tools for interacting with the NOAA Tides and Currents API using the FastMCP framework.

## Features

- Water Level data retrieval (real-time and historical)
- Tide Predictions (high/low or interval-based)
- Currents data (real-time and historical)
- Current predictions
- Station metadata retrieval
- Wind, air temperature, water temperature, and other meteorological data

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

### Installing via Smithery

To install NOAA Tides and Currents for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@RyanCardin15/tidesandcurrents):

```bash
npx -y @smithery/cli install @RyanCardin15/tidesandcurrents --client claude
```

### Manual Installation
1. Clone this repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on the `.env.example` file:

```
# Server Configuration
PORT=3000

# Transport type (stdio or sse)
TRANSPORT_TYPE=stdio

# NOAA API application name for identification (recommended)
APPLICATION_NAME=YourAppName
```

4. Build the TypeScript code

```bash
npm run build
```

5. Start the server

```bash
npm start
```

## Usage

This MCP server can be used with any MCP host such as Claude Desktop, which allows you to use the NOAA Tides and Currents API through the MCP protocol.

You can also test it directly using the `fastmcp` command-line tool:

```bash
npx fastmcp dev dist/index.js
```

Or, you can use the MCP Inspector:

```bash
npx fastmcp inspect dist/index.js
```

### Available Tools

#### Water Levels

- `get_water_levels` - Get water level data for a station
  - Parameters:
    - `station` (string) - Station ID
    - `date` (string, optional) - Date to retrieve data for ("today", "latest", "recent", or specific date)
    - `begin_date` (string, optional) - Start date (YYYYMMDD or MM/DD/YYYY)
    - `end_date` (string, optional) - End date (YYYYMMDD or MM/DD/YYYY)
    - `range` (number, optional) - Number of hours to retrieve data for
    - `datum` (string, optional) - Datum to use (MLLW, MSL, etc.)
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `time_zone` (string, optional) - Time zone (gmt, lst, lst_ldt)
    - `format` (string, optional) - Output format (json, xml, csv)

#### Tide Predictions

- `get_tide_predictions` - Get tide prediction data
  - Parameters:
    - `station` (string) - Station ID
    - `begin_date` (string) - Start date (YYYYMMDD or MM/DD/YYYY)
    - `end_date` (string) - End date (YYYYMMDD or MM/DD/YYYY)
    - `datum` (string, optional) - Datum to use (MLLW, MSL, etc.)
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `time_zone` (string, optional) - Time zone (gmt, lst, lst_ldt)
    - `interval` (string, optional) - Interval (hilo, hl, h, or a number for minutes)
    - `format` (string, optional) - Output format (json, xml, csv)

#### Currents

- `get_currents` - Get currents data for a station
  - Parameters:
    - `station` (string) - Station ID
    - `date` (string, optional) - Date to retrieve data for ("today", "latest", "recent", or specific date)
    - `begin_date` (string, optional) - Start date (YYYYMMDD or MM/DD/YYYY)
    - `end_date` (string, optional) - End date (YYYYMMDD or MM/DD/YYYY)
    - `bin` (number, optional) - Bin number
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `time_zone` (string, optional) - Time zone (gmt, lst, lst_ldt)
    - `format` (string, optional) - Output format (json, xml, csv)

#### Current Predictions

- `get_current_predictions` - Get current predictions
  - Parameters:
    - `station` (string) - Station ID
    - `date` (string, optional) - Date to retrieve data for ("today", "latest", "recent", or specific date)
    - `begin_date` (string, optional) - Start date (YYYYMMDD or MM/DD/YYYY)
    - `end_date` (string, optional) - End date (YYYYMMDD or MM/DD/YYYY)
    - `bin` (number, optional) - Bin number
    - `interval` (string, optional) - Interval (MAX_SLACK or a number for minutes)
    - `vel_type` (string, optional) - Velocity type (speed_dir or default)
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `time_zone` (string, optional) - Time zone (gmt, lst, lst_ldt)
    - `format` (string, optional) - Output format (json, xml, csv)

#### Meteorological Data

- `get_meteorological_data` - Get meteorological data
  - Parameters:
    - `station` (string) - Station ID
    - `product` (string) - Product (air_temperature, wind, etc.)
    - `date` (string, optional) - Date to retrieve data for ("today", "latest", "recent", or specific date)
    - `begin_date` (string, optional) - Start date (YYYYMMDD or MM/DD/YYYY)
    - `end_date` (string, optional) - End date (YYYYMMDD or MM/DD/YYYY)
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `time_zone` (string, optional) - Time zone (gmt, lst, lst_ldt)
    - `format` (string, optional) - Output format (json, xml, csv)

#### Station Information

- `get_stations` - Get list of stations
  - Parameters:
    - `type` (string, optional) - Station type (waterlevels, currents, etc.)
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `format` (string, optional) - Output format (json, xml)

- `get_station_details` - Get detailed information about a station
  - Parameters:
    - `station` (string) - Station ID
    - `units` (string, optional) - Units to use ("english" or "metric")
    - `format` (string, optional) - Output format (json, xml)

## API Documentation

NOAA Tides and Currents API documentation can be found at:
- CO-OPS Data API: https://api.tidesandcurrents.noaa.gov/api/prod/
- CO-OPS Metadata API: https://api.tidesandcurrents.noaa.gov/mdapi/prod/
- CO-OPS Derived Product API: https://api.tidesandcurrents.noaa.gov/dpapi/prod/

## About FastMCP

FastMCP is a TypeScript framework for building MCP servers capable of handling client sessions. It provides:

- Simple Tool, Resource, Prompt definition
- Sessions
- Image content
- Logging
- Error handling
- SSE
- Progress notifications
- Typed server events
- And more

Learn more at: https://github.com/punkpeye/fastmcp

## License

MIT 