import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const contactInfo = [
    { icon: MapPin, title: "Address", detail: "BRS, Mahila Gram Vidhyapith, Nardipur" },
    { icon: Phone, title: "Phone", detail: "+91 7436038016" },
    { icon: Mail, title: "Email", detail: "parmarsb2004@gmail.com" },
    { icon: Clock, title: "Office Hours", detail: "Mon - Sat: 9:00 AM - 5:00 PM" },
  ];

  return (
    <div className="pt-24">
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-6">Contact Us</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">We'd love to hear from you. Reach out with any questions.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <AnimatedSection key={info.title} delay={i * 0.1} direction="right">
                  <div className="bg-popover rounded-xl p-5 border hover-lift flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{info.title}</h3>
                      <p className="text-muted-foreground text-sm">{info.detail}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Form */}
            <AnimatedSection delay={0.2} direction="left" className="lg:col-span-2">
              <div className="bg-popover rounded-2xl p-8 border shadow-md">
                <h3 className="font-heading text-2xl font-bold mb-6">Send a Message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="your@email.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Subject" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-none" placeholder="Your message..." />
                  </div>
                </div>
                <button className="mt-6 px-8 py-3 rounded-lg gold-gradient text-primary font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
