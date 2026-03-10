import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Clock, ArrowRight, Search } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const allCourses = [
  { title: "B.Sc. in Home Science", dept: "Home Science Management", duration: "3 Years", level: "UG", desc: "A comprehensive program covering nutrition, textiles, and family management." },
  { title: "B.Sc. in Agriculture", dept: "Farm Management", duration: "3 Years", level: "UG", desc: "Modern agricultural techniques and sustainable farming practices." },
  { title: "Bachelor of Rural Science (BRS)", dept: "Mahila Gram Vidyapith", duration: "3 Years", level: "UG", desc: "Empowering rural communities through social work and academic excellence." },
  { title: "Secondary Education (General)", dept: "Bhagini Vidhyalaya", duration: "2 Years", level: "UG", desc: "Strong foundation for future academic and professional careers." },
  { title: "Primary Education Curriculum", dept: "Prayogik Prathamik Shala", duration: "5 Years", level: "UG", desc: "Innovative and experimental learning methods for primary education." },
  { title: "BBA (General)", dept: "BRS", duration: "4 Years", level: "PG", desc: "Strong foundation for future academic and professional careers."},
  { title: "MBA(General)", dept: "BRS", duration: "4 Years", level: "PG", desc: "Strong foundation for future academic and professional careers." },
  { title: "BCA(General)", dept: "BRS", duration: "4 Years", level: "PG", desc: "Strong foundation for future academic and professional careers." },
];

const depts = [
  "All",
  "Home Science Management",
  "Farm Management",
  "Up Coming Courses"];
const levels = ["All", "UG", "PG"];

const Courses = () => {
  const [dept, setDept] = useState("All");
  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allCourses.filter((c) => {
    if (dept !== "All" && c.dept !== dept) return false;
    if (level !== "All" && c.level !== level) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-24">
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Academics</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-6">Our Courses</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">Explore our diverse range of programs.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${dept === d ? "bg-navy text-primary-foreground" : "bg-secondary hover:bg-muted"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${level === l ? "gold-gradient text-primary" : "bg-secondary hover:bg-muted"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.05}>
                <div className="group bg-popover rounded-xl p-6 border hover-lift h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gold">{course.dept}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary">{course.level}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-gold transition-colors">{course.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-4">{course.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No courses found matching your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
