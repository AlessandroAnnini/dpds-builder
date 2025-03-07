#!/usr/bin/env node
/**
 * Data Product Verifier
 *
 * Provides functions for validating data product descriptors against the schema
 * and a command-line interface for validation.
 */

import * as fs from 'fs';
import { z } from 'zod';
import { dataProductDescriptorSchema } from '../zodSchemas';
import { DataProductDescriptor } from '../types';

// ===============================================================
// Validation Helper Functions
// ===============================================================

/**
 * Result of a data product verification
 */
export interface VerificationResult {
  isValid: boolean;
  errors: string[] | null;
  warnings: string[];
}

/**
 * Options for verifying a data product
 */
export interface VerifyOptions {
  strict?: boolean;
}

/**
 * Format Zod errors into a flat array of error messages
 * @param errors Zod formatted errors
 * @param path Current path (for recursion)
 * @returns Array of error messages
 */
function formatZodErrors(
  errors: z.ZodFormattedError<any>,
  path: string = '',
): string[] {
  let errorMessages: string[] = [];

  // Process _errors at current level
  if (errors._errors && errors._errors.length > 0) {
    errorMessages = errorMessages.concat(
      errors._errors.map((err: string) => (path ? `${path}: ${err}` : err)),
    );
  }

  // Process nested errors
  const errorsObj = errors as Record<string, unknown>;
  for (const key in errorsObj) {
    if (
      key !== '_errors' &&
      typeof errorsObj[key] === 'object' &&
      errorsObj[key] !== null
    ) {
      const newPath = path ? `${path}.${key}` : key;
      const nestedErrors = formatZodErrors(
        errorsObj[key] as z.ZodFormattedError<any>,
        newPath,
      );
      errorMessages = errorMessages.concat(nestedErrors);
    }
  }

  return errorMessages;
}

/**
 * Validate a value against a schema with detailed error messages
 * @param schema The zod schema to validate against
 * @param data The data to validate
 * @returns A result object with success status and either data or error messages
 */
export function validateWithSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): { success: true; data: z.infer<T> } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    // Format the errors for readability
    const formattedErrors = formatZodErrors(result.error.format());
    return { success: false, errors: formattedErrors };
  }
}

/**
 * Validate a data product descriptor using Zod schemas
 * @param data The descriptor data to validate
 * @returns Validation result with potential error messages
 */
export function validateDataProductDescriptor(
  data: unknown,
):
  | { success: true; data: DataProductDescriptor }
  | { success: false; errors: string[] } {
  const result = validateWithSchema(dataProductDescriptorSchema, data);

  if (result.success) {
    // Use type assertion to match the expected DataProductDescriptor interface
    return {
      success: true,
      data: result.data as unknown as DataProductDescriptor,
    };
  } else {
    return { success: false, errors: result.errors };
  }
}

/**
 * Verify a data product descriptor
 *
 * This is the main function to use for verification.
 *
 * @param data The data to verify
 * @param options Verification options
 * @returns Verification result
 */
export function verifyDataProduct(
  data: unknown,
  options: VerifyOptions = {},
): VerificationResult {
  const result = validateDataProductDescriptor(data);

  if (result.success) {
    const warnings = options.strict ? checkBestPractices(result.data) : [];

    return {
      isValid: true,
      errors: null,
      warnings,
    };
  } else {
    return {
      isValid: false,
      errors: result.errors,
      warnings: [],
    };
  }
}

/**
 * Check best practices for a data product descriptor
 * This provides additional quality checks beyond schema validation
 */
export function checkBestPractices(
  descriptor: DataProductDescriptor,
): string[] {
  const warnings: string[] = [];

  // Check for descriptions
  if (!descriptor.info.description) {
    warnings.push('Missing data product description in info');
  }

  // Check for output ports descriptions
  descriptor.interfaceComponents.outputPorts.forEach((port, index) => {
    if ('$ref' in port) return; // Skip references

    if (!port.description) {
      warnings.push(
        `Missing description for output port ${port.name || `#${index}`}`,
      );
    }

    // Check for promises in output ports
    if (!port.promises) {
      warnings.push(
        `Missing promises in output port ${port.name || `#${index}`}`,
      );
    }
  });

  // Check for contact points
  if (
    !descriptor.info.contactPoints ||
    descriptor.info.contactPoints.length === 0
  ) {
    warnings.push('No contact points defined for the data product');
  }

  return warnings;
}

/**
 * Verify a file containing a data product descriptor
 *
 * @param filePath Path to the JSON file
 * @param options Verification options
 * @returns Verification result and the data if valid
 */
