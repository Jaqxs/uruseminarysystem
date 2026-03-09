import { useState, useCallback } from "react";
import { toast } from "sonner";

// Mock Data Types
export interface DisciplineRecord {
    date: string;
    incident: string;
    action: string;
    severity: 'low' | 'medium' | 'high';
    reportedBy: string;
}

export interface AcademicRecord {
    term: string;
    gpa: string;
    rank: string;
    status: string;
    attendance: string;
}

export interface Student {
    id: string;                  // Admission Number e.g. BS-2024-001
    name: string;
    gender: string;
    class: string;               // e.g. Form 4
    stream: string;              // e.g. A, B, C
    dob: string;
    nationalId?: string;         // NIDA / Birth Cert No
    address?: string;
    guardian: string;
    phone: string;
    guardianEmail?: string;
    joinedYear: string;
    status: string;              // active | new | suspended | transferred
    fees: string;                // paid | partial | unpaid
    gpa: string;
    attendanceRate: string;      // e.g. "96%"
    discipline: DisciplineRecord[];
    academicHistory: AcademicRecord[];
    documents?: string[];        // list of document names
}

export interface Staff {
    id: string;
    name: string;
    role: string;
    dept: string;
    phone: string;
    email: string;
    status: string;
    exp: string;
    rating: number;
}

export interface Announcement {
    id: number;
    title: string;
    content: string;
    date: string;
    category: string;
    priority: string;
    author: string;
}

// Initial Data
const initialStudents: Student[] = [
    {
        id: "BS-2024-001", name: "Stephen Peter Mbwambo", gender: "M", class: "Form 4", stream: "A",
        dob: "15/03/2008", nationalId: "20080315-00001-00001-1", address: "Kinondoni, Dar es Salaam",
        guardian: "Peter Mbwambo", phone: "+255 712 345 678", guardianEmail: "p.mbwambo@gmail.com",
        joinedYear: "2021", status: "active", fees: "paid", gpa: "Div I", attendanceRate: "97%",
        discipline: [],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div I", rank: "3/45", status: "Excellent", attendance: "97%" },
            { term: "2023 Term 3", gpa: "Div I", rank: "4/45", status: "Promoted", attendance: "95%" },
            { term: "2023 Term 2", gpa: "Div II", rank: "7/45", status: "Normal", attendance: "98%" },
        ],
        documents: ["Birth Certificate", "PSLE Result", "Transfer Letter"]
    },
    {
        id: "BS-2024-002", name: "John Simon Peter", gender: "M", class: "Form 3", stream: "B",
        dob: "22/07/2009", nationalId: "20090722-00002-00001-0", address: "Temeke, Dar es Salaam",
        guardian: "Simon Peter", phone: "+255 754 987 654", guardianEmail: "",
        joinedYear: "2022", status: "active", fees: "partial", gpa: "Div II", attendanceRate: "88%",
        discipline: [{ date: "12/02/2024", incident: "Late to class", action: "Verbal Warning", severity: "low", reportedBy: "Mr. Kamau" }],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div II", rank: "18/45", status: "Normal", attendance: "88%" },
            { term: "2023 Term 3", gpa: "Div III", rank: "22/45", status: "Improvement Needed", attendance: "82%" },
        ],
        documents: ["Birth Certificate", "PSLE Result"]
    },
    {
        id: "BS-2024-003", name: "Francis Andrew Shao", gender: "M", class: "Form 2", stream: "A",
        dob: "08/11/2010", nationalId: "20101108-00003-00001-1", address: "Ilala, Dar es Salaam",
        guardian: "Andrew Shao", phone: "+255 767 111 222", guardianEmail: "a.shao@gmail.com",
        joinedYear: "2023", status: "active", fees: "paid", gpa: "Div I", attendanceRate: "99%",
        discipline: [],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div I", rank: "1/42", status: "Top Performer", attendance: "99%" },
            { term: "2023 Term 3", gpa: "Div I", rank: "2/42", status: "Excellence", attendance: "100%" },
        ],
        documents: ["Birth Certificate", "PSLE Result", "Medical Certificate"]
    },
    {
        id: "BS-2024-004", name: "David Mwenda Kamau", gender: "M", class: "Form 1", stream: "C",
        dob: "30/01/2011", nationalId: "20110130-00004-00001-0", address: "Ubungo, Dar es Salaam",
        guardian: "Mwenda Kamau", phone: "+255 745 333 444", guardianEmail: "",
        joinedYear: "2024", status: "new", fees: "unpaid", gpa: "N/A", attendanceRate: "N/A",
        discipline: [],
        academicHistory: [],
        documents: ["Birth Certificate", "KCPE Result"]
    },
    {
        id: "BS-2024-005", name: "Zacharia Oscar Njoroge", gender: "M", class: "Form 4", stream: "B",
        dob: "14/05/2008", nationalId: "20080514-00005-00001-1", address: "Msasani, Dar es Salaam",
        guardian: "Oscar Njoroge", phone: "+255 786 555 666", guardianEmail: "o.njoroge@gmail.com",
        joinedYear: "2021", status: "active", fees: "paid", gpa: "Div I", attendanceRate: "100%",
        discipline: [],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div I", rank: "1/45", status: "Top Performer", attendance: "100%" },
            { term: "2023 Term 3", gpa: "Div I", rank: "1/45", status: "Excellence", attendance: "100%" },
            { term: "2023 Term 2", gpa: "Div I", rank: "2/45", status: "Excellence", attendance: "99%" },
        ],
        documents: ["Birth Certificate", "PSLE Result", "Award Certificate"]
    },
    {
        id: "BS-2024-006", name: "Martin Osei Bonsu", gender: "M", class: "Form 2", stream: "B",
        dob: "03/09/2010", nationalId: "20100903-00006-00001-0", address: "Kariakoo, Dar es Salaam",
        guardian: "Osei Bonsu", phone: "+255 712 888 999", guardianEmail: "",
        joinedYear: "2023", status: "active", fees: "partial", gpa: "Div III", attendanceRate: "90%",
        discipline: [
            { date: "04/03/2024", incident: "Uniform Violation", action: "Written Warning", severity: "low", reportedBy: "Mr. Gabriel" },
            { date: "20/01/2024", incident: "Fighting", action: "Suspension (3 days)", severity: "high", reportedBy: "HOD Office" },
        ],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div III", rank: "25/42", status: "Normal", attendance: "90%" },
        ],
        documents: ["Birth Certificate", "PSLE Result"]
    },
    {
        id: "BS-2024-007", name: "Raphael Tesfaye Abebe", gender: "M", class: "Form 3", stream: "A",
        dob: "19/12/2009", nationalId: "20091219-00007-00001-1", address: "Kigamboni, Dar es Salaam",
        guardian: "Tesfaye Abebe", phone: "+255 754 222 111", guardianEmail: "t.abebe@gmail.com",
        joinedYear: "2022", status: "active", fees: "paid", gpa: "Div II", attendanceRate: "94%",
        discipline: [],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div II", rank: "10/45", status: "Good", attendance: "94%" },
            { term: "2023 Term 3", gpa: "Div II", rank: "12/45", status: "Good", attendance: "92%" },
        ],
        documents: ["Birth Certificate", "PSLE Result", "Medical Certificate"]
    },
    {
        id: "BS-2023-008", name: "Isaac Joseph Banda", gender: "M", class: "Form 1", stream: "A",
        dob: "11/06/2011", nationalId: "20110611-00008-00001-0", address: "Mwenge, Dar es Salaam",
        guardian: "Joseph Banda", phone: "+255 786 777 333", guardianEmail: "",
        joinedYear: "2024", status: "suspended", fees: "unpaid", gpa: "Div IV", attendanceRate: "61%",
        discipline: [
            { date: "15/04/2024", incident: "Repeated Truancy", action: "Suspension (1 week)", severity: "high", reportedBy: "Class Teacher" },
        ],
        academicHistory: [
            { term: "2024 Term 1", gpa: "Div IV", rank: "38/42", status: "At Risk", attendance: "61%" },
        ],
        documents: ["Birth Certificate"]
    },
];

