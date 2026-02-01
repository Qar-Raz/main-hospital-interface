import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    description: "Expert in heart failure and transplantation.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Dr. James Chen",
    specialization: "Neurology",
    description: "Specializing in stroke and cerebrovascular diseases.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Dr. Emily Parker",
    specialization: "Pediatrics",
    description: "Compassionate care for children of all ages.",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Dr. Michael Brown",
    specialization: "Orthopedics",
    description: "Focusing on sports medicine and joint replacement.",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Dr. Lisa Davis",
    specialization: "Dermatology",
    description: "Advanced treatments for skin conditions and cosmetic procedures.",
    img: "https://avatar.vercel.sh/lisa",
  },
  {
    name: "Dr. Robert Taylor",
    specialization: "Oncology",
    description: "Dedicated to comprehensive cancer care and research.",
    img: "https://avatar.vercel.sh/robert",
  },
]

const firstRow = doctors.slice(0, doctors.length / 2)
const secondRow = doctors.slice(doctors.length / 2)

const DoctorCard = ({
  img,
  name,
  specialization,
  description,
}: {
  img: string
  name: string
  specialization: string
  description: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{specialization}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  )
}

export default function MarqueeDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((doctor) => (
          <DoctorCard key={doctor.name} {...doctor} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((doctor) => (
          <DoctorCard key={doctor.name} {...doctor} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
