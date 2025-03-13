import { FastMCP } from 'fastmcp';
import dotenv from 'dotenv';
import { z } from 'zod';
import { NoaaService } from './noaa-service.js';
import { MoonPhaseService, MoonPhaseParamsSchema, MoonPhasesRangeParamsSchema, NextMoonPhaseParamsSchema } from './moon-phase-service.js';
import { SunService, SunTimesParamsSchema, SunTimesRangeParamsSchema, SunPositionParamsSchema, NextSunEventParamsSchema } from './sun-service.js';

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

// Create Moon Phase service
const moonPhaseService = new MoonPhaseService();

// Create Sun service
const sunService = new SunService();

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
    name: z.string().optional().describe('Filter stations by name (partial match)'),
    lat_min: z.number().optional().describe('Minimum latitude boundary'),
    lat_max: z.number().optional().describe('Maximum latitude boundary'),
    lon_min: z.number().optional().describe('Minimum longitude boundary'),
    lon_max: z.number().optional().describe('Maximum longitude boundary'),
    state: z.string().optional().describe('Filter stations by state code (e.g., CA, NY)'),
    limit: z.number().optional().describe('Maximum number of stations to return'),
    offset: z.number().optional().describe('Number of stations to skip for pagination'),
    sort_by: z.enum(['name', 'id', 'state']).optional().describe('Field to sort results by'),
    sort_order: z.enum(['asc', 'desc']).optional().describe('Sort order (ascending or descending)'),
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

// Add moon phase tool
server.addTool({
  name: 'get_moon_phase',
  description: 'Get moon phase information for a specific date',
  parameters: MoonPhaseParamsSchema,
  execute: async (params) => {
    try {
      const result = moonPhaseService.getMoonPhase(params);
      return params.format === 'text' 
        ? `Moon phase for ${result.date}: ${result.phaseName} (${(result.illumination * 100).toFixed(1)}% illuminated)`
        : JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get moon phase: ${error.message}`);
      }
      throw new Error('Failed to get moon phase');
    }
  }
});

// Add moon phases range tool
server.addTool({
  name: 'get_moon_phases_range',
  description: 'Get moon phase information for a date range',
  parameters: MoonPhasesRangeParamsSchema,
  execute: async (params) => {
    try {
      const result = moonPhaseService.getMoonPhasesRange(params);
      return params.format === 'text'
        ? result.map(phase => `${phase.date}: ${phase.phaseName} (${(phase.illumination * 100).toFixed(1)}% illuminated)`).join('\n')
        : JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get moon phases: ${error.message}`);
      }
      throw new Error('Failed to get moon phases');
    }
  }
});

// Add next moon phase tool
server.addTool({
  name: 'get_next_moon_phase',
  description: 'Get the next occurrence(s) of a specific moon phase',
  parameters: NextMoonPhaseParamsSchema,
  execute: async (params) => {
    try {
      const result = moonPhaseService.getNextMoonPhase(params);
      return params.format === 'text'
        ? result.map(phase => `Next ${phase.phase}: ${phase.date}`).join('\n')
        : JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get next moon phase: ${error.message}`);
      }
      throw new Error('Failed to get next moon phase');
    }
  }
});

// Add sun times tool
server.addTool({
  name: 'get_sun_times',
  description: 'Get sun rise/set and other sun event times for a specific date and location',
  parameters: SunTimesParamsSchema,
  execute: async (params) => {
    try {
      const result = sunService.getSunTimes(params);
      if (params.format === 'text') {
        let output = `Sun times for ${result.date}:\n`;
        output += `Sunrise: ${result.sunrise || 'N/A'}\n`;
        output += `Sunset: ${result.sunset || 'N/A'}\n`;
        output += `Day Length: ${result.dayLength.toFixed(1)} minutes\n`;
        output += `Solar Noon: ${result.solarNoon || 'N/A'}\n`;
        output += `Dawn: ${result.dawn || 'N/A'}\n`;
        output += `Dusk: ${result.dusk || 'N/A'}`;
        return output;
      }
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get sun times: ${error.message}`);
      }
      throw new Error('Failed to get sun times');
    }
  }
});

// Add sun times range tool
server.addTool({
  name: 'get_sun_times_range',
  description: 'Get sun rise/set and other sun event times for a date range and location',
  parameters: SunTimesRangeParamsSchema,
  execute: async (params) => {
    try {
      const result = sunService.getSunTimesRange(params);
      if (params.format === 'text') {
        return result.map(day => {
          return `${day.date}: Sunrise: ${day.sunrise || 'N/A'}, Sunset: ${day.sunset || 'N/A'}, Day Length: ${day.dayLength.toFixed(1)} minutes`;
        }).join('\n');
      }
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get sun times range: ${error.message}`);
      }
      throw new Error('Failed to get sun times range');
    }
  }
});

// Add sun position tool
server.addTool({
  name: 'get_sun_position',
  description: 'Get sun position information for a specific date, time, and location',
  parameters: SunPositionParamsSchema,
  execute: async (params) => {
    try {
      const result = sunService.getSunPosition(params);
      if (params.format === 'text') {
        let output = `Sun position for ${result.date} ${result.time}:\n`;
        output += `Azimuth: ${result.azimuth.toFixed(2)}°\n`;
        output += `Altitude: ${result.altitude.toFixed(2)}°\n`;
        output += `Declination: ${result.declination.toFixed(2)}°\n`;
        output += `Right Ascension: ${result.rightAscension.toFixed(2)}°`;
        return output;
      }
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get sun position: ${error.message}`);
      }
      throw new Error('Failed to get sun position');
    }
  }
});

// Add next sun event tool
server.addTool({
  name: 'get_next_sun_event',
  description: 'Get the next occurrence(s) of a specific sun event',
  parameters: NextSunEventParamsSchema,
  execute: async (params) => {
    try {
      const result = sunService.getNextSunEvent(params);
      if (params.format === 'text') {
        return result.map(event => {
          return `Next ${event.event}: ${event.date} at ${event.time}`;
        }).join('\n');
      }
      return JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get next sun event: ${error.message}`);
      }
      throw new Error('Failed to get next sun event');
    }
  }
});

// Start the server
const transportType = process.env.TRANSPORT_TYPE || 'stdio';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3012;

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