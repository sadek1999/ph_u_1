import z from "zod";

// Define the schema for TUserName
const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required"),
});

// Define the schema for TGuardian
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father name is required"),
  fatherContact: z
    .string()
    .trim()
    .min(10, "Invalid father contact number")
    .optional(),
  fatherOccupation: z.string().trim(),
  motherName: z.string().trim().min(1, "Mother name is required"),
  motherContact: z
    .string()
    .trim()
    .min(10, "Invalid mother contact number")
    .optional(),
  motherOccupation: z.string().trim(),
});

// Define the schema for TLocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, "Local guardian name is required"),
  address: z.string().trim().min(1, "Local guardian address is required"),
  contact: z
    .string()
    .trim()
    .min(10, "Invalid local guardian contact number")
    .optional(),
});

// Define the schema for TStudent
 export const createStudentValidationSchema = z.object({
  body: z.object({
    // Ensure valid UUID format
    password: z.string().trim().min(1, "Student ID is required"),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]),
      email: z.string().trim().email("Invalid email address"),
      dateOfBarth: z.string(), // Validate date format
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      contactNO: z.string().trim().min(10, "Invalid contact number"),
      EmergencyContactNo: z
        .string()
        .trim()
        .min(10, "Invalid emergency contact number"),
      presentAddress: z.string().trim().min(1, "Present address is required"),
      permanentAddress: z
        .string()
        .trim()
        .min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().trim().url("Invalid profile image URL").optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required").optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father name is required").optional(),
  fatherContact: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Invalid father contact number")
    .optional(),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, "Father occupation is required")
    .optional(),
  motherName: z.string().trim().min(1, "Mother name is required").optional(),
  motherContact: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Invalid mother contact number")
    .optional(),
  motherOccupation: z
    .string()
    .trim()
    .min(1, "Mother occupation is required")
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, "Local guardian name is required").optional(),
  address: z
    .string()
    .trim()
    .min(1, "Local guardian address is required")
    .optional(),
  contact: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Invalid local guardian contact number")
    .optional(),
});

 export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().trim().min(1, "Password is required").optional(),
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: z.enum(["male", "female"]).optional(),
        email: z.string().trim().email("Invalid email address").optional(),
        dateOfBarth: z
          .string()
          .trim()
          .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Invalid date format, should be YYYY-MM-DD"
          )
          .optional(),
        bloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
          .optional(),
        contactNO: z
          .string()
          .trim()
          .regex(/^\d{10}$/, "Invalid contact number")
          .optional(),
        EmergencyContactNo: z
          .string()
          .trim()
          .regex(/^\d{10}$/, "Invalid emergency contact number")
          .optional(),
        presentAddress: z
          .string()
          .trim()
          .min(1, "Present address is required")
          .optional(),
        permanentAddress: z
          .string()
          .trim()
          .min(1, "Permanent address is required")
          .optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z
          .string()
          .trim()
          .url("Invalid profile image URL")
          .optional(),
        admissionSemester: z
          .string()
          .trim()
          .min(1, "Admission semester is required")
          .optional(),
        academicDepartment: z
          .string()
          .trim()
          .min(1, "Academic department is required")
          .optional(),
      })
      .optional(),
  }),
});
// export const studentValidations = {
//   createStudentValidationSchema,
//   updateStudentValidationSchema,
// };
