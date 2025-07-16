# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Running
- `npm run build` - Build TypeScript to JavaScript in `dist/` directory
- `npm start` - Start the MCP server (requires build first)
- `npm run dev` - Run in development mode with ts-node-esm
- `npm run format` - Format code with Prettier
- `npm test` - Run tests with Vitest

### Testing and Development
- `npx fastmcp dev dist/index.js` - Test server with fastmcp CLI
- `npx fastmcp inspect dist/index.js` - Inspect server capabilities

## Architecture Overview

This is a FastMCP server that provides tools for accessing NOAA Tides and Currents data, moon phase information, and sun position calculations.

### Core Structure
- **Entry Point**: `src/index.ts` - Creates server, registers tools, and starts stdio transport
- **Server Configuration**: `src/server/config.ts` - FastMCP server setup with fixed stdio transport
- **Tool Registration**: `src/tools/index.ts` - Centralized tool registration hub

### Service Layer
The application follows a service-oriented architecture:
- `NoaaService` - Handles all NOAA API interactions (data and metadata APIs)
- `MoonPhaseService` - Calculates moon phases and lunar information
- `SunService` - Calculates sun position, rise/set times using suncalc library
- `NoaaParametersService` - Provides parameter definitions for NOAA API

### Tool Categories
Tools are organized by functional area:
- **Water Tools** (`water-tools.ts`) - Water levels, tide predictions, currents
- **Station Tools** (`station-tools.ts`) - Station metadata and information
- **Moon Tools** (`moon-tools.ts`) - Moon phase calculations
- **Sun Tools** (`sun-tools.ts`) - Sun position and event calculations
- **Parameter Tools** (`parameter-tools.ts`) - API parameter definitions

### Data Validation
- Uses Zod schemas for parameter validation in `src/schemas/common.ts`
- Common validation patterns for dates, stations, units, formats, etc.
- Refined validation for date parameter combinations

### API Integration
- **NOAA Data API**: `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter`
- **NOAA Metadata API**: `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi`
- Uses axios for HTTP requests with proper error handling

### Key Dependencies
- `fastmcp` - MCP server framework
- `axios` - HTTP client for NOAA API calls
- `suncalc` - Sun position and timing calculations
- `zod` - Schema validation
- TypeScript with ES modules and Node16 module resolution

## Important Implementation Notes

### MCP Server Configuration
The server uses stdio transport exclusively - do not modify to use other transports as this is designed for MCP client integration.

### Error Handling
NOAA API errors are caught and re-thrown with structured error messages including status codes and response data.

### Date Handling
The codebase supports multiple date formats and has specific validation logic for date parameter combinations (date vs begin_date/end_date).

### Tool Organization
Each tool category has its own registration function that accepts the server instance and relevant service(s). This modular approach makes it easy to add new tools or modify existing ones.