import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  Send,
  LoaderCircle
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';


interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

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

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData(initialFormData);
      
      // Reset state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <motion.div 
      className="bg-gray-50 py-12"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="mb-12 text-center text-4xl font-bold text-gray-900"
          variants={fadeInUp}
        >
          Contact Us
        </motion.h1>
        
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div variants={fadeInUp}>
            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5 text-black">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Address</h3>
                    <p className="mt-1 text-gray-600">
                      No. 15, Lane 76, Alley 51, Linh Quang Street, Van Chuong Ward, Dong Da District, Hanoi
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5 text-black">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Hotline</h3>
                    <p className="mt-1 text-gray-600">02438222228</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5 text-black">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">hoangtusport@gmail.com.vn</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5 text-black">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Working Hours</h3>
                    <p className="mt-1 text-gray-600">Daily: 7:00 AM - 9:30 PM</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 border-t border-gray-100 pt-6"
                variants={fadeInUp}
              >
                <h3 className="mb-4 text-base font-semibold text-gray-900">Connect with Us</h3>
                <motion.div 
                  className="flex space-x-4"
                  variants={staggerChildren}
                >
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
                    aria-label="Facebook"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeInUp}
                  >
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeInUp}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
                    aria-label="YouTube"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeInUp}
                  >
                    <Youtube className="h-5 w-5" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 overflow-hidden rounded-xl shadow-md"
              variants={fadeInUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5564920388522!2d105.8320118!3d21.0207435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7f59325d4d%3A0x6c3d29dfd1c4b136!2sNguyen%20Son%20Bakery!5e0!3m2!1sen!2s!4v1717148023784!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nguyễn Sơn Bakery Location"
              ></iframe>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
            variants={fadeInUp}
          >
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Send Us a Message</h2>
            
            {submitted ? (
              <motion.div 
                className="rounded-md border border-green-200 bg-green-50 p-6 text-green-900"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">Message sent successfully!</h3>
                    <p className="mt-2 text-base text-green-700">
                      Thank you for contacting us! We will respond as soon as possible.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={staggerChildren}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </motion.div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order</option>
                      <option value="feedback">Feedback</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </div>
                
                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex justify-end"
                >
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="min-w-[160px] bg-black text-white hover:bg-gray-800"
                    size="lg"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage; 