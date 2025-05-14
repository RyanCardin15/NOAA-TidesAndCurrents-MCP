import { z } from 'zod';
import { FastMCP } from 'fastmcp';
import { NoaaService } from '../services/noaa-service.js';
import { 
  StationSchema, 
  UnitsSchema, 
  FormatSchema
} from '../schemas/common.js';

/**
 * Register station-related tools with the MCP server
 */
export function registerStationTools(server: FastMCP, noaaService: NoaaService) {
  // Add stations tool
  server.addTool({
    name: 'get_stations',
    description: 'Get list of stations',
    parameters: z.object({
      type: z.string().optional().describe('Station type (waterlevels, currents, etc.)'),
      format: z.enum(['json', 'xml']).optional().describe('Output format (json, xml)'),
      units: UnitsSchema,
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
      format: z.enum(['json', 'xml']).optional().describe('Output format (json, xml)'),
      units: UnitsSchema,
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
} 