import Header from "@/components/Header";
import EyewearShowcase from "@/components/ui/spatial-product-showcase";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <EyewearShowcase />
        <Features />
        <Products />
        <Brands />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
