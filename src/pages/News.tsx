import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { fetchNews, NewsItem } from "@/lib/newsService";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ImageOff, Megaphone, Loader2 } from "lucide-react";
import heroBg from "../assets/hero-campus.jpg";

const formatDate = (date?: Date) =>
  date ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date) : "";

const News = () => {
  const { data, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const newsItems = data || [];

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[360px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative container-wide text-center z-10">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Latest</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-4">
              News & Updates
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-3xl mx-auto">
              Announcements, admissions, events, and important notices from Mahila Gram Vidhyapith, Nardipur.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <div className="container-wide mt-12 space-y-10">
        <AnimatedSection direction="up">
          <SectionHeading
            label="Campus Bulletin"
            title="Stay Informed"
            subtitle="All the latest happenings, notifications, and opportunities in one place."
          />
        </AnimatedSection>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-border p-5 animate-pulse space-y-4">
                <div className="h-40 bg-muted rounded-xl" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-white border border-red-200 text-red-700 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <Megaphone className="w-5 h-5" />
            Unable to load news right now. Please try again shortly.
          </div>
        )}

        {!isLoading && !isError && newsItems.length === 0 && (
          <div className="bg-white border border-border p-8 rounded-2xl shadow-sm text-center space-y-3">
            <Megaphone className="w-8 h-8 text-navy mx-auto" />
            <p className="text-lg font-semibold text-navy">No news yet</p>
            <p className="text-muted-foreground">Admin can publish updates from the dashboard. Check back soon.</p>
          </div>
        )}

        {!isLoading && !isError && newsItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.05} direction="scale" className="h-full">
                <article className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col h-full">
                  {item.imageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 bg-white/90 text-navy text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {formatDate(item.publishedAt)}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-secondary flex items-center justify-center text-muted-foreground gap-2">
                      <ImageOff className="w-5 h-5" />
                      <span className="text-sm">No image provided</span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy leading-tight">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
