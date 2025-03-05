import { FastMCP } from 'fastmcp';
import dotenv from 'dotenv';
import { z } from 'zod';
import { NoaaService } from './noaa-service.js';

// Load environment variables
dotenv.config();

// Common parameter schemas
const StationSchema = z.string().min(1).describe('Station ID');
const DateSchema = z.string().optional().describe('Date to retrieve data for ("today", "latest", "recent", or specific date)');
const BeginDateSchema = z.string().optional().describe('Start date (YYYYMMDD or MM/DD/YYYY)');
const EndDateSchema = z.string().optional().describe('End date (YYYYMMDD or MM/DD/YYYY)');
const RangeSchema = z.number().optional().describe('Number of hours to retrieve data for');
const DatumSchema = z.string().optional().describe('Datum to use (MLLW, MSL, etc.)');
const UnitsSchema = z.enum(['english', 'metric']).optional().describe('Units to use ("english" or "metric")');
const TimeZoneSchema = z.enum(['gmt', 'lst', 'lst_ldt']).optional().describe('Time zone (gmt, lst, lst_ldt)');
const FormatSchema = z.enum(['json', 'xml', 'csv']).optional().describe('Output format (json, xml, csv)');
const BinSchema = z.number().optional().describe('Bin number');
const IntervalSchema = z.string().optional().describe('Interval (hilo, hl, h, or a number for minutes)');

// Create NOAA service
const noaaService = new NoaaService({
  applicationName: process.env.APPLICATION_NAME || 'NOAA_MCP_Server'
});

// Create the MCP server
const server = new FastMCP({
  name: 'NOAA Tides and Currents MCP Server',
  version: '1.0.0'
});

// Add water levels tool
server.addTool({
  name: 'get_water_levels',
  description: 'Get water level data for a station',
  parameters: z.object({
    station: StationSchema,
    date: DateSchema,
    begin_date: BeginDateSchema,
    end_date: EndDateSchema,
    range: RangeSchema,
    datum: DatumSchema,
    units: UnitsSchema,
    time_zone: TimeZoneSchema,
    format: FormatSchema,
  }).refine(
    data => (data.date || (data.begin_date && data.end_date) || (data.begin_date && data.range) || (data.end_date && data.range) || data.range),
    { message: "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'" }
  ),
  execute: async (params) => {
    try {
      const result = await noaaService.getWaterLevels(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get water levels: ${error.message}`);
      }
      throw new Error('Failed to get water levels');
    }
  }
});

// Add tide predictions tool
server.addTool({
  name: 'get_tide_predictions',
  description: 'Get tide prediction data',
  parameters: z.object({
    station: StationSchema,
    begin_date: BeginDateSchema,
    end_date: EndDateSchema,
    date: DateSchema,
    range: RangeSchema,
    datum: DatumSchema,
    units: UnitsSchema,
    time_zone: TimeZoneSchema,
    interval: IntervalSchema,
    format: FormatSchema,
  }).refine(
    data => (data.date || (data.begin_date && data.end_date) || (data.begin_date && data.range) || (data.end_date && data.range) || data.range),
    { message: "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'" }
  ),
  execute: async (params) => {
    try {
      const result = await noaaService.getTidePredictions(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get tide predictions: ${error.message}`);
      }
      throw new Error('Failed to get tide predictions');
    }
  }
});

// Add currents tool
server.addTool({
  name: 'get_currents',
  description: 'Get currents data for a station',
  parameters: z.object({
    station: StationSchema,
    date: DateSchema,
    begin_date: BeginDateSchema,
    end_date: EndDateSchema,
    range: RangeSchema,
    bin: BinSchema,
    units: UnitsSchema,
    time_zone: TimeZoneSchema,
    format: FormatSchema,
  }).refine(
    data => (data.date || (data.begin_date && data.end_date) || (data.begin_date && data.range) || (data.end_date && data.range) || data.range),
    { message: "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'" }
  ),
  execute: async (params) => {
    try {
      const result = await noaaService.getCurrents(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get currents: ${error.message}`);
      }
      throw new Error('Failed to get currents');
    }
  }
});

// Add current predictions tool
server.addTool({
  name: 'get_current_predictions',
  description: 'Get current predictions',
  parameters: z.object({
    station: StationSchema,
    date: DateSchema,
    begin_date: BeginDateSchema,
    end_date: EndDateSchema,
    range: RangeSchema,
    bin: BinSchema,
    interval: z.string().optional().describe('Interval (MAX_SLACK or a number for minutes)'),
    vel_type: z.enum(['speed_dir', 'default']).optional().describe('Velocity type (speed_dir or default)'),
    units: UnitsSchema,
    time_zone: TimeZoneSchema,
    format: FormatSchema,
  }).refine(
    data => (data.date || (data.begin_date && data.end_date) || (data.begin_date && data.range) || (data.end_date && data.range) || data.range),
    { message: "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'" }
  ),
  execute: async (params) => {
    try {
      const result = await noaaService.getCurrentPredictions(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get current predictions: ${error.message}`);
      }
      throw new Error('Failed to get current predictions');
    }
  }
});

// Add meteorological data tool
server.addTool({
  name: 'get_meteorological_data',
  description: 'Get meteorological data',
  parameters: z.object({
    station: StationSchema,
    product: z.string().min(1).describe('Product (air_temperature, wind, etc.)'),
    date: DateSchema,
    begin_date: BeginDateSchema,
    end_date: EndDateSchema,
    range: RangeSchema,
    units: UnitsSchema,
    time_zone: TimeZoneSchema,
    format: FormatSchema,
  }).refine(
    data => (data.date || (data.begin_date && data.end_date) || (data.begin_date && data.range) || (data.end_date && data.range) || data.range),
    { message: "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'" }
  ),
  execute: async (params) => {
    try {
      const result = await noaaService.getMeteorologicalData(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get meteorological data: ${error.message}`);
      }
      throw new Error('Failed to get meteorological data');
    }
  }
});

// Add stations tool
server.addTool({
  name: 'get_stations',
  description: 'Get list of stations',
  parameters: z.object({
    type: z.string().optional().describe('Station type (waterlevels, currents, etc.)'),
    units: UnitsSchema,
    format: z.enum(['json', 'xml']).optional().describe('Output format (json, xml)'),
  }),
  execute: async (params) => {
    try {
      const result = await noaaService.getStations(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get stations: ${error.message}`);
      }
      throw new Error('Failed to get stations');
    }
  }
});

// Add station details tool
server.addTool({
  name: 'get_station_details',
  description: 'Get detailed information about a station',
  parameters: z.object({
    station: StationSchema,
    units: UnitsSchema,
    format: z.enum(['json', 'xml']).optional().describe('Output format (json, xml)'),
  }),
  execute: async (params) => {
    try {
      const result = await noaaService.getStationDetails(params);
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get station details: ${error.message}`);
      }
      throw new Error('Failed to get station details');
    }
  }
});

// Start the server
const transportType = process.env.TRANSPORT_TYPE || 'stdio';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

if (transportType === 'stdio') {
  server.start({ 
    transportType: 'stdio'
  });
} else if (transportType === 'sse') {
  server.start({ 
    transportType: 'sse',
    sse: {
      endpoint: '/mcp',
      port: PORT
    }
  });
} 