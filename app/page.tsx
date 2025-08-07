import NavBar from '@/components/NavBar'
import Hero from "@/components/Hero";
import {Featured} from "@/components/Featured";
import Bento from "@/components/Bento";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
        <NavBar/>
        <Hero />
        <Bento/>
        <Featured/>
        <Footer/>
    </div>
  );
}
