import React from 'react';

const Processes = () => {
  const data = [
    {
      id: 1,
      title: "ORDER PLACEMENT",
      description: "After you choose from our available produce at that day you will be redirected to our <strong>Shopify</strong> page.",
    },
    {
      id: 2,
      title: "BILLING & PAYMENT",
      description: "After confirming your order we will send you your bill and pay your order via <strong>Gcash</strong> or bank transfer on <strong>Shopify</strong>.",
    },
    {
      id: 3,
      title: "HARVEST & DELIVERY",
      description: "We will harvest your order at night or the next morning and get it delivered the same day via <strong>Lalamove</strong> or <strong>Toktok</strong>.",
    },
    {
      id: 4,
      title: "EXPERIENCE TRUE FRESHNESS",
      description: "Enjoy your freshly harvested crops! We will provide instructions to keep your fresh crops longer.",
    },
  ];

  const getBackgroundColor = (id) => {
    switch (id) {
      case 1:
        return 'bg-yellow-500'; 
      case 2:
        return 'bg-yellow-600'; 
      case 3:
        return 'bg-yellow-700'; 
      case 4:
        return 'bg-yellow-800'; 
      default:
        return 'bg-yellow-500'; 
    }
  };

  const parseDescription = (description) => {
    const parts = description.split(/(<strong>|<\/strong>)/g);
    const result = [];

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '<strong>') {
        result.push(<strong key={i}>{parts[++i]}</strong>);
      } else if (parts[i] !== '</strong>') {
        result.push(parts[i]);
      }
    }

    return result;
  };

  return (
    <div className='flex flex-col gap-4'>
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex justify-between py-3 px-6 rounded-2xl text-white bg-opacity-80 ${getBackgroundColor(item.id)}`}
        >
          <div>
            <h2 className='font-spartan font-extrabold text-6xl'>{item.title}</h2>
            <p className='font-spartan text-2xl'>{parseDescription(item.description)}</p>
          </div>
          <div className='font-spartan font-extrabold text-8xl'>{item.id}</div>
        </div>
      ))}
    </div>
  );
};

export default Processes;