const initialStaff: Staff[] = [
    { id: "ST-001", name: "John Kamau", role: "Staff", dept: "Mathematics", phone: "+255 712 111 222", email: "j.kamau@uruseminary.ac.tz", status: "active", exp: "8 years", rating: 4.8 },
    { id: "ST-002", name: "Gabriel Mwamba", role: "Staff", dept: "English", phone: "+255 754 333 444", email: "g.mwamba@uruseminary.ac.tz", status: "active", exp: "5 years", rating: 4.6 },
];

const initialAnnouncements: Announcement[] = [
    { id: 1, title: "Final Term 2 Exams", content: "The final Term 2 exams will begin on July 15, 2024. All students are required to be well prepared.", date: "25 Jun 2024", category: "Examination", priority: "high", author: "Rector Peter" },
];

export function useSisData() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [staff, setStaff] = useState<Staff[]>(initialStaff);
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

    const addStudent = useCallback((student: Omit<Student, "id">) => {
        const year = new Date().getFullYear();
        const seq = String(students.length + 1).padStart(3, '0');
        const newStudent: Student = {
            ...student,
            id: `BS-${year}-${seq}`,
            discipline: student.discipline ?? [],
            academicHistory: student.academicHistory ?? [],
            documents: student.documents ?? [],
        };
        setStudents(prev => [newStudent, ...prev]);
        toast.success(`Mwanafunzi ameongezwa! Nambari: BS-${year}-${seq}`);
    }, [students.length]);

    const deleteStudent = useCallback((id: string) => {
        setStudents(prev => prev.filter(s => s.id !== id));
        toast.info("Mwanafunzi amefutwa.");
    }, []);

    const addStaff = useCallback((member: Omit<Staff, "id">) => {
        const newMember = { ...member, id: `ST-${String(staff.length + 1).padStart(3, '0')}` };
        setStaff(prev => [newMember, ...prev]);
        toast.success("Mtumishi ameongezwa!");
    }, [staff.length]);

    const updateStudent = useCallback((id: string, updates: Partial<Student>) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
        toast.success("Taarifa za mwanafunzi zimesasishwa.");
    }, []);

    const addDisciplineRecord = useCallback((studentId: string, record: DisciplineRecord) => {
        setStudents(prev => prev.map(s =>
            s.id === studentId
                ? { ...s, discipline: [record, ...(s.discipline ?? [])] }
                : s
        ));
        toast.warning("Kumbukumbu ya nidhamu imeongezwa.");
    }, []);

    const addAnnouncement = useCallback((ann: Omit<Announcement, "id" | "date">) => {
        const newAnn = {
            ...ann,
            id: announcements.length + 1,
            date: new Date().toLocaleDateString('sw-TZ', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        setAnnouncements(prev => [newAnn, ...prev]);
        toast.success("Tangazo limetumwa!");
    }, [announcements.length]);

    return {
        students,
        staff,
        announcements,
        addStudent,
        deleteStudent,
        updateStudent,
        addDisciplineRecord,
        addStaff,
        addAnnouncement
    };
}
