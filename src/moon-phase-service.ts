import SunCalc from 'suncalc';
import { z } from 'zod';

/**
 * Moon phase names and their approximate ranges
 */
export enum MoonPhaseName {
  NEW_MOON = 'New Moon',
  WAXING_CRESCENT = 'Waxing Crescent',
  FIRST_QUARTER = 'First Quarter',
  WAXING_GIBBOUS = 'Waxing Gibbous',
  FULL_MOON = 'Full Moon',
  WANING_GIBBOUS = 'Waning Gibbous',
  LAST_QUARTER = 'Last Quarter',
  WANING_CRESCENT = 'Waning Crescent'
}

/**
 * Moon phase information
 */
export interface MoonPhaseInfo {
  date: string;
  phase: number;
  phaseName: MoonPhaseName;
  illumination: number;
  age: number;
  distance: number;
  diameter: number;
  isWaxing: boolean;
}

/**
 * Parameters for getting moon phase
 */
export const MoonPhaseParamsSchema = z.object({
  date: z.string().optional().describe('Date to get moon phase for (YYYY-MM-DD format). Defaults to current date.'),
  latitude: z.number().min(-90).max(90).optional().describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).optional().describe('Longitude for location-specific calculations'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)')
});

export type MoonPhaseParams = z.infer<typeof MoonPhaseParamsSchema>;

/**
 * Parameters for getting moon phases for a date range
 */
export const MoonPhasesRangeParamsSchema = z.object({
  start_date: z.string().describe('Start date (YYYY-MM-DD format)'),
  end_date: z.string().describe('End date (YYYY-MM-DD format)'),
  latitude: z.number().min(-90).max(90).optional().describe('Latitude for location-specific calculations'),
  longitude: z.number().min(-180).max(180).optional().describe('Longitude for location-specific calculations'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)')
});

export type MoonPhasesRangeParams = z.infer<typeof MoonPhasesRangeParamsSchema>;

/**
 * Parameters for getting next moon phase
 */
export const NextMoonPhaseParamsSchema = z.object({
  phase: z.enum([
    MoonPhaseName.NEW_MOON,
    MoonPhaseName.FIRST_QUARTER,
    MoonPhaseName.FULL_MOON,
    MoonPhaseName.LAST_QUARTER
  ]).describe('Moon phase to find'),
  date: z.string().optional().describe('Starting date (YYYY-MM-DD format). Defaults to current date.'),
  count: z.number().positive().optional().describe('Number of occurrences to return. Defaults to 1.'),
  format: z.enum(['json', 'text']).optional().describe('Output format (json or text)')
});

export type NextMoonPhaseParams = z.infer<typeof NextMoonPhaseParamsSchema>;

/**
 * Service for moon phase calculations
 */
export class MoonPhaseService {
  /**
   * Get the moon phase for a specific date
   * @param params Parameters for the request
   * @returns Moon phase information
   */
  getMoonPhase(params: MoonPhaseParams): MoonPhaseInfo {
    const date = params.date ? new Date(params.date) : new Date();
    
    // Get moon illumination data
    const illuminationData = SunCalc.getMoonIllumination(date);
    
    // Get moon position data (requires location)
    const latitude = params.latitude ?? 0;
    const longitude = params.longitude ?? 0;
    const positionData = SunCalc.getMoonPosition(date, latitude, longitude);
    
    // Calculate moon phase name
    const phaseName = this.getMoonPhaseName(illuminationData.phase);
    
    // Calculate if the moon is waxing (increasing illumination)
    const isWaxing = illuminationData.phase < 0.5;
    
    // Calculate approximate moon age (0-29.53 days)
    const lunarMonth = 29.53; // days
    const age = illuminationData.phase * lunarMonth;
    
    // Calculate apparent diameter (in degrees)
    const diameter = 0.5181 * (384400 / positionData.distance);
    
    return {
      date: date.toISOString().split('T')[0],
      phase: illuminationData.phase,
      phaseName,
      illumination: illuminationData.fraction,
      age,
      distance: positionData.distance,
      diameter,
      isWaxing
    };
  }

