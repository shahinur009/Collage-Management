import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password did not given, user default password
  userData.password = password || (config.default_password as string);
  //   set user role
  userData.role = 'student';
  // set manually generated id
  userData.id = '2030100001';
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //Reference id

    const newStudent = Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
