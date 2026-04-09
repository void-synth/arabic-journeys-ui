import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, BarChart3, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: BookOpen, title: "Live Arabic Classes", desc: "Join interactive sessions with expert Arabic teachers in real-time." },
  { icon: Users, title: "Small Group Learning", desc: "Personalized attention in small groups for effective learning." },
  { icon: Calendar, title: "Flexible Scheduling", desc: "Book sessions that fit your schedule. Learn at your own pace." },
  { icon: BarChart3, title: "Progress Tracking", desc: "Monitor your learning journey with detailed analytics and reports." },
];

const testimonials = [
  { name: "Sarah J.", text: "ArabicLearn transformed my understanding of Arabic. The teachers are incredibly patient and knowledgeable.", rating: 5 },
  { name: "Michael C.", text: "The live sessions are engaging and the platform is so easy to use. Highly recommend!", rating: 5 },
  { name: "Emma W.", text: "I went from zero to conversational Arabic in just 3 months. Amazing platform!", rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">ArabicLearn</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Master Arabic with<br />Live Expert Sessions
          </h1>
          <p className="mt-6 text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of learners worldwide. Interactive live classes, expert teachers, and a structured curriculum designed for real results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold px-8">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground">Why Choose ArabicLearn?</h2>
          <p className="text-muted-foreground text-center mt-2 max-w-xl mx-auto">Everything you need to learn Arabic effectively, all in one platform.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mt-4">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card rounded-xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground">{t.text}</p>
                <p className="text-sm font-semibold text-foreground mt-4">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-card">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">ArabicLearn</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ArabicLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
