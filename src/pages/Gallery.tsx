import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const categories = ["All", "Campus", "Events", "Classroom", "Visit","Shram"];

const images = [
  { src: "IMAGES/EVENT/1.jpeg", cat: "Events", alt: "Cultural Event" },
  { src: "IMAGES/CLASSROOM/STUDY AREA.jpeg", cat: "Classroom", alt: "Study Area" },
  { src: "IMAGES/CLASSROOM/2.jpeg", cat: "Classroom", alt: "Class Room" },
  { src: "IMAGES/CLASSROOM/1.jpeg", cat: "Classroom", alt: "Class Room " },
  { src: "IMAGES/CLASSROOM/3.jpeg", cat: "Classroom", alt: "Class Room " },
  { src: "IMAGES/VISIT/1.jpeg", cat: "Visit", alt: "Amul Dairy Visit " },
  { src: "IMAGES/VISIT/2.jpeg", cat: "Visit", alt: "Amul Dairy Visit " },
  { src: "IMAGES/VISIT/3.jpeg", cat: "Visit", alt: "Amul Dairy Visit " },
  { src: "IMAGES/SHRAM/1.jpeg", cat: "Shram", alt: "Shram" },
  { src: "IMAGES/SHRAM/2.jpeg", cat: "Shram", alt: "Shram" },
  { src: "IMAGES/SHRAM/3.jpeg", cat: "Shram", alt: "Shram" }
];

const Gallery = () => {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = cat === "All" ? images : images.filter((i) => i.cat === cat);

  return (
    <div className="pt-24">
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Gallery</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-6">Campus Gallery</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">A glimpse into our vibrant campus life.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${cat === c ? "gold-gradient text-primary" : "bg-secondary hover:bg-muted"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <AnimatedSection key={img.src + cat} delay={i * 0.05}>
                <div
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox(img.src.replace("w=600", "w=1200"))}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                      <span className="text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.alt}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
