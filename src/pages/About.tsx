import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, BookOpen } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const timeline = [
  { year: "1960", title: "Foundation", desc: "Gramseva Mandir College was established with a vision to provide quality education." },
  { year: "1975", title: "Expansion", desc: "New science and commerce faculties added to serve growing student demand." },
  { year: "1995", title: "Modernization", desc: "Introduction of computer science programs and digital infrastructure." },
  { year: "2010", title: "Accreditation", desc: "Received NAAC accreditation with an outstanding grade." },
  { year: "2020", title: "Digital Campus", desc: "Complete digital transformation with smart classrooms and e-learning." },
];

const About = () => (
  <div className="pt-24">
    {/* Hero */}
    <section className="relative h-[40vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      <div className="relative container-wide text-center z-10">
        <AnimatedSection>
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6">
            Our Story & Legacy
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
            Over six decades of shaping minds and building futures through academic excellence and moral values.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading label="Our Journey" title="A Legacy of Excellence" />
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="flex gap-6 mb-10 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-primary text-sm">{item.year}</span>
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-popover rounded-xl p-8 border h-full">
              <Target className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide accessible, quality higher education that empowers students with knowledge, skills, and values necessary for success in a rapidly changing world. We strive to foster critical thinking, creativity, and social responsibility.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-popover rounded-xl p-8 border h-full">
              <Eye className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as a leading institution of higher learning that produces well-rounded graduates who contribute meaningfully to society, uphold ethical values, and drive innovation in their respective fields.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Principal's Message */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid md:grid-cols-5 gap-10 items-center max-w-4xl mx-auto">
          <AnimatedSection className="md:col-span-2">
            <div className="bg-secondary rounded-xl p-1">
              <div className="bg-gradient-to-br from-gold/20 to-transparent rounded-lg aspect-[3/4] flex items-end justify-center">
                <div className="w-32 h-32 rounded-full gold-gradient flex items-center justify-center mb-8">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15} className="md:col-span-3">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Principal's Message</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-1">Ms. ManjulaBen J. Padvi</h3>
            <p className="text-gold text-sm font-semibold mb-4 uppercase tracking-wider">[ Incharge principal BRS, MA GBTC ]</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              "Welcome to a campus where dreams meet dedication. We provide a blend of modern facilities and value-based education to ensure our students are future-ready."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              "Our focus remains on developing the critical thinking and technical expertise required to thrive in today’s competitive world. Join us in building a future filled with opportunities and excellence."
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  </div>
);

export default About;
