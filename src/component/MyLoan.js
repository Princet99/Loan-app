import React, { useState, useEffect } from "react";
import "./MyLoan.css";

const MyLoan = () => {
  const [loans, setLoans] = useState([]); // State to hold loan data
  const [loading, setLoading] = useState(true); // State for loading
  const [toggle, setToggle] = useState(false); // Toggle between Lender and Borrower roles

  const role = toggle ? "Borrower" : "Lender";
  const filteredLoans = loans.filter((loan) => loan.UserRole === role);
  const loan = filteredLoans[0]; // Display the first loan for the selected role

  const handle_Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchLoans = async () => {
      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${API_BASE_URL}/my-loans/2`);
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loan) {
    return (
      <div className="Content">
        <h1>My Loans</h1>
        <div className="toggle-wrapper">
          <div className="toggle-container" onClick={handle_Toggle}>
            <div className={`toggle-option ${!toggle ? "active" : "inactive"}`}>
              Lender
            </div>
            <div className={`toggle-option ${toggle ? "active" : "inactive"}`}>
              Borrower
            </div>
          </div>
        </div>
        <p>No loans available for the selected role.</p>
      </div>
    );
  }

  return (
    <div className="Content">
      <h1>My Loans</h1>
      <div className="toggle-wrapper">
        <div className="toggle-container" onClick={handle_Toggle}>
          <div className={`toggle-option ${!toggle ? "active" : "inactive"}`}>
            Lender
          </div>
          <div className={`toggle-option ${toggle ? "active" : "inactive"}`}>
            Borrower
          </div>
        </div>
      </div>
      <div className="Loan-container">
        <div className="Loan_Details">
          <div style={{ fontWeight: "bold" }}>{loan.LoanDescription}</div>
          <div className="Loan_Number">
            <label>Loan Number: </label>
            <span>{loan.LoanNumber}</span>
          </div>
          <div className="Status">
            Status: <span>{loan.LoanStatus}</span>
          </div>
        </div>

        <div className="section">
          <div className="Heading">Coming up</div>
          <div className="Coming_Up">
            <div className="Payment_Due">
              <span>Amount Due: </span>${loan.upcomingPayment.amount}
            </div>
            <div className="Payment_Due_Date">
              <span>Due Date: </span>
              {loan.upcomingPayment.dueDate || "N/A"}
            </div>
            <div className="Current_Balance">
              <span>Current Balance: </span>${loan.currentBalance}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="Loan_Score">
            <div className="Heading">Loan Score</div>
            <div className="Score">{loan.LoanScore || "N/A"}</div>
          </div>
        </div>

        <div className="Loan-section">
          <div className="Heading">Loan Details</div>
          <table className="Loan_Table" border="1">
            <thead>
              <tr>
                <th>Loan Amount</th>
                <th>Interest Rate (%)</th>
                <th>Loan Date</th>
                <th>Loan Memo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${loan.LoanAmount}</td>
                <td>{loan.LoanRate}</td>
                <td>{new Date(loan.LoanDate).toLocaleDateString()}</td>
                <td>{loan.LoanMemo}</td>
              </tr>
            </tbody>
          </table>

          <p>Loan Payment Details</p>
          <table className="Loan_Payment_Details" border="1">
            <thead>
              <tr>
                <th>Payment Type</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {["onTimePayments", "latePayments", "futurePayments"].map(
                (type) => (
                  <tr key={type}>
                    <td>{type.replace(/([A-Z])/g, " $1").trim()}</td>
                    <td>{loan[type].number}</td>
                    <td>${loan[type].amount}</td>
                    <td>{loan[type].points}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="section">
          <div className="Heading">Recent Payments</div>
          <div className="Recent_Payments">
            <table className="Recent_Payment_Table" border="1">
              <thead>
                <tr>
                  <th>Scheduled Date</th>
                  <th>Actual Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loan.recentPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{new Date(payment.scheduled).toLocaleDateString()}</td>
                    <td>{new Date(payment.actual).toLocaleDateString()}</td>
                    <td>${payment.amount}</td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLoan;
