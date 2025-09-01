import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export const FloatingBook = () => {
  return (
    <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Book Cover */}
        <motion.div
          className="w-24 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-lg shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.1, rotateY: 15 }}
          transition={{ duration: 0.3 }}
        >
          {/* Book spine */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-primary-glow to-primary opacity-80"></div>
          
          {/* Book icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          
          {/* Floating sparkles */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-secondary rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${15 + i * 12}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/10 rounded-full blur-sm"
          animate={{
            scaleX: [1, 0.8, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};