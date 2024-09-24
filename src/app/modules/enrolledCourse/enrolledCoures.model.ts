import mongoose, { model, Schema } from "mongoose";
import { TCourseMark, TEnrolledCourse } from "./enrolledCourse.interface";
import { Grad } from "./enrolleCourse.const";



const courseMarksSchema=new Schema<TCourseMark>({
    quiz_1:{type:Number,min:0,max:10,default:0},
    mid:{type:Number,min:0,max:30,default:0},
    quiz_2:{type:Number,min:0,max:10,default:0},
    final:{type:Number,min:0,max:40,default:0},
    
})

const enrolledCourseSchema=new Schema<TEnrolledCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true,
      },
      academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:"AcademicDepartment",
        required:true,
      },
      academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty",
        required:true,
      },
      academicSemester:{
        type:Schema.Types.ObjectId,
        ref:"AcademicSemester",
        required:true,
      },
      offeredCourse:{
        type:Schema.Types.ObjectId,
        ref:"OfferedCourse",
        required:true,
      },
      course:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true,
      },
      student:{
        type:Schema.Types.ObjectId,
        ref:"Student",
        required:true,
      },
      Faculty:{
        type:Schema.Types.ObjectId,
        ref:"Faculty",
        required:true,
      },
      isEnrolled:{
        type:Boolean,
        default:false,
      },
      courseNumber:courseMarksSchema,
      grad:{
        type:String,
        enum:Grad,
        default:"NA",
      },
      gradePoint:{
        type:Number,
        default:0,
      },
      isCompleted:{
        type:Boolean,
        default:false,
      }

},{
    timestamps:true
})


export const EnrolledCourse=mongoose.model<TEnrolledCourse>("EnrolledCourse",enrolledCourseSchema)