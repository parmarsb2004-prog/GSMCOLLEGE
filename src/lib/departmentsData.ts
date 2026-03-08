/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, Tractor, GraduationCap, School, BookOpen } from "lucide-react";

export interface Department {
    id: string;
    name: string;
    shortDesc: string;
    icon: any;
    courses: string[];
    longDesc: string;
}

export const departmentsData: Department[] = [
    {
        id: "home-science",
        name: "Home Science Management",
        shortDesc: "Focusing on nutrition, textiles, and family management for a better domestic lifestyle.",
        icon: Home,
        courses: ["B.Sc. in Home Science", "Diploma in Nutrition", "Advanced Family Resource Management"],
        longDesc: "The Department of Home Science Management is dedicated to the study of various aspects of home life and its relationship with the community. Our curriculum integrates theoretical knowledge with practical skills in nutrition, textile science, and human development."
    },
    {
        id: "farm-management",
        name: "Farm Management",
        shortDesc: "Modern agricultural techniques and sustainable farming practices for the future.",
        icon: Tractor,
        courses: ["B.Sc. in Agriculture", "Workshop on Sustainable Farming", "Agribusiness Management Certificate"],
        longDesc: "Our Farm Management department focuses on equipping students with modern agricultural practices. From soil management to agribusiness, we provide a holistic approach to agricultural excellence."
    },
    {
        id: "mahila-gram-vidyapith",
        name: "Mahila Gram Vidyapith Nardipur",
        shortDesc: "Empowering women through higher education and rural development initiatives.",
        icon: GraduationCap,
        courses: ["Bachelor of Rural Science (BRS)", "M.A. in Rural Development", "Women Leadership Program"],
        longDesc: "Mahila Gram Vidyapith Nardipur is a pioneering institution dedicated to the empowerment of rural women through quality higher education. We focus on academic rigor combined with rural social work."
    },
    {
        id: "bhagini-vidhyalaya",
        name: "Bhagini Vidhyalaya B.R. Maheta Vidhyalay",
        shortDesc: "Strong primary and secondary foundation for students in a nurturing environment.",
        icon: School,
        courses: ["Secondary Education (General)", "Vocational Studies", "Language Arts"],
        longDesc: "Named after the visionary B.R. Maheta, this department provides a robust foundation for students. We focus on holistic development, character building, and academic excellence from early stages."
    },
    {
        id: "prayogik-prathamik-shala",
        name: "Prayogik Prathamik Shala",
        shortDesc: "Experimental and innovative primary education methods for young learners.",
        icon: BookOpen,
        courses: ["Primary Education Curriculum", "Innovative Learning Workshop", "Early Childhood Development"],
        longDesc: "The Prayogik Prathamik Shala is an experimental primary school that implements innovative teaching methodologies. We believe in learning by doing and fostering curiosity in young minds."
    }
];
