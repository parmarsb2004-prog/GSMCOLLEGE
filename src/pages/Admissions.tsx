import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Check } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const steps = ["Personal Info", "Documents", "Review"];

const Admissions = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", course: "", address: "" });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="pt-24">
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Admissions</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-6">Apply Now</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">Begin your journey with us. Complete the application in three simple steps.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-12 gap-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i <= step ? "gold-gradient text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                  {i < step ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 ${i < step ? "bg-gold" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-popover rounded-2xl p-8 sm:p-10 border shadow-md">
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone *</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date of Birth *</label>
                  <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Preferred Course *</label>
                  <select value={form.course} onChange={(e) => update("course", e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold">
                    <option value="">Select a course</option>
                    <option>BRS</option>
                    <option>BRS</option>
                    <option>BRS</option>
                    <option>BRS</option>
                    <option>BRS</option>
                    <option>BRS</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Address</label>
                  <textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-none" placeholder="Your full address" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <p className="text-muted-foreground mb-6">Upload the following documents (PDF or image format):</p>
                {["10th Marksheet", "12th Marksheet", "ID Proof (Aadhar/PAN)", "Passport Size Photo"].map((doc) => (
                  <div key={doc} className="flex items-center gap-4 p-4 rounded-lg border bg-background">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{doc}</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                    </div>
                    <label className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium cursor-pointer hover:bg-muted transition-colors">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-6">Review Your Application</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(form).filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-lg bg-secondary">
                      <span className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                      <p className="font-medium text-sm mt-1">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">By submitting, you agree to our terms and conditions.</p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-lg border font-medium hover:bg-secondary transition-colors">
                  Previous
                </button>
              )}
              <button
                onClick={() => step < 2 ? setStep(step + 1) : alert("Application submitted!")}
                className="px-8 py-3 rounded-lg gold-gradient text-primary font-semibold ml-auto hover:opacity-90 transition-opacity"
              >
                {step < 2 ? "Next Step" : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
