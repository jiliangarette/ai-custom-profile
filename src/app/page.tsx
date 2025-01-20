import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bot, Building2, User } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center space-y-10 px-4 py-24 text-center lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your AI Profile,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
              Personalized
            </span>
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
            Create an AI-powered digital presence that truly represents you or
            your business. Share knowledge, answer questions, and engage
            authentically.
          </p>
        </div>

        <div className="relative">
          <Link href="/jilian">
            <Card className="flex flex-col items-center space-y-4 p-6">
              <div className="relative h-24 w-24">
                <div className="absolute -inset-0.5 animate-tilt rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white bg-white">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile Avatar"
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                    priority
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">/jilian</h2>
                <p className="text-sm text-gray-500">Personal AI Profile</p>
              </div>
              <Bot className="h-5 w-5 text-indigo-500" />
            </Card>
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/admin">
              Get Your Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Personal AI */}
          <Card className="relative overflow-hidden p-6 lg:p-8">
            <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-indigo-100" />
            <div className="relative space-y-4">
              <User className="h-10 w-10 text-indigo-500" />
              <h3 className="text-2xl font-bold">Personal AI Profile</h3>
              <p className="text-gray-500">
                Create an AI version of yourself that can share your story,
                skills, and experiences. Perfect for:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Professionals showcasing their portfolio
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Creators sharing their journey and work
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Individuals building their personal brand
                </li>
              </ul>
            </div>
          </Card>

          {/* Business AI */}
          <Card className="relative overflow-hidden p-6 lg:p-8">
            <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-indigo-100" />
            <div className="relative space-y-4">
              <Building2 className="h-10 w-10 text-indigo-500" />
              <h3 className="text-2xl font-bold">Business AI Profile</h3>
              <p className="text-gray-500">
                Empower your business with an AI representative that knows your
                products and services inside out. Ideal for:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Customer support and FAQ handling
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Product information and specifications
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                  Company information and branding
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Create Your AI Profile?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Join the future of digital presence. Create your personal or
              business AI profile today and start engaging with your audience in
              a whole new way.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/admin">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
