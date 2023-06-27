import { useState, useEffect } from "react";
import { getCourse } from "../../../helper/courseAPI";
import { getSemester } from "../../../helper/semesterAPI";
import { getClass } from "../../../helper/classAPI";
import { getSchedule } from "../../../helper/scheduleAPI";
import { getMember } from "../../../helper/loginAPI";

export default function useSchedule() {
  const [courseList, setCourseList] = useState([]);
  const [totalSchedule, setTotalSchedule] = useState([]);
  console.log(courseList);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, semesterResponse, classResponse, scheduleResponse] =
          await Promise.all([
            getCourse(),
            getSemester(),
            getClass(),
            getSchedule(),
            getMember(),
          ]);

        const updatedCourseList = response.data.map((course) => ({
          id: course._id,
          semester_id: course.semester_id,
          coursename: course.coursename,
          classes: [],
        }));

        const newClassList = classResponse.data.map((classItem) => {
          const scheduleList = scheduleResponse.data.filter(
            (scheduleItem) => classItem.schedule_id === scheduleItem._id
          );
          const schedules = scheduleList.reduce((acc, scheduleItem) => {
            acc.push({
              schedulename: scheduleItem.schedulename,
              startTime: scheduleItem.startTime,
              endTime: scheduleItem.endTime,
            });
            return acc;
          }, []);

          const newClassItem = {
            id: classItem._id,
            name: classItem.classname,
            course_id: classItem.course_id,
            days: classItem.days,
            schedules: schedules,
          };

          return newClassItem;
        });

        updatedCourseList.forEach((course) => {
          course.classes = newClassList.filter(
            (classItem) => classItem.course_id === course.id
          );

          const courseSemester = semesterResponse.data.find(
            (semester) => semester._id === course.semester_id
          );
          if (courseSemester) {
            course.semester = {
              id: courseSemester._id,
              name: courseSemester.semestername,
              startDate: courseSemester.startDate,
              endDate: courseSemester.endDate,
            };
          }
        });

        setCourseList(updatedCourseList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newTotalSchedule = [];
    courseList.forEach((course) => {
      course.classes.forEach((classItem) => {
        classItem.schedules.forEach((scheduleItem) => {
          if (classItem.days.length > 0) {
            newTotalSchedule.push({
              startDate: course.semester.startDate,
              endDate: course.semester.endDate,
              startTime: scheduleItem.startTime,
              endTime: scheduleItem.endTime,
              days: classItem.days,
              className: classItem.name,
              scheduleName: scheduleItem.schedulename,
              courseName: course.coursename,
              semesterName: course.semester.name,
            });
          }
        });
      });
    });
    setTotalSchedule(newTotalSchedule);
  }, [courseList]);

  return { courseList, totalSchedule };
}
