"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/lib/mail/actions/send-email";
import { SOCIAL_LINKS } from "@/constants/social-links";

type FormState = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const result = await sendEmail(formData);

    if (result.success) {
      setFormState("success");
    } else {
      setErrorMessage(
        result.error ?? "Something went wrong. Please try again.",
      );
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.06] blur-[100px]" />
        <div className="absolute top-0 left-[15%] h-50 w-50 rounded-full bg-primary opacity-[0.05] blur-[70px]" />
        <div className="absolute bottom-0 right-[15%] h-50 w-50 rounded-full bg-primary opacity-[0.05] blur-[70px]" />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      <div className="container mx-auto px-4">
        <div className="mb-14 max-w-xl">
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
              Contact
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-serif text-4xl font-semibold tracking-tight text-balance leading-[1.15] md:text-5xl"
          >
            Let's start a <em className="text-primary italic">conversation</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start"
        >
          <div className="lg:col-span-3">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  Message received
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Thanks for reaching out — I'll get back to you as soon as
                  possible.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit text-muted-foreground hover:text-foreground mt-2"
                  onClick={() => {
                    setFormState("idle");
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={formState === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={formState === "loading"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={formState === "loading"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={formState === "loading"}
                    className="resize-none"
                  />
                </div>

                {formState === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full sm:w-fit px-8 text-[15px] font-medium"
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8 lg:pt-2">
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Find me elsewhere
              </h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Have a quick question or just want to say hi? Reach out on any
                of these platforms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border/50 bg-muted/20 px-5 py-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {social.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {social.handle}
                      </span>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>

            <div className="rounded-xl border border-border/50 bg-muted/20 px-5 py-4">
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Prefer email?{" "}
                <a
                  href="mailto:asrorxonovdovudxon@gmail.com"
                  className="text-primary hover:underline"
                >
                  asrorxonovdovudxon@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
