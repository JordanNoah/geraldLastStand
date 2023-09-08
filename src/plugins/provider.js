import axios from "axios";
//import store from "@/store"

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

const provider = {
    setToken: (token) => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    removeToken: () => {
        delete axios.defaults.headers.common.Authorization
    },
    signin: async (body) => {
        return await axios.post(`/auth/sign-in`,body)
    },
    signout: async () => {
        return await axios.delete(`/auth/sign-out`)
    },
    //students routes
    getStudents: async (filters) => {
        return await axios.get(`/students`,{
            params:filters
        }).catch((e)=>{
            return e;
            //store.commit('deleteJwt')
        })
    },
    postStudent: async (body) => {
        return await axios.post(`/students`,body)
    },
    getStudentsUuid: async (uuid) => {
        return await axios.get(`/students/${uuid}`)
    },
    getStudentsUuidEnrolment: async (uuid) => {
        return await axios.get(`/students/${uuid}/enrollments`)
    },
    //degress
    getDegress: async () => {
        return await axios.get(`/degrees`)
    },
    //subject
    getSubjects: async (degree) => {
        const params = {
            filters: {
              degree: degree
            }
          };
        return await axios.get(`/subjects`,{params:params})
    },
    //professors
    getTeachers: async (teacher) => {
        const params = {
            filters:{
                full_name:teacher
            }
        }
        return await axios.get(`/professors`,{params:params})
    },
    // class grade totals
    getClassGradeTotals: async (options) => {
        return await axios.get(`/class-grade-totals`,{params:options})
    },
    getClassGradeTotalsUuid: async (uuid) => {
        return await axios.get(`/class-grade-totals/${uuid}`)
    },
    //grades
    postGrades: async(body) =>{
        return await axios.post(`/grades`,body)
    },
    getGrades: async (uuidGrade) => {
        const params = {
            page:1,
            class:uuidGrade
        }
        return await axios.get(`/grades`,{params:params})
    },
    //tutorships
    postTutorships: async (body) => {
        return await axios.post(`/tutorships`,body)
    },
    getTutorships: async (options) => {
        return await axios.get(`/tutorships`,{params:options})
    },
    //academic periods
    postAcademicPeriods: async(body) => {
        return await axios.post(`/academic-periods`,body)
    },
    //account
    getAccount: async() => {
        return await axios.get(`/account`).catch((e)=>{return e;})
    },
    putAccount: async() => {
        return await axios.put(`/account/password-reset`)
    },
    //classes
    getClasses: async () => {
        return await axios.get(`/classes`)
    },
    getClassesUuid: async (uuid) => {
        return await axios.get(`/classes/${uuid}`)
    },
    putClassesUuidProfessor: async (uuid) => {
        return await axios.put(`/classes/${uuid}/professor-assignment`)
    },
    //enrollments
    postEnrollments: async (body) => {
        return await axios.post(`/enrollments`,body)
    },
    getEnrollments: async () => {
        return await axios.get(`/enrollments`)
    },
    postEnrollmentsFiles: async (body) => {
        return await axios.post(`/enrollments/files`,body)
    },
    getEnrollmentsUuid: async (uuid) => {
        return await axios.get(`/enrollments/${uuid}`)
    },
    putEnrollmentsUuid: async (uuid) => {
        return await axios.put(`/enrollments/${uuid}`)
    },
    //class inspections
    postClassInspections: async (body) => {
        return await axios.post(`/class-inspection-requests`,body)
    },
    getClassInspections: async (params) => {
        return await axios.get(`/class-inspection-requests`,{params})
    },
    getClassInspectionsUuid: async (uuid,params) => {
        return await axios.get(`/class-inspection-requests/${uuid}`,{params})
    },
    putClassInspectionsUuid: async (uuid,body) => {
        return await axios.put(`/class-inspection-requests/${uuid}`,body)
    },
    //password reset
    postPasswordReset: async(body) => {
        return await axios.post(`/password-reset`,body)
    },
    putPasswordReset: async(body) => {
        return await axios.post(`/password-reset`,body)
    }
}

export default provider