import { useState, useEffect } from "react";
import { getCourse } from "../../../helper/courseAPI";
import { getSemester } from "../../../helper/semesterAPI";
import { getClass } from "../../../helper/classAPI";
import { getSchedule } from "../../../helper/scheduleAPI";
import { getMember } from "../../../helper/loginAPI";

export default function useSchedule() {
  const [courseList, setCourseList] = useState([]);
  const [totalSchedule, setTotalSchedule] = useState([]);
  const [checkSchedule, setCheckSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          response,
          semesterResponse,
          classResponse,
          scheduleResponse,
          userResponse,
        ] = await Promise.all([
          getCourse(),
          getSemester(),
          getClass(),
          getSchedule(),
          getMember(),
        ]);

        const updatedCourseList = response.data
          .filter((course) => course.status === true)
          .map((course) => ({
            id: course._id,
            semester_id: course.semester_id,
            coursename: course.coursename,
            statusCourse: course.status,
            classes: [],
          }));

        const newClassList = classResponse.data.map((classItem) => {
          const scheduleList = scheduleResponse.data.filter(
            (scheduleItem) =>
              classItem.schedule_id === scheduleItem._id && scheduleItem.status
          );
          const schedules = scheduleList.reduce((acc, scheduleItem) => {
            acc.push({
              schedulename: scheduleItem.schedulename,
              startTime: scheduleItem.startTime,
              endTime: scheduleItem.endTime,
              statusSchedule: scheduleItem.status,
            });
            return acc;
          }, []);

          const instructorList = userResponse.data.filter(
            (instructorItem) =>
              classItem.instructor_id === instructorItem._id &&
              instructorItem.status
          );

          const instructor = instructorList.reduce((acc, instructorItem) => {
            acc.push({
              instructorName: instructorItem.username,
              instructorStatus: instructorItem.status,
            });
            return acc;
          }, []);

          const newClassItem = {
            id: classItem._id,
            name: classItem.classname,
            statusClass: classItem.status,
            course_id: classItem.course_id,
            days: classItem.days,
            schedules: schedules,
            instructor: instructor,
          };

          return newClassItem;
        });

        updatedCourseList.forEach((course) => {
          course.classes = newClassList.filter(
            (classItem) =>
              classItem.course_id === course.id && classItem.statusClass
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
              statusSemester: courseSemester.status,
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
          classItem.instructor.forEach((instructorItem) => {
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
                instructorName: instructorItem.instructorName,
                semesterName: course.semester.name,
                statusSemester: course.semester.statusSemester,
              });
            }
          });
        });
      });
    });
    setTotalSchedule(newTotalSchedule);
  }, [courseList]);

  useEffect(() => {
    const sortedSchedule = totalSchedule.sort(
      (a, b) => b.days.length - a.days.length
    );

    const checkedSchedule = [];
    sortedSchedule.forEach((schedule, index) => {
      let foundDuplicate = false;
      for (let i = 0; i < index; i++) {
        const item = sortedSchedule[i];
        if (
          item.scheduleName === schedule.scheduleName &&
          arraysMatch(item.days, schedule.days)
        ) {
          foundDuplicate = true;
          break;
        }
      }
      if (!foundDuplicate) {
        checkedSchedule.push(schedule);
      }
    });

    function arraysMatch(arr1, arr2) {
      return (
        arr1.every((value) => arr2.includes(value)) &&
        arr2.every((value) => arr1.includes(value))
      );
    }
    console.log(checkedSchedule);
    setCheckSchedule(checkedSchedule);
  }, [totalSchedule]);

  return { courseList, totalSchedule, checkSchedule };
}
