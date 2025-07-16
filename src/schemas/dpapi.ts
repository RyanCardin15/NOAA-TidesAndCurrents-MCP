import { z } from 'zod';
import { StationSchema, UnitsSchema, FormatSchema } from './common.js';

// DPAPI-specific parameter schemas
export const AffiliationSchema = z.enum(['Global', 'US']).optional().describe('Station affiliation (Global or US)');
export const ScenarioSchema = z.enum(['all', 'low', 'intermediate-low', 'intermediate', 'intermediate-high', 'high', 'extreme']).optional().describe('Sea level rise scenario');
export const SeasonSchema = z.enum(['DJF', 'MAM', 'JJA', 'SON']).optional().describe('Season months (DJF-Winter, MAM-Spring, JJA-Summer, SON-Fall)');
export const DpapiDatumSchema = z.enum(['STND', 'MLLW', 'MHHW', 'GT', 'MSL', 'MLW', 'MHW']).optional().describe('Datum reference for DPAPI');
export const ThresholdSchema = z.enum(['minor', 'moderate', 'major']).optional().describe('Flood threshold level');
export const DecadeSchema = z.string().optional().describe('Decade for projections (e.g., "2050")');
export const YearSchema = z.string().optional().describe('Year for analysis (YYYY format)');
export const YearRangeSchema = z.string().optional().describe('Year range (YYYY-YYYY format)');

// Sea Level Trends schema
export const SeaLevelTrendsSchema = z.object({
  station: StationSchema,
  affil: AffiliationSchema,
  format: FormatSchema
}).describe('Get sea level trends for a station');

// Extreme Water Levels schema
export const ExtremeWaterLevelsSchema = z.object({
  station: StationSchema,
  units: UnitsSchema,
  format: FormatSchema
}).describe('Get extreme water levels for a station');

// High Tide Flooding Daily schema
export const HighTideFloodingDailySchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  begin_date: z.string().optional().describe('Start date (YYYYMMDD format)'),
  end_date: z.string().optional().describe('End date (YYYYMMDD format)'),
  year: YearSchema
}).describe('Get high tide flooding daily count data');

// High Tide Flooding Monthly schema
export const HighTideFloodingMonthlySchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  begin_date: z.string().optional().describe('Start date (YYYYMMDD format)'),
  end_date: z.string().optional().describe('End date (YYYYMMDD format)'),
  year: YearSchema
}).describe('Get high tide flooding monthly count data');

// High Tide Flooding Seasonal schema
export const HighTideFloodingSeasonalSchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  season_months: SeasonSchema,
  begin_date: z.string().optional().describe('Start date (YYYYMMDD format)'),
  end_date: z.string().optional().describe('End date (YYYYMMDD format)'),
  year: YearSchema
}).describe('Get high tide flooding seasonal count data');

// High Tide Flooding Annual schema
export const HighTideFloodingAnnualSchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  begin_date: z.string().optional().describe('Start date (YYYYMMDD format)'),
  end_date: z.string().optional().describe('End date (YYYYMMDD format)'),
  year_range: YearRangeSchema
}).describe('Get high tide flooding annual count data');

// High Tide Flooding Projections schema
export const HighTideFloodingProjectionsSchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  scenario: ScenarioSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  decade: DecadeSchema
}).describe('Get high tide flooding decadal projections');

// High Tide Flooding Likelihoods schema
export const HighTideFloodingLikelihoodsSchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  threshold: ThresholdSchema,
  date: z.string().optional().describe('Specific date (YYYYMMDD format)')
}).describe('Get high tide flooding daily likelihoods');

// Top Ten Water Levels schema
export const TopTenWaterLevelsSchema = z.object({
  station: StationSchema,
  format: FormatSchema,
  datum: DpapiDatumSchema,
  units: UnitsSchema,
  analysis_type: z.enum(['highest', 'lowest']).optional().describe('Analysis type (highest or lowest)')
}).describe('Get top ten water levels for a station');