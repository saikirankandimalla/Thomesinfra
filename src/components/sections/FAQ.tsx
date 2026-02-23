"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are your projects approved by the government?",
    answer: "Yes, all our projects are 100% legally verified and approved by relevant authorities like HMDA, DTCP, or YTDA. We ensure clear titles and complete documentation for every plot.",
  },
  {
    question: "Is bank loan assistance available?",
    answer: "Absolutely! Our projects are approved by major financial institutions including HDFC, SBI, ICICI, and LIC HFL. We assist our customers with the entire loan process.",
  },
  {
    question: "What amenities are included in the layouts?",
    answer: "Our premium layouts include 40' & 33' blacktop roads, underground drainage, electricity with street lights, overhead water tanks, landscaped parks, and 24/7 security.",
  },
  {
    question: "Why should I invest in the Warangal Highway region?",
    answer: "The Warangal Highway is one of Hyderabad's fastest-growing corridors. With the Regional Ring Road (RRR) and upcoming IT parks, the area offers high appreciation potential for investors.",
  },
  {
    question: "Can I visit the site before booking?",
    answer: "Yes, we provide free site visits. Our representatives will pick you up and show you the actual development at the project location.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Support
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked <span className="text-blue-900">Questions</span>
          </motion.h2>
          <p className="text-gray-500">
            Everything you need to know about our projects and investment process.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-blue-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
