import { z } from "zod";

const fileOrUrlSchema = z.union([
  z.instanceof(File).refine((file) => file.size > 0, {
    message: "Uploaded file cannot be empty.",
  }),
  z.string().url({ message: "Must be a valid URL." }),
]);

// Employee Schema Validation
export const employeeSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full name is required." })
    .max(100, { message: "Full name cannot exceed 100 characters." }),
  nationality: z
    .string()
    .min(1, { message: "Nationality is required." })
    .max(100, { message: "Nationality cannot exceed 100 characters." }),
  uae_contact_number: z
    .string()
    .min(10, { message: "UAE contact number must be at least 10 digits." })
    .max(15, { message: "UAE contact number cannot exceed 15 digits." }),
  home_country_contact_number: z
    .string()
    .min(10, {
      message: "Home country contact number must be at least 10 digits.",
    })
    .max(15, {
      message: "Home country contact number cannot exceed 15 digits.",
    }),
  emergency_contact_number: z
    .string()
    .min(10, {
      message: "Emergency contact number must be at least 10 digits.",
    })
    .max(15, { message: "Emergency contact number cannot exceed 15 digits." }),
  personal_email: z
    .string()
    .email({ message: "Personal email must be a valid email address." })
    .max(100, { message: "Personal email cannot exceed 100 characters." }),
  company_email: z
    .string()
    .email({ message: "Company email must be a valid email address." })
    .max(100, { message: "Company email cannot exceed 100 characters." })
    .optional(),
  date_of_birth: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Date of birth must be a valid date.",
    })
    .optional(),
  blood_group: z.string().optional(),
  // emirates_id: z
  //   .string()
  //   .min(1, { message: "Emirates ID is required." })
  //   .max(100, { message: "Emirates ID cannot exceed 100 characters." }),
  // passport_id: z
  //   .string()
  //   .min(1, { message: "Passport ID is required." })
  //   .max(100, { message: "Passport ID cannot exceed 100 characters." }),
  // visa_copy: z
  //   .string()
  //   .min(1, { message: "Visa copy is required." })
  //   .max(500, { message: "Visa copy URL cannot exceed 500 characters." }),
  // cv: z
  //   .string()
  //   .min(1, { message: "CV is required." })
  //   .max(500, { message: "CV URL cannot exceed 500 characters." }),
  // photo: z
  //   .string()
  //   .max(500, { message: "Photo URL cannot exceed 500 characters." })
  //   .optional(),

  emirates_id: fileOrUrlSchema,
  passport_id: fileOrUrlSchema,
  visa_copy: fileOrUrlSchema,
  cv: fileOrUrlSchema,
  photo: fileOrUrlSchema.optional(),

  date_of_joining: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Date of joining must be a valid date.",
  }),
  department: z
    .string()
    .min(1, { message: "Department is required." })
    .max(100, { message: "Department cannot exceed 100 characters." }),
  job_title: z
    .string()
    .min(1, { message: "Job title is required." })
    .max(100, { message: "Job title cannot exceed 100 characters." }),
  reporting_manager: z.string().optional(), // Assume ObjectId as string
  uae_address: z
    .string()
    .min(1, { message: "UAE address is required." })
    .max(500, { message: "UAE address cannot exceed 500 characters." }),
  home_country_address: z
    .string()
    .max(500, { message: "Home country address cannot exceed 500 characters." })
    .optional(),

  bank_details: z
    .object({
      bank_name: z
        .string()
        .max(100, { message: "Bank name cannot exceed 100 characters." })
        .optional(),
      account_number: z
        .string()
        .max(20, { message: "Account number cannot exceed 20 characters." })
        .optional(),
      iban: z
        .string()
        .max(34, { message: "IBAN cannot exceed 34 characters." })
        .optional(),
    })
    .optional(),
  emergency_contact_info: z
    .object({
      name: z
        .string()
        .max(100, { message: "Name cannot exceed 100 characters." })
        .optional(),
      relationship: z
        .string()
        .max(50, { message: "Relationship cannot exceed 50 characters." })
        .optional(),
      contact_number: z
        .string()
        .min(10, { message: "Contact number must be at least 10 digits." })
        .max(15, { message: "Contact number cannot exceed 15 digits." })
        .optional(),
    })
    .optional(),
  medical_conditions: z
    .string()
    .max(500, { message: "Medical conditions cannot exceed 500 characters." })
    .optional(),
  comments: z
    .string()
    .max(1000, { message: "Comments cannot exceed 1000 characters." })
    .optional(),
});

// Infer TypeScript types from the schema
export type EmployeeSchema = z.infer<typeof employeeSchema>;
