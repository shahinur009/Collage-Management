import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    require: true,
    enum: AcademicSemesterName,
  },
  year: {
    type: Date,
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
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
