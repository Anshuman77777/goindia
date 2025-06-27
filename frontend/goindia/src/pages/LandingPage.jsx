import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav=useNavigate();
  const exploreProducts =()=>{
    nav('/products')
  }
  return (
    <div className="bg-white h-screen text-gray-800 font-sans overflow-y-auto ">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to GoIndia</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
          Discover, launch, and invest in the next wave of Indian college startups.
        </p>
        <div className="space-x-4">
          <button
          onClick={exploreProducts}
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 transition">
            Explore Products
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition">
            Become an Investor
          </button>
        </div>
      </section>

      {/* Role Highlights */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-20 py-16">
        <RoleCard
          title="🚀 Founders & Students"
          desc="Launch your product, link your college, and get noticed by real investors. Like Product Hunt — but campus-first."
        />
        <RoleCard
          title="💼 Investors"
          desc="Filter and find startups from campuses across India. Initiate chat with promising products. Build your next portfolio."
        />
        <RoleCard
          title="🌏 General Users"
          desc="Upvote great ideas, explore college innovation, and comment to support your favorites."
        />
      </section>

      {/* Badge & Launch Section */}
      <section className="text-center px-6 py-20 bg-gradient-to-br from-green-300 to-green-700">
        <h2 className="text-3xl font-bold mb-3">Every product tells a story</h2>
        <p className="text-lg mb-6">From dorm rooms to demo days — GoIndia helps ideas get seen.</p>
        <button className="bg-blue-950 hover:bg-blue-600 text-white px-6 py-3 rounded-xl animate-bounce font-semibold">
          Launch Yours Now
        </button>
      </section>

      {/* Footer */}
      {/* <footer className="text-center py-10 text-sm text-gray-600">
        © 2025 GoIndia · Built for Indian Founders, Backed by Indian Investors 🇮🇳
      </footer> */}
    </div>
  );
}

function RoleCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}