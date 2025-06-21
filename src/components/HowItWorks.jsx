import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up for free and set up your profile in minutes. No credit card required.',
      icon: '👤'
    },
    {
      number: '02',
      title: 'Add Your Expenses',
      description: 'Start tracking your expenses by adding transactions manually or importing from your bank.',
      icon: '➕'
    },
    {
      number: '03',
      title: 'Categorize & Analyze',
      description: 'Organize your expenses into categories and get insights into your spending patterns.',
      icon: '📊'
    },
    {
      number: '04',
      title: 'Set Budgets & Goals',
      description: 'Create budgets for different categories and set financial goals to stay on track.',
      icon: '🎯'
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card bg-base-200 shadow-xl">
                  <div className="card-body items-center text-center">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <h3 className="card-title mt-4">{step.title}</h3>
                    <p className="text-base-content/70">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="btn btn-primary btn-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
