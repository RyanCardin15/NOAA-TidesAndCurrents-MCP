import { z } from 'zod';

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

// Water Level Schema
export const GetWaterLevelsSchema = z.object({
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
);

// Tide Predictions Schema
export const GetTidePredictionsSchema = z.object({
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
);

// Currents Schema
export const GetCurrentsSchema = z.object({
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
);

// Current Predictions Schema
export const GetCurrentPredictionsSchema = z.object({
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
);

// Meteorological Data Schema
export const GetMeteorologicalDataSchema = z.object({
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
);

// Station List Schema
export const GetStationsSchema = z.object({
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
});

// Station Details Schema
export const GetStationDetailsSchema = z.object({
  station: StationSchema,
  units: UnitsSchema,
  format: z.enum(['json', 'xml']).optional().describe('Output format (json, xml)'),
});

// Define exported types
export type GetWaterLevelsParams = z.infer<typeof GetWaterLevelsSchema>;
export type GetTidePredictionsParams = z.infer<typeof GetTidePredictionsSchema>;
export type GetCurrentsParams = z.infer<typeof GetCurrentsSchema>;
export type GetCurrentPredictionsParams = z.infer<typeof GetCurrentPredictionsSchema>;
export type GetMeteorologicalDataParams = z.infer<typeof GetMeteorologicalDataSchema>;
export type GetStationsParams = z.infer<typeof GetStationsSchema>;
export type GetStationDetailsParams = z.infer<typeof GetStationDetailsSchema>;

// Configuration type
export interface NoaaConfig {
  applicationName?: string;
} 