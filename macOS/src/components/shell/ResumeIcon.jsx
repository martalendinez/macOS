// src/components/shell/ResumeIcon.jsx
import { motion } from "framer-motion";

export default function ResumeIcon({ loaded, iconSrc, unlockAchievement }) {
  return (
    <motion.div
      className="fixed top-12 right-4 z-40 flex flex-col items-start gap-1 text-white text-xs font-medium cursor-pointer hover:scale-105 transition-transform duration-150 origin-top-right"
      initial={{ opacity: 0, x: 18 }}
      animate={loaded ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => {
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");

        unlockAchievement?.(
          "prepared_recruiter",
          "Achievement unlocked: Prepared Recruiter",
          "Resume viewed ✅"
        );
      }}
    >
      <img src={iconSrc} alt="Resume" className="w-15 h-15 object-contain" />
      <div className="bg-white/20 px-2 py-[3px] rounded-[6px] backdrop-blur-sm text-white text-[13px] whitespace-nowrap shadow-sm">
        resume.pdf
      </div>
    </motion.div>
  );
}