import { motion } from 'framer-motion';
import { Shield, Users, Building2, Award } from 'lucide-react';
import { images } from '../data/images';

const stats = [
  { icon: Building2, value: '500+', label: 'Properties Listed' },
  { icon: Users, value: '10,000+', label: 'Happy Tenants' },
  { icon: Shield, value: '100%', label: 'Verified Listings' },
  { icon: Award, value: '4.8', label: 'Average Rating' },
];

const team = [
  { name: 'John Anderson', role: 'CEO & Founder', image: images.team1 },
  { name: 'Sarah Mitchell', role: 'Head of Operations', image: images.team2 },
  { name: 'Robert Chen', role: 'Head of Sales', image: images.team3 },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Your Trusted Partner in Finding the Perfect Home
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              RoomFinder is a leading platform dedicated to helping people find their ideal living spaces. 
              Founded in 2020, we've grown to become one of the most trusted names in the rental market.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to make the process of finding a room, apartment, or PG accommodation 
              as seamless and stress-free as possible. We connect tenants with verified property owners 
              and ensure a transparent rental experience.
            </p>
            <div className="flex gap-4">
              <span className="bg-primary-50 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium">
                Trusted by 10K+ Tenants
              </span>
              <span className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium">
                500+ Properties
              </span>
            </div>
          </div>
          <div className="relative">
            <img
              src={images.about}
              alt="Modern apartment"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Verified</p>
                  <p className="text-sm text-gray-500">All listings verified</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Meet the People Behind RoomFinder
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A dedicated team working tirelessly to provide you with the best rental experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg text-center group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
