import { z } from 'zod';

// Common parameter schemas
export const StationSchema = z.string().min(1).describe('Station ID');
export const DateSchema = z.string().optional().describe('Date to retrieve data for ("today", "latest", "recent", or specific date)');
export const BeginDateSchema = z.string().optional().describe('Start date (YYYYMMDD or MM/DD/YYYY)');
export const EndDateSchema = z.string().optional().describe('End date (YYYYMMDD or MM/DD/YYYY)');
export const RangeSchema = z.number().optional().describe('Number of hours to retrieve data for');
export const DatumSchema = z.string().optional().describe('Datum to use (MLLW, MSL, etc.)');
export const UnitsSchema = z.enum(['english', 'metric']).optional().describe('Units to use ("english" or "metric")');
export const TimeZoneSchema = z.enum(['gmt', 'lst', 'lst_ldt']).optional().describe('Time zone (gmt, lst, lst_ldt)');
export const FormatSchema = z.enum(['json', 'xml', 'csv']).optional().describe('Output format (json, xml, csv)');
export const BinSchema = z.number().optional().describe('Bin number');
export const IntervalSchema = z.string().optional().describe('Interval (hilo, hl, h, or a number for minutes)');

// Schema refinement function for date parameters
export const refineDateParams = (data: any) => 
  (data.date || (data.begin_date && data.end_date) || 
   (data.begin_date && data.range) || (data.end_date && data.range) || 
   data.range);

export const dateRefinementMessage = 
  "You must provide either 'date', 'begin_date' and 'end_date', 'begin_date' and 'range', 'end_date' and 'range', or just 'range'"; 