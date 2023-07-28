import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClass, updateClass } from "../../../../helper/classAPI";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { getSchedule } from "../../../../helper/scheduleAPI";
import { getCourse } from "../../../../helper/courseAPI";
import { getMember, getUser } from "../../../../helper/loginAPI";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateClass() {
  const [classes, setClasses] = useState({});
  const [classList, setClassList] = useState("");
  const classesId = useParams();
  const [classname, setClassname] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [scheduleList, setScheduleList] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [courseList, setCourseList] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [instructorList, setInstructorList] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [filteredInstructorList, setFilteredInstructorList] = useState([]);
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/staffmanage");
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuDay = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    async function fecthClassList() {
      try {
        const requestUrl = "https://yoga-app-swp.onrender.com/api/class/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setClassList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthClassList();

    async function fetchSchedule() {
      try {
        const response = await axios.get(
          "https://yoga-app-swp.onrender.com/api/schedule/get"
        );
        const scheduleData = response.data;
        setScheduleList(scheduleData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSchedule();

    async function fetchCourse() {
      try {
        const response = await axios.get(
          "https://yoga-app-swp.onrender.com/api/course/get"
        );
        const courseData = response.data;
        setCourseList(courseData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourse();

    async function fetchInstructor() {
      try {
        const response = await axios.get(
          "https://yoga-app-swp.onrender.com/api/accounts"
        );
        const allInstructors = response.data.filter(
          (ins) => ins.role === "instructor"
        );
        setInstructorList(
          response.data.filter((ins) => ins.role === "instructor")
        );
        setFilteredInstructorList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInstructor();
  }, []);

  async function fetchClasses() {
    try {
      const response = await getClass();
      const classes = response.data.find((obj) => obj._id === classesId.id);
      setClasses(classes);
      // Set initial values for the input fields
      setClassname(classes.classname);
      if (classes.schedule_id) {
        const response = await getSchedule();
        const schedulename = response.data.find(
          (obj) => obj._id === classes.schedule_id
        );
        setScheduleId(schedulename.schedulename);
      }
      if (classes.course_id) {
        const response = await getCourse();
        const coursename = response.data.find(
          (obj) => obj._id === classes.course_id
        );
        setCourseId(coursename.coursename);
      }
      if (classes.instructor_id) {
        const id = classes.instructor_id;
        const response = await getUser({ id });
        console.log(response.data);
        setInstructorId(response.data.username);
      }
      setDays(classes.days);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const scheduleId = selectedSchedule ? selectedSchedule._id : null;
      const courseId = selectedCourse ? selectedCourse._id : null;
      const instructorId = selectedInstructor ? selectedInstructor._id : null;
      const response = await updateClass({
        _id: classesId.id,
        classname,
        schedule_id: scheduleId,
        course_id: courseId,
        instructor_id: instructorId,
        days: days,
      });
      if (response) {
        toast.success("Updated successfully!");
      } else {
        toast.error("Failed to update class...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update class...");
    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedDays = typeof value === "string" ? value.split(",") : value;

    const sortedDays = selectedDays.sort((a, b) => {
      const daysOfWeekOrder = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7,
      };
      return daysOfWeekOrder[a] - daysOfWeekOrder[b];
    });

    setDays(sortedDays);
  };
  useEffect(() => {
    if (selectedSchedule && days.length > 0) {
      const filteredInstructors = instructorList.filter((instructor) => {
        const conflictingSchedules = classList.filter((classItem) => {
          const hasScheduleConflict = classItem.schedule_id === selectedSchedule._id;
          const hasDaysConflict = classItem.days.some((day) => days.includes(day));
          return hasScheduleConflict && hasDaysConflict;
        });
        const isConflictingInstructor = conflictingSchedules.some(
          (classItem) => classItem.instructor_id === instructor._id
        );
        return !isConflictingInstructor;
      });
      const initialInstructor = selectedInstructor || null;
      let updatedInstructors = [...filteredInstructors];
      if (initialInstructor && !filteredInstructors.some((instructor) => instructor._id === initialInstructor._id)) {
        updatedInstructors.push(initialInstructor);
      }
      setFilteredInstructorList(updatedInstructors);
      if (!filteredInstructors.some((instructor) => instructor._id === selectedInstructor?._id)) {
        setSelectedInstructor(initialInstructor);
      }
    } else {
      setFilteredInstructorList(instructorList);
    }
  }, [selectedSchedule, days, instructorList, classList, selectedInstructor]);


  return (
    <>
      <Header />
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "24px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Update Class
        </h1>
      </div>
      <Container maxWidth="md" sx={styles.container}>
        <Toaster position="top-center"></Toaster>
        <form onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            label="Class Name"
            type="text"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: "10px" }}
          />
          <Autocomplete
            value={selectedSchedule || scheduleId}
            onChange={(event, newValue) => setSelectedSchedule(newValue)}
            options={scheduleList}
            getOptionLabel={(option) => option.schedulename || scheduleId}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Slot"
                type="text"
                name="schedule_id"
                required
                sx={styles.textField}
              />
            )}
          />
          <Autocomplete
            value={selectedCourse || courseId}
            onChange={(event, newValue) => setSelectedCourse(newValue)}
            options={courseList}
            getOptionLabel={(option) => option.coursename || courseId}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Course"
                type="text"
                name="course_id"
                required
                sx={styles.textField}
              />
            )}
          />
          <Autocomplete
            value={selectedInstructor || instructorId}
            onChange={(event, newValue) => setSelectedInstructor(newValue)}
            options={filteredInstructorList}
            getOptionLabel={(option) => option.username || instructorId}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Instructor"
                type="text"
                name="instructor_id"
                required
                sx={styles.textField}
              />
            )}
          />
          <FormControl sx={{ width: 852 }}>
            <InputLabel id="demo-multiple-checkbox-label">Days</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={days}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuDay}
            >
              {daysOfWeek.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={days.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "1em",
            }}
          >
            Update Class
          </button>
          <Button
            onClick={handleBack}
            style={{
              marginBlock: "20px",
              float: "right",
              backgroundColor: "grey",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "10px",
              cursor: "pointer",
            }}
          >
            Back
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
}

export default UpdateClass;

const styles = {
  container: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
};
