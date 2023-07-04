import { Basic } from "next/font/google";
import React from "react";
import { useState } from "react";
import BasicButtons from "./button";

export default function TopBar() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, backgroundColor: 'black', boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
               <div style={{ flex: '1', display: 'flex',  }}>
                  <img src="./White logo - no background.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
               </div>
               <div style={{ flex: '6', display: 'flex', alignItems: 'center', paddingLeft: '20px', borderLeft: '1px solid grey' }}>
                  <h1 style={{ fontFamily: "inter, sans-serif", fontSize: "20px", textAlign: "left", fontWeight: "350", color: "white" }}>My Deal Score</h1>
               </div>
               <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                     <BasicButtons text="Preview" />
                  </div>
               </div>
            </div>
        </div>
    )
}
