
import { TAcademicSemester } from "../academicSemester/academicSemeste.interface";
import { User } from "./user.model";

const getLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const LastStudentId = await getLastStudent();
  const LastSemesterYear = LastStudentId?.substring(0, 4);
  const LastSemesterCode = LastStudentId?.substring(4, 6);
  const CurrentSemesterYear = payload.year;
  const CurrentSemesterCode = payload.code;

  if (
    LastSemesterCode === CurrentSemesterCode &&
    LastSemesterYear === CurrentSemesterYear
  ) {
    currentId = LastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// const getLastFaculty=async()=>{
//   const lastFaculty=await User.findOne(
//     {
//       role:'faculty',

//     },{
//       id:1,
//       _id:0
//     }
//   ).sort({createAt:-1}).lean();
//   return lastFaculty?.id?lastFaculty.id:undefined;
// }
const getLastFaculty = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "Faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id : undefined;
};
export const generateFacultyId = async () => {
  let createdId = (0).toString();

  const lastFacultyId = await getLastFaculty();

  if (lastFacultyId) {
    createdId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(createdId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;
  return incrementId;
};
const getLastAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin.id : undefined;
};
export const generateAdminId = async () => {
  let createdId = (0).toString();

  const lastAdminId = await getLastAdmin();

  if (lastAdminId) {
    createdId = lastAdminId.substring(2);
  }

  let incrementId = (Number(createdId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};


