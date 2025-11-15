'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Floating cursor follower */}
      <motion.div
        className="fixed w-8 h-8 bg-neo-pink border-4 border-black rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neo-yellow p-4">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 110, 0.3), transparent 50%)`
          }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ y: 100, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-9xl md:text-[12rem] lg:text-[16rem] font-black mb-8 text-stroke"
            style={{
              WebkitTextFillColor: "white",
              WebkitTextStroke: "6px black"
            }}
          >
            DORK
          </motion.h1>

          <motion.h2
            initial={{ y: 100, opacity: 0, rotate: 5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-black text-stroke"
            style={{
              WebkitTextFillColor: "#FF006E",
              WebkitTextStroke: "5px black"
            }}
          >
            SENSE
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <button className="px-12 py-6 bg-black text-neo-cyan text-3xl font-black border-6 border-black shadow-brutal-xl hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
              ENTER ↓
            </button>
          </motion.div>
        </div>

        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-16 md:w-24 md:h-24 border-4 border-black ${
              i % 3 === 0 ? 'bg-neo-cyan' : i % 3 === 1 ? 'bg-neo-pink' : 'bg-neo-green'
            } ${i % 2 === 0 ? 'rounded-full' : ''}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </section>

      {/* Features Grid */}
      <section className="min-h-screen bg-neo-pink p-8 md:p-16 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-7xl md:text-9xl font-black mb-16 text-center text-stroke"
            style={{
              WebkitTextFillColor: "white",
              WebkitTextStroke: "5px black"
            }}>
            FEATURES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "BOLD", color: "bg-neo-yellow", icon: "⚡" },
              { title: "BRUTAL", color: "bg-neo-cyan", icon: "💥" },
              { title: "CREATIVE", color: "bg-neo-green", icon: "🎨" },
              { title: "DYNAMIC", color: "bg-neo-purple", icon: "🚀" },
              { title: "RADICAL", color: "bg-neo-orange", icon: "🔥" },
              { title: "UNIQUE", color: "bg-neo-yellow", icon: "✨" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${feature.color} border-6 border-black p-8 shadow-brutal-xl hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all cursor-pointer`}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-4xl md:text-5xl font-black">{feature.title}</h3>
                <p className="text-xl font-bold mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Scroll Progress Section */}
      <section className="min-h-screen bg-neo-cyan p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-2 bg-black origin-left z-50"
          style={{ scaleX: smoothProgress }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            style={{
              scale: useTransform(smoothProgress, [0.3, 0.5], [0.8, 1]),
              opacity: useTransform(smoothProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]),
            }}
          >
            <h2 className="text-7xl md:text-9xl font-black mb-8 text-stroke"
              style={{
                WebkitTextFillColor: "#FF006E",
                WebkitTextStroke: "5px black"
              }}>
              SCROLL
            </h2>
            <h3 className="text-6xl md:text-8xl font-black text-stroke"
              style={{
                WebkitTextFillColor: "white",
                WebkitTextStroke: "4px black"
              }}>
              MAGIC
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  y: useTransform(
                    smoothProgress,
                    [0.3, 0.6],
                    [i % 2 === 0 ? 200 : -200, 0]
                  ),
                  rotate: useTransform(smoothProgress, [0.3, 0.6], [180, 0]),
                }}
                className={`h-32 border-6 border-black ${
                  i % 4 === 0 ? 'bg-neo-yellow' :
                  i % 4 === 1 ? 'bg-neo-pink' :
                  i % 4 === 2 ? 'bg-neo-green' : 'bg-neo-purple'
                } ${i % 2 === 0 ? 'rounded-full' : ''} shadow-brutal`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Parallax */}
      <section className="min-h-screen bg-neo-green p-8 md:p-16 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-black mb-16 text-stroke"
            style={{
              WebkitTextFillColor: "#9D00FF",
              WebkitTextStroke: "5px black"
            }}>
            VIBES
          </motion.h2>

          {[
            { quote: "THIS IS ABSOLUTELY INSANE!", author: "DORK #1", color: "bg-neo-yellow" },
            { quote: "NEVER SEEN ANYTHING LIKE IT!", author: "DORK #2", color: "bg-neo-pink" },
            { quote: "PUSHING BOUNDARIES DAILY!", author: "DORK #3", color: "bg-neo-cyan" },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`${testimonial.color} border-6 border-black p-8 md:p-12 shadow-brutal-xl mb-8 ${
                i % 2 === 0 ? 'mr-auto' : 'ml-auto'
              } max-w-2xl hover:rotate-2 transition-transform`}
            >
              <p className="text-3xl md:text-4xl font-black mb-4">"{testimonial.quote}"</p>
              <p className="text-2xl font-bold">- {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen bg-neo-purple p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255, 236, 0, 0.3), transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(0, 245, 255, 0.3), transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(255, 0, 110, 0.3), transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255, 236, 0, 0.3), transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-black mb-12 text-stroke"
            style={{
              WebkitTextFillColor: "white",
              WebkitTextStroke: "6px black"
            }}>
            JOIN US
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-12"
          >
            BECOME A DORK TODAY!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="px-12 py-6 bg-neo-yellow text-black text-3xl font-black border-6 border-black shadow-brutal-xl hover:shadow-none transition-all"
            >
              SIGN UP
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="px-12 py-6 bg-neo-cyan text-black text-3xl font-black border-6 border-black shadow-brutal-xl hover:shadow-none transition-all"
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-black"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 20}%`,
              }}
              animate={{
                scale: [1, 3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-8 md:p-16 relative overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-8 text-stroke-thin"
            style={{
              WebkitTextFillColor: "#FFEC00",
              WebkitTextStroke: "3px white"
            }}>
            DORKSENSE
          </motion.h3>
          <p className="text-2xl font-bold mb-4">© 2024 ALL RIGHTS RESERVED</p>
          <div className="flex justify-center gap-8 text-xl font-bold">
            <a href="#" className="hover:text-neo-yellow transition-colors">TWITTER</a>
            <a href="#" className="hover:text-neo-pink transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-neo-cyan transition-colors">DISCORD</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
