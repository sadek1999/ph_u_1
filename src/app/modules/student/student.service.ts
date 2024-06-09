import { TStudent } from "./student.interface";
import { Student } from "./../student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error("your are alrady Exists");
  }

  const result = await Student.create(studentData);
  // const student = new Student(studentData);

  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result=await Student.aggregate([ {$match:{id:id}}])
  return result;
};
const delateStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDelated:true});
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  delateStudentFromDB,
};