  /**
   * Get moon phases for a date range
   * @param params Parameters for the request
   * @returns Array of moon phase information
   */
  getMoonPhasesRange(params: MoonPhasesRangeParams): MoonPhaseInfo[] {
    const startDate = new Date(params.start_date);
    const endDate = new Date(params.end_date);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
    }
    
    if (startDate > endDate) {
      throw new Error('Start date must be before end date.');
    }
    
    const result: MoonPhaseInfo[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      result.push(this.getMoonPhase({
        date: currentDate.toISOString().split('T')[0],
        latitude: params.latitude,
        longitude: params.longitude
      }));
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return result;
  }

  /**
   * Get the next occurrence(s) of a specific moon phase
   * @param params Parameters for the request
   * @returns Array of dates for the next occurrences of the specified phase
   */
  getNextMoonPhase(params: NextMoonPhaseParams): { date: string, phase: string }[] {
    const startDate = params.date ? new Date(params.date) : new Date();
    const count = params.count || 1;
    const targetPhase = params.phase;
    
    // Map phase names to their approximate values
    const phaseValues: Record<string, number> = {
      [MoonPhaseName.NEW_MOON]: 0,
      [MoonPhaseName.FIRST_QUARTER]: 0.25,
      [MoonPhaseName.FULL_MOON]: 0.5,
      [MoonPhaseName.LAST_QUARTER]: 0.75
    };
    
    const targetPhaseValue = phaseValues[targetPhase];
    const results: { date: string, phase: string }[] = [];
    let currentDate = new Date(startDate);
    
    // Find the next occurrences
    while (results.length < count) {
      // Check every day (could be optimized with better algorithms)
      const illuminationData = SunCalc.getMoonIllumination(currentDate);
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevIlluminationData = SunCalc.getMoonIllumination(prevDate);
      
      // Check if we've passed the target phase between yesterday and today
      const prevDiff = Math.abs(prevIlluminationData.phase - targetPhaseValue);
      const currentDiff = Math.abs(illuminationData.phase - targetPhaseValue);
      
      // If we're getting closer to the target phase and then further away, we've passed it
      // Or if we're very close to the target phase (within 0.01)
      if ((prevDiff > currentDiff && currentDiff < 0.01) || currentDiff < 0.005) {
        results.push({
          date: currentDate.toISOString().split('T')[0],
          phase: targetPhase
        });
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Safety check to prevent infinite loops
      if (results.length === 0 && currentDate.getTime() - startDate.getTime() > 366 * 24 * 60 * 60 * 1000) {
        throw new Error('Could not find the specified moon phase within a year.');
      }
    }
    
    return results;
  }

  /**
   * Get the name of the moon phase based on the phase value
   * @param phase Phase value (0-1)
   * @returns Moon phase name
   */
  private getMoonPhaseName(phase: number): MoonPhaseName {
    // Normalize phase to 0-1 range
    phase = phase % 1;
    if (phase < 0) phase += 1;
    
    // Determine phase name based on value ranges
    if (phase < 0.0625 || phase >= 0.9375) return MoonPhaseName.NEW_MOON;
    if (phase < 0.1875) return MoonPhaseName.WAXING_CRESCENT;
    if (phase < 0.3125) return MoonPhaseName.FIRST_QUARTER;
    if (phase < 0.4375) return MoonPhaseName.WAXING_GIBBOUS;
    if (phase < 0.5625) return MoonPhaseName.FULL_MOON;
    if (phase < 0.6875) return MoonPhaseName.WANING_GIBBOUS;
    if (phase < 0.8125) return MoonPhaseName.LAST_QUARTER;
    return MoonPhaseName.WANING_CRESCENT;
  }
} 