import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Award, ArrowRight, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import heroBg from "../assets/hero-campus.jpg";
import campusImg from "../assets/campus-life.jpg";
import { departmentsData } from "@/lib/departmentsData";
import { fetchNews, NewsItem } from "@/lib/newsService";

const stats = [
  { icon: GraduationCap, value: "5000+", label: "Students" },
  { icon: Users, value: "200+", label: "Faculty Members" },
  { icon: BookOpen, value: "50+", label: "Programs" },
  { icon: Award, value: "60+", label: "Years of Excellence" },
];

const courses = [
  { title: "Bachelor of Rural Science", dept: "Home Science Management", duration: "3 Years", icon: "📚" },
  { title: "Bachelor of Rural Science", dept: "Farm Management", duration: "3 Years", icon: "🔬" },
  { title: "Bachelor of Rural Science", dept: "Mahila Gram VIdhyapeeth", duration: "3 Years", icon: "📊" },
  { title: "Bachelor of Rural Science", dept: "Bhagini Vidhyalaya", duration: "2 Years", icon: "✍️" },
  { title: "Bachelor of Rural Science", dept: "Prayogik Prathamik Shala", duration: "2 Years", icon: "📐" },
];

const testimonials = [
  { name: "Priya Sharma", role: "B.Sc. Graduate, 2024", quote: "Gramseva Mandir College shaped my analytical thinking and gave me lifelong friendships. The faculty here truly cares about every student's growth." },
  { name: "Rahul Deshmukh", role: "B.Com Graduate, 2023", quote: "The practical exposure and industry connections helped me land my dream job. This college goes beyond textbooks." },
  { name: "Anita Patil", role: "M.A. English, 2024", quote: "The literary environment and academic rigor here are unmatched. I grew as a thinker and a person." },
];


// Counter component
const Counter = ({ end, suffix = "" }: { end: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const num = parseInt(end.replace(/[^0-9]/g, ""));
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, num]);

  return <div ref={ref}>{count}{end.includes("+") ? "+" : ""}{suffix}</div>;
};

const formatDate = (date?: Date) =>
  date ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date) : "";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { data: newsData = [] } = useQuery<NewsItem[]>({ queryKey: ["news"], queryFn: fetchNews });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-gold font-semibold tracking-widest text-sm uppercase mb-4">
              Established 1960
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">MAHILA GRAM VIDHYAPITH,NARDIPUR<br />
              <span className="text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block mt-4">શિક્ષણ થકી સમાજ સેવા</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Nurturing minds, building futures. A legacy of academic excellence and holistic development for over six decades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-4 rounded-lg gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Apply Now
              </Link>
              <Link
                to="/courses"
                className="px-8 py-4 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="section-padding -mt-16 relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="up">
                <div className="bg-popover rounded-xl p-6 sm:p-8 text-center shadow-md border hover-lift">
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-1">
                    <Counter end={stat.value} />
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedSection direction="fade">
            <SectionHeading
              label="Academics"
              title="Featured Courses"
              subtitle="Discover our diverse range of undergraduate and postgraduate programs."
            />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <AnimatedSection key={i} delay={i * 0.08} direction="scale">
                <div className="group bg-popover rounded-xl p-6 border hover-lift cursor-pointer">
                  <div className="text-4xl mb-4">{course.icon}</div>
                  <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-vibrant-gold transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{course.dept}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <ArrowRight className="w-4 h-4 text-vibrant-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="inline-flex items-center gap-2 text-vibrant-gold font-semibold hover:gap-3 transition-all">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-wide">
          <AnimatedSection direction="up">
            <SectionHeading
              label="Academic Units"
              title="Our Departments"
              subtitle="Explore our specialized departments dedicated to various fields of study and research."
            />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentsData.slice(0, 3).map((dept, i) => (
              <AnimatedSection key={dept.id} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <Link to={`/departments/${dept.id}`} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-2">
                    <div className="h-1.5 bg-vibrant-gold w-full" />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="w-12 h-12 rounded-xl bg-vibrant-gold/10 flex items-center justify-center mb-6 text-vibrant-gold group-hover:bg-vibrant-gold group-hover:text-white transition-colors duration-300">
                        <dept.icon size={24} />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3 text-navy group-hover:text-vibrant-gold transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {dept.shortDesc}
                      </p>
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-navy font-bold text-xs uppercase tracking-wider">Learn More</span>
                        <ArrowRight size={16} className="text-vibrant-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/departments" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all">
              View All Departments <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="section-padding bg-navy">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <SectionHeading label="Life at Campus" title="Experience Campus Life" light />
              <p className="text-primary-foreground/60 leading-relaxed mb-6 text-center lg:text-left">
                From vibrant cultural festivals to competitive sports, our campus offers a holistic experience that goes beyond the classroom. Join clubs, participate in events, and create memories that last a lifetime.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["Cultural Fests", "Sports", "NSS", "Clubs", "Library", "Labs"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-primary-foreground/20 text-primary-foreground/60 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={campusImg} alt="Campus Life" className="w-full h-80 lg:h-[28rem] object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedSection direction="up">
            <SectionHeading label="Testimonials" title="What Our Students Say" />
          </AnimatedSection>
          <AnimatedSection direction="scale" delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-popover rounded-2xl p-8 sm:p-12 border shadow-md">
              <Star className="w-10 h-10 text-gold mb-6" />
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-lg sm:text-xl leading-relaxed text-foreground italic mb-8">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div>
                  <p className="font-heading font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-muted-foreground text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {/* News */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <AnimatedSection direction="up">
            <SectionHeading label="Latest Updates" title="News & Events" />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.slice(0, 6).map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.08} direction="up">
                <div className="bg-popover rounded-xl p-6 border hover-lift">
                  <span className="text-xs text-gold font-semibold">{formatDate(item.publishedAt)}</span>
                  <h3 className="font-heading text-lg font-semibold mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding navy-gradient">
        <div className="container-wide text-center">
          <AnimatedSection direction="scale">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-8">
              Take the first step towards a brighter future. Apply now for the upcoming academic year.
            </p>
            <Link
              to="/admissions"
              className="inline-block px-10 py-4 rounded-lg gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Start Your Application
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
