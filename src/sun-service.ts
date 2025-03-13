import SunCalc from 'suncalc';
import { z } from 'zod';

/**
 * Sun event types
 */
export enum SunEventType {
  SUNRISE = 'sunrise',
  SUNSET = 'sunset',
  DAWN = 'dawn',
  DUSK = 'dusk',
  SOLAR_NOON = 'solarNoon',
  NIGHT_START = 'night',
  NIGHT_END = 'nightEnd',
  GOLDEN_HOUR_START = 'goldenHourStart',
  GOLDEN_HOUR_END = 'goldenHourEnd',
  NAUTICAL_DAWN = 'nauticalDawn',
  NAUTICAL_DUSK = 'nauticalDusk',
  ASTRONOMICAL_DAWN = 'astronomicalDawn',
  ASTRONOMICAL_DUSK = 'astronomicalDusk'
}

/**
 * Sun times information
 */
export interface SunTimesInfo {
  date: string;
  sunrise: string | null;
  sunset: string | null;
  solarNoon: string | null;
  dawn: string | null;
  dusk: string | null;
  nightStart: string | null;
  nightEnd: string | null;
  goldenHourStart: string | null;
  goldenHourEnd: string | null;
  nauticalDawn: string | null;
  nauticalDusk: string | null;
  astronomicalDawn: string | null;
  astronomicalDusk: string | null;
  dayLength: number; // in minutes
}

/**
 * Sun position information
 */
export interface SunPositionInfo {
  date: string;
  time: string;
  azimuth: number;
  altitude: number;
  declination: number;
  rightAscension: number;
}

/**
 * Parameters for getting sun times
 */
export const SunTimesParamsSchema = z.object({
  date: z.string().optional().describe('Date to get sun times for (YYYY-MM-DD format). Defaults to current date.'),
  latitude: z.number().min(-90).max(90).describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).describe('Longitude for location-specific calculations'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)'),
  timezone: z.string().optional().describe('Timezone for the results. Defaults to UTC.')
});

export type SunTimesParams = z.infer<typeof SunTimesParamsSchema>;

/**
 * Parameters for getting sun times for a date range
 */
export const SunTimesRangeParamsSchema = z.object({
  start_date: z.string().describe('Start date (YYYY-MM-DD format)'),
  end_date: z.string().describe('End date (YYYY-MM-DD format)'),
  latitude: z.number().min(-90).max(90).describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).describe('Longitude for location-specific calculations'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)'),
  timezone: z.string().optional().describe('Timezone for the results. Defaults to UTC.')
});

export type SunTimesRangeParams = z.infer<typeof SunTimesRangeParamsSchema>;

/**
 * Parameters for getting sun position
 */
export const SunPositionParamsSchema = z.object({
  date: z.string().optional().describe('Date to get sun position for (YYYY-MM-DD format). Defaults to current date.'),
  time: z.string().optional().describe('Time to get sun position for (HH:MM:SS format). Defaults to current time.'),
  latitude: z.number().min(-90).max(90).describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).describe('Longitude for location-specific calculations'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)')
});

export type SunPositionParams = z.infer<typeof SunPositionParamsSchema>;

/**
 * Parameters for finding the next sun event
 */
export const NextSunEventParamsSchema = z.object({
  event: z.nativeEnum(SunEventType).describe('Sun event to find'),
  date: z.string().optional().describe('Starting date (YYYY-MM-DD format). Defaults to current date.'),
  latitude: z.number().min(-90).max(90).describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).describe('Longitude for location-specific calculations'),
  count: z.number().positive().optional().describe('Number of occurrences to return. Defaults to 1.'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)'),
  timezone: z.string().optional().describe('Timezone for the results. Defaults to UTC.')
});

export type NextSunEventParams = z.infer<typeof NextSunEventParamsSchema>;

/**
 * Service for sun calculations
 */
