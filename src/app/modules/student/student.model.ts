import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name Is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation Is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number Is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name Is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation Is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number Is Required'],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation Is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number Is Required'],
    maxlength: [15, 'Local Guardian Contact Number can not more than 15'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address Is Required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'User Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: UserNameSchema,
      required: [true, 'User Name Is Required'],
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: `Gender Is Required : "male", "female", "other"`,
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'User Email Is Required'],
      unique: true,
    },
    contactNos: {
      type: String,
      required: [true, 'User Contact Number Is Required'],
      trim: true,
      maxlength: [15, 'User Contact Number can not more than 15'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'User Emergency Contact Number Is Required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        message: `Blood Group is Required : "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"`,
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'User Present Address Is Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'User Permanent Address Is Required'],
    },
    guardian: {
      type: GuardianSchema,
      required: [true, 'User Guardian Info Is Required'],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, 'User Local Guardian Is Required'],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: AcademicSemester,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;

  // this.name.firstName + this.name.middleName + this.name.lastName;
});

//Query Middleware/hook
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
