
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="w-full py-8 px-4 md:px-8 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20"></div>
        <div className="relative px-7 py-4 bg-background rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            《自信的陷阱》Cheat Sheet
          </h1>
        </div>
      </motion.div>

      <motion.p
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        核心理念：先行动，才能建立自信！
      </motion.p>
    </motion.header>
  );
};

export default Header;
