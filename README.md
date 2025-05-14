<a href="https://glama.ai/mcp/servers/ro2rz2c734">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/ro2rz2c734/badge" />

# LocalTides MCP Server

[![smithery badge](https://smithery.ai/badge/@RyanCardin15/tidesandcurrents)](https://smithery.ai/server/@RyanCardin15/tidesandcurrents)

This is an MCP (Model Context Protocol) server that provides tools for interacting with the NOAA Tides and Currents API using the FastMCP framework.

## Features

- Water Level data retrieval (real-time and historical)
- Tide Predictions (high/low or interval-based)
- Currents data (real-time and historical)
- Current predictions
- Station metadata retrieval
- Wind, air temperature, water temperature, and other meteorological data
- Moon phase information (past, present, and future)
- Sun rise/set and position data (past, present, and future)

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

3. Build the TypeScript code

```bash
npm run build
```

4. Start the server

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

#### Moon Phase Information

- `get_moon_phase` - Get moon phase information for a specific date
  - Parameters:
    - `date` (string, optional) - Date to get moon phase for (YYYY-MM-DD format). Defaults to current date.
    - `latitude` (number, optional) - Latitude for location-specific calculations
    - `longitude` (number, optional) - Longitude for location-specific calculations
    - `format` (string, optional) - Output format (json or text)

- `get_moon_phases_range` - Get moon phase information for a date range
  - Parameters:
    - `start_date` (string) - Start date (YYYY-MM-DD format)
    - `end_date` (string) - End date (YYYY-MM-DD format)
    - `latitude` (number, optional) - Latitude for location-specific calculations
    - `longitude` (number, optional) - Longitude for location-specific calculations
    - `format` (string, optional) - Output format (json or text)

- `get_next_moon_phase` - Get the next occurrence(s) of a specific moon phase
  - Parameters:
    - `phase` (string) - Moon phase to find (New Moon, First Quarter, Full Moon, Last Quarter)
    - `date` (string, optional) - Starting date (YYYY-MM-DD format). Defaults to current date.
    - `count` (number, optional) - Number of occurrences to return. Defaults to 1.
    - `format` (string, optional) - Output format (json or text)

#### Sun Rise/Set Information

- `get_sun_times` - Get sun rise/set and other sun event times for a specific date and location
  - Parameters:
    - `date` (string, optional) - Date to get sun times for (YYYY-MM-DD format). Defaults to current date.
    - `latitude` (number) - Latitude for location-specific calculations
    - `longitude` (number) - Longitude for location-specific calculations
    - `format` (string, optional) - Output format (json or text)
    - `timezone` (string, optional) - Timezone for the results. Defaults to UTC.

- `get_sun_times_range` - Get sun rise/set and other sun event times for a date range and location
  - Parameters:
    - `start_date` (string) - Start date (YYYY-MM-DD format)
    - `end_date` (string) - End date (YYYY-MM-DD format)
    - `latitude` (number) - Latitude for location-specific calculations
    - `longitude` (number) - Longitude for location-specific calculations
    - `format` (string, optional) - Output format (json or text)
    - `timezone` (string, optional) - Timezone for the results. Defaults to UTC.

- `get_sun_position` - Get sun position information for a specific date, time, and location
  - Parameters:
    - `date` (string, optional) - Date to get sun position for (YYYY-MM-DD format). Defaults to current date.
    - `time` (string, optional) - Time to get sun position for (HH:MM:SS format). Defaults to current time.
    - `latitude` (number) - Latitude for location-specific calculations
    - `longitude` (number) - Longitude for location-specific calculations
    - `format` (string, optional) - Output format (json or text)

- `get_next_sun_event` - Get the next occurrence(s) of a specific sun event
  - Parameters:
    - `event` (string) - Sun event to find (sunrise, sunset, dawn, dusk, solarNoon, etc.)
    - `date` (string, optional) - Starting date (YYYY-MM-DD format). Defaults to current date.
    - `latitude` (number) - Latitude for location-specific calculations
    - `longitude` (number) - Longitude for location-specific calculations
    - `count` (number, optional) - Number of occurrences to return. Defaults to 1.
    - `format` (string, optional) - Output format (json or text)
    - `timezone` (string, optional) - Timezone for the results. Defaults to UTC.

## API Documentation

NOAA Tides and Currents API documentation can be found at:
- CO-OPS Data API: https://api.tidesandcurrents.noaa.gov/api/prod/
- CO-OPS Metadata API: https://api.tidesandcurrents.noaa.gov/mdapi/prod/
- CO-OPS Derived Product API: https://api.tidesandcurrents.noaa.gov/dpapi/prod/

## License

MIT 
