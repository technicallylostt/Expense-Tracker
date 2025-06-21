import React from 'react';

const WhyThisApp = () => {
  const benefits = [
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns with our advanced analytics tools.'
    },
    {
      icon: '💰',
      title: 'Budget Management',
      description: 'Set and track your budgets easily, helping you stay on top of your financial goals.'
    },
    {
      icon: '👥',
      title: 'Group Expenses',
      description: 'Split expenses with friends and family, making shared finances simple and transparent.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and secure, ensuring your privacy is protected.'
    }
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Expense Tracker?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="card-title">{benefit.title}</h3>
                <p className="text-base-content/70">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Join Thousands of Happy Users</h3>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Our expense tracker has helped thousands of users take control of their finances,
            save more money, and achieve their financial goals. Start your journey to better
            financial management today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyThisApp;
