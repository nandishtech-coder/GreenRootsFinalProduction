import { useState } from "react";
import {
  Building2,
  GraduationCap,
  Award,
  BadgeCheck,
  CheckCircle2,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Leaf,
  Users,
  Sprout,
  Droplets,
  Scissors,
  Bug,
  Shovel,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProjects } from "@/lib/recent-projects.functions";

const TRAINING_TOPICS = [
  { text: "Garden setup and maintenance", icon: Shovel },
  { text: "Terrace, rooftop and kitchen gardening", icon: Building2 },
  { text: "Soil and growing-media management", icon: Sprout },
  { text: "Plant selection and identification", icon: Leaf },
  { text: "Nursery and seedling management", icon: Sprout },
  { text: "Plant nutrition and fertilization", icon: Droplets },
  { text: "Irrigation and water management", icon: Droplets },
  { text: "Pruning and plant care", icon: Scissors },
  { text: "Repotting and transplantation", icon: Shovel },
  { text: "Organic pest and disease management", icon: Bug },
  { text: "Composting", icon: Leaf },
  { text: "Lawn and landscape maintenance", icon: Scissors },
  { text: "Gardening tools and equipment", icon: Shovel },
  { text: "Workplace safety and professional conduct", icon: ShieldCheck },
];

const DEPLOYMENT_AREAS = [
  "IT & Corporate Campuses",
  "Apartments & Gated Communities",
  "Schools & Educational Institutions",
  "Hotels & Resorts",
  "Hospitals & Institutions",
  "Commercial Properties",
];

const AUDIT_POINTS = [
  "Garden and plant health",
  "Maintenance quality",
  "Attendance and work discipline",
  "Safety practices",
  "Professional conduct",
  "Service standards",
  "Client satisfaction",
];

const WORKFORCE_FLOW = [
  "Recruitment",
  "2-Month Training",
  "Assessment",
  "Certification",
  "Uniform & ID",
  "Deployment",
  "Supervision",
  "Quality Audits",
  "Continuous Development"
];

const VALUES = [
  {
    title: "Reliable Workforce",
    desc: "Professionally trained personnel ready for deployment.",
  },
  {
    title: "Consistent Quality",
    desc: "Defined work standards with regular Green Roots audits.",
  },
  {
    title: "Expert Support",
    desc: "Access to Green Roots horticulture knowledge and technical guidance.",
  },
  {
    title: "Workforce Management",
    desc: "Green Roots manages training, deployment and ongoing professional development.",
  },
  {
    title: "Scalable Solutions",
    desc: "From a single Garden Care Professional to complete horticulture teams for large campuses and communities.",
  }
];

