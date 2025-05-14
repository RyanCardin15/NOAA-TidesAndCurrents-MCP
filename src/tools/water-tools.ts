import { z } from 'zod';
import { FastMCP } from 'fastmcp';
import { NoaaService } from '../services/noaa-service.js';
import { 
  StationSchema, 
  DateSchema, 
  BeginDateSchema, 
  EndDateSchema, 
  RangeSchema,
  DatumSchema, 
  UnitsSchema, 
  TimeZoneSchema, 
  FormatSchema,
  BinSchema,
  IntervalSchema,
  refineDateParams,
  dateRefinementMessage
} from '../schemas/common.js';

/**
 * Register water-related tools with the MCP server
 */
export function registerWaterTools(server: FastMCP, noaaService: NoaaService) {
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
    }).refine(refineDateParams, { message: dateRefinementMessage }),
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
    }).refine(refineDateParams, { message: dateRefinementMessage }),
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
    }).refine(refineDateParams, { message: dateRefinementMessage }),
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
    }).refine(refineDateParams, { message: dateRefinementMessage }),
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
    }).refine(refineDateParams, { message: dateRefinementMessage }),
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
} 