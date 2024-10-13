import { TAcademicSemesterNameCode, TMonths, TSemesterCode, TSemesterName } from "./academicSemeste.interface";


export const AcademicSemesterSearchableFields = ['name', 'year'];
 export const months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  export const SemesterName:TSemesterName[]=['Spring','Summer','Fall']
  export const SemesterCode:TSemesterCode[]=['01','02','03']

  export const academicSemesterNameCodeMapper :TAcademicSemesterNameCode={
    Spring:'01',
    Summer:"02",
    Fall:'03'
   }