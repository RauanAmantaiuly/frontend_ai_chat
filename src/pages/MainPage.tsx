import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function MainPage() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/40" />

      <section className="container mx-auto px-4 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            {t("mainPage.badge")}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t("mainPage.titleLine1")}
            <br />
            <span className="text-primary">{t("mainPage.titleLine2")}</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            {t("mainPage.description")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <NavLink to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                {t("mainPage.uploadButton")}
              </NavLink>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <NavLink to="/chat">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t("mainPage.chatButton")}
              </NavLink>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features(t).map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full transition hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t("mainPage.howItWorks")}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps(t).map((step, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const features = (t: any) => [
  {
    title: t("mainPage.features.smartParsing.title"),
    description: t("mainPage.features.smartParsing.description"),
    icon: FileText,
  },
  {
    title: t("mainPage.features.askQuestions.title"),
    description: t("mainPage.features.askQuestions.description"),
    icon: MessageSquare,
  },
  {
    title: t("mainPage.features.security.title"),
    description: t("mainPage.features.security.description"),
    icon: ShieldCheck,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const steps = (t: any) => [
  {
    title: t("mainPage.steps.upload.title"),
    description: t("mainPage.steps.upload.description"),
    icon: Upload,
  },
  {
    title: t("mainPage.steps.process.title"),
    description: t("mainPage.steps.process.description"),
    icon: FileText,
  },
  {
    title: t("mainPage.steps.chat.title"),
    description: t("mainPage.steps.chat.description"),
    icon: MessageSquare,
  },
];
