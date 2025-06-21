import React from 'react';
import { FaRupeeSign, FaArrowRight } from 'react-icons/fa';
import '../../styles/SplitSummary.css';

const SplitSummary = ({ expenses, members, currentUserId }) => {
  const calculateBalances = () => {
    const balances = {};
    members.forEach(member => {
      balances[member.id] = {
        paid: 0,
        owes: 0,
        net: 0
      };
    });

    expenses.forEach(expense => {
      const amountPerPerson = expense.amount / expense.splitBetween.length;
      
      // Add to paid amount
      balances[expense.paidBy].paid += expense.amount;
      
      // Add to owes amount for each person
      expense.splitBetween.forEach(memberId => {
        if (memberId !== expense.paidBy) {
          balances[memberId].owes += amountPerPerson;
        }
      });
    });

    // Calculate net balance
    members.forEach(member => {
      balances[member.id].net = balances[member.id].paid - balances[member.id].owes;
    });

    return balances;
  };

  const calculateSettlements = (balances) => {
    const settlements = [];
    const debtors = [];
    const creditors = [];

    // Separate debtors and creditors
    members.forEach(member => {
      const balance = balances[member.id].net;
      if (balance < 0) {
        debtors.push({ id: member.id, amount: Math.abs(balance) });
      } else if (balance > 0) {
        creditors.push({ id: member.id, amount: balance });
      }
    });

    // Sort by amount
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // Calculate settlements
    debtors.forEach(debtor => {
      let remainingDebt = debtor.amount;
      creditors.forEach(creditor => {
        if (remainingDebt > 0 && creditor.amount > 0) {
          const settlementAmount = Math.min(remainingDebt, creditor.amount);
          if (settlementAmount > 0) {
            settlements.push({
              from: debtor.id,
              to: creditor.id,
              amount: settlementAmount
            });
            remainingDebt -= settlementAmount;
            creditor.amount -= settlementAmount;
          }
        }
      });
    });

    return settlements;
  };

  const balances = calculateBalances();
  const settlements = calculateSettlements(balances);
  const currentUserBalance = balances[currentUserId];

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  return (
    <div className="split-summary">
      <h3>Balance Summary</h3>
      
      <div className="balance-overview">
        <div className="balance-item">
          <span className="label">You paid</span>
          <span className="amount paid">
            <FaRupeeSign /> {currentUserBalance.paid.toLocaleString()}
          </span>
        </div>
        <div className="balance-item">
          <span className="label">You owe</span>
          <span className="amount owes">
            <FaRupeeSign /> {currentUserBalance.owes.toLocaleString()}
          </span>
        </div>
        <div className="balance-item">
          <span className="label">Net Balance</span>
          <span className={`amount ${currentUserBalance.net >= 0 ? 'positive' : 'negative'}`}>
            <FaRupeeSign /> {Math.abs(currentUserBalance.net).toLocaleString()}
            {currentUserBalance.net >= 0 ? ' (you get back)' : ' (you owe)'}
          </span>
        </div>
      </div>

      {settlements.length > 0 ? (
        <div className="settlements">
          <h4>Settlements</h4>
          <div className="settlements-list">
            {settlements.map((settlement, index) => (
              <div key={index} className="settlement-item">
                {settlement.from === currentUserId ? (
                  <>
                    <span className="from">You</span>
                    <FaArrowRight className="arrow" />
                    <span className="to">{getMemberName(settlement.to)}</span>
                    <span className="amount">
                      <FaRupeeSign /> {settlement.amount.toLocaleString()}
                    </span>
                  </>
                ) : settlement.to === currentUserId ? (
                  <>
                    <span className="from">{getMemberName(settlement.from)}</span>
                    <FaArrowRight className="arrow" />
                    <span className="to">You</span>
                    <span className="amount">
                      <FaRupeeSign /> {settlement.amount.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="from">{getMemberName(settlement.from)}</span>
                    <FaArrowRight className="arrow" />
                    <span className="to">{getMemberName(settlement.to)}</span>
                    <span className="amount">
                      <FaRupeeSign /> {settlement.amount.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-settlements">
          Everyone is settled up!
        </div>
      )}
    </div>
  );
};

export default SplitSummary; 