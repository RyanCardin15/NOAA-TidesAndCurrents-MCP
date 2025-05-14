import { FastMCP } from 'fastmcp';
import { SunService } from '../services/sun-service.js';
import { 
  SunTimesParamsSchema, 
  SunTimesRangeParamsSchema, 
  SunPositionParamsSchema, 
  NextSunEventParamsSchema 
} from '../interfaces/sun.js';

/**
 * Register sun-related tools with the MCP server
 */
export function registerSunTools(server: FastMCP, sunService: SunService) {
  // Add sun times tool
  server.addTool({
    name: 'get_sun_times',
    description: 'Get sun rise/set and other sun event times for a specific date and location',
    parameters: SunTimesParamsSchema,
    execute: async (params) => {
      try {
        const result = sunService.getSunTimes(params);
        if (params.format === 'text') {
          let text = `Sun times for ${result.date} at latitude ${params.latitude}, longitude ${params.longitude}:\n`;
          text += `Sunrise: ${result.sunrise || 'N/A'}\n`;
          text += `Sunset: ${result.sunset || 'N/A'}\n`;
          text += `Day length: ${Math.floor(result.dayLength / 60)}h ${Math.round(result.dayLength % 60)}m\n`;
          text += `Solar noon: ${result.solarNoon || 'N/A'}\n`;
          text += `Dawn: ${result.dawn || 'N/A'}\n`;
          text += `Dusk: ${result.dusk || 'N/A'}\n`;
          return text;
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
        const results = sunService.getSunTimesRange(params);
        if (params.format === 'text') {
          let text = `Sun times from ${params.start_date} to ${params.end_date} at latitude ${params.latitude}, longitude ${params.longitude}:\n\n`;
          
          results.forEach(result => {
            text += `Date: ${result.date}\n`;
            text += `Sunrise: ${result.sunrise || 'N/A'}\n`;
            text += `Sunset: ${result.sunset || 'N/A'}\n`;
            text += `Day length: ${Math.floor(result.dayLength / 60)}h ${Math.round(result.dayLength % 60)}m\n\n`;
          });
          
          return text;
        }
        return JSON.stringify(results);
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
          let text = `Sun position for ${result.date} ${result.time} at latitude ${params.latitude}, longitude ${params.longitude}:\n`;
          text += `Azimuth: ${result.azimuth.toFixed(2)}°\n`;
          text += `Altitude: ${result.altitude.toFixed(2)}°\n`;
          text += `Declination: ${result.declination.toFixed(2)}°\n`;
          text += `Right Ascension: ${result.rightAscension.toFixed(2)}h\n`;
          return text;
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
        const results = sunService.getNextSunEvent(params);
        if (params.format === 'text') {
          return results.map(result => 
            `Next ${result.event}: ${result.date} at ${result.time}`
          ).join('\n');
        }
        return JSON.stringify(results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get next sun event: ${error.message}`);
        }
        throw new Error('Failed to get next sun event');
      }
    }
  });
} 