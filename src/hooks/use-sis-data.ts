import { useState, useCallback } from "react";
import { toast } from "sonner";

// Mock Data Types
export interface Student {
    id: string;
    name: string;
    gender: string;
    class: string;
    dob: string;
    guardian: string;
    phone: string;
    status: string;
    fees: string;
    gpa: string;
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
    { id: "BS-2024-001", name: "Amina Hassan Mwangi", gender: "F", class: "Form 4A", dob: "15/03/2008", guardian: "Hassan Mwangi", phone: "+255 712 345 678", status: "active", fees: "paid", gpa: "3.8" },
    { id: "BS-2024-002", name: "Juma Salim Kiprotich", gender: "M", class: "Form 3B", dob: "22/07/2009", guardian: "Salim Kiprotich", phone: "+255 754 987 654", status: "active", fees: "partial", gpa: "3.2" },
    { id: "BS-2024-003", name: "Fatuma Ali Odhiambo", gender: "F", class: "Form 2A", dob: "08/11/2010", guardian: "Ali Odhiambo", phone: "+255 767 111 222", status: "active", fees: "paid", gpa: "3.9" },
    { id: "BS-2024-004", name: "David Mwenda Kamau", gender: "M", class: "Form 1C", dob: "30/01/2011", guardian: "Mwenda Kamau", phone: "+255 745 333 444", status: "new", fees: "unpaid", gpa: "N/A" },
    { id: "BS-2024-005", name: "Zainab Omar Njoroge", gender: "F", class: "Form 4B", dob: "14/05/2008", guardian: "Omar Njoroge", phone: "+255 786 555 666", status: "active", fees: "paid", gpa: "4.0" },
];

const initialStaff: Staff[] = [
    { id: "ST-001", name: "John Kamau", role: "Mwalimu", dept: "Hisabati", phone: "+255 712 111 222", email: "j.kamau@bendel.ac.tz", status: "active", exp: "8 miaka", rating: 4.8 },
    { id: "ST-002", name: "Grace Mwamba", role: "Mwalimu", dept: "Kiingereza", phone: "+255 754 333 444", email: "g.mwamba@bendel.ac.tz", status: "active", exp: "5 miaka", rating: 4.6 },
];

const initialAnnouncements: Announcement[] = [
    { id: 1, title: "Mtihani wa Mwisho wa Term 2", content: "Mtihani wa mwisho wa Term 2 utaanza tarehe 15 Julai 2024. Wanafunzi wote wanahitajika kuwa tayari.", date: "25 Jun 2024", category: "Mtihani", priority: "high", author: "Mkurugenzi Hassan" },
];

export function useSisData() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [staff, setStaff] = useState<Staff[]>(initialStaff);
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

    const addStudent = useCallback((student: Omit<Student, "id">) => {
        const newStudent = { ...student, id: `BS-2024-${String(students.length + 1).padStart(3, '0')}` };
        setStudents(prev => [newStudent, ...prev]);
        toast.success("Mwanafunzi ameongezwa kikamilifu!");
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
        addStaff,
        addAnnouncement
    };
}
