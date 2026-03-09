export type UserRole = 'admin' | 'bursar' | 'teacher' | 'director' | 'academic_master';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    location?: string;
    joined?: string;
    dept?: string;
    bio?: string;
}

export const mockUsers: Record<UserRole, AuthUser> = {
    admin: {
        id: 'U-001',
        name: 'Rev. Fr. Rector',
        email: 'admin@uruseminary.ac.tz',
        role: 'admin',
        phone: '+255 712 345 678',
        location: 'Dar es Salaam, Tanzania',
        joined: 'January 2024',
        dept: 'IT Department',
        bio: 'Chief administrator focusing on system infrastructure and security protocols.'
    },
    academic_master: {
        id: 'U-007',
        name: 'Dr. Amos Tarimo',
        email: 'a.tarimo@uruseminary.ac.tz',
        role: 'academic_master',
        phone: '+255 754 987 654',
        location: 'Dar es Salaam, Tanzania',
        joined: 'March 2022',
        dept: 'Academics Department',
        bio: 'Leading academic excellence and curriculum implementation at Uru Seminary.'
    },
    director: {
        id: 'U-005',
        name: 'Rev. Fr. Peter Macha',
        email: 'p.macha@uruseminary.ac.tz',
        role: 'director',
        phone: '+255 682 112 233',
        location: 'Dar es Salaam, Tanzania',
        joined: 'June 2021',
        dept: 'Management',
        bio: 'Strategic vice rector overseeing overall school operations and expansion.'
    },
    bursar: {
        id: 'U-004',
        name: 'Br. Francis Ally',
        email: 'f.ally@uruseminary.ac.tz',
        role: 'bursar',
        phone: '+255 788 334 455',
        location: 'Dar es Salaam, Tanzania',
        joined: 'September 2023',
        dept: 'Finance',
        bio: 'Managing school financial health, fee collections and budgeting.'
    },
    teacher: {
        id: 'U-002',
        name: 'Mr. John Kamau',
        email: 'j.kamau@uruseminary.ac.tz',
        role: 'teacher',
        phone: '+255 677 556 677',
        location: 'Dar es Salaam, Tanzania',
        joined: 'February 2023',
        dept: 'Science Department',
        bio: 'Physics and Mathematics specialist dedicated to student success.'
    }
};
