import { z } from 'zod';

// Parameter type schema
export const ParameterSchema = z.object({
  parameter: z.string().optional().describe('Parameter type to get information about (time_zones, datums, units, tide_intervals, current_intervals, velocity_types, products, station_types, date_formats, output_formats). If not provided, returns information about all parameter types.')
});

export type GetParametersParams = z.infer<typeof ParameterSchema>;

// Interface for parameter info responses
export interface ParameterInfo {
  id: string;
  description: string;
}

export interface DateFormatInfo {
  format: string;
  description: string;
  example: string;
} 