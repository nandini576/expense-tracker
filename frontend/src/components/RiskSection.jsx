import React, { useEffect, useState } from "react";
import "./RiskSection.css";
import { apiFetch } from "../api/apiFetch";

function RiskSection() {

  const [risks, setRisks] = useState([]);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const fetchRisks = async () => {
    try {
      const data = await apiFetch(
        `/risk/calculate?month=${month}&year=${year}`
      );
      setRisks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    fetchRisks();

    // 🔥 THIS is the missing part
    const handler = () => {
      fetchRisks();
    };

    window.addEventListener("refreshDashboard", handler);

    return () => {
      window.removeEventListener("refreshDashboard", handler);
    };

  }, []);

  return (
    <div className="risk-card">

      <div className="section-header">
        <h3>Risk Analysis</h3>
      </div>

      {
        risks.length === 0 ? (
          <div className="empty-state">
            <p>No risk analysis available.</p>
            <span>
              Add budgets and expenses to analyze spending risks.
            </span>
          </div>
        ) : (
          <div className="risk-list">

            {
              risks.map((item, index) => (
                <div
                  key={index}
                  className={`risk-item 
                    ${item.riskLevel === "LOW" ? "low" : ""}
                    ${item.riskLevel === "MEDIUM" ? "medium" : ""}
                    ${item.riskLevel === "HIGH" || item.riskLevel === "OVER" ? "high" : ""}
                  `}
                >

                  <span>{item.category}</span>
                  <span>{Math.round(item.percent)}%</span>
                  <span>{item.riskLevel}</span>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default RiskSection;