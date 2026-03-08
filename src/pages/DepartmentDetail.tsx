import { useParams, Link } from "react-router-dom";
import { departmentsData } from "../lib/departmentsData";
import AnimatedSection from "../components/AnimatedSection";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const DepartmentDetail = () => {
    const { id } = useParams();
    const department = departmentsData.find((d) => d.id === id);

    if (!department) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h2 className="text-2xl font-bold">Department not found</h2>
                <Link to="/departments" className="text-vibrant-gold hover:underline mt-4 inline-block">
                    Back to Departments
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative h-[30vh] min-h-[300px] flex items-center">
                <div className="absolute inset-0">
                    <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy/70" />
                </div>
                <div className="relative container-wide z-10">
                    <AnimatedSection>
                        <Link to="/departments" className="text-vibrant-gold flex items-center gap-2 mb-4 hover:gap-3 transition-all">
                            <ArrowLeft size={16} /> Back to Departments
                        </Link>
                        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                            {department.name}
                        </h1>
                    </AnimatedSection>
                </div>
            </section>

            <div className="container-wide py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <AnimatedSection>
                            <h2 className="font-heading text-2xl font-bold mb-4 text-navy">About the Department</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {department.longDesc}
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h2 className="font-heading text-2xl font-bold mb-4 text-navy">Courses Offered</h2>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {department.courses.map((course, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-vibrant-gold" />
                                        <span className="font-medium">{course}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <h2 className="font-heading text-2xl font-bold mb-4 text-navy">Faculty Members</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {department.faculty.map((member, i) => (
                                    <div key={i} className="p-6 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg text-navy">{member.name}</h3>
                                        <p className="text-vibrant-gold font-medium">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <AnimatedSection delay={0.3}>
                            <div className="bg-navy p-8 rounded-2xl text-white shadow-xl">
                                <h3 className="font-heading text-xl font-bold mb-6 border-b border-white/20 pb-4">Contact Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Mail className="text-vibrant-gold shrink-0 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-white/60 uppercase tracking-wider">Email</p>
                                            <p className="font-medium break-all">{department.contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="text-vibrant-gold shrink-0 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-white/60 uppercase tracking-wider">Phone</p>
                                            <p className="font-medium">{department.contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-vibrant-gold shrink-0 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-white/60 uppercase tracking-wider">Location</p>
                                            <p className="font-medium">{department.contact.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentDetail;
