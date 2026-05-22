import React from "react";
import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <h2 className="footer-title">
          Expense Tracker
        </h2>

        {/* <p className="footer-desc">
          Manage your expenses, track budgets, and gain better financial insights with a smart and simple expense tracking system.
        </p> */}

        <p className="footer-copy">
          © 2026 Expense Tracker. All rights reserved.
        </p>

        <p className="footer-author">
          Developed by Kona Nandini
        </p>

      </div>

    </footer>
  );
}

export default Footer;