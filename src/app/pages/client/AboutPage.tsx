import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 12
    }
  }
};

const AboutPage = () => {
  return (
    <motion.div 
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      {/* Hero Section */}
      <motion.div className="relative bg-gray-900" variants={fadeInUp}>
        <div className="absolute inset-0">
          <motion.img
            className="h-full w-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Pickleball court"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            variants={fadeInUp}
          >
            About HoangTu Sport
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-3xl text-xl text-gray-300"
            variants={fadeInUp}
          >
            Your premier destination for high-quality pickleball equipment
          </motion.p>
        </div>
      </motion.div>

      {/* Our Story Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="items-center lg:grid lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={fadeInRight}
              viewport={{ once: true }}
              whileInView="visible"
              initial="hidden"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Founded in 2018, HoangTu Sport started with a simple mission: to provide pickleball enthusiasts with premium equipment that enhances their game. What began as a small passion project has grown into one of Vietnam&apos;s most trusted sources for pickleball paddles and accessories.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Our founder, a former competitive player, noticed a gap in the market for high-quality, performance-focused pickleball equipment. Drawing from years of experience and a deep understanding of the sport, HoangTu Sport was born to fill this need and support the growing pickleball community.
              </p>
            </motion.div>
            <motion.div 
              className="mt-10 lg:mt-0"
              variants={fadeInLeft}
              viewport={{ once: true }}
              whileInView="visible"
              initial="hidden"
            >
              <motion.img
                className="rounded-xl shadow-xl"
                src="https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Pickleball players"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "tween", duration: 0.2 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <motion.div 
        className="bg-gray-50 py-16 sm:py-24"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={scaleIn}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              At HoangTu Sport, our core values guide everything we do
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerChildren}
            viewport={{ once: true }}
            whileInView="visible"
            initial="hidden"
          >
            <motion.div 
              className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Quality Excellence</h3>
              <p className="mt-2 text-base text-gray-600">
                We source and curate only the highest quality pickleball equipment, ensuring our customers have access to products that enhance their performance and last for years.
              </p>
            </motion.div>

            <motion.div 
              className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Community Focus</h3>
              <p className="mt-2 text-base text-gray-600">
                We&apos;re passionate about growing the pickleball community in Vietnam and beyond. We support local tournaments, offer training resources, and create spaces for players to connect.
              </p>
            </motion.div>

            <motion.div 
              className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Innovation</h3>
              <p className="mt-2 text-base text-gray-600">
                We continuously seek out the latest advancements in pickleball technology, ensuring our customers have access to cutting-edge equipment that gives them a competitive edge.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-black py-16"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            variants={fadeInRight}
          >
            <span className="block">Ready to improve your game?</span>
            <span className="mt-2 block text-xl">Shop our collection of premium pickleball equipment today.</span>
          </motion.h2>
          <motion.div 
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
            variants={fadeInLeft}
          >
            <motion.div 
              className="inline-flex rounded-md shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-black hover:bg-gray-100"
                size="lg"
              >
                <Link to="/category/paddles" className="flex items-center gap-2">
                  Shop Paddles
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="ml-3 inline-flex rounded-md shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-base font-medium text-white hover:bg-gray-700"
                size="lg"
                variant="outline"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
