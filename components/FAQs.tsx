"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FAQS } from "@/constants/faqs";

const FAQ = () => {
  return (
    <section className="py-24 overflow-hidden relative" id="faq">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              FAQ
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-4 font-serif text-4xl font-semibold tracking-tight text-balance md:text-5xl"
          >
            Questions worth <em className="text-primary italic">asking</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base font-light leading-relaxed text-muted-foreground"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mx-auto max-w-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/50"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:text-primary hover:no-underline transition-colors data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-light leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
