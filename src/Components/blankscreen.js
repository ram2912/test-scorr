import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function BlankScreen({ setChatInput }) {
  const [hoveredLink, setHoveredLink] = useState("");

  const handleLinkClick = (prompt) => {
    setChatInput(prompt);
    // Code to fill the chatbot input with the prompt
    console.log("Clicked on link:", prompt);
  };

  const handleLinkMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleLinkMouseLeave = () => {
    setHoveredLink("");
  };

  return (
    <div style={{ width: "500px", height: "70%", backgroundColor: "#323232", borderRadius:'5px' }}>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          justifyContent: "left",
          height: "100%",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontFamily: "inter, sans-serif",
            fontSize: "20px",
            textAlign: "left",
            fontWeight: "350",
            color: "white",
            paddingBottom: "20px",
          }}
        >
          Welcome to SCORR chatbot!
        </h1>
        <h2
          style={{
            fontFamily: "inter, sans-serif",
            fontSize: "15px",
            textAlign: "left",
            fontWeight: "350",
            color: "#b2b2b2",
            paddingBottom: "25px",
          }}
        >
         You can start a conversation here or try the following examples:
        </h2>
        <div
          onClick={() => handleLinkClick("I want to improve my funnel conversion rate")}
          onMouseEnter={() => handleLinkMouseEnter("funnel")}
          onMouseLeave={handleLinkMouseLeave}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            textDecoration: hoveredLink === "funnel" ? "underline" : "none",
            transition: "text-decoration 0.3s",
          }}
        >
          <FaChevronRight style={{ marginRight: "5px" }} />
          <h3
            style={{
              fontFamily: "inter, sans-serif",
              fontSize: "15px",
              textAlign: "left",
              fontWeight: "350",
              color: "white",
            }}
          >
            Improve my funnel conversion rate
          </h3>
        </div>
        <div
          onClick={() => handleLinkClick("Build a deal scoring framework for my sales team to prioritize deals")}
          onMouseEnter={() => handleLinkMouseEnter("pipelines")}
          onMouseLeave={handleLinkMouseLeave}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            textDecoration: hoveredLink === "pipelines" ? "underline" : "none",
            transition: "text-decoration 0.3s",
          }}
        >
          <FaChevronRight style={{ marginRight: "5px" }} />
          <h3
            style={{
              fontFamily: "inter, sans-serif",
              fontSize: "15px",
              textAlign: "left",
              fontWeight: "350",
              color: "white",
            }}
          >
            Prioritize deals in my sales pipelines
          </h3>
        </div>
        <div
          onClick={() => handleLinkClick("I want to reduce churn")}
          onMouseEnter={() => handleLinkMouseEnter("churn")}
          onMouseLeave={handleLinkMouseLeave}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            textDecoration: hoveredLink === "churn" ? "underline" : "none",
            transition: "text-decoration 0.3s",
          }}
        >
          <FaChevronRight style={{ marginRight: "5px" }} />
          <h3
            style={{
              fontFamily: "inter, sans-serif",
              fontSize: "15px",
              textAlign: "left",
              fontWeight: "350",
              color: "white",
            }}
          >
            Reduce churn
          </h3>
        </div>
      </div>
    </div>
  );
}



