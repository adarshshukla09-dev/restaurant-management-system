
import { LayoutDashboard, QrCode, Zap, Users, CreditCard, BarChart3 } from 'lucide-react';

const features = [
  {
    title: "Smart Table Management",
    desc: "Visualize your floor plan and manage reservations in real-time.",
    icon: <LayoutDashboard className="text-orange-600" />,
    color: "bg-orange-50"
  },
  {
    title: "QR Code Ordering",
    desc: "Let customers scan, browse, and order directly from their seats.",
    icon: <QrCode className="text-yellow-600" />,
    color: "bg-yellow-50"
  },
  {
    title: "Real-time Tracking",
    desc: "Synchronize Front-of-House and Kitchen instantly without delays.",
    icon: <Zap className="text-red-600" />,
    color: "bg-red-50"
  },
  {
    title: "Staff Management",
    desc: "Assign permissions for waiters, chefs, and admins easily.",
    icon: <Users className="text-orange-600" />,
    color: "bg-orange-50"
  },
  {
    title: "Secure Payments",
    desc: "Accept cards, wallets, and split bills via Stripe integration.",
    icon: <CreditCard className="text-yellow-600" />,
    color: "bg-yellow-50"
  },
  {
    title: "Analytics Dashboard",
    desc: "Deep insights into sales, top dishes, and peak hours.",
    icon: <BarChart3 className="text-red-600" />,
    color: "bg-red-50"
  }
];
function FeatureSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Powerful Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to run a high-performing restaurant in one platform.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-orange-200 transition-all hover:shadow-xl hover:shadow-orange-100/50">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeatureSection
