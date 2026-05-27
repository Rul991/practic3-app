export type MediaPublication = {
    id: number
    year: number
    title: string
    publisher: string
    pages: number
    isElectronic?: boolean
    electronicUrl?: string
    files: {
        certificate?: { url: string; name: string; size: string }
        cover?: { url: string; name: string; size: string }
        text?: { url: string; name: string; size: string }
    }
}

export type AuthorWork = {
    id: number
    year: number
    title: string
    workType: string
    publisher: string
    reviewers: string[]
    files: {
        certificate?: { url: string; name: string; size: string }
        work?: { url: string; name: string; size: string }
        expert?: { url: string; name: string; size: string }
    }
    linkUrl?: string
}

export type UserData = {
    fullName: string
    educationLevel: string
    university: string
    universityLink: string
    qualificationCategory: string
    qualificationFile: string
    professionalInterests: string
    address: string
    email: string
    website: string
    phone: string
    experiences: Experience[]
    awards: Award[]
}

export type Award = {
    id: number
    date: string
    name: string
    link: string
}

export type Experience = {
    id: number
    period: string
    place: string
}

export type SelfEducationPlan = {
    id: number
    year: string
    fileUrl?: string
    fileName?: string
    fileSize?: string
    linkUrl?: string
}

export type QualificationCourse = {
    id: number
    startDate: string
    endDate: string
    name: string
    institution: string
    hours: number
    studyFormat: string
    fileUrl?: string
    fileName?: string
    fileSize?: string
    linkUrl?: string
}

export type RetrainingCourse = {
    id: number
    startDate: string
    endDate: string
    name: string
    institution: string
    hours: number
    studyFormat: string
    fileUrl?: string
    fileName?: string
    fileSize?: string
    linkUrl?: string
}

export type Degree = {
    id: number
    date: string
    degree: string
    thesisTopic: string
    fileUrl?: string
    fileName?: string
    fileSize?: string
    linkUrl?: string
}

export type CoursesViewData = {
    selfEducation: SelfEducationPlan[]
    qualifications: QualificationCourse[]
    retraining: RetrainingCourse[]
    degrees: Degree[]
}

export type WorksViewData = {
    mediaPublications: MediaPublication[]
    authorWorks: AuthorWork[]
}

export type Certificate = {
    id: number
    name: string
    date: string
    organization: string
    link?: string
}