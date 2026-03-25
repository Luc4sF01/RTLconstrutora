import Hero from '../sections/Hero';
import About from '../sections/About';
import Building3D from '../sections/Building3D';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import Testimonials from '../sections/Testimonials';
import Differentials from '../sections/Differentials';
import Blog from '../sections/Blog';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Building3D />
      <Services />
      <Portfolio />
      <Testimonials />
      <Differentials />
      <Blog />
    </>
  );
}
