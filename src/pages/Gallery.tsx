import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const categories = ["All", "Campus", "Events", "Sports", "Labs", "Library"];

const images = [
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", cat: "Campus", alt: "College Building" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600", cat: "Events", alt: "Cultural Event" },
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600", cat: "Sports", alt: "Sports Ground" },
  { src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600", cat: "Labs", alt: "Science Lab" },
  { src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600", cat: "Library", alt: "Library" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600", cat: "Campus", alt: "Campus Garden" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600", cat: "Events", alt: "Seminar Hall" },
  { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600", cat: "Sports", alt: "Basketball Court" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600", cat: "Labs", alt: "Computer Lab" },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600", cat: "Library", alt: "Study Area" },
  { src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600", cat: "Campus", alt: "Entrance" },
  { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600", cat: "Events", alt: "Graduation" },
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
