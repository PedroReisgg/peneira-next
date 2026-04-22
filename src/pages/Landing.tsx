import { ArrowRight, MapPin, Shield, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import heroImage from "@/assets/hero-stadium.jpg";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Trophy,
      title: "Maiores clubes",
      desc: "São Paulo, Palmeiras, Corinthians, Santos e mais — tudo em um só lugar.",
    },
    {
      icon: MapPin,
      title: "Mapeado por cidade",
      desc: "Filtre peneiras pela sua região. Capital, ABC, Interior — você decide.",
    },
    {
      icon: Shield,
      title: "Informação confiável",
      desc: "Datas, horários, categorias e requisitos verificados. Sem surpresas.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="container flex items-center justify-between py-5">
          <Logo />
          <nav className="flex items-center gap-2">
            {user ? (
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">Ir para Peneiras</Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Jovem atleta chutando bola em estádio iluminado"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="container relative flex min-h-screen flex-col justify-center pb-20 pt-32">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <Zap className="h-3.5 w-3.5" />
              Peneiras de Futebol · São Paulo
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              A nova geração{" "}
              <span className="text-gradient-primary">começa aqui.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Encontre as principais peneiras dos maiores clubes paulistas.
              Datas, locais, categorias e requisitos — tudo organizado para você
              dar o próximo passo na carreira.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group h-14 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:bg-primary-glow hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.8)]"
              >
                <Link to={user ? "/dashboard" : "/auth"}>
                  Acessar Peneiras
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {!user && (
                <Button asChild size="lg" variant="outline" className="h-14 border-border/80 bg-background/30 px-8 text-base backdrop-blur">
                  <Link to="/auth">Criar conta grátis</Link>
                </Button>
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><span className="text-2xl font-bold text-foreground">8+</span> clubes parceiros</div>
              <div className="flex items-center gap-2"><span className="text-2xl font-bold text-foreground">50+</span> peneiras ativas</div>
              <div className="flex items-center gap-2"><span className="text-2xl font-bold text-foreground">100%</span> grátis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Tudo que você precisa para <span className="text-gradient-primary">ser visto.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Construído para atletas. Pensado para o seu próximo passo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-elevated group rounded-xl border border-border/60 p-6 transition-all hover:border-primary/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="card-elevated relative overflow-hidden rounded-2xl border border-primary/30 p-10 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Sua chance está a um clique.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Cadastre-se em segundos e veja as peneiras abertas em São Paulo.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-14 bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:bg-primary-glow"
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              Acessar Peneiras
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NextGen · Mapeando o futuro do futebol.
      </footer>
    </div>
  );
};

export default Landing;
