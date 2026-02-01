"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  User,
  Stethoscope,
  Building2,
  Pill,
  FileText,
  Activity,
  CalendarCheck,
  FlaskConical,
} from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-white p-3 shadow-md dark:bg-black",
      className
    )}
  >
    {children}
  </div>
));

Circle.displayName = "Circle";

export default function AnimatedBeamDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const patientRef = useRef<HTMLDivElement>(null);
  const doctorRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);
  const medsRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);
  const vitalsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const labRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[420px] w-full overflow-hidden rounded-xl border bg-background",
        className
      )}
    >
      {/* Center */}
      <Circle
  ref={patientRef}
  className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
>
  <User className="size-8 text-slate-800 dark:text-slate-200" />
</Circle>


      {/* Circular Ring */}
      <Circle ref={doctorRef} className="left-1/2 top-[30px] -translate-x-1/2">
        <Stethoscope className="text-blue-500" />
      </Circle>

      <Circle ref={hospitalRef} className="right-[40px] top-1/2 -translate-y-1/2">
        <Building2 className="text-emerald-500" />
      </Circle>

      <Circle ref={calendarRef} className="left-1/2 bottom-[30px] -translate-x-1/2">
        <CalendarCheck className="text-indigo-500" />
      </Circle>

      <Circle ref={medsRef} className="left-[40px] top-1/2 -translate-y-1/2">
        <Pill className="text-rose-500" />
      </Circle>

      <Circle ref={recordsRef} className="left-[22%] top-[20%]">
        <FileText className="text-amber-500" />
      </Circle>

      <Circle ref={vitalsRef} className="right-[22%] top-[20%]">
        <Activity className="text-cyan-500" />
      </Circle>

      <Circle ref={labRef} className="right-[22%] bottom-[20%]">
        <FlaskConical className="text-violet-500" />
      </Circle>

      {/* Hub connections */}
      {[doctorRef, hospitalRef, calendarRef, medsRef, recordsRef, vitalsRef, labRef].map(
        (ref, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={patientRef}
            toRef={ref}
          />
        )
      )}

      {/* Minimal cross links */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={doctorRef}
        toRef={recordsRef}
        dotted
        curvature={-30}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={labRef}
        toRef={vitalsRef}
        dotted
        curvature={30}
      />
    </div>
  );
}
