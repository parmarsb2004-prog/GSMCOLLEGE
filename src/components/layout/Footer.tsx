import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoImg from "../../assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground">
    <div className="container-wide py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link to="/" className="w-12 h-12 rounded-full border-2 border-gold-light overflow-hidden bg-white flex items-center justify-center">
              <img src={logoImg} alt="Gramseva Mandir Logo" className="w-full h-full object-contain" />
            </Link>
            <div>
              <h3 className="font-heading text-lg font-bold leading-tight">Mahila Gram Vidhyapith</h3>
              <p className="text-xs text-vibrant-gold tracking-widest uppercase mb-1">Nardipur</p>
              <p className="text-sm font-bold text-vibrant-gold/90 border-t border-white/10 pt-1 mt-1 block">"શિક્ષણ થકી સમાજ સેવા"</p>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6">
            Empowering minds since 1960. A premier institution committed to academic excellence and holistic development.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-primary transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {["About Us", "Courses", "Admissions", "Faculty", "Gallery", "Contact"].map((l) => (
              <Link
                key={l}
                to={`/${l.toLowerCase().replace(" ", "-").replace("about-us", "about")}`}
                className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-vibrant-gold">Departments</h4>
          <div className="flex flex-col gap-2.5">
            {[
              "Home Science Management",
              "Farm Management",
              "Mahila Gram Vidyapith Nardipur",
              "Bhagini Vidhyalaya",
              "B.R. Maheta Vidhyalay",
              "Prayogik Prathamik Shala"
            ].map((d) => (
              <Link key={d} to="/departments" className="text-sm text-primary-foreground/60 hover:text-vibrant-gold transition-colors">
                {d}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-vibrant-gold">Contact Us</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-primary-foreground/60">
              <MapPin className="w-4 h-4 text-vibrant-gold mt-1 shrink-0" />
              <span className="text-sm">BRS, Mahila Gram Vidhyapith, Nardipur</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60">
              <Phone className="w-4 h-4 text-vibrant-gold shrink-0" />
              <span className="text-sm">+91 7436038016</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60">
              <Mail className="w-4 h-4 text-vibrant-gold shrink-0" />
              <a href="mailto:parmarsb2004@gmail.com" className="text-sm hover:text-vibrant-gold transition-colors">parmarsb2004@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40">© 2026 Mahila Gram Vidhyapith, Nardipur. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
