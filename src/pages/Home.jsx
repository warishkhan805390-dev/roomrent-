import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Categories from '../components/home/Categories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
