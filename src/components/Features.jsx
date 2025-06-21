import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Access your expenses on any device with our responsive design.',
      color: 'bg-primary/10'
    },
    {
      icon: '📈',
      title: 'Real-time Analytics',
      description: 'Get instant insights into your spending habits with beautiful charts.',
      color: 'bg-secondary/10'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Stay informed with alerts for unusual spending and budget limits.',
      color: 'bg-accent/10'
    },
    {
      icon: '🌐',
      title: 'Multi-currency',
      description: 'Track expenses in multiple currencies with automatic conversion.',
      color: 'bg-info/10'
    },
    {
      icon: '📤',
      title: 'Export Reports',
      description: 'Export your expense reports in various formats for record keeping.',
      color: 'bg-success/10'
    },
    {
      icon: '🔐',
      title: 'Secure Backup',
      description: 'Your data is automatically backed up and encrypted.',
      color: 'bg-warning/10'
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Our expense tracker comes packed with features to help you manage your finances
            effectively and make informed decisions about your spending.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className={`card-body ${feature.color} rounded-t-lg`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Active Users</div>
              <div className="stat-value">10K+</div>
            </div>
            <div className="stat">
              <div className="stat-title">Expenses Tracked</div>
              <div className="stat-value">1M+</div>
            </div>
            <div className="stat">
              <div className="stat-title">Money Saved</div>
              <div className="stat-value">$5M+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
