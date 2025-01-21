import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      require: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      require: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('Semester Already Exists!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