export class SunService {
  /**
   * Get sun times for a specific date and location
   * @param params Parameters for the request
   * @returns Sun times information
   */
  getSunTimes(params: SunTimesParams): SunTimesInfo {
    const date = params.date ? new Date(params.date) : new Date();
    const { latitude, longitude } = params;
    
    // Get sun times data
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    
    // Format times or return null if not available
    const formatTime = (time: Date | null): string | null => {
      if (!time || isNaN(time.getTime())) return null;
      
      if (params.timezone) {
        try {
          return time.toLocaleTimeString('en-US', { timeZone: params.timezone });
        } catch (error) {
          // If timezone is invalid, fall back to ISO string
          console.warn(`Invalid timezone: ${params.timezone}. Using UTC.`);
        }
      }
      
      return time.toISOString();
    };
    
    // Calculate day length in minutes
    const sunrise = sunTimes.sunrise;
    const sunset = sunTimes.sunset;
    let dayLength = 0;
    
    if (sunrise && sunset && !isNaN(sunrise.getTime()) && !isNaN(sunset.getTime())) {
      dayLength = (sunset.getTime() - sunrise.getTime()) / (60 * 1000);
    }
    
    return {
      date: date.toISOString().split('T')[0],
      sunrise: formatTime(sunTimes.sunrise),
      sunset: formatTime(sunTimes.sunset),
      solarNoon: formatTime(sunTimes.solarNoon),
      dawn: formatTime(sunTimes.dawn),
      dusk: formatTime(sunTimes.dusk),
      nightStart: formatTime(sunTimes.night),
      nightEnd: formatTime(sunTimes.nightEnd),
      goldenHourStart: formatTime(sunTimes.goldenHour),
      goldenHourEnd: formatTime(sunTimes.goldenHourEnd),
      nauticalDawn: formatTime(sunTimes.nauticalDawn),
      nauticalDusk: formatTime(sunTimes.nauticalDusk),
      astronomicalDawn: formatTime(sunTimes.astronomicalDawn),
      astronomicalDusk: formatTime(sunTimes.astronomicalDusk),
      dayLength
    };
  }

  /**
   * Get sun times for a date range
   * @param params Parameters for the request
   * @returns Array of sun times information
   */
  getSunTimesRange(params: SunTimesRangeParams): SunTimesInfo[] {
    const startDate = new Date(params.start_date);
    const endDate = new Date(params.end_date);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
    }
    
    if (startDate > endDate) {
      throw new Error('Start date must be before end date.');
    }
    
    const result: SunTimesInfo[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      result.push(this.getSunTimes({
        date: currentDate.toISOString().split('T')[0],
        latitude: params.latitude,
        longitude: params.longitude,
        timezone: params.timezone
      }));
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return result;
  }

  /**
   * Get sun position for a specific date, time, and location
   * @param params Parameters for the request
   * @returns Sun position information
   */
  getSunPosition(params: SunPositionParams): SunPositionInfo {
    const date = params.date ? new Date(params.date) : new Date();
    
    // If time is provided, set it on the date object
    if (params.time) {
      const [hours, minutes, seconds] = params.time.split(':').map(Number);
      date.setHours(hours || 0, minutes || 0, seconds || 0);
    }
    
    const { latitude, longitude } = params;
    
    // Get sun position data
    const position = SunCalc.getPosition(date, latitude, longitude);
    
    // Calculate additional astronomical data
    const declination = Math.asin(Math.sin(23.44 * Math.PI / 180) * Math.sin(position.azimuth));
    const rightAscension = Math.atan2(
      Math.cos(23.44 * Math.PI / 180) * Math.sin(position.azimuth),
      Math.cos(position.azimuth)
    );
    
    return {
      date: date.toISOString().split('T')[0],
      time: date.toISOString().split('T')[1].split('.')[0],
      azimuth: position.azimuth * (180 / Math.PI), // Convert to degrees
      altitude: position.altitude * (180 / Math.PI), // Convert to degrees
      declination: declination * (180 / Math.PI), // Convert to degrees
      rightAscension: rightAscension * (180 / Math.PI) // Convert to degrees
    };
  }

  /**
   * Get the next occurrence(s) of a specific sun event
   * @param params Parameters for the request
   * @returns Array of dates for the next occurrences of the specified event
   */
  getNextSunEvent(params: NextSunEventParams): { date: string, time: string, event: string }[] {
    const startDate = params.date ? new Date(params.date) : new Date();
    const count = params.count || 1;
    const { latitude, longitude, event } = params;
    
    const results: { date: string, time: string, event: string }[] = [];
    let currentDate = new Date(startDate);
    
    // Find the next occurrences
    while (results.length < count) {
      // Get sun times for the current date
      const sunTimes = SunCalc.getTimes(currentDate, latitude, longitude);
      const eventTime = sunTimes[event as keyof typeof sunTimes] as Date;
      
      // If the event time is valid and in the future
      if (eventTime && !isNaN(eventTime.getTime()) && eventTime > startDate) {
        let timeString = eventTime.toISOString();
        
        // Format time based on timezone if provided
        if (params.timezone) {
          try {
            timeString = eventTime.toLocaleTimeString('en-US', { timeZone: params.timezone });
          } catch (error) {
            // If timezone is invalid, fall back to ISO string
            console.warn(`Invalid timezone: ${params.timezone}. Using UTC.`);
          }
        }
        
        results.push({
          date: eventTime.toISOString().split('T')[0],
          time: timeString.split('T')[1]?.split('.')[0] || timeString,
          event
        });
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Safety check to prevent infinite loops
      if (results.length === 0 && currentDate.getTime() - startDate.getTime() > 366 * 24 * 60 * 60 * 1000) {
        throw new Error('Could not find the specified sun event within a year.');
      }
    }
    
    return results;
  }
} 