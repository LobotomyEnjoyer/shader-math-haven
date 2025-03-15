
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CustomButton from "@/components/CustomButton";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply staggered animations
    const animateElements = () => {
      if (headingRef.current) {
        headingRef.current.style.opacity = "0";
        headingRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (headingRef.current) {
            headingRef.current.style.opacity = "1";
            headingRef.current.style.transform = "translateY(0)";
          }
        }, 300);
      }
      
      if (subheadingRef.current) {
        subheadingRef.current.style.opacity = "0";
        subheadingRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (subheadingRef.current) {
            subheadingRef.current.style.opacity = "1";
            subheadingRef.current.style.transform = "translateY(0)";
          }
        }, 600);
      }
      
      if (buttonRef.current) {
        buttonRef.current.style.opacity = "0";
        buttonRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.style.opacity = "1";
            buttonRef.current.style.transform = "translateY(0)";
          }
        }, 900);
      }
    };
    
    animateElements();
  }, []);
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto pt-16">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ease-out"
          >
            Exploring the Math Behind Beautiful Visuals
          </h1>
          
          <p 
            ref={subheadingRef}
            className="mt-6 text-lg md:text-xl text-muted-foreground transition-all duration-700 ease-out"
          >
            Welcome to the community of math enthusiasts and shader artists. 
            Dive into the world where algorithms create beauty.
          </p>
          
          <div 
            ref={buttonRef}
            className="mt-10 transition-all duration-700 ease-out"
          >
            <CustomButton 
              variant="primary" 
              size="lg"
              className="group"
            >
              <span>READ</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </CustomButton>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} ShaderMath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
