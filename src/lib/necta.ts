export type OLevelGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type ALevelGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'S' | 'F';

export interface GradeResult {
    grade: OLevelGrade | ALevelGrade;
    points: number;
    remarks: string;
}

export const getOLevelGrade = (marks: number): GradeResult => {
    if (marks >= 75) return { grade: 'A', points: 1, remarks: 'Excellent' };
    if (marks >= 65) return { grade: 'B', points: 2, remarks: 'Very Good' };
    if (marks >= 45) return { grade: 'C', points: 3, remarks: 'Good' };
    if (marks >= 30) return { grade: 'D', points: 4, remarks: 'Satisfactory' };
    return { grade: 'F', points: 5, remarks: 'Fail' };
};

export const getOLevelDivision = (points: number): string => {
    if (points >= 7 && points <= 17) return 'Division I';
    if (points >= 18 && points <= 21) return 'Division II';
    if (points >= 22 && points <= 25) return 'Division III';
    if (points >= 26 && points <= 33) return 'Division IV';
    if (points >= 34 && points <= 35) return 'Division 0';
    return 'Invalid Points';
};

export const getALevelGrade = (marks: number): GradeResult => {
    if (marks >= 80) return { grade: 'A', points: 5, remarks: 'Excellent' };
    if (marks >= 70) return { grade: 'B', points: 4, remarks: 'Very Good' };
    if (marks >= 60) return { grade: 'C', points: 3, remarks: 'Good' };
    if (marks >= 50) return { grade: 'D', points: 2, remarks: 'Average' };
    if (marks >= 40) return { grade: 'E', points: 1, remarks: 'Satisfactory' };
    if (marks >= 35) return { grade: 'S', points: 0.5, remarks: 'Subsidiary Pass' };
    return { grade: 'F', points: 0, remarks: 'Fail' };
};

export const calculateOLevelDivision = (marksList: number[]): { division: string, points: number, best7: number[] } => {
    if (marksList.length < 7) {
        return { division: 'Incomplete', points: 0, best7: [] };
    }

    // Calculate points for each subject
    const pointsList = marksList.map(mark => getOLevelGrade(mark).points);

    // Sort ascending (lower points are better in O-level)
    const sortedPoints = [...pointsList].sort((a, b) => a - b);

    // Take the best 7 subjects (lowest points)
    const best7 = sortedPoints.slice(0, 7);
    const totalPoints = best7.reduce((sum, p) => sum + p, 0);

    return {
        division: getOLevelDivision(totalPoints),
        points: totalPoints,
        best7
    };
};

export const calculateALevelPoints = (marksList: number[]): { points: number, principalPasses: number } => {
    const results = marksList.map(mark => getALevelGrade(mark));
    const totalPoints = results.reduce((sum, res) => sum + res.points, 0);
    const principalPasses = results.filter(res => ['A', 'B', 'C', 'D', 'E'].includes(res.grade)).length;

    return { points: totalPoints, principalPasses };
};
