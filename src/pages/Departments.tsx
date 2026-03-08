import AnimatedSection from "@/components/AnimatedSection";
import { departmentsData } from "@/lib/departmentsData";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-campus.jpg";

const Departments = () => (
  <div className="pt-24 min-h-screen bg-background text-foreground">
    <section className="relative h-[40vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      <div className="relative container-wide text-center z-10">
        <AnimatedSection>
          <span className="text-vibrant-gold text-sm font-semibold tracking-widest uppercase">Academics</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">Our Departments</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto italic">Centers of academic excellence driving innovation and learning.</p>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departmentsData.map((dept, i) => (
            <AnimatedSection key={dept.id} delay={i * 0.1} direction={i % 3 === 0 ? "up" : i % 3 === 1 ? "left" : "right"}>
              <Link to={`/departments/${dept.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-2">
                  <div className="h-2 bg-vibrant-gold" />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-xl bg-vibrant-gold/10 flex items-center justify-center mb-6 text-vibrant-gold group-hover:bg-vibrant-gold group-hover:text-white transition-colors duration-300">
                      <dept.icon size={24} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4 text-navy group-hover:text-vibrant-gold transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      {dept.shortDesc}
                    </p>
                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <span className="text-navy font-bold text-sm uppercase tracking-wider">Explore Details</span>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-vibrant-gold group-hover:text-white transition-colors">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Departments;