export function HorticultureWorkforce() {
  const fetchProjects = useServerFn(listProjects);
  const { data: PROJECTS = [] } = useQuery({
    queryKey: ["recent-projects", "public"],
    queryFn: () => fetchProjects(),
  });

  return (
    <>
      <section id="horticulture-workforce" className="bg-[#fcfbf9] py-20 lg:py-32 overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12">

          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-6 bg-forest/10 text-forest hover:bg-forest/20 text-sm px-4 py-1.5">
              <Users className="size-4 mr-2" />
              Enterprise Solutions
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-8 leading-tight tracking-tight">
              Professional Horticulture Workforce.<br className="hidden md:block" /> Managed by Green Roots.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We provide trained, certified and professionally managed Garden Care Professionals for IT companies, corporate campuses, apartments, schools, hospitals, hotels, institutions and commercial properties.
            </p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">
              We go beyond conventional gardening manpower by combining professional training, employee welfare, quality audits and expert horticulture consultancy under one integrated service.
            </p>
          </div>

          {/* Training Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-24">
            <div className="space-y-8 lg:pt-12">
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-forest text-cream mb-4 shadow-lg shadow-forest/20">
                <GraduationCap className="size-8" />
              </div>
              <h3 id="our-professional-training" className="font-display text-3xl font-bold text-forest">Our Professional Training</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every Green Roots trainee undergoes a structured 2-month practical training programme covering the complete range of gardening and horticulture activities.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-6">
                {TRAINING_TOPICS.map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-forest/10 shadow-sm hover:shadow-md hover:border-forest/30 transition-all group">
                    <div className="size-8 rounded-xl bg-forest/5 flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors text-forest">
                      <topic.icon className="size-4" />
                    </div>
                    <span className="text-sm font-semibold text-forest leading-tight">{topic.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-forest/5 to-transparent rounded-3xl transform rotate-3 scale-105" />
              <div className="relative lg:h-full flex flex-col bg-white p-8 sm:p-12 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border/50">
                <div className="flex items-center gap-5 mb-8">
                  <div className="size-14 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                    <Award className="size-7" />
                  </div>
                  <div>
                    <h4 id="training-certification" className="font-display text-xl font-bold text-forest">Training & Certification</h4>
                    <p className="text-sm text-muted-foreground mt-1">Practical and knowledge-based assessment.</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  After completing the 2-month training programme, every trainee undergoes rigorous assessment. Successful candidates receive a Green Roots Training Certificate and are eligible for professional deployment.
                </p>

                <div className="border-t border-border/60 pt-8">
                  <h4 className="font-display text-lg font-bold text-forest mb-4 flex items-center gap-2">
                    <BadgeCheck className="size-5 text-forest" />
                    Professional Uniform & Identity
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">Every deployed professional represents the Green Roots standard through:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Uniform', 'ID Card', 'Safety Equipment', 'Professional Conduct', 'Defined Work Standards'].map(badge => (
                      <span key={badge} className="px-3 py-1 bg-secondary text-forest text-xs font-medium rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Deployment & Audits */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="bg-forest text-cream p-10 sm:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Building2 className="size-32" />
              </div>
              <div className="relative z-10">
                <h3 id="professional-deployment" className="font-display text-3xl font-bold mb-6">Professional Deployment</h3>
                <p className="text-cream/80 text-lg mb-8">We provide trained horticulture professionals for a variety of premium locations:</p>
                <ul className="space-y-4">
                  {DEPLOYMENT_AREAS.map(area => (
                    <li key={area} className="flex items-center gap-3 text-lg font-medium">
                      <CheckCircle2 className="size-6 text-green-400 shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-10 sm:p-12 rounded-3xl shadow-sm border border-border/50">
              <h3 id="quality-audits" className="font-display text-3xl font-bold text-forest mb-6 flex items-center gap-4">
                <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <CheckCircle2 className="size-6" />
                </span>
                Quality Audits & Supervision
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our service doesn't end with deployment. Green Roots conducts regular quality audits and performance reviews to ensure consistent standards at every client location.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {AUDIT_POINTS.map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-forest mt-2 shrink-0" />
                    <span className="text-forest font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-orange-800 text-sm font-medium">
                  Where required, we provide corrective training and expert horticulture guidance to maintain our high standards.
                </p>
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div className="mb-32 flex flex-col items-center justify-center overflow-visible px-2 sm:px-4 w-full">

            <style>{`
            @keyframes spin-forward {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-backward {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            .ferris-wheel {
              animation: spin-forward 45s linear infinite;
            }
            .ferris-cabin {
              animation: spin-backward 45s linear infinite;
            }
          `}</style>

            <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] flex items-center justify-center mx-auto z-10">
              {/* The Spinning Wheel */}
              <div
                className="ferris-wheel absolute inset-0 rounded-full border-[4px] sm:border-[6px] border-forest overflow-hidden shadow-2xl"
                style={{
                  background: `conic-gradient(
                  #f0f7ea 0deg 40deg,
                  #fdfaf6 40deg 80deg,
                  #eaf3e3 80deg 120deg,
                  #f9f5ed 120deg 160deg,
                  #e3efd9 160deg 200deg,
                  #fcfcf9 200deg 240deg,
                  #edf4e8 240deg 280deg,
                  #f4f1e1 280deg 320deg,
                  #e8f2e2 320deg 360deg
                )`
                }}
              >
                {/* Segment Dividers */}
                {WORKFORCE_FLOW.map((_, i) => (
                  <div
                    key={`divider-${i}`}
                    className="absolute bottom-1/2 left-1/2 w-[2px] sm:w-[3px] h-1/2 bg-forest origin-bottom -translate-x-1/2"
                    style={{ transform: `rotate(${(i * 360) / 9}deg)` }}
                  />
                ))}

                {/* Texts in each slice */}
                {WORKFORCE_FLOW.map((step, i) => {
                  const angle = (i * 360) / 9 + 20;
                  return (
                    <div
                      key={`slice-${i}`}
                      className="absolute inset-0 flex justify-center origin-center pointer-events-none"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="absolute top-[16.5%] -translate-y-1/2">
                        <div style={{ transform: `rotate(-${angle}deg)` }}>
                          <div className="ferris-cabin flex flex-col items-center text-center w-[75px] sm:w-[90px] md:w-[110px]">
                            <span className="text-forest font-bold text-[10px] sm:text-xs md:text-sm bg-[#fcfbf9] rounded-full size-5 sm:size-7 md:size-8 flex items-center justify-center mb-1 sm:mb-1.5 border-2 border-forest shadow-md">
                              {i + 1}
                            </span>
                            <span className="text-forest font-bold text-[9px] sm:text-[10px] md:text-xs leading-tight drop-shadow-md">
                              {step}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* The Static Central Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[100px] sm:size-[140px] md:size-[170px] rounded-full bg-forest border-[4px] sm:border-[6px] border-white shadow-xl flex flex-col items-center justify-center text-center p-2 sm:p-4 z-20">
                <h3 className="font-display text-xs sm:text-base md:text-xl font-bold text-cream mb-1">Workforce Solution</h3>
                <p className="text-cream/80 text-[7px] sm:text-[9px] md:text-[11px] leading-tight hidden sm:block">With Green Roots, clients receive more than gardening manpower.</p>
              </div>
            </div>

            {/* Stem and Leaves Structure */}
            <div className="flex flex-col items-center -mt-4 sm:-mt-6 relative z-0 w-full">
              {/* The Leaves Container */}
              <div className="relative flex items-end justify-center w-full max-w-[95%] sm:max-w-[480px] md:max-w-[600px]">

                {/* Left Leaf */}
                <div className="flex-1 bg-forest/10 border-[3px] sm:border-4 border-forest border-r-0 sm:border-r-0 rounded-tl-none rounded-bl-full rounded-br-none rounded-tr-full shadow-xl flex items-center justify-center h-[50px] sm:h-[90px] md:h-[110px]">
                  <span className="font-display text-forest font-bold text-[9px] sm:text-base md:text-xl tracking-wider sm:tracking-widest uppercase">Learn</span>
                </div>

                {/* The Continuous Stem */}
                <div className="w-[4px] sm:w-[6px] h-[80px] sm:h-[150px] md:h-[180px] bg-forest shrink-0 relative z-10"></div>

                {/* Right Leaf */}
                <div className="flex-1 bg-forest/10 border-[3px] sm:border-4 border-forest border-l-0 sm:border-l-0 rounded-tr-none rounded-br-full rounded-bl-none rounded-tl-full shadow-xl flex items-center justify-center h-[50px] sm:h-[90px] md:h-[110px]">
                  <span className="font-display text-forest font-bold text-[9px] sm:text-base md:text-xl tracking-wider sm:tracking-widest uppercase">Harvest</span>
                </div>

                {/* Logo Badge Overlay in the Center */}
                <div className="absolute bottom-[25px] sm:bottom-[45px] md:bottom-[55px] left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full border-[3px] sm:border-4 border-forest shadow-md size-[50px] sm:size-24 md:size-28 flex items-center justify-center z-20 overflow-hidden">
                  <img src="/logo.png" alt="Green Roots" className="size-full object-cover scale-[1.02]" />
                </div>

              </div>

              {/* Grow Box Below Logo */}
              <div className="relative z-10 -mt-[3px] sm:-mt-[4px]">
                <div className="bg-forest/10 border-[3px] sm:border-4 border-forest rounded-full shadow-xl px-6 sm:px-12 py-2 sm:py-3 flex items-center justify-center min-w-[80px] sm:min-w-[160px]">
                  <span className="font-display text-forest font-bold text-[9px] sm:text-base md:text-xl tracking-wider sm:tracking-widest uppercase">Grow</span>
                </div>
              </div>
            </div>

          </div>

          {/* Values Grid */}
          <div className="mb-24">
            <h3 className="font-display text-3xl font-bold text-forest text-center mb-12">Our Value to Clients</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((val, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="size-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6 group-hover:scale-110 group-hover:bg-forest group-hover:text-cream transition-all">
                    <HeartHandshake className="size-6" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-forest mb-3">{val.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Promise */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex size-20 rounded-full bg-forest text-cream items-center justify-center mb-8 shadow-2xl shadow-forest/30">
              <ShieldCheck className="size-10" />
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-forest mb-6 leading-tight">
              We don't just provide gardeners.<br />
              <span className="text-forest/70">We build skilled horticulture professionals.</span>
            </h3>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Partner with Green Roots for Professional Horticulture Workforce & Garden Management to deliver greener, healthier spaces.
            </p>
            <PartnershipDialog />
          </div>

        </div>
      </section>

      {/* Recent Projects & Highlights Section */}
      <section id="recent-projects" className="bg-white py-20 lg:py-32">
        <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-6 bg-forest/10 text-forest hover:bg-forest/20 text-sm px-4 py-1.5">
              <Sparkles className="size-4 mr-2" />
              Our Impact
            </Badge>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">Recent Projects & Highlights</h3>
            <p className="text-lg text-muted-foreground">
              Explore some of our recent horticulture achievements and ongoing sustainable projects transforming urban spaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                
                {/* Top Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className={`shadow-sm backdrop-blur-md px-3 py-1 font-medium border-0 ${project.status === 'Completed' ? 'bg-green-100/95 text-green-800' : 'bg-blue-100/95 text-blue-800'}`}>
                      {project.status === 'Completed' ? <CheckCircle2 className="size-3.5 mr-1.5" /> : <TrendingUp className="size-3.5 mr-1.5" />}
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-gradient-to-b from-white to-[#fcfbf9]">
                  {/* Title & Description */}
                  <h4 className="font-display text-2xl font-bold text-forest mb-3 leading-tight group-hover:text-green-700 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 border-l-2 border-green-500 pl-2">
                    {project.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PartnershipDialog() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = `*New Partnership Request*
Company: ${fd.get('company')}
Contact Person: ${fd.get('name')}
Phone: ${fd.get('phone')}
Email: ${fd.get('email')}
Location Type: ${fd.get('location')}
Gardeners Required: ${fd.get('gardeners') || 'Not specified'}
Additional Details: ${fd.get('details') || 'None'}`;

    const whatsappUrl = `https://wa.me/916360988785?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);

    // Trigger confetti paper blast!
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 270,
        spread: 120,
        startVelocity: 45,
        origin: { x: 0.5, y: -0.1 }, // Top center
        colors: ['#2C5A2E', '#4CAF50', '#FF5722', '#FFC107', '#03A9F4', '#E91E63', '#9C27B0', '#F6F4EB']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) setTimeout(() => setIsSubmitted(false), 300);
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl">
          Partner With Us Today
          <ArrowRight className="ml-2 size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 bg-[#fcfbf9]">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-100 mb-2">
              <CheckCircle2 className="size-10 text-forest" />
            </div>
            <h2 className="font-display text-2xl font-bold text-forest">Request Submitted!</h2>
            <p className="text-muted-foreground text-lg">
              Within 24 to 48 hours our team will connect with you.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl sm:text-2xl text-forest">Partner With Green Roots</DialogTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                Tell us about your workforce requirements and we'll get back to you with a customized solution.
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-2 sm:mt-4 space-y-3 sm:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Company Name <span className="text-red-500">*</span></label>
                  <Input name="company" required placeholder="Your Company" className="bg-white h-8 sm:h-10 text-xs sm:text-sm" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Contact Person <span className="text-red-500">*</span></label>
                  <Input name="name" required placeholder="Full Name" className="bg-white h-8 sm:h-10 text-xs sm:text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Phone / WhatsApp <span className="text-red-500">*</span></label>
                  <Input name="phone" required placeholder="+91 XXXXX XXXXX" className="bg-white h-8 sm:h-10 text-xs sm:text-sm" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Email Address <span className="text-red-500">*</span></label>
                  <Input name="email" required type="email" placeholder="your@email.com" className="bg-white h-8 sm:h-10 text-xs sm:text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Location Type <span className="text-red-500">*</span></label>
                  <Select name="location" required>
                    <SelectTrigger className="bg-white h-8 sm:h-10 text-xs sm:text-sm">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPLOYMENT_AREAS.map(area => (
                        <SelectItem key={area} value={area} className="text-xs sm:text-sm">{area}</SelectItem>
                      ))}
                      <SelectItem value="Other" className="text-xs sm:text-sm">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Gardeners Required</label>
                  <Input name="gardeners" type="number" placeholder="e.g. 5" className="bg-white h-8 sm:h-10 text-xs sm:text-sm" />
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Additional Details</label>
                <Textarea name="details" placeholder="Tell us more about your specific requirements..." className="bg-white min-h-[60px] sm:min-h-[100px] text-xs sm:text-sm" />
              </div>
              <Button type="submit" className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-forest text-white hover:bg-forest/90 mt-2">
                Submit Partnership Request
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

