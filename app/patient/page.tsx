import { CalendarIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import MarqueeDemo from "@/components/demos/marquee-demo"
import AnimatedBeamDemo from "@/components/demos/animated-beam-demo"
import AnimatedListDemo from "@/components/demos/animated-list-demo"
import DockDemo from "@/components/demos/dock-demo"
import { LightRays } from "@/components/ui/light-rays"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

// Mock Calendar with improved styling
const Calendar = ({ className }: { className?: string }) => {
  const appointments = [16, 20]; // Dates with appointments (5th, 15th, 25th)
  return (
    <div className={cn("w-full h-full bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm", className)}>
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-lg text-neutral-800 dark:text-neutral-200">Feb 2025</span>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-neutral-400 mb-4 font-medium uppercase tracking-wider">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
        {Array.from({length: 31}).map((_, i) => (
          <div key={i} className={cn(
            "aspect-square flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300", 
            i===11 && "bg-blue-600 text-white dark:bg-blue-600 dark:text-white shadow-md",
            appointments.includes(i) && "bg-red-500 text-white dark:bg-red-500 dark:text-white shadow-md"
          )}>{i+1}</div>
        ))}
      </div>
    </div>
  )
}

const features = [
  {
    Icon: PersonIcon,
    name: "Our Doctors",
    description: "Meet our highly qualified specialists.",
    href: "#",
    cta: "View All Doctors",
    className: "col-span-3 lg:col-span-1",
    background: (
      <MarqueeDemo className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]" />
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-90 border-none transition-all duration-300 ease-out group-hover:scale-95 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "View your Graph",
    description: "Visualize your data nodes and connections.",
    href: "#",
    cta: "View Graph",
    className: "col-span-3 lg:col-span-2 min-h-[22rem]", // specific height constraint if needed
    background: (
      <AnimatedBeamDemo className="absolute top-4 right-2 h-[300px] border-none transition-all duration-300 ease-out group-hover:scale-105 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "My Appointment Dates",
    description: "Check your upcoming appointments.",
    className: "col-span-3 lg:col-span-1 min-h-[22rem]",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        className="absolute top-2 right-2 origin-top scale-68 border transition-all duration-300 ease-out group-hover:scale-70 shadow-none"
      />
    ),
  },
]

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
          <LightRays />
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
      </div>
      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
        
        {/* Bento Grid layout with increased specific row height */}
        <BentoGrid className="auto-rows-[28rem]">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>

        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <DockDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
