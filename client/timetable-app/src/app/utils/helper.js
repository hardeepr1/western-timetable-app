const baseUrl = "/api";

export const URLS = {
  ADD_REVIEW: `${baseUrl}/secure/review`,
  ALL_REVIEWS: `${baseUrl}/secure/reviews`,
  GET_COURSE_REVIEW: `${baseUrl}/secure/review`,
  ALL_COURSES: `${baseUrl}/secure/courses`,
  SEARCH_BY_KEYWORD: `${baseUrl}/open/searchcourse`,
  SEARCH_BY_COURSEID: `${baseUrl}/open/courseid`,
  GET_COURSELISTS: `${baseUrl}/open/courselist`,
  CREATE_COURSELIST: `${baseUrl}/secure/courselist`,
  GET_TIMETABLE: `${baseUrl}/open/timetable`,
  USER_REGISTER: `${baseUrl}/open/signup`,
  USER_LOGIN: `${baseUrl}/open/signin`,
  PASSPORT_AUTH: `${baseUrl}/passport/auth/google`,
  ALL_USERS: `${baseUrl}/secure/users`,
};

export function getTermMapping() {
  let termMapping = {
    E: "Essay Full Course",
    A: "First Term Half-Course",
    B: "Second Term Half-Course",
    F: "First Term Essay Half-Course",
    G: "Second Term Essay Half-Course",
    Q: "First Term First Quarter Course",
    R: "First Term Second Quarter Course",
    S: "Second Term First Quarter Course",
    T: "Second Term Second Quarter Course",
    w: "First Term Full Course (full course offered in one term)",
    X: "Second Term Full Course (full course offered in one term)",
    Y: "Half-Course Offered In Other Than A Regular Session",
    Z: "Essay Half-Course Offered In Other Than A Regular Session",
    FULL: "Full-year course",
  };
  return termMapping;
}