export function verifyFile(
  filePath: string,
  options: VerifyOptions = {},
): { result: VerificationResult; data: DataProductDescriptor | null } {
  try {
    // Read file content
    if (!fs.existsSync(filePath)) {
      return {
        result: {
          isValid: false,
          errors: [`File not found: ${filePath}`],
          warnings: [],
        },
        data: null,
      };
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let data: any;

    try {
      data = JSON.parse(fileContent);
    } catch (error) {
      return {
        result: {
          isValid: false,
          errors: [
            `Invalid JSON format: ${
              error instanceof Error ? error.message : String(error)
            }`,
          ],
          warnings: [],
        },
        data: null,
      };
    }

    // Verify the data
    const result = verifyDataProduct(data, options);

    return {
      result,
      data: result.isValid ? (data as DataProductDescriptor) : null,
    };
  } catch (error) {
    return {
      result: {
        isValid: false,
        errors: [
          `Error during verification: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
        warnings: [],
      },
      data: null,
    };
  }
}

// ===============================================================
// CLI Functionality
// ===============================================================

/**
 * Print usage information
 */
function printUsage(): void {
  console.log(`
Data Product Descriptor Verification Tool

Usage:
  npx data-product-verifier <command> <file-path> [options]

Commands:
  verify    Verify a data product descriptor
  display   Verify and display a data product descriptor

Options:
  --strict  Perform strict verification (additional checks)
  --help    Show this help message
  `);
}

/**
 * Display a data product descriptor
 */
function displayDataProductDescriptor(dpd: DataProductDescriptor): void {
  // Basic info display
  console.log(`Data Product: ${dpd.info.name} (${dpd.info.version})`);
  console.log(`Domain: ${dpd.info.domain}`);
  console.log(`Owner: ${dpd.info.owner.name || dpd.info.owner.id}`);

  if (dpd.info.description) {
    console.log(`\nDescription: ${dpd.info.description}`);
  }

  // Contact points
  if (dpd.info.contactPoints && dpd.info.contactPoints.length > 0) {
    console.log('\nContact Points:');
    dpd.info.contactPoints.forEach((cp, i) => {
      console.log(
        `  ${i + 1}. ${cp.name || 'Unnamed'} (${
          cp.channel || 'unknown channel'
        })`,
      );
      if (cp.address) console.log(`     Address: ${cp.address}`);
    });
  }

  // Output ports (simplified)
  console.log('\nOutput Ports:');
  dpd.interfaceComponents.outputPorts.forEach((port, i) => {
    if ('$ref' in port) {
      console.log(`  ${i + 1}. [Reference] ${port.$ref}`);
    } else {
      console.log(`  ${i + 1}. ${port.name} (${port.version})`);
      if (port.description) console.log(`     ${port.description}`);
    }
  });

  // Input ports (if any)
  if (
    dpd.interfaceComponents.inputPorts &&
    dpd.interfaceComponents.inputPorts.length > 0
  ) {
    console.log('\nInput Ports:');
    dpd.interfaceComponents.inputPorts.forEach((port, i) => {
      if ('$ref' in port) {
        console.log(`  ${i + 1}. [Reference] ${port.$ref}`);
      } else {
        console.log(`  ${i + 1}. ${port.name} (${port.version})`);
        if (port.description) console.log(`     ${port.description}`);
      }
    });
  }
}

/**
 * Verify a file from the command line
 */
async function verifyCLI(
  filePath: string,
  strict: boolean = false,
): Promise<boolean> {
  console.log(`Verifying: ${filePath}`);
  console.log('----------------------------------------');

  const { result, data } = verifyFile(filePath, { strict });

  if (result.isValid) {
    console.log('✅ Verification successful!');

    if (strict && result.warnings.length > 0) {
      console.log('\n⚠️ Warnings (best practices):');
      result.warnings.forEach((warning) => console.log(`- ${warning}`));
    } else if (strict) {
      console.log('✓ Best practices check passed');
    }

    return true;
  } else {
    console.log('❌ Verification failed!');
    console.log('\nErrors:');
    result.errors?.forEach((error) => console.log(`- ${error}`));
    return false;
  }
}

/**
 * Display a file from the command line
 */
async function displayCLI(filePath: string): Promise<boolean> {
  console.log(`Displaying: ${filePath}`);
  console.log('----------------------------------------');

  // Verify the file first
  const { result, data } = verifyFile(filePath);

  if (!result.isValid || !data) {
    console.error(
      '\nCannot display an invalid descriptor. Please fix the verification errors first.',
    );
    console.log('\nErrors:');
    result.errors?.forEach((error) => console.log(`- ${error}`));
    return false;
  }

  console.log('\n=============== DESCRIPTOR DISPLAY ===============\n');
  displayDataProductDescriptor(data);
  console.log('\n==================================================\n');

  return true;
}

/**
 * Main CLI entry point
 */
export async function cli(): Promise<void> {
  const args = process.argv.slice(2);

  // Show help
  if (args.includes('--help') || args.length === 0) {
    printUsage();
    return;
  }

  const command = args[0];
  const filePath = args[1];
  const strict = args.includes('--strict');

  if (!filePath) {
    console.error('Error: Missing file path');
    printUsage();
    process.exit(1);
  }

  let success = false;

  switch (command) {
    case 'verify':
      success = await verifyCLI(filePath, strict);
      break;
    case 'display':
      success = await displayCLI(filePath);
      break;
    default:
      console.error(`Error: Unknown command '${command}'`);
      printUsage();
      process.exit(1);
  }

  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}
