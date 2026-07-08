import { Shield, DollarSign, MapPin, HeadphonesIcon, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Shield, title: 'Trusted Listings', text: 'All properties are verified for authenticity and quality.' },
  { icon: DollarSign, title: 'Best Prices', text: 'We guarantee the most competitive rates in the market.' },
  { icon: MapPin, title: 'Prime Locations', text: 'Properties in the best neighborhoods across the city.' },
  { icon: HeadphonesIcon, title: '24/7 Support', text: 'Round-the-clock customer service for all your queries.' },
  { icon: Clock, title: 'Quick Move-In', text: 'Hassle-free process with same-day move-in options.' },
  { icon: Users, title: 'Expert Guidance', text: 'Professional advisors to help you find your perfect home.' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            The RoomFinder Advantage
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make finding your perfect room simple, safe, and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors">
                <feature.icon className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
