import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "../assets/hero-campus.jpg";
import { User, GraduationCap, Building2 } from "lucide-react";

// Import Faculty Photos
import manjulabenImg from "../assets/faculty/Ms. Manjulaben Padvi.jpeg";
import ranjitImg from "../assets/faculty/RANJIT SOLANKI.jpeg";
import karansinhImg from "../assets/faculty/Karansinh Rathod.jpeg";
import tusharImg from "../assets/faculty/TUSHAR PARMAR.jpeg";
import kanubhaiImg from "../assets/faculty/KANUBHAI ASARI.jpeg";
import udayImg from "../assets/faculty/Uday I Nayak.jpeg";
import ritabenImg from "../assets/faculty/Ms. Rita ben Thakor.jpeg";
import pinkibenImg from "../assets/faculty/Ms. Pinkiben Thakor.jpeg";
import mukeshbhaiImg from "../assets/faculty/Mukeshbhai G Parmar.jpeg";

interface FacultyMember {
  name: string;
  role: string;
  qualification?: string;
  dept: string;
  image?: string;
}

const facultyData: FacultyMember[] = [
  {
    name: "Manjulaben J Padvi",
    role: "Incharge Principal",
    qualification: "BRS, MA, GBTC",
    dept: "Academic Administration",
    image: manjulabenImg
  },
  {
    name: "Uday I Nayak",
    role: "Faculty Member",
    qualification: "BA, MA, B.Ed (English)",
    dept: "Language Arts",
    image: udayImg
  },
  {
    name: "Dr. Ranjit Solanki",
    role: "Professor",
    qualification: "M.A., M.BEd, NET, PhD",
    dept: "Arts & Humanities",
    image: ranjitImg
  },
  {
    name: "Mr. Tushar Parmar",
    role: "Shram Sanyojak",
    qualification: "BRS, MSW, PGDCA",
    dept: "Student Welfare",
    image: tusharImg
  },
  {
    name: "Ms. Pinkiben Thakor",
    role: "Adhoc Professor",
    qualification: "BRS, MRS",
    dept: "Academic Faculty",
    image: pinkibenImg
  },
  {
    name: "Mr. Karansinh Rathod",
    role: "Faculty Member",
    dept: "Rural Science",
    image: karansinhImg
  },
  {
    name: "Ms. Ritaben Thakor",
    role: "Computer Operator",
    qualification: "BRS",
    dept: "Technical Department",
    image: ritabenImg
  },
  {
    name: "Mr. Kanubhai Asari",
    role: "Peon",
    dept: "Support Staff",
    image: kanubhaiImg
  },
  {
    name: "Mukeshbhai G Parmar",
    role: "Peon",
    dept: "Support Staff",
    image: mukeshbhaiImg
  },
];

const Faculty = () => {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-vibrant-gold text-sm font-semibold tracking-widest uppercase">Our People</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">Our Faculty Members</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto italic">Meet Our Dedicated Teaching and Support Staff</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Faculty Grid Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {facultyData.map((f, i) => (
              <AnimatedSection key={`${f.name}-${i}`} delay={i * 0.05}>
                <div className="group relative pt-16 h-full">
                  <div className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center p-8 pt-20 group-hover:-translate-y-2">

                    {/* Circular Photo Area */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-secondary flex items-center justify-center -mt-0 group-hover:scale-110 transition-transform duration-500 z-10">
                      {f.image ? (
                        <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-vibrant-gold/20 flex items-center justify-center text-vibrant-gold">
                          <User size={48} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <h3 className="font-heading font-bold text-xl text-navy text-center mb-1 group-hover:text-vibrant-gold transition-colors">
                      {f.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-vibrant-gold font-bold text-xs uppercase tracking-wider mb-4">
                      <span>{f.role}</span>
                    </div>

                    <div className="w-full space-y-3 mt-auto">
                      {f.qualification && (
                        <div className="flex items-start gap-2.5 text-sm text-muted-foreground group/item">
                          <GraduationCap size={16} className="text-navy/50 mt-0.5" />
                          <span className="leading-tight">{f.qualification}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-2.5 text-sm text-navy/70 italic group/item">
                        <Building2 size={16} className="text-vibrant-gold/70 mt-0.5" />
                        <span className="leading-tight">{f.dept}</span>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-vibrant-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
