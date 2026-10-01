"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import CaseStudies from "@/components/CaseStudies";
import ContactSection from "@/components/ContactSection";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();

  const handleOpenContact = (prefillService?: string) => {
    setModalService(prefillService);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#090a10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenContact={handleOpenContact} />
      <Hero onOpenContact={handleOpenContact} />
      <ServiceSection onSelectService={handleOpenContact} />
      <CaseStudies />
      <ContactSection onOpenModal={() => handleOpenContact()} />
      <Footer />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillService={modalService}
      />
    </main>
  );
}
