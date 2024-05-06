import { motion } from "framer-motion";

export default function Layout() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 360 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1.0 }}
      className="text-3xl text-center mt-4"
    >
      Coming soon ...
    </motion.div>
  );
}
